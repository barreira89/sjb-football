app.controller('ProfileController', ['$scope', '$state','users', 'leagues', 'picks', 'config', 'session', function($scope, $state, users, leagues, picks, config, session) {
      $scope.refresh = function(userName){
        getProfile(userName);
        getUserLeagues(userName);
        getUserPicks(userName);
      }
      $scope.currentUser = session.userName;
      $scope.userModel = {};

      getProfile = function(userName) {
         users.getUser(userName).success(function(userData){
           $scope.userData = userData[0];
         })
      }
      getUserLeagues = function(userName){
        leagues.getLeaguesByUsernameWithSummary(userName).then(function(leagueSummary){
          $scope.leagueSummary = leagueSummary;
        });
      }
      getUserPicks = function(userName){
        picks.getPicksWithDetails({username:userName, season: '2015'}).success(function(data){
          $scope.userModel.newPickModel = data;
          $scope.userModel.winTotal = picks.winCalculation($scope.userModel);
          $scope.userPicksByWeek = picks.groupPicksByWeek(data);
        })
      }

      getProfile($scope.currentUser);
      getUserLeagues($scope.currentUser);
      getUserPicks($scope.currentUser);

      $scope.showProfile = function (){
        $state.transitionTo('profile.user');
      }
      $scope.showLeagues = function (){
        $state.transitionTo('profile.leagues');
      }
      $scope.showPicks = function (){
        $state.transitionTo('profile.picks');
      }



}])
