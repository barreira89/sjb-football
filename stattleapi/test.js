var translation = require('./gamesTranslation2016');
var fs = require('fs');
var weekResults = JSON.parse(fs.readFileSync('./weeks2-5.json'));
var season2016 = JSON.parse(fs.readFileSync('./season2016.json'));

console.log(season2016.length)
// weekResults.forEach(function(game){
//   console.log("SID | " + game.id);
//   console.log("footballId | " + translation.gameLookup(game.id));
// })

// week2.forEach(function(game){
//   console.log("Football ID " + game.id);
//   console.log("SID " + translation.gameLookup(game.id));
// })

//console.log(translation.gameLookup('577ab62ad180718c2ead30b5'));
