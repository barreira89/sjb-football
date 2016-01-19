app.factory('schedule', ['$http', function($http) { 
  var dataservices = {};
  
  dataservices.getSchedule = function (){
	 return $http({
		  method: 'GET',
		  url: '/schedules'
	  })	  
  }
  
  dataservices.getScheduleByWeek = function (week){
	 return $http({
		  method: 'GET',
		  url: '/schedules/'+ week
	  })	  
  }
  
  dataservices.updateSchedule = function (pl, wk){
	  return $http({
		  method: 'POST',
		  url: '/schedules/' + wk,
		  data: pl
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

  dataservices.gamesByWeek = function(s){
	 var games = {};
	 for (i = 0, len = s.length; i < len; i ++){
		var wk = parseInt(s[i].Week);
		var ob = {};
		for(var x in s[i].Games){
			var y = s[i].Games[x];
			var h = y.home;
			var v = y.visitor;
			var w = y.winner;
			console.log(y.winner);
			games[y.gid] = {"home": h, "visitor":v, "winner": w};
		}
		//games[wk] = s[i].Games;
	}
	return games;
  }
  
  return dataservices;
}]);