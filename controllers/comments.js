const { Comment } = require("../models");

exports.changeCommentVote = (req, res, next) => {
    let commentid = req.params.comment_id;
    let params = {};
    if (req.query.vote === "up") {
      params = { $inc: { votes: 1 } };
    } else if (req.query.vote === "down") params = { $inc: { votes: -1 } };
  
    Comment.findOneAndUpdate({ _id: commentid }, params, { new: true })
      .then(comment => {
        res.status(201).send({ comment });
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  exports.deleteCommentById = (req, res, next) => {
      console.log('cccccccccc');
      Comment.findOneAndDelete({_id: comment_id})
        .then(comment =>{
            console.log(comment);
            console.log('oooooooooooooooooo');
            res.status(204).send({message: 'Comment Deleted'})
        })
  }