const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error:'));
db.once('open', function() {
  console.log('connected!');
})

let repoSchema = mongoose.Schema({
  id: Number,
  repo_name: String,
  user_name: String,
  url: String,
  description: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);


//TOBY RECOMENDS refactoring this to take in multiple and handle that *somehow (hint: Promise.all())*
let save = (repo) => {
  Repo.find({id: repo.id}).exec((err, dbRepo) => {
    if (!err) {
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

  Repo.find().limit(25).sort('-forks_count').exec((err, repos) => {
    if (!err) {
      callback(repos);
    }
  })

}

module.exports.save = save;
module.exports.retrieve = retrieve;