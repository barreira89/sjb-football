var StattleShipAPI = require('node-stattleship');
var statapi = new StattleShipAPI('e71760929c96fada648f5179b1935957');
var fs = require('fs');

var params = {
	season_id: 'nfl-2016-2017'
}


statapi.games('football', 'nfl', params).then(function(games){
	fs.writeFile('season2016.json', JSON.stringify(games), function(err, sucess){
		if(!err) console.log('Saved!')

	})

	//console.log(games);
}).catch(function(err){
	console.log(err);
})