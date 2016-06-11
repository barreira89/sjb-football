app.factory('logos', ['$http', function($http) {
 var logos = {};
 var logoLookUp;

function getLogoList (){
   return $http({
     method: 'GET',
     url: '/api/logos'
   })
 }

getLogoList().success(function (data){
  logoLookUp = createLogoLookUp(data);
})
//get logo location by team name

//check to see if logo list is loaded -- return
logos.getLogoByTeamname = function(teamName){
  if(!logoLookUp){
    getLogoList().success(function(data){
      logoLookUp = createLogoLookUp(data);
      return logoLookUp[teamName];
    })
  } else {
    return logoLookUp[teamName];
  }
}

function createLogoLookUp(logoArray) {
    var logoLookUp = {}
    logoArray.map(function(value) {
        logoLookUp[value.team] = value.logo;
    })
    return logoLookUp;
}

 return logos;
}]);
