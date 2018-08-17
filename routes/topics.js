const topicRouter = require('express').Router();
const {getTopics, getArticlesByTopic, postArticlesByTopic} = require('../controllers/topics');

topicRouter.route('/')
.get(getTopics)

topicRouter.route('/:topic_slug/articles')
.get(getArticlesByTopic)
.post(postArticlesByTopic)

module.exports =topicRouter;