var http = require('http');
var games = require('./season2016.js');
var request = require('request');
var translate = require('./gamesTranslation2016');
var fs = require('fs')

//Refactor this:
var stattleGameData = JSON.parse(fs.readFileSync('./weeks2-5.json'));
var lookup = stattleGameData.reduce(function(previous, current){
	previous[current.slug] = current;
	return previous;
}, {})
//
/*
	1. Select Local Games to Update (Manually? By week?)
	2. Get Local Game (GET)
	2. Call Stattle api (GET)
	3. Get Updated Values (Code)
	4. Update Local Game with new values (PUT)
*/

var weekToUpdate = 1;
var season = 2016;
var weekGames = [];

request.get({
		uri: 'http://127.0.0.1:3000/api/games?='+weekToUpdate +'&season=' + season
}, function(error, response, body){
	if(body){
		body = JSON.parse(body);
		body.forEach(function(game){
			var updatedData = getUpdatedGameData(game.id);

			var slug = updatedData && updatedData.slug || 'no slug'

			weekGames.push({gameId: game.id, slug: slug})

			//weekGames.push({steve: game.id, stattle: translate.gameLookup(game.id)});
		})
		console.log(weekGames);
	}
	//console.log(weekGames)
})


function getUpdatedGameData(gameId){
	var stattleId = translate.gameSlugLookUp(gameId);
	return lookup[stattleId];
}

function updateGameData(existingGame, updateValues){

	//Update fields for game object with values from Stattle Game

	return existingGame;
}
