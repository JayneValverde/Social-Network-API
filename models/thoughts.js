const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");


const ReactionSchema = new Schema ({
    reactionId: {
        // mongoose's ObjectId data type
        type: Schema.Types.ObjectId, 
        // default value is set to a new ObjectId
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true, 
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, 
        // set default value to the current timestamp
        default: Date.now,
        // use a getter method to format the timestamp on query
        get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
    toJSON: {
        getters: true, 
    },
    _id: false,
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        minLength: 1, 
        maxLength: 280
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true
    },

    // array of documents created with the reactionSchema
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true, 
        getters: true, 
    },
    id: false,
});

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought = model("Thoughts", ThoughtSchema);

module.exports = Thought; 