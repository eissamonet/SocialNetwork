const  { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// reaction schema
const ReactionSchema = new Schema({
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: [true, 'Please enter a reaction'],
        maxlength: 280
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use moment to format date on get
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
        toJSON: {
            getters: true,
        }
    }); 
    
// thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Please enter a thought'],
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use moment to format date on get
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
            },
            username: {
                type: String,
                required: [true, 'Please enter a username'],
            },
            reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
            id: false
    }
);

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtsSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;

    

