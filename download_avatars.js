var token = require('./secrets.js');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  }
  request(options, function(err, res, body){
    cb(err,body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result){
    var data = JSON.parse(result);
    data.forEach(function(user){
      console.log(user.avatar_url);
    })
});


/* var token = require('./secrets.js');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader');

function printBody(err, response, body){
  console.log(body);
}
function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    header: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };
    request.get(options.url, printBody);

}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors: ", err);
  console.log("Result: ", result);
});

*/