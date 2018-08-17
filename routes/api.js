const apiRouter = require('express').Router();
const {userRouter, articleRouter, commentRouter, topicRouter} = require('../routes');
const express = require('express');

apiRouter.use('/', express.static('public/api.html'));

apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/topics', topicRouter);

module.exports = apiRouter;