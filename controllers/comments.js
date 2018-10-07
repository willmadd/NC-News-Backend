const { Comment } = require("../models");

exports.changeCommentVote = (req, res, next) => {
    let commentid = req.params.comment_id;
    let params = {};
    if (req.query.vote === "up") {
      params = { $inc: { votes: 1 } };
    } else if (req.query.vote === "down") params = { $inc: { votes: -1 } };
  
    Comment.findOneAndUpdate({ _id: commentid }, params, { new: true })
    .populate("created_by")
      .then(comment => {
        res.status(201).send({ comment });
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  exports.deleteCommentById = (req, res, next) => {
    let commentid = req.params.comment_id;
    Comment.findOneAndDelete({_id: commentid})
    .then(comment =>{
      console.log(comment);

            res.status(201).send({message: 'Comment Deleted', deletedComment: comment})
        })
        .catch(err => {
            res.status(404).send({ message: err.message });
          });
  }