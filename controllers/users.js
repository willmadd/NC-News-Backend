const { User } = require("../models");

exports.getUser = (req, res, next) => {
  return User.findOne({ username: req.params.user })
  .then(userData => {
    res.status(200).send({ userData });
  })
  .catch(err=>{
    res.status(404).send({message: err.message})
  });
};

exports.getAllUsers = (req, res, next) => {
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
User.create(insertUser).then(user => {
  res.status(201).send({ user });
});

}