const router = require('express').Router();
const{
    getAllUsers,
    getSingleUser,
    createNewUser, 
    deletedUser,
    addFriend, 
    removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(createNewUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).delete(deletedUser);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;