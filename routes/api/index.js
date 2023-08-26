const router = require('express').Router();
const userRoutes = require('./use-routes');
const thoughtsRoutes = require('./thoughts-routes');

router.use('/user',userRoutes);
router.use('/thoughts',thoughtsRoutes);

module.exports = router; 