var express = require('express');
var router = express.Router();
var Leagues = require('../models/leagues');
var Accounts = require('../models/account');
var Games = require('../models/games');
var pickApi = require('./pickQuery');

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
                if(err.name == 'CastError') return res.sendStatus(404);

                res.sendStatus(500);
            } else {
                var league = leagues[0];
                if(!league) return res.sendStatus(404);

                var userNameList = league.users;

                pickApi.getUserSummary(userNameList, function(err, userSummary){
                  if(err) return res.sendStatus(500);

                  return res.json(userSummary);
                })

            }
        })
})

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
