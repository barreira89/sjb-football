//var http = require('http');
var cheerio = require('cheerio');
var request = require('request');


var url = 'http://espn.go.com/nfl/scoreboard/_/year/2015/seasontype/2/week/1';

request('http://espn.go.com/nfl/scoreboard/_/year/2015/seasontype/2/week/9', function(err, response, html){
	if(!err){

			console.log(html);
			
			var $ = cheerio.load(html);
			$(".total").each(function(){
				console.log(this);

			})
	}
})
//console.log(season.length);
// post_req.on('error', function (err){
	// console.log(err);

// })
//post_req.write(JSON.stringify(season[0]));
// console.log(JSON.stringify({"visitor":"DUMMY","home":"49ers","weekNumber":95,"season":2015,"date":"January 03rd","time":"4:25 PM ET "}));
// var x = newRequest();
// console.log(x);

//post_req.end();
