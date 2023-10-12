const {Thought, User} = require('../models');

const thoughtController = {
    // all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err); 
            res.status(400).json(err); 
        }); 
    },  

    // get single thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions', 
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            // if no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'}); 
                return; 
            }
            res.json(dbThoughtData); 
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json(err); 
        }); 
    },

    // create thought
    createThought({params, body}, res) {
        console.log(body); 
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId}, 
                {$push: {thoughts: _id}}, 
                {new: true}
            ); 
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.json(err)); 
    },

    // update thought by id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({
            path: 'reactions', 
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'}); 
                return; 
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))

    },

    // create reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$push: {reactions: body}}, 
            {new: true, runValidators: true}
        )
        .populate({
            path: 'reactions', 
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'}); 
                return; 
            }
            res.json(dbThoughtData); 
        })
        .catch(err => res.json(err));
    },

    // delete thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'}); 
                return; 
            }
            res.json(dbThoughtData); 
        })
        .catch(err => res.status(400).json(err));
    },

    // delete reaction
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$pull: {reactions: {reactionId: params.reactionId}}}, 
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;