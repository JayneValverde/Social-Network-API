const { User, Thoughts } = require("../models/");

const userController = {
    // Get all users ----------
    async getAllUsers(req, res) {
        try {
            const users = await User
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
                
            if(!User) {
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
            const user = await User.findOne({ _id: req.params.userId})
                .populate({
                    path: "thoughts",
                    select:"-__v",
                })
                .populate({
                    path: "friends",
                    select:"-__v",
                })
                .select("-__v");
            
            if (!User) {
                return res.status(404).json({ message: `Couldn't find that user` });
            }

            res.json(user)
            return;
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    // create new user
    async createNewUser({body}, res) {
        try{ 
            const user = await User.create(body)
            res.json(user)
            return;
        } catch(err){
            res.status(500).json(err)
        }
    },

    // Delete a single user and all users thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete({ _id: req.params.userId })
            const deleteThoughts = await Thoughts.remove({
                _id:{
                    $in:deletedUser.thoughts
                }
            })

            if (!User) {
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
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body.friendId}},
                {new:true, runValidators: true}
            )

            if(!User){
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
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull:{friends: req.params.friendId}},
                {new: true}
            )

            if(!User){
                return res.status(404).json({message:`Could not find that user`});
            }

            res.json(user)

        } catch(err) {
            res.status(500).json(err);
        }
    },
    
};
module.exports = userController;