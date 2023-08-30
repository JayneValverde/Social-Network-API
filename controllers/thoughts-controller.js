const { Thoughts, User } = require("../models");
// const Thought = require('../models/thoughts');

const thoughtsController = {

    // add thought to user
    async addThought({body}, res){
        try{
            const {_id} = await Thoughts.create(body)

            if(!_id){
                return res.status(500).JSON({message:"Could not create thought. Check Server"})
            }

            const user = await User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            )

            if(!User){
                return res.status(404).message({message:"Could not find any user with that id"})
            }

            res.json(user)
            return;
        }

        catch(err) {
            res.status(500).json({message: "Something went wrong with the server", error: err})
            console.log(err)
        }
    },

    // remove thought
    async removeThought({params}, res){
        try{
            const deletedThoughts = await Thoughts.findOneAndDelete({_id: params.thoughtsId})
            
            if(!deletedThoughts){
                return res.status(404).json({message:"Could not find a comment with this id"}) 
                console.log(err)
            }
            
            res.json(deletedThoughts)
            return;
        }

        catch(err) {
            res.status(500).json(err)
        }
    },

    // To Get One thought and include reaction 
    async getOneThought({params}, res) {
        try{
            const thought = await Thoughts.findOne({_id: params.thoughtsId}).populate({
                path: 'reactions',
                select:'-__v'
                })
                .select('-__v');

            if(!Thoughts){
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
            const thought = await Thoughts.find().populate({
                path: 'reactions',
                select: '-__v'
                })
                .select('-__v');

            if(!Thoughts.length){
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
            const reaction = await Thoughts.findOneAndUpdate(
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
            const thought = await Thoughts.findByIdAndUpdate(
                {_id: params.thoughtsId},
                body, 
                {new: true, runValidators: true}
            )

            if(!Thoughts){
                return res.status(404).json({message:"No thought found with this Id"})
            }

            res.json(thought)
            return;
        } catch(err){
            res.status(500).json(err)
        }
    },

    // Remove a reaction 
    async removeReaction({params},res){
        try{
            const thought = await Thoughts.findByIdAndUpdate(
                {_id: params.thoughtsId},
                {$pull: {reactions: { reactionId: params.reactionId }}},
                {new:true}
            )

            if(!thought){
                return res.status(404).json({message: "Could not find that thought"})
            }

            res.json(thought)
        
        } catch(err){
            res.status(500).json({message: "something went wrong with the server", error: err})
        }
    }

}

module.exports = thoughtsController