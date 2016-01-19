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

userservices.getUserPicks = function (ud){
	var p = ud.picks;
	var pickz = {};
	for (i = 0, len = p.length; i < len; i ++){
		var x = p[i].picks;
		for (var k in x){
			pickz[k] = x[k];
		}
	}
	return pickz;
}

userservices.getUserPicksByWeek = function (userdata, week){
	var p = userdata.picks
	var pickz = {};
	for (i = 0, len = p.length; i < len; i ++){
		if(p[i].week == week.Week){
			pickz = p[i].picks;
		}
	}
	return pickz;
} 
  
 return userservices;
}]);