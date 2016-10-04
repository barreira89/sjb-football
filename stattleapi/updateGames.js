var http = require('http');
var games = require('./season2016.js');
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

http.request({
	ho
})

function newRequest(gameId) {
	return http.request({
		hostname : '127.0.0.1',
		port : '3000',
		path : '/api/games/',
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		}
	}, function (res) {
		res.on('error', function (err) {
			console.log(err)
		})
	})
}

games.forEach(function(game){
	post_req = newRequest(game._id);
	post_req.write(JSON.stringify(game));
	post_req.end()
})

//post_req.end();
