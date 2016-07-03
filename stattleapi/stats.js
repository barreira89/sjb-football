var StattleShipAPI = require('node-stattleship');
var statapi = new StattleShipAPI(config.statapikey);
var fs = require('fs');

var params = {
	season_id: 'nfl-2015-2016'
}


statapi.games('football', 'nfl', params).then(function(games){
	fs.writeFile('season.json', JSON.stringify(games), function(err, sucess){
		if(!err) console.log('Saved!')

	})

	//console.log(games);
}).catch(function(err){
	console.log(err);
})
