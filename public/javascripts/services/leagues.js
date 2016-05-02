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
 
 return leagueServices;
}]);