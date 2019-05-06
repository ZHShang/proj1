var token = require('./secrets.js');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    header: {
      'User-Agent': 'request'
    }
};
  request(options, function(err, res, body){
    cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors: ", err);
  console.log("Result: ", result);
});

