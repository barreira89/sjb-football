app.controller('MainController', ['$scope', 'auth', 'users', 'games', 'picks', 'util', 'config', 'session', function($scope, auth, users, games, picks, util, config, session) {
    $scope.currentGames;
    $scope.userModel = {}

    config.getCurrentSeason().success(function(data){
      $scope.currentSeason = data[0].currentSeason;
    });

    games.getWeekList().success(function(data) {
        $scope.weekList = data[0].weeks;
    })

    var accountModel = auth.getUser();
    if(accountModel){
      $scope.userName = accountModel.username;
    }

    this.getCurrentWeekGames = function(currentWeek) {
        //get list of games for this week, assign to currentGames
        games.getGamesByWeek(currentWeek, $scope.currentSeason).success(function(gameList) {
            $scope.currentGames = gameList;
            //Get User Model by User Id
            if (accountModel) {
                users.getUserModel(accountModel.id).success(function(data) {
                    $scope.userModel = data;

                    picks.getPicksByUsernameAndWeek(accountModel.username, currentWeek).success(function(data) {
                        $scope.userModel.pickModel = data;
                        util.attachUserPicksToGames(gameList, $scope.userModel);
                    })
                });
            }
        })
    }

    $scope.updatePicks = function(week, pickData) {
				if (!accountModel) return;

				var gameList = $scope.currentGames
        var userPicks = util.gatherUserPicks($scope.currentGames);

        picks.updateListOfPicks(accountModel.username, week, userPicks).success(function(data) {
            $scope.userModel.pickModel = data;
            util.attachUserPicksToGames(gameList, $scope.userModel);
        }).error(function(err) {
            console.log(err);
        });
    }

    if (accountModel && accountModel.username) {
        users.getUser($scope.userName).success(
            function(data) {
                $scope.use = data;
                setParentUser(data);
            })
    }

    setParentUser = function(userData) {
      userData = userData[0];
      var username = userData.username;
      session.userName = username;
      if (username) $scope.$parent.$root.masterUserName = username;
    }

}]);
