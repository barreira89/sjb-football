app.factory('config', ['$http', function($http) {
 var currentSeason = 2015;

 var configServices = {}
 configServices.getCurrentSeason = function(){
   return currentSeason;
 }
 configServices.setCurrentSeason = function(season){
   currentSeason = season;
   return currentSeason;
 }

 return configServices;
}]);
