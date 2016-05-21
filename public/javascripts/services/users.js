app.factory('users', ['$http', '$q', function($http, $q) { 
 var userservices = {};

 userservices.getUsers = function (){
	 return $http({
		 method: 'GET',
		 url: '/users'
	 })
 }

userservices.getUser = function (username){
	return $http({
		method: 'GET',
		url: '/users/' + username
	})
} 

userservices.getUserPicks = function (username) {
	return $http({
			method: 'GET',
			url: '/users/'+ username + '/picks'
	})
}

userservices.getUserPicksByWeek = function (userdata, week){
	var userPicks = userdata.picks;
	var weekPicks = {};
	userPicks.forEach(function(pick){
		if (pick.week == week.weekNumber){
			weekPicks = pick.picks
		}
	})
	return weekPicks;
} 

userservices.updatePick = function (pickId, pickValues) {
	return $http({
		method: 'PUT',
		url: '/api/picks/' + pickId,
		data: pickValues
	})
}

// userservices.getUserModel = function (userId, callback) {
	// var user = $http({
		// method: 'GET',
		// url: '/api/users/' + userId		
	// });
	// var picks = $http({
		// method: 'GET',
		// url: '/api/picks?username=thy'
	// })
	// var schedule = $http({
		// method: 'GET',
		// url: '/schedules'
	// })
	// $q.all([user,picks,schedule]).then(function (results){
		// var dataObj = {
			// userData : results[0].data,
			// userPicks : results[1].data,
			// schedule : results[2].data	
		// }
		// callback(dataObj);
	// });

// }

userservices.getUserModel = function (userId) {
	return $http({
		method: 'GET',
		url: 'api/users/'+ userId + '/picks'		
	})
}


//Returns an object where the week is the key and number of wins is the value
//{"1":15,"2":13,"total":49}  
userservices.getUserWins = function (userPicks, gameList){
	var winsByWeek = {};
	var totalWins = 0;
	
	for(i = 0; i < userPicks.length; i ++){
		var currentWeek = userPicks[i].week;
		
		var currentWins = 0;
		
		var picks = userPicks[i].picks;
		
		picks.forEach(function (pick){
			var actualWinner = gameList[pick.gameId].winner;
			var userPick = pick.winner;
			if(userPick == actualWinner){
				++ currentWins;
				++ totalWins;
			}
		})
		
		winsByWeek[currentWeek] = currentWins;
	}
	winsByWeek['total'] = totalWins;
	return winsByWeek;	
}  
  
 return userservices;
}]);