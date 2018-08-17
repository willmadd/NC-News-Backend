const userRouter = require('express').Router();
const {getUser} = require('../controllers/users');

userRouter.route('/')
.get(getUser);

module.exports = userRouter;