app.factory('leagues', ['$http', function($http) { 
 var leagueServices = {};

leagueServices.getLeagues = function (){
	 return $http({
		 method: 'GET',
		 url: '/leagues'
	 })
 }

leagueServices.getLeagueById = function (leagueId){
	return $http({
		method: 'GET',
		url: '/leagues/' + leagueId
	})
} 

leagueServices.createLeague = function (username) {
	return $http({
			method: 'POST',
			url: '/leagues'
	})
}

leagueServices.getLeaguesByUsername = function (username){
	return $http({
		method: 'GET',
		url: '/leagues?username=' + username
	})
}

leagueServices.updateLeague = function (leagueId, data){
	return $http({
		method: 'PUT',
		url: '/leagues/' + leagueId,
		data: data
	})
}
 
leagueServices.removeUserFromLeague = function (username, league){
	var i = league.users.indexOf(username);
	if (i != -1) {
		league.users.splice(i, 1);
	}
	console.log(league.users);
	
	return leagueServices.updateLeague(league._id, league);
	
}
 
 
 return leagueServices;
}]);