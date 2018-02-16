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
  repo: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (id, repoAsJSON) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var newRepo = new Repo({
    id: id,
    repo: repoAsJSON
  });
}

save(12345, '{"test":"repo"}');
module.exports.save = save;