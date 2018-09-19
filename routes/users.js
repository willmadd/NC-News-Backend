const userRouter = require('express').Router();
const {getUser} = require('../controllers/users');

userRouter.route('/:user')
.get(getUser);

module.exports = userRouter;