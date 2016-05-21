var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Picks = new Schema({
    username: String,
	userId: String,
	extId: String,
	week: Number,
	updated: { type: Date, default: Date.now },
	picks: [
		{
			_id: false,
			gameId: String,
			winner: String,
			details: {
				_id: false,
				home: String,
				visitor: String,
				winner: String,
				gid: Number,
				homescore: Number,
				visitscore: Number,
				weekNumber: Number
			}
		}
	] 
});

Picks.index({username: 1, week: 1}, {unique: true});

//If no extId set, use default id
// Picks.pre('save', function(next) {
	// if(this.extId){
		// console.log(this);
		// console.log("middle ware")
	// } else {
		// this.extId = this.get('_id').toString().substring(10);
	// }
	// next();
// })


module.exports = mongoose.model('Picks', Picks);