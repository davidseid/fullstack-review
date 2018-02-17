

const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser')
const {getReposByUsername} = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use((req, res, next) => {
  console.log(`${req.method} request received to ${req.url}`);
  next();
});

app.use(bodyParser.json())

app.post('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  //console.log('this is my request body ', req.body);

  console.log(req.body.data);
  getReposByUsername(req.body.data);

  // I Should send a proper response here
  res.send('Received your post request!!');
  next();
});

app.get('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  // query the database 
  // send back 
  db.retrieve((repos) => {
    console.log('here im accessing my fetched repos on the server itself', repos);
  })

  // db.Repo.find().limit(25).exec((err, repos) => {
  //   if (!err) {
  //     console.log('here are the repos from the database', repos);
  //   }
  // });
  res.send();
  next();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

