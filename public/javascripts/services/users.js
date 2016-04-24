app.factory('users', ['$http', function($http) { 
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

userservices.getUserPicks = function () {
	return $http({
			method: 'GET',
			url: '/picks'
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
  
userservices.getUserWins = function (userPicks, gameList){
	var winsByWeek = {};
	var totalWins = 0;
	for(i = 0; i < userPicks.length; i ++){
		var currentWeek = userPicks[i].week;
		var currentWins = 0;
		var picks = userPicks[i].picks;
		for (game in picks){
			var actualWinner = gameList[game].winner;
			var userPick = picks[game];
			if(userPick == actualWinner){
				++ currentWins;
				++ totalWins;
			}
		}
		winsByWeek[currentWeek] = currentWins;
	}
	winsByWeek['total'] = totalWins;
	return winsByWeek;	
}  
  
 return userservices;
}]);