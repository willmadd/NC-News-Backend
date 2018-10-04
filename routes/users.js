const userRouter = require('express').Router();
const {getUser, getAllUsers} = require('../controllers/users');

userRouter.route('/:user')
.get(getUser);

userRouter.route('/')
.get(getAllUsers);

module.exports = userRouter;