var fs = require('fs');
var season2016 = JSON.parse(fs.readFileSync('season2016.json'));
var localSeason2016 = JSON.parse(fs.readFileSync('2016games.json'));
var teamLookUp = require('./teamLookupFile');
var lookup = {}
var translation = {}

//home+away+week => stattle id
season2016.forEach(game => {
  var home = lookupTeam(game.home_team_id);
  var away = lookupTeam(game.away_team_id);
  var week = game.interval_number;
  var key = home+away+week;
  lookup[key] = game.id;
})

//home+away+week => local id
localSeason2016.forEach(game =>{
  var home = game.home;
  var away = game.visitor;
  var week = game.weekNumber;
  var lookupKey = home+away+week;
  translation[game._id] = lookup[lookupKey];
})

fs.writeFile('season2016translation.json', JSON.stringify(translation), 'utf-8', function (err){
  if(!err) console.log('Wrote');
})

module.exports = translation;

function lookupTeam (teamId){
  return teamLookUp.teams[teamId];
}
