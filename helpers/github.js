const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

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

    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log('the number of repos is ', info.length)

      for (var i = 0; i < info.length; i++) {
        db.save(info[i]);
      }

    }
  }
  
  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;