app.factory('schedule', ['$http', function($http) { 
  var dataservices = {};
  var logos = {};
  var schedule;
  var gameList;
  setUpLogos();
  setUpSchedule();
  
  dataservices.getLogoByTeam = function(team){
	  return logos[team];
  }
  
  dataservices.getSchedule = function (){
	 return $http({
		  method: 'GET',
		  url: '/schedules',
		  cache: true
	  })	  
  }
    
  dataservices.getScheduleByWeek = function (week){	
	 return $http({
		  method: 'GET',
		  url: '/schedules/'+ week
	  })	  
  }
  
  dataservices.updateSchedule = function (pl, week){
	  return $http({
		  method: 'POST',
		  url: '/schedules/' + week,
		  data: pl
	  })
	  
  }
  
  dataservices.getLogos = function (){
	 return $http({
		  method: 'GET',
		  url: '/api/logos'
	  })	  
  }
  
  dataservices.postWinners = function(body){
	  return $http({
		  method: 'POST',
		  url: '/winners',
		  data: body  
	  })
  }

//Returns gameList object: "gameId":{"home","visitor","winner"}
dataservices.getGameList = function (callback) {
	if (gameList) {
		callback(gameList);
	} else {
		dataservices.getSchedule().success(function (data) {
			schedule = data;
			setUpGameList();
			callback(gameList);
		})
	}
}
 
dataservices.getGameById = function(gameId){
	return gameList[gameId];
} 
  
return dataservices;

function setUpLogos(){
	$http({
		  method: 'GET',
		  url: '/api/logos'
	  }).success( function(data){
		  logos = {}
		  data.map(function(logo){
			  logos[logo.team] = logo.logo;
		  });
	 })
}

function setUpSchedule(){
	$http({
		  method: 'GET',
		  url: '/schedules'
	  }).success( function(data){
		   schedule = data;
		   setUpGameList();
	 })
}

function setUpGameList(){
	var games = {};	 
	 for (i = 0, len = schedule.length; i < len; i ++){
		var listOfGames = schedule[i].games;
		for(var x in listOfGames){
			var game = listOfGames[x];
			games[game.gid] = 
			{
				home: game.home, 
				visitor:game.visitor, 
				winner:game.winner
			};
		}
	}
	gameList = games;
}
}]); 