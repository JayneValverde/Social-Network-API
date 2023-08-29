const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`,
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thoughts",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        id: false,
    }
)

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length})

const User = model('user', UserSchema);

module.exports = User;