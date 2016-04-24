var Schedule = require('./schedule');
var scheduleFunctions = {}


scheduleFunctions.getSchedule = function () {
	Schedule.find(function (err, docs) {
		if (err) {
			return err;
		} else {
			console.log(docs.length);
		}
	})
}

module.exports = scheduleFunctions;