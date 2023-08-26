const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: "Username is Required",
        },
        email: {
            type: String,
            unique: true,
            required: "Username is Required",
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
);

const User = model('user', UserSchema);

module.exports = User;