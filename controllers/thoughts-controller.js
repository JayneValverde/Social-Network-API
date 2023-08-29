const { thoughts, user } = require("../models");
// const Thought = require('../models/thoughts');

const thoughtsController = {

    // add thought to user
    async addThought({body}, res){
        try{
            const {_id} = await thoughts.create(body)

            if(!_id){
                return res.status(500).JSON({message:"Could not create thought. Check Server."})
            }

            const user = await user.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            )

            if(!user){
                return res.status(404).message({message:"Could not find any user with that id"})
            }

            res.json(user)
            return;
        }

        catch(err) {
            res.status(500).json({message: "Something went wrong with the server", error: err})
        }
    },

    // remove thought
    async removeThought({params}, res){
        try{
            const deletedThought = await thoughts.findOneAndDelete({_id: params.thoughtId})
            if(!deletedThought){
                return res.status(404).json({message:"Could not find a comment with this id"}) 
            }
            
            res.json(deletedThought)
            return
        }

        catch(err) {
            res.status(500).json(err)
        }
    },

    // To Get One thought and include reaction 
    async getOneThought({params}, res) {
        try{
            const thought = await thought.findOne({_id: params.thoughtsId}).populate({
                path: 'reactions',
                select:'-__v'
                })
                .select('-__v');

            if(!thought){
                return res.status(404).json({message:"Could not find that thought"})
            }

            res.json(thought)
            return;
        } catch(err){
            res.status(404).json({message: "Could not find that thought"})
        }
    },

    // Get all thoughts
    async getAllThoughts(req,res) {
        try{
            const thought = await thoughts.find().populate({
                path: 'reactions',
                select: '-__v'
                })
                .select('-__v');

            if(!thought.length){
                return res.status(404).json({message:"There are no thoughts yet"})
            }

            res.json(thought)
            return;
        } catch(err){
            res.status(500).json(err)
        }
    },

    // add reaction
    async addReaction({params, body}, res) {
        try{
            const reaction = await thoughts.findOneAndUpdate(
                {_id : params.thoughtsId},
                {$push: {reactions: body}},
                {new: true, runValidators: true}
            )

            if(!reaction){
                return res.status(404).json({message :"No such thought found with this Id"})
            }

            res.json(reaction)
            return;
        } catch(err){
            res.status(500).json(err)
        }
    },

    // Update a single thought
    async updateThought({params,body},res){
        try{
            const thought = await thoughts.findByIdAndUpdate(
                {_id: params.thoughtsId},
                body, 
                {new: true, runValidators: true}
            )

            if(!thought){
                return res.status(404).json({message:"No thought found with this Id"})
            }

            res.json(thought)
            return;
        } catch(err){
            res.status(500).json(err)
        }
    },

    // Remove a reaction 
    async removeReaction({params, query},res){
        try{
            const thought = await thoughts.findByIdAndUpdate(
                {_id: params.thoughtsId},
                {$pull: {reactions: { reactionId: query.reactionId }}},
                {new:true}
            )

            if(!thought){
                return res.status(404).json({message: "Could not find that thought"})
            }

            res.json(thought)
            return;
        } catch(err){
            res.status(500).json({message: "something went wrong with the server", error: err})
        }
    }

}

module.exports = thoughtsController