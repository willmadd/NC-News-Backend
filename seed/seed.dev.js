const seedDB = require('./seed');
const mongoose = require('mongoose');
const {DB_URL} = require('../config');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const {articleData, commentData, topicData, usersData} = require(`./${process.env.NODE_ENV}-data`);


mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    return seedDB(articleData, commentData, topicData, usersData);
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .then(()=>{
    console.log(`disconnected from ${DB_URL}`);
  })
