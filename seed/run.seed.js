const seedDB = require('./seed');
const mongoose = require('mongoose');
const {DB_URL} = require('../config');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let enviro = "";

if (process.env.NODE_ENV === 'test'){
  enviro = "test-data"
}else{
  enviro = "dev-data"
}

const {articleData, commentData, topicData, usersData} = require(`./${enviro}`);


mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    return seedDB(articleData, commentData, topicData, usersData);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`disconnected from ${DB_URL}`);
  })
