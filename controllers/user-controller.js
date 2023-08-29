const { user, thoughts } = require("../models/");

const userController = {
    // Get all users ----------
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

    // Get a single user (MAY NEED SOME PARAMS WORK) 
    async getSingleUser(req, res) {
        try {
            const user = await user.fineOne({ _id: req.params.id })
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

    // create new user
    async createNewUser({body}, res) {
        try{ 
            const user = await user.create(body)
            res.json(user)
            return;
        } catch(err){
            res.status(500).json(err)
        }
    },

    // Delete a single user and all users thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await user.findByIdAndDelete({ _id: req.params.userId })
            const deleteThoughts = await thoughts.remove({
                _id:{
                    $in:deletedUser.thoughts
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

    // Add a friend 
    async addFriend(req, res) {
        try {
            const user = await user.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body.friendId}},
                {new:true, runValidators: true}
            )

            if(!user){
                return res.status(404).json({message:`No user found with this id`});
            }

            res.json(user)
            return;

        } catch(err) {
            res.status(500).json(err);
        }
    },

    // Remove a friend 
    async removeFriend(req, res) {
        try {
            const user = await user.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull:{friends: req.params.friendId}},
                {new: true}
            )

            if(!user){
                return res.status(404).json({message:`Could not find that user`});
            }

            res.json(user)

        } catch(err) {
            res.status(500).json(err);
        }
    },
    
};
module.exports = userController;