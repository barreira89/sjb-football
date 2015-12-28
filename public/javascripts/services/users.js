app.factory('users', ['$http', function($http) { 
 var userservices = {};

 userservices.getUsers = function (){
	 return $http({
		 method: 'GET',
		 url: '/users'
	 })
 } 
  
 return userservices;
}]);