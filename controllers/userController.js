const {User, Thought} = require('../models'); 

// set up the user controller
const userController = {

    // create a new user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err)); 
    },

    //get All Users
    getAllUsers(req, res) {
        User.find({})
        // user thoughts
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        // user friends
        .populate({
            path: 'friends', 
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err); 
            res.status(400).json(err); 
        }); 
    },

    // get single user by id
    getUsersById({params}, res) {
        User.findOne({_id: params.id})
        // user thoughts
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        // user friends
        .populate({
            path: 'friends', 
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // if no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json(err); 
        }); 
    },

    // update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },
    // delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id}) 
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'}); 
                return; 
        }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId}, 
            {$push: {friends: params.friendId}}, 
            {new: true}
        )
        .populate({
            path: 'friends', 
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.json(err));
    },

    // delete friend
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId}, 
            {$pull: {friends: params.friendId}}, 
            {new: true}
        )
        .populate({
            path: 'friends', 
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;
