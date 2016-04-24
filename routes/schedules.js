var express = require('express');
var router = express.Router();
var Picks = require('../models/picks');
var Schedule = require('../models/schedule');

//Returns all schedule Objects
router.get('/', function (req, res) {
	Schedule.find(function (err, docs) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.send(docs);
		}
	})
});


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