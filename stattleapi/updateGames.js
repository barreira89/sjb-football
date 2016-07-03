var http = require('http');

var games = require('./2015results.js');

function newRequest(gameId) {
	return http.request({
		hostname : '127.0.0.1',
		port : '3000',
		path : '/api/games/' + gameId,
		method : 'PUT',
		headers : {
			'Content-Type' : 'application/json'
		}
	}, function (res) {
		res.on('error', function (err) {
			console.log(err)
		})
	})
}
//console.log(season.length);
// post_req.on('error', function (err){
	// console.log(err);

// })
//post_req.write(JSON.stringify(season[0]));
// console.log(JSON.stringify({"visitor":"DUMMY","home":"49ers","weekNumber":95,"season":2015,"date":"January 03rd","time":"4:25 PM ET "}));
// var x = newRequest();
// console.log(x);


games.forEach(function(game){
	post_req = newRequest(game._id);
	post_req.write(JSON.stringify(game));
	post_req.end()
})

//post_req.end();
