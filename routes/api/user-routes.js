const router = require('express').Router();
const{
    getAllUsers,
    getSingleUser, 
    deleteUser,
    addFriend, 
    removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(createNewUser);

// /api/user/:id
router.route('/:id').get(getSingleUser).delete(deleteUser);

// /api/user/:id/friends/:friendId
router.route('/:id/friends/:friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;