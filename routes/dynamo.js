var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var ep = new AWS.Endpoint('http://localhost:8000');
// { endpoint: ep }
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
	dynamodb.listTables({}, function (err, data) {
		  if (err) console.log(err, err.stack);
		  else {    
			console.log(data);       
			res.body = data;
			res.status(200).send(data);
			}
	});
});

router.get('/createTable', function(req, res, next){
	var params = {
		TableName : "Steve",
		KeySchema: [       
			{ AttributeName: "year", KeyType: "HASH"},
			{ AttributeName: "title", KeyType: "RANGE" } 
		],
		AttributeDefinitions: [       
			{ AttributeName: "year", AttributeType: "N" },
			{ AttributeName: "title", AttributeType: "S" }
		],
		ProvisionedThroughput: {       
			ReadCapacityUnits: 10, 
			WriteCapacityUnits: 10
		}
	};
	
	
	dynamodb.createTable(params, function(err, data){
		if (err) console.log (err);
		else {console.log(data);
		res.sendStatus(200);}
	});
	
	
});

router.post('/createItem', function(req, res, next){
	var data = req.body;
	var title = req.query.title;
	var year = parseInt(req.query.year);
	
	var params = {
		TableName : "Steve",
		Item: {
			"year": year,
			"title": title,
			"info": data
		}
	};
	
	docClient.put(params, function(err, data){
		if (err) { 
			console.log (err);
			res.status(500).send(err);
		}
		else {
			console.log(data);
			res.status(200).send(data);
		}
	});
	
	
});

router.get('/listItems', function(req, res, next){
	var year = req.query.year;
	console.log(year);
	year = parseInt(year);
	console.log(typeof year);
	console.log(year);
	
	var params = {
		TableName : "Steve",
		KeyConditionExpression: "#yr = :yyyy",
		ExpressionAttributeNames:{
			"#yr": "year"
		},
		ExpressionAttributeValues: {
			":yyyy": year
		}
	};
	
	
	docClient.query(params, function(err, data){
		if (err) { 
			console.log (err);
			res.status(500).send(err);
		}
		else {
			console.log(data);
			res.status(200).send(data.Items);
		}
	});
	
	
});


module.exports = router;
	