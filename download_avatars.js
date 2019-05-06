var token = require('./secrets.js');
var request = require('request');
var fs = require('fs');
var owner = process.argv[2]; //Taking the user input from node
var name = process.argv[3];
console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',  //setting up my user agent header as well as my authetication code
      'Authorization': token.GITHUB_TOKEN
    }
  }
  request(options, function(err, res, body){
    cb(err,body);
  });

}

function downloadImageByURL(url, filePath){//helper function that saves the file onto the path
  request.get(url)
         .on('error', function(err){
          throw err;
         })
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, name, function(err, result){
    var data = JSON.parse(result); //parse the JSON object into regular JS objects
    if(process.argv.length < 4){ //incase the user inputs only one item
      throw "Please enter a valid owner and repo name";
    };
    data.forEach(function(user){//runs through each element of the array
     path = user.login +'.jpg';  //creating the file into jpg format
     downloadImageByURL(user.avatar_url, path); //calls the helper function with the parsed values
    });
});