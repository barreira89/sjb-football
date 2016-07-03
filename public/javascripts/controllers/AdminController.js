app.controller('AdminController', ['$scope', 'games', function($scope, games) {
        /**
        	get the list of games by week
        	update the list of games with the winners

        */

        //getWeekList
        games.getWeekList().success(function(data) {
            $scope.weekList = data[0].weeks;
        })

        $scope.getScheduleByWeek = function(week) {
            games.getGamesByWeek(week).success(function(data) {
                $scope.currentGames = data;
                $scope.currentGames.forEach(function(game){

                  game.calcWin = (function(){
                    if(game.homescore > game.visitscore){
                      game.winner = 'home';
                    }
                    if(game.visitscore > game.homescore){
                      game.winner = 'visitor';
                    }
                  });

                })
            })
        }

        // function calculateWinner(game){
        // 	return (
        // 		function(){
        // 			if (game.homescore > game.visitscore) {
        // 				game.winner = 'home';
        // 			}
        //
        // 			if(game.visitscore > game.homescore){
        // 				game.winner = 'visitor';
        // 			}
        //
        // 			//return game.winner;
        // 		}
        // 	)
        // }

        $scope.updateGames = function(weeknumber, gameData) {
            games.updateGamesByWeek(weeknumber, gameData).success(function(data) {
                $scope.currentGames = data;

            });
        }
    }])

    /*.controller('testController', function ($scope) {
    	//$scope.currentGame = {};

    	$scope.$watch('game', function (newValue, oldValue) {
    		if ($scope.game.homescore > $scope.game.visitscore) {
    			$scope.game.winner = 'home';
    		}
    		if ($scope.game.visitscore > $scope.game.homescore) {
    			$scope.game.winner = 'visitor';
    		}
    		//$scope.updateGame($scope.game.gid, $scope.game);
    	}, true)

    })
    .controller('modalInstanceCtrl', function ($scope, $uibModalInstance) {
    	$scope.ok = function () {
    		$uibModalInstance.close();
    	};
    });*/
