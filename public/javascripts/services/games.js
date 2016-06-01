app.factory('games', ['$http', function($http) { 
 var gameServices = {};
 
gameServices.getGames = function (){
	 return $http({
		 method: 'GET',
		 url: '/api/games'
	 })
 }

gameServices.getGameById = function (gameId){
	return $http({
		method: 'GET',
		url: '/api/games/' + gameId
	})
} 
gameServices.getWeekList = function (){
	return $http({
		method: 'GET',
		url: '/api/games?weeklist=1'
	})
	
}

gameServices.getGamesByWeek = function (weekNumber) {
	return $http({
			method: 'GET',
			url: '/api/games' + '?weeknumber=' + parseInt(weekNumber)
	})
}

gameServices.getGamesByTeam = function (team){
	return $http({
		method: 'GET',
		url: '/api/games' + '?team=' + team
	})
}

gameServices.updateGame = function (gameId, data){
	return $http({
		method: 'PUT',
		url: '/api/game/' + gameId,
		data: data
	})
}
 
 return gameServices;
}]);