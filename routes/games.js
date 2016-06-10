var express = require('express');
var router = express.Router();
var Games = require('../models/games');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
	var query = {}
	query = buildQuery(req);
	if (req.query.weeklist) {
		Games.aggregate(
		[
			{$group: 
				{
					_id: null,
					weeks: {$addToSet: "$weekNumber"}
				}
			}
		], function (err, docs) {
			if (err)
				return res.send(err)

				return res.json(docs);
		});
	} else{
	
		Games.find(query, function (err, games){
			if(err) return res.send(err);
			
			return res.send(games);
			
		})
	}
	
})

router.post('/', function (req, res) {
	var mappedGame = bodyToGameMapper(req.body);
	newGame = new Games(mappedGame);
		
	newGame.save(function (err, doc) {
		if (err) {
			console.log(err);
			if (err.code == 11000) {
				res.status(400).json({
					"message" : "league already exists"
				});
			} else {
				res.sendStatus(500);
			}
		} else {
			res.send(doc);
		}
	})
})
router.put('/', function(req,res){
	//Check query for weeknumber
	
	if(req.query.weeknumber){
		if(Array.isArray(req.body)){
			var results = [];
			var recordsDone = 0;
			
			//Loop through each game in the array, add or update the game;
			for(var i = 0, len = req.body.length; i < len; i++){
				var currentGame = req.body[i];
				
				//check if it has an ID, if not assign
				if(!currentGame._id) currentGame._id = new mongoose.mongo.ObjectID();
				
				Games.findOneAndUpdate({_id:currentGame._id}, currentGame, {upsert:true, new:true}, function (err, doc){
					//Add Results to results array
					if (err){
						 results.push(err);
						 recordsDone ++;
					} else {
						results.push(doc);
						recordsDone ++;
					}
					//send when complete
					if(recordsDone == len){
						return res.send(results);
					}					
				})
			}
		}
	} else {
		return res.sendStatus(400);
	}
})


router.get('/:game_id', function (req, res){
	Games.findById({_id:req.params.game_id}, function (err, doc){
		if (err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json(doc);
		}
	});
})

router.put('/:game_id', function (req, res){
	Games.findById({_id:req.params.game_id}, function (err, game){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			var gameObj = bodyToGameMapper(req.body);
			
			game.home = gameObj.home;
			game.visitor = gameObj.visitor;
			game.winner = gameObj.winner;
			game.homescore = gameObj.homescore;
			game.visitscore = gameObj.visitscore;
			game.weekNumber = gameObj.weekNumber;
			game.season = gameObj.season;
			game.date = gameObj.date;
			game.time = gameObj.time;
			
			game.save(function(err, doc){
				if(err)
					res.sendStatus(500);
				
				res.json(doc);
			});
		}
	})
})



module.exports = router;

function gameMerge (gameFromDb, gameFromRequest){
	for (key in gameFromDb){
		if (gameFromRequest[key]) gameFromDb[key] = gameFromRequest[key];
	}
	return gameFromDb;
}

function buildQuery(req){
	query = {};
	if(req.query.weeknumber) query.weekNumber = req.query.weeknumber
	
	if(req.query.season) query.season = req.query.season
	
	if(req.query.home) query.home = req.query.home
	
	if(req.query.team){
		query.$or = [
			{home: req.query.team},
			{visitor: req.query.team}
		]	
	}
	
	return query
}



function bodyToGameMapper(requestBody) {
	return {
			home : requestBody.home,
			visitor : requestBody.visitor,
			winner: requestBody.winner,
			homescore: requestBody.homescore,
			visitscore: requestBody.visitscore,
			weekNumber: requestBody.weekNumber,
			season: requestBody.season,
			date: requestBody.date,
			time: requestBody.time
		}
}
