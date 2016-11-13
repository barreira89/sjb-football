var StattleShipAPI = require('node-stattleship');
var statapi = new StattleShipAPI('e71760929c96fada648f5179b1935957');
var fs = require('fs');
var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('finished', function(){
	fs.writeFile('test.json', JSON.stringify(weeks), 'utf-8', function(err){
		if(!err) console.log('Saved');
	})
})
var params = {
	week: 3,
	season_id: 'nfl-2016-2017'
}

var weeks = [];

for (var i = 2; i < 6; i++) {
		params.week = i;
		var weekNumber = 2;

    statapi.games('football', 'nfl', params).then(function(games) {
				games.forEach(function(game){
					weeks.push(game);
				})

				if(weekNumber == 5){
					emitter.emit('finished');
				}
				weekNumber ++;

    }).catch(function(err) {
        console.log(err);
    })
}
