const articleRouter = require('express').Router();
const {getArticle, getArticleById, getCommentsByArticleId, postCommentsByArticleId, changeArticleVote} = require('../controllers/articles')

articleRouter.route('/')
.get(getArticle);

articleRouter.route('/:article_id')
.get(getArticleById)
.put(changeArticleVote);

articleRouter.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(postCommentsByArticleId);

module.exports = articleRouter;