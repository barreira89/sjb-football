app.factory('picks', ['$http', function($http) { 
 var pickServices = {};
 
pickServices.getPicks = function (){
	 return $http({
		 method: 'GET',
		 url: '/api/picks'
	 })
 }

pickServices.getPickById = function (pickId){
	return $http({
		method: 'GET',
		url: '/api/picks/' + pickId
	})
} 

pickServices.getPicksByUsername = function (username) {
	return $http({
			method: 'GET',
			url: '/api/picks' + '?username=' + username
	})
}

pickServices.getPicksByUsernameAndWeek = function (username, week){
	return $http({
			method: 'GET',
			url: '/api/picks' + '?username=' + username +'&'+'week=' + parseInt(week)
	})	
}


 return pickServices;
}]);