app.controller('LeagueController', ['$scope', 'leagues', 'users', 'picks', function ($scope, leagues, users, picks) {

    leagues.getLeagues().success(function (data) {
        $scope.leagueList = data;
    });

    $scope.selectCurrentLeague = function (leagueId) {
        leagues.getLeagueById(leagueId).success(function (data) {
            $scope.currentLeague = data;

            leagues.getLeagueSummary(leagueId).success(function (leagueSummary) {
                $scope.leagueSummary = leagueSummary;

            })
        });

        users.getUsers().success(function (data) {
            $scope.userList = data;
        });
    }

    $scope.addUserToLeague = function (user) {
        var leagueUsers = $scope.currentLeague.users;
        if (leagueUsers) {
            if (leagueUsers.indexOf(user) < 0) {
                leagueUsers.push(user);
            }
        }
    }

    $scope.removeUserFromLeague = function (user) {
        var league = $scope.currentLeague.users;
        if (league) {
            if (league.indexOf(user) > -1) {
                league.splice(league.indexOf(user), 1);
            }
        }
    }

    $scope.submitLeague = function () {
        if ($scope.currentLeague) {
            leagues.updateLeague($scope.currentLeague._id, $scope.currentLeague).success(function (data) {
                console.log('updated!');
            });
        }
    }



}]);
