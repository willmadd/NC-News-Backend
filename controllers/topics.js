const { Article, Topic, Comment } = require("../models");
const  {checkTopicandCreateIfNonExists}  = require("./utils");

exports.getTopics = (req, res, next) => {
  return Topic.find().then(topicData => {
    res.status(200).send({ topicData });
  });
};

exports.getArticlesByTopic = (req, res, next) => {
  let topicName = req.params.topic_slug;
  return Article.find({ belongs_to: topicName })
  .populate("created_by")
  .lean()
  .then(topicData => {

    let commentPromises = topicData.map((article) => {
      return Comment.countDocuments({ belongs_to: article._id });
    });
    return Promise.all([topicData, ...commentPromises]);
  })
  .then(([articles, ...commentCount]) => {
    let topicData = articles.map((article, index) => {
      return {
        ...article,
        comment: commentCount[index]
      };
    });


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
