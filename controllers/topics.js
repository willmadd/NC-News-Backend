const { Article, Topic } = require("../models");
const  {checkTopicandCreateIfNonExists}  = require("./utils");

exports.getTopics = (req, res, next) => {
  return Topic.find().then(topicData => {
    res.status(200).send({ topicData });
  });
};

exports.getArticlesByTopic = (req, res, next) => {
  let topicName = req.params.topic_slug;
  return Article.find({ belongs_to: topicName }).then(topicData => {
    if (topicData.length === 0){
      res.status(400).send({message: 'There are no articles for this topic'})
    }else{
      res.status(200).send({ topicData });
    }
    
  });
};

exports.postArticlesByTopic = (req, res, next) => {
  let insertArticle = {
    title: req.body.title,
    body: req.body.body,
    belongs_to: req.params.topic_slug
  };


  checkTopicandCreateIfNonExists(insertArticle.belongs_to);

  Article.create(insertArticle).then(article => {
    res.status(201).send({ article });
  });
};
