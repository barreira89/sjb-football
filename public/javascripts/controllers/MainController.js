app.controller('MainController', ['$scope', 'auth', 'users', 'games', 'picks', 'util', function($scope, auth, users, games, picks, util) {
    $scope.currentGames;
    $scope.userModel = {}

    games.getWeekList().success(function(data) {
        $scope.weekList = data[0].weeks;
    })

    var accountModel = auth.getUser();

    /**
    	1. User Selects Week
    		getGamesByWeek
    		if user, get user picks by week
    	2. Display Games (if user is logged in, display with picks)
    */

    this.getCurrentWeekGames = function(currentWeek) {

        //get list of games for this week, assign to currentGames
        games.getGamesByWeek(currentWeek).success(function(gameList) {
            $scope.currentGames = gameList;

            //Get User Model by User Id
            if (accountModel) {
                users.getUserModel(accountModel.id).success(function(data) {
                    $scope.userModel = data;

                    //TODO Update with userId instead of username

                    picks.getPicksByUsernameAndWeek(accountModel.username, currentWeek).success(function(data) {
                        $scope.userModel.pickModel = data;
                        util.attachUserPicksToGames(gameList, $scope.userModel);
                    })
                });
            }
        })
    }

    $scope.userName = accountModel && accountModel.username || 'guest';

    $scope.updatePicks = function(username, week, pickData) {
        var gameList = $scope.currentGames
        var userPicks = util.gatherUserPicks($scope.currentGames);

        picks.updateListOfPicks(username, week, userPicks).success(function(data) {
            $scope.userModel.pickModel = data;
            util.attachUserPicksToGames(gameList, $scope.userModel);
        }).error(function(err) {
            console.log(err);
        });
    }

    if ($scope.userName) {
        users.getUser($scope.userName).success(
            function(data) {
                $scope.use = data;
                setParentUser(data);
            })
    }

    setParentUser = function(userData) {
        var username = userData.user[0] && userData.user[0].username;
        if (username) $scope.$parent.$root.masterUserName = username;
    }

}]);
