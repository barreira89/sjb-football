app.controller('ProfileController', ['$scope', 'users', 'leagues', 'picks', 'games', 'config', 'session', function($scope, users, leagues, picks, games, config, session) {
      $scope.refresh = function(userName){
        getProfile(userName);
        getUserLeagues(userName);
      }
      $scope.currentUser = session.userName;

      getProfile = function(userName) {
         users.getUser(userName).success(function(userData){
           $scope.userData = userData[0];
         })
      }
      getProfile($scope.currentUser);

      getUserLeagues = function(userName){
        leagues.getLeaguesByUsername(userName).success(function(userLeagueData){
          $scope.leagueData = userLeagueData;

          //Clean this up, move to service
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
