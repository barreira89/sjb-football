var express = require('express');
var router = express.Router();
var Picks = require('../models/picks');
var Accounts = require('../models/account');
var mongoose = require('mongoose');
var fieldList = {
		username : 0,
		week : 0,
		userId: 0,
		picks : 0,
		winner : 0,
		game : 0,
		season : 0
}
var mapper = require('./utils').bodyToModel(fieldList);

router.get('/', function (req, res) {
	var query = buildQuery(req);

	Picks.find(query, function (err, docs){
		if (err) return res.sendStatus(404);

		return res.json(docs);
	});
})

router.put('/', function (req, res){
	var query = {}

	if(req.query.username && req.query.week){

		if(Array.isArray(req.body)){
			var results = [];
			var recordsDone = 0;
			for(var i = 0, len = req.body.length; i < len; i++){
				var currentPick = req.body[i];

				if(!currentPick._id) currentPick._id = new mongoose.mongo.ObjectID();

				Picks.findOneAndUpdate({_id:currentPick._id}, currentPick, {upsert:true, new:true}, function (err, doc){
					if (err){
						 results.push(err);
						 recordsDone ++;
					} else {
						results.push(doc);
						recordsDone ++;
					}
					if(recordsDone == len){
						return res.send(results);
					}
				})
			}
			console.log(results);
			//return res.send(results);
		} else {

		}
		//err should be
	} else {
		return res.sendStatus(400);
	}
})
router.get('/with', function (req, res) {
	var query = buildQuery(req);

		Picks
		.find(query)
		.populate('game')
		.exec(function (err, pick) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				if (pick)
					return res.json(pick);

				return res.sendStatus(404);
			}
		});

})

router.get('/withGame/:pick_id', function (req, res) {
	var query = buildQuery(req);

		Picks
		.findOne({_id : req.params.pick_id})
		.populate('picks.game')
		.exec(function (err, pick) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				if (pick)
					return res.json(pick);

				return res.sendStatus(404);
			}
		});

})

router.post('/', function (req, res) {
	var mappedPick = mapper(req.body, {});
	newPick = new Picks(mappedPick);

	newPick.save(function (err, pick) {
		if (err) {
			console.log(err);
			if (err.code == 11000) {
				res.status(400).json({
					"message" : "already exists"
				});
			} else {
				res.sendStatus(500);
			}
		} else {
			res.location('api/picks/'+ pick._id);
			res.status(201).json(pick);
		}
	})
})

router.get('/:pick_id', function (req, res){
	Picks.findOne({_id:req.params.pick_id}, {_id:0}, function (err, pick){
		if (err){
			console.log(err);
			res.sendStatus(500);
		} else {
			if(pick)
				return res.json(pick);

			return res.sendStatus(404);
		}
	});
})

router.put('/:pick_id', function(req, res) {

    Picks.findOne({_id: req.params.pick_id}, function(err, pick) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            updatedPick = mapper(req.body, pick);
            updatedPick.save(function(err, doc) {
                if (err) {
                    console.log("Error Saving Update");
                    return res.send(err);
                }
                return res.json(doc);
            });
        }
    })
})

module.exports = router;

function buildQuery (request){
	var query = {}

	if (request.query.username)
		query.username = request.query.username;

	if (request.query.userid)
		query.user = request.query.userid;

	if (request.query.season)
		query.season = request.query.season;

	if(request.query.week)
		query.week = request.query.week;

	return query;
}


function bodyToPickMapper(requestBody) {
	return {
			username : requestBody.username,
			week : requestBody.week,
			picks: requestBody.picks,
			userId: requestBody.userId,
			game: requestBody.game,
			winner: requestBody.winner,
			season: requestBody.season
		}
}
