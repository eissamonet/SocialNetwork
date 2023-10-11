const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
        type: String,
        required: [true, 'Username is Required'],
        trim: true,
        unique: true
        },
        email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        // use Mongoose's regex to validate correct email format
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
        ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
        ]
    },
    {
        toJSON: {
        virtuals: true
        },
        id: false
    }
    );

    // get total count of friends on retrieval
    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });

    // create the User model using the UserSchema
    const User = model('User', userSchema);

    // export the User model
    module.exports = Users;