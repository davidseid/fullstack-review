const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error:'));
db.once('open', function() {
  console.log('connected!');
})

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  repo_name: String,
  user_name: String,
  url: String,
  description: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // query the database to see if the repo already exists
  // if it does exist, delete it (or overwrite it)


  Repo.find({id: repo.id}).exec((err, dbRepo) => {
    if (!err) {
      // delete the repo
      Repo.remove({id: repo.id}, (err) => {
        if (err) {
          console.log('error on removal');
        }
        var newRepo = new Repo({
          id: repo.id,
          repo_name: repo.name,
          user_name: repo.owner.login,
          url: repo.html_url,
          description: repo.description,
          forks_count: repo.forks_count
        });

        newRepo.save(function (err, newRepo) {
          if (err) return console.error(err);
          console.log('saved!');
        })
      });
    }
  })



}

let retrieve = (callback) => {

  Repo.find().limit(25).exec((err, repos) => {
    if (!err) {
      callback(repos);
    }
  })

  // send them back to the 
}

//save({id: 123, name: 'testName', owner: {login: 'testLogin'}, html_url: 'testURL', description: 'testDesc'});

module.exports.save = save;
module.exports.retrieve = retrieve;