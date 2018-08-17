const commentRouter = require('express').Router();
const {changeCommentVote, deleteCommentById} = require('../controllers/comments')

commentRouter.route('/:comment_id')
.put(changeCommentVote)
.delete(deleteCommentById);


module.exports = commentRouter;