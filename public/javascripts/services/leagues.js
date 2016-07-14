app.factory('leagues', ['$http', function($http) {
 var leagueServices = {};

leagueServices.getLeagues = function (){
	 return $http({
		 method: 'GET',
		 url: '/api/leagues'
	 })
 }

leagueServices.getLeagueById = function (leagueId){
	return $http({
		method: 'GET',
		url: '/api/leagues/' + leagueId
	})
}

leagueServices.createLeague = function (username) {
	return $http({
			method: 'POST',
			url: '/api/leagues'
	})
}

leagueServices.getLeaguesByUsername = function (username){
	return $http({
		method: 'GET',
		url: '/api/leagues?username=' + username
	})
}

leagueServices.updateLeague = function (leagueId, data){
	return $http({
		method: 'PUT',
		url: '/api/leagues/' + leagueId,
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

 leagueServices.getLeagueSummary= function(leagueId){
   return $http({
     method: 'GET',
     url: '/api/leagues/' + leagueId + '/summary'
   })

 }

 return leagueServices;
}]);
