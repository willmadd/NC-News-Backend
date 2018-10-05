const { Article, Comment,User } = require("../models");

exports.getArticle = (req, res, next) => {
  return Article.find()
    .populate("created_by")
    .lean()
    .then(articleData => {
      let commentPromises = articleData.map((article, index) => {
        return Comment.countDocuments({ belongs_to: article._id });
      });
      return Promise.all([articleData, ...commentPromises]);
    })
    .then(([articles, ...commentCount]) => {
      let articlesWithCommentCount = articles.map((article, index) => {
        return {
          ...article,
          comment: commentCount[index]
        };
      });

      res.status(200).send({ articlesWithCommentCount });
    });
};

exports.getArticleById = (req, res, next) => {
  let articleId = req.params.article_id;

  return Article.findOne({ _id: articleId })
  .populate("created_by")
  .lean()
    .then(articleData => {
        res.status(200).send({ articleData });
    })
    .catch(err => {
      // console.log(err)
      res.status(404).send({ message: err.message });
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  return Comment.find({ belongs_to: req.params.article_id })
  .populate("created_by")
  .populate("belongs_to")
    .then(commentData => {
      if (commentData.length === 0) {
        res.status(400).send({ message: "No article exists with this ID" });
      } else {
        res.status(200).send({ commentData });
      }
    })
    .catch(err => {
      res.status(404).send({ message: err.message });
    });
};

exports.postCommentsByArticleId = (req, res, next) => {
  if (req.params.article_id.length !== 24) {
    res.status(400).send({ message: "invalid format for Object Id" });
  } else {
    return Article.findById({ _id: req.params.article_id }).then(article => {
      if (!article) {
        res.status(404).send({ message: "article not found" });
      } else {
        let insertComment = {
          body: req.body.body,
          belongs_to: req.params.article_id,
          created_by: req.body.created_by
        };
        return Comment.create(insertComment)
        .then(comment => {

          return User.populate(comment, {path: "created_by",model:'users'})
            
          }).then(comment => res.status(201).send({ comment }))
          .catch(err => {
            res.status(404).send({ message: err.message });
          });
      }
    });
  }
};

exports.changeArticleVote = (req, res, next) => {
  let articleid = req.params.article_id;
  let params = {};
  if (req.query.vote === "up") {
    params = { $inc: { votes: 1 } };
  } else if (req.query.vote === "down") params = { $inc: { votes: -1 } };

  Article.findOneAndUpdate({ _id: articleid }, params, { new: true })
  .populate("created_by")


  
  .then(article => {

      res.status(201).send({ article });
    
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
};
