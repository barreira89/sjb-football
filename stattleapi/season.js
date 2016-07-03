var fs = require('fs');
var lookup = require('./teamLookupFile')
var seasonFile = fs.readFileSync('season.json');

var season = JSON.parse(seasonFile);

//console.log(season.length);
var games = [];
season.forEach(game => {
  games.push(mapGame(game));
  console.log(mapGame(game));
})

fs.writeFile('2015results.js', JSON.stringify(games), function(err){});

function mapGame(externalGame){
  var dateObj = convertDate(externalGame['started_at'])
  return internalGame = {
    _id: lookup.games[createKey(externalGame)],
    visitor: lookup.teams[externalGame['away_team_id']],
    home: lookup.teams[externalGame['home_team_id']],
    weekNumber:externalGame['interval_number'],
    season: 2015,
    homescore: externalGame['home_team_score'],
    visitscore: externalGame['away_team_score'],
    winner: calculateWinner(externalGame['home_team_outcome']),
    date: dateObj.date,
    time: dateObj.time
  }
}

function calculateWinner(homeTeamOutcome){
  if(homeTeamOutcome == 'loss'){
    return 'visitor'
  } else {
    return 'home'
  }
}

function convertDate(dateValue){
  var returnDate = new Date(dateValue);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return {
    date: months[returnDate.getMonth()] + ' ' + returnDate.getDate(),
    time: returnDate.getTime()
  }
}

function createKey(externalGame){
  var away = lookup.teams[externalGame['away_team_id']];
  var home = lookup.teams[externalGame['home_team_id']];
  var week = externalGame['interval_number'];
  return home+away+week;

}
