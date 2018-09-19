const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const apiRouter = require('./routes/api');
const {DB_URL} = require('./config');
const mongoose = require('mongoose');
// const allowDataBase = require('./utils')

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to DB')
  })
  app.use((req, res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  });

app.use(bodyParser.json());

app.use('/api', apiRouter)
app.use('/', express.static('public/'));

app.use((err, req, res, next) => {
  if (err.status === 404) {
      res.status(404).send({message:'Page not found'})
  }
})

app.use((err, req, res, next) => {
  res.status(500).send({message: 'Internal server error', error: err.error})
})


module.exports = app;