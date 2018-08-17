const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const { formatArticle, formatComment } = require("../utils");

const seedDB = (articleData, commentData, topicData, usersData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        User.insertMany(usersData),
        Topic.insertMany(topicData)
      ]).then(([usersDocs, topicDocs]) => {
        return Promise.all([
          Article.insertMany(formatArticle(articleData, usersDocs)),
          usersDocs,
          topicDocs
        ]);
      });
    })
    .then(([articleDocs, usersDocs, topicDocs]) => {
      return Promise.all([
        articleDocs,
        Comment.insertMany(formatComment(commentData, articleDocs, usersDocs)),
        topicDocs,
        usersDocs
      ]) 
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = seedDB;
