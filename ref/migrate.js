var mongoose = require('mongoose');
var Accounts = require('../models/account');
var dbs = {
	db1: '127.0.0.1:27017/nodetest1',
	db2: 'localhost:4321/nodetest1'
}


var data = {
	one : mongoose.createConnection(dbs.db1, function (err) {
		if (err) {
			console.log("DB1:" + err);
		}
	}),
	two : mongoose.createConnection(dbs.db2, function (err) {
		if (err)
			console.log("DB2: " + err);
	})
}

//migrate accounts
var Acct1 = data.one.model('Account', Accounts);
var Acct2 = data.two.model('Account', Accounts);

Acct1.find({}, function (err, docs) {
	if (!err) {
		docs.forEach(function (doc) {
			Acct2.create(doc, function (err, result) {
				if (err)
					console.log(err)
			})
		})
	}
});

Acct2.find({},function(err,docs){
	if (!err){
		console.log(docs);
	}
})
