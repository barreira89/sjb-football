var express = require('express');
var router = express.Router();
var Picks = require('../models/picks');
var Schedule = require('../models/schedule');

//Returns all schedule Objects
router.get('/', function (req, res) {
	var query={};
	
	Schedule.find(query, function (err, docs) {
		if (err) {
			res.send(err);
		} else {
			res.send(docs);
		}
	})
});

router.get('/gamelist', function (req, res) {
	var gameList = [];
	
	Schedule.find(function (err, docs){
		if (err){
			return res.send(err);
		} else {
			//format to list of game objects
			docs.forEach(function (weekSchedule) {
				weekSchedule.games.forEach(function (game){
						game['weekNumber'] = weekSchedule.weekNumber;
						gameList.push(game);
				})
			})
			return res.json(gameList);
		}
		
		
	})
	
	
	
})

router.get('/:week', function (req, res) {
	var week = parseInt(req.params.week);
	Schedule.find({
		weekNumber : week
	}, function (err, docs) {
		if (err) {
			console.log(err);
			res.sendStatus(err);
		} else {
			res.send(docs);
		}
	});

});


router.post('/:week', function (req, res) {
	var scheduleObject = req.body;
	var week = parseInt(req.params.week);
	Schedule.findOneAndUpdate({
		weekNumber : week
	}, scheduleObject, function (err, docs) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	})
});

module.exports = router;