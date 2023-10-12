const  { schema, model, Types } = require('mongoose');
const moment = require('moment');

// reaction schema
const ReactionSchema = new schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Types.ObjectId,
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
const ThoughtsSchema = new schema(
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
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thoughts model using the ThoughtsSchema
const Thoughts = model('Thoughts', ThoughtsSchema);

// export the Thoughts model
module.exports = Thoughts;

    

