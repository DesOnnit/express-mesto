const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');

router.use('/cards', cardRouter);
router.use('/users', userRouter);

module.exports = router;
