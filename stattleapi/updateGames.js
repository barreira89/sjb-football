var http = require('http');

var games = require('./season2016.js');

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
