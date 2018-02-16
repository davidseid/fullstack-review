const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use((req, res, next) => {
  console.log(`${req.method} request received to ${req.url}`);
  next();
});

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  res.send('Received your request!!');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

