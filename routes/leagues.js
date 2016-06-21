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

router.get('/:league_id/weeksummary', function(req, res) {
    /**
     *TODO Refactor this
     *
     * 1. Get the League
     * 2. For Each User in the league, get all their picks
     * 3. For all their picks, get the game and check if they won
     */

    var query = {
        _id: req.params.league_id
    }

    Leagues
        .find(query)
        .populate('userIds')
        .exec(function(err, docs) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                //For Each User, get their Picks, group the picks by week, calculate the total

                //For Each League, Get all the users

								//TODO Remove Loop and use array as part of query

                docs.forEach(function(league) {
                    var userIds = league.userIds;
										var usernameList = league.userIds.map(function(data){
											return data.username;
										})

										console.log(idList);

                    var externalObj = {},
                        externalArray = [];


										//With array

                    userIds.forEach(function(userId, index) {
                        var query = {
                            username: {$in: usernameList}
                        };
                        //For Each User, get all their picks;

                        Picks.find(query)
														//.where('username').in(idList)
                            .populate('game')
                            .exec(function(err, picks) {
                                if (err) return res.send(err);

																console.log(picks.length);

                                picks.forEach(function(pick) {
                                        var currentGame = pick.game;

                                        if (currentGame && currentGame.winner) {
                                            pick.result = (currentGame.winner == pick.winner) ? 'WIN' : 'LOST';
                                        }
                                    })
                                    /*

                                    					{ createdAt: 2016-06-19T03:12:23.355Z,
                                    						__v: 0,
                                    						game:
                                    						 { homescore: 45,
                                    							 visitscore: 50,
                                    							 winner: 'visitor',
                                    							 __v: 0,
                                    							 time: '1:00 PM ET ',
                                    							 date: 'September 20th',
                                    							 season: 2015,
                                    							 weekNumber: 2,
                                    							 visitor: 'Falcons',
                                    							 home: 'Giants',
                                    							 _id: 574098823af17938247ac5a5 },
                                    						username: 'test456',
                                    						week: 2,
                                    						winner: 'home',
                                    						updatedAt: 2016-06-19T03:12:23.355Z,
                                    						_id: 57660d97893085f42b3e79ab,
                                    						result: 'LOST' },
                                    */


                                var externalShape = picks.reduce(function(prev, current) {

                                    //Check to see if
                                    var week = current.week;
                                    var game = current.game;

                                    prev.push({
                                        week: current.week,
                                        username: current.username,
                                        result: current.result
                                    });
                                    return prev;
                                }, [])

                                externalArray = externalArray.concat(externalShape);

                                if (index == userIds.length - 1) {
                                    var reduced = externalArray.reduce(function(prev, current) {
                                        var currentWeek = current.week,
                                            username = current.username;
                                        prev[currentWeek] = prev[currentWeek] || {};

                                        var currentHash = prev[currentWeek];

                                        currentHash[username] = currentHash[username] || {
                                            results: {
                                                wins: 0,
                                                losses: 0
                                            }
                                        };


                                        if (current.result == 'WIN') currentHash[username].results.wins++;

                                        if (current.result == 'LOST') currentHash[username].results.losses++;

                                        return prev;
                                    }, {})

                                    var outputArray = []

																		//Take look up and format as array;
																		//TODO Move to function;
																		//For Each Week
																		for (week in reduced) {
                                        var innerArray = []

																				//Creat an array of user
                                        for (user in reduced[week]) {
                                            innerArray.push({
                                                username: user,
                                                wins: reduced[week][user]['results']['wins'],
                                                losses: reduced[week][user]['results']['losses']
                                            })
                                        }
                                        outputArray.push({
                                            week: week,
                                            results: innerArray
                                        })
                                    }

                                    return res.json(outputArray);

                                }

                            })
                    })
                })
            }
        })
});

router.put('/:league_id', function(req, res) {
    Leagues.findById({
        _id: req.params.league_id
    }, function(err, league) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            league.users = bodyToLeagueMapper(req.body).users;
            league.name = bodyToLeagueMapper(req.body).name;

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
