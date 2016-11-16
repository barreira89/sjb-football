var express = require('express');
var router = express.Router();
var Games = require('../models/games');
var mongoose = require('mongoose');
var fieldList = {
    'home': 0,
    'visitor': 0,
    'winner': 0,
    'homescore': 0,
    'visitscore': 0,
    'weekNumber': 0,
    'season': 0,
    'date': 0,
    'time': 0
};
var mapper = require('./utils').bodyToModel(fieldList);
var gamesApi = require('./gamesApi');


router.get('/weeklists', (req, res) =>{
  gamesApi.getWeekList((err,weekList)=>{
    if(err) return res.send(err);

    return res.json(weekList);
  })
})

router.get('/', function(req, res) {
    var query = {}
    query = buildQuery(req);
    Games.find(query, (err, games) => {
            if (err) return res.send(err);

            return res.send(games);
    })

})

router.post('/', function(req, res) {
    var mappedGame = mapper(req.body);
    newGame = new Games(mappedGame);

    newGame.save(function(err, doc) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send(doc);
        }
    })
})

router.put('/', function(req, res) {

    if (req.query.weeknumber) {
        if (Array.isArray(req.body)) {
            var results = [];
            var recordsDone = 0;

            //Loop through each game in the array, add or update the game;
            for (var i = 0, len = req.body.length; i < len; i++) {
                var currentGame = req.body[i];

								currentGame._id = setId(currentGame);

                Games.findOneAndUpdate({_id: currentGame._id}, currentGame, {upsert: true, new: true}, function(err, doc) {

                    err ? results.push(err) : results.push(doc);
										recordsDone ++;

                    if (recordsDone == len) {
                        return res.send(results);
                    }
                })
            }
        }
    } else {
        return res.sendStatus(400);
    }
})

router.get('/:game_id', function(req, res) {
    Games.findById({_id: req.params.game_id}, function(err, doc) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(doc);
        }
    });
})

router.put('/:game_id', function(req, res) {
    Games.findById({_id: req.params.game_id}, function(err, game) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var updatedGame = mapper(req.body, game);

            updatedGame.save(function(err, doc) {
                if (err)
                    res.sendStatus(500);

                res.json(doc);
            });
        }
    })
})

module.exports = router;

function setId(gameObject){
	return gameObject._id || new mongoose.mongo.ObjectID();
}

function aggregateQuery() {
  return [{
        $group: {
            _id: null,
            weeks: {
                $addToSet: "$weekNumber"
            }
        }
    }]
}

function buildQuery(req) {
    query = {};
    if (req.query.weeknumber) query.weekNumber = req.query.weeknumber

    if (req.query.season) query.season = req.query.season

    if (req.query.home) query.home = req.query.home

    if (req.query.team) {
        query.$or = [{
            home: req.query.team
        }, {
            visitor: req.query.team
        }]
    }

    return query
}
