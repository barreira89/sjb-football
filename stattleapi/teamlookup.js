var fs = require('fs');
var teamFile = fs.readFileSync('teams.json');
var teams = JSON.parse(teamFile);

var lookup = {};

teams.forEach(team => {
  lookup[team.id] = team.nickname;
})

fs.writeFile('teamLookupFile.js', JSON.stringify(lookup), function(err){
  console.log('saved!');
})
