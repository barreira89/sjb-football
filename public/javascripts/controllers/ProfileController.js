app.controller('ProfileController', ['$scope', 'users', 'leagues', 'picks', 'games', 'config', function($scope, users, leagues, picks, games, config) {
      $scope.refresh = function(userName){
        getProfile(userName);
        getUserLeagues(userName);
      }

      getProfile = function(userName) {
         users.getUser(userName).success(function(userData){
           $scope.userData = userData[0];
         })
      }
      getUserLeagues = function(userName){
        leagues.getLeaguesByUsername(userName).success(function(userLeagueData){
          $scope.leagueData = userLeagueData;
          //Clean this up
          $scope.leagueSummary = [];

          //Get the summary for every league a user is in
          userLeagueData.forEach(function(league){
            leagues.getLeagueSummary(league._id).success(function(leagueSummary){
              $scope.leagueSummary.push({id: league._id, name: league.name, summary: leagueSummary});
            })
          })
        })
      }
}])
