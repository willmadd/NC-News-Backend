const userRouter = require('express').Router();
const {getUser, getAllUsers, createUser} = require('../controllers/users');

userRouter.route('/:user')
.get(getUser);

userRouter.route('/')
.get(getAllUsers)
.post(createUser);

module.exports = userRouter;