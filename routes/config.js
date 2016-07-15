var express = require('express');
var router = express.Router();
var Config = require('../models/configurations');

router.get('/', function (req, res) {
	var query = buildQuery(req);

	Config.find(query, function (err, docs){
		if (err) return res.sendStatus(404);

		return res.json(docs);
	});
})
router.get('/:id', function (req, res){
	Config.findById(req.params.id, function(err, config){
		if (err) return res.send(err);

		return res.json(config);
	})
})
router.put('/:id', function (req, res){
	Config.findById({_id:req.params.id}, function(err, config){
		if (err) return res.send(err);

		config.currentSeason = req.body.currentSeason;
		config.save(function(err, result){
			if(err) return res.send(err)

			return res.sendStatus(200);
		})


	})


})

function buildQuery (request){
	var query = {}
	if(request.query.name)
		query.configName = request.query.name

	return query;
}
module.exports = router;
