var express = require('express');
var router = express.Router();
var Games = require('../models/games');
var gamesApi = require('./gamesApi');

router.get('/weeklists', (req, res) => {
    gamesApi.getWeekList((err, weekList) => {
        if (err) return res.send(err);

        return res.json(weekList);
    })
})

router.get('/', (req, res) => {
    query = buildQuery(req);
    Games.find(query, (err, games) => {
        if (err) return res.send(err);

        return res.send(games);
    })

})

router.post('/', (req, res) => {
    var mappedGame = Games.mapper(req.body);
    newGame = new Games(mappedGame);

    newGame.save(function (err, doc) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send(doc);
        }
    })
})

router.put('/', (req, res) => {
    gamesApi.updateListOfGames(req.body, (err, results) => {
        if (err) return res.send(err);

        return res.json(results);
    })
})

router.get('/:game_id', (req, res) => {
    Games.findById({
        _id: req.params.game_id
    }, function (err, doc) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(doc);
        }
    });
})

router.put('/:game_id', (req, res) => {
    Games.findById({
        _id: req.params.game_id
    }, (err, game) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var updatedGame = Games.mapper(req.body, game);

            updatedGame.save((err, doc) => {
                if (err)
                    res.sendStatus(500);

                res.json(doc);
            });
        }
    })
})

module.exports = router;

function setId(gameObject) {
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
