var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Games = new Schema({
		home: String,
		visitor: String,
		winner: String,
		homescore: Number,
		visitscore: Number,
		weekNumber: Number,
		season: Number,
		date: String,
		time: String
});
Games.virtual('winnercalc').get(function(){
	if(this.homescore && this.visitscore){
		if (this.homescore > this.visitscore) {
			return 'home'
		}
		if (this.visitscore > this.homescore) {
			return 'visitor'
		}
	}
})
Games.set('toJSON', {getters: true, virtuals: true});

module.exports = mongoose.model('Games', Games);