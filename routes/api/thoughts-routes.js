const router = require("express").Router();
const {
    getAllThoughts,
    getOneThought,
    addReaction,
    addThought, 
    updateThought,
    removeReaction,
    removeThought,

} = require('../../controllers/thoughts-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

router
    .route('/:thoughtsId')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought)

router
    .route('/:thoughtsId/reactions/')
    .post(addReaction)


router
    .route('/:thoughtsId/reactions/:reactionId')
    .delete(removeReaction)    



module.exports = router; 