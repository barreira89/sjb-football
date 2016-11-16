var Picks = require('../models/picks');

var pickApi = {
  //Takes list of usernames and returns the summary
  getUserSummary: function (userNameList, callback) {
      var pickQuery = {
        username: {
            $in: userNameList
        }
    };
    Picks
        .find(pickQuery)
        .populate('game')
        .exec(function(err, picks) {
            if (err) {
              //TODO Add Custom Error Messages
              return callback(err, null);
            }

            var winners = calculateWinners(picks);
            var reducedWeeks = reducePicksToWeeks(winners)
            var outArray = resultsToArray(reducedWeeks);
            return callback(null, outArray);
        })
  }
}

function calculateWinners(picks){
  picks.forEach(function(pick) {
					var currentGame = pick.game;

					if (currentGame && currentGame.winner) {
							pick.result = (currentGame.winner == pick.winner) ? 'WIN' : 'LOST';
					}
	})
  return picks;
}

function reducePicksToWeeks(picks){
	return picks.reduce(function(prev,current){
			if(!prev[current.week]) prev[current.week] = []

			prev[current.week].push(current)

			return prev;
	},{})
}

function mapUsersToResult(picks){
	return picks.map(function(pick){
		var result = pick.result || 'Not Set';
		return {username:pick.username, result: result}
	})
}

function reduceToSummary(mappedPicks){
	return mappedPicks.reduce(function(prev, current){
		if(!prev[current.username])
			prev[current.username] = {wins:0, losses:0, notset:0}

		if(current.result == 'WIN')
			prev[current.username].wins ++;

		if(current.result == 'LOST')
			prev[current.username].losses ++;

		if(current.result == 'Not Set')
			prev[current.username].notset ++;

		return prev;
	},{})
}

function resultsToArray(weekSummaryObj){
	var output = [];
	for(week in weekSummaryObj){
		var currentWeekPicks = weekSummaryObj[week];

		var mappedWeek = mapUsersToResult(currentWeekPicks);
		var reducedWeek = reduceToSummary(mappedWeek);
		output.push({week:week, results: userResultToArray(reducedWeek)});
	}
	return output;
}

function userResultToArray(resultObj){
	var outArray = []
	for (key in resultObj){
		outArray.push({username: key, wins: resultObj[key].wins, losses: resultObj[key].losses})
	}
	return outArray;
}

module.exports = pickApi;
