var express = require('express');
var router = express.Router();
var Leagues = require('../models/leagues');
var Accounts = require('../models/account');
var Picks = require('../models/picks');
var Games = require('../models/games');

router.get('/', function(req, res) {
    var query = {}
    if (req.query.username) {
        query = {
            users: req.query.username
        }
    }

    Leagues
        .find(query)
        .populate('userIds')
        .exec(function(err, docs) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(docs);
            }
        });
})

router.post('/', function(req, res) {
    var mappedLeague = bodyToLeagueMapper(req.body);
    newLeauge = new Leagues(mappedLeague);

    newLeauge.save(function(err, doc) {
        if (err) {
            console.log(err);
            if (err.code == 11000) {
                res.status(400).json({
                    "message": "league already exists"
                });
            } else {
                res.sendStatus(500);
            }
        } else {
            res.send(doc);
        }
    })
})

router.get('/:league_id', function(req, res) {
    Leagues.findById({
        _id: req.params.league_id
    }, function(err, doc) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(doc);
        }
    });
})

router.get('/:league_id/summary', function(req, res) {
    var query = {
        _id: req.params.league_id
    }
    Leagues
        .find(query)
        .exec(function(err, leagues) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                var userNameList = leagues[0].users;
                var pickQuery = {
                    username: {
                        $in: userNameList
                    }
                };

                Picks
										.find(pickQuery)
                    .populate('game')
                    .exec(function(err, picks) {
                        if (err) return res.send(err);

                        var outArray = [];

                        calculateWinners(picks);

                        var reducedWeeks = reducePicksToWeeks(picks)

                        outArray = resultsToArray(reducedWeeks);

                        return res.json(outArray);

                    })
            }
        })
})
function calculateWinners(picks){
	picks.forEach(function(pick) {
					var currentGame = pick.game;

					if (currentGame && currentGame.winner) {
							pick.result = (currentGame.winner == pick.winner) ? 'WIN' : 'LOST';
					}
			})
}

function reducePicksToWeeks(picks){
	return picks.reduce(function(prev,current){
			if(!prev[current.week]) prev[current.week] = []

			prev[current.week].push(current)

			return prev;
	},{})

}

function mapUsersToResult(picks){
	return picks.map(function(pick){
		var result = pick.result || 'Not Set';
		return {username:pick.username, result: result}
	})

}

function reduceToSummary(mappedPicks){
	return mappedPicks.reduce(function(prev, current){
		if(!prev[current.username])
			prev[current.username] = {wins:0, losses:0, notset:0}

		if(current.result == 'WIN')
			prev[current.username].wins ++;

		if(current.result == 'LOST')
			prev[current.username].losses ++;

		if(current.result == 'Not Set')
			prev[current.username].notset ++;

		return prev;
	},{})


}

function resultsToArray(weekSummaryObj){
	var output = [];
	for(week in weekSummaryObj){
		var currentWeekPicks = weekSummaryObj[week];

		var mappedWeek = mapUsersToResult(currentWeekPicks);
		var reducedWeek = reduceToSummary(mappedWeek);
		output.push({week:week, results: userResultToArray(reducedWeek)});
	}
	return output;
}

function userResultToArray(resultObj){
	var outArray = []
	for (key in resultObj){
		outArray.push({username: key, wins: resultObj[key].wins, losses: resultObj[key].losses})
	}
	return outArray;
}

router.put('/:league_id', function(req, res) {
    Leagues.findById({
        _id: req.params.league_id
    }, function(err, league) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
						mappedLeague = bodyToLeagueMapper(req.body);
						league.users = mappedLeague.users;
            league.name = mappedLeague.name;

            league.save(function(err, doc) {
                if (err)
                    res.sendStatus(500);

                res.json('updated');
            });
        }
    })
})

module.exports = router;

function bodyToLeagueMapper(requestBody) {
    return {
        name: requestBody.name,
        users: requestBody.users
    }
}
