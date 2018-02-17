

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

console.log('is my server stopping here');

app.use(bodyParser.json());

app.post('/repos', function (req, res, next) {

  console.log(req.body.data);
  getReposByUsername(req.body.data, (response) => {
    res.send('Received your post request');
    next();
  });
});

app.get('/repos', function (req, res) {

  db.retrieve((repos) => {
    console.log('here im accessing my fetched repos on the server itself');
    res.send(repos);
  })
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

