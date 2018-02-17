const request = require('request');
const config = require('../config.js');

let getReposByUsername = (/* TODO */username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  
  var callback = function (error, response, body) {
    console.log('error is ' + error);
    console.log('response is ' + response);
    console.log('body is ' + body);
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log('this is a response!!!');
    }
  }
  
  request(options, callback);

}

getReposByUsername('davidseid');

module.exports.getReposByUsername = getReposByUsername;