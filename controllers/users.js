const { User } = require("../models");

exports.getUser = (req, res, next) => {
  return User.findOne({ username: req.params.user }).then(userData => {
    res.status(200).send({ userData });
  });
};

exports.getAllUsers = (req, res, next) => {
  console.log('hello')
  return User.find().then(users => {
    console.log(users);
    res.status(200).send({ users });
  });
};



exports.createUser=(req,res,next) => {
  let insertUser = {
    name: req.body.name,
    username: req.body.username,
    avatar_url: req.body.avatar_url,
  }
console.log(insertUser)

User.create(insertUser).then(user => {
  res.status(201).send({ user });
});

}