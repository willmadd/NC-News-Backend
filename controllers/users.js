const { User } = require("../models");

exports.getUser = (req, res, next) => {
  return User.findOne({ username: req.params.user }).then(userData => {
    res.status(200).send({ userData });
  });
};
