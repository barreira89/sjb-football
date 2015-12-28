app.factory('schedule', ['$http', function($http) { 
  var dataservices = {};
  
  dataservices.getSchedule = function (){
	 return $http({
		  method: 'GET',
		  url: '/schedules'
	  })	  
  }
  
  dataservices.getLogos = function (){
	 return $http({
		  method: 'GET',
		  url: '/logos'
	  })	  
  }
  
  dataservices.postWinners = function(body){
	  return $http({
		  method: 'POST',
		  url: '/winners',
		  data: body  
	  })
  }
  
  return dataservices;
}]);