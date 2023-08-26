const { user, thoughts } = require("../models");

model.exports = {
    // TODO: Get all users ----------
    async getAllUsers(req, res) {
        try {
            const users = await user
                .find()
                .populate({
                    path: "thoughts",
                    select:"-__v",
                }) 
                .populate({
                    path: "friends",
                    select:"-__v",
                })
                .select("-__v");
                
            if(!user) {
                return res.status(404).json({ message: "There are no users yet" });
            }

            res.json(users)
            return;
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // TODO: Get a single user (MAY NEED SOME PARAMS WORK) 
    async getSingleUser(req, res) {
        try {
            const user = await user.fineOne({ _id: req.params.userId })
                .populate({
                    path: "thoughts",
                    select:"-__v",
                })
                .populate({
                    path: "friends",
                    select:"-__v",
                })
                .select("-__v");
            
            if (!user) {
                return res.status(404).json({ message: `Couldn't find that user` });
            }

            res.json(user)
            return;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // TODO: Delete a single user and all users thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await user.findByIdAndDelete({ _id: req.params.userId })
            const deleteThoughts = await thoughts.remove({
                _id:{
                    $in:[deletedUser.thoughts]
                }
            })

            if (!user) {
                return res.status(404).json({ message: `No user with that ID` });
            }

            res.json({deletedUser, deleteThoughts})
            return;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // TODO: Add a friend 
    
    

    // TODO: Remove a friend 


}