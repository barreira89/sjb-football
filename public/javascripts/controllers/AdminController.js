app.controller('AdminController', ['$scope', 'games', 'config', function($scope, games, config) {
        /**
        	get the list of games by week
        	update the list of games with the winners

        */
        $scope.updateSeason = config.setCurrentSeason;
        $scope.currentSeason = config.getCurrentSeason();

        //getWeekList
        games.getWeekList().success(function(data) {
            $scope.weekList = data[0].weeks;
        })

        $scope.getScheduleByWeek = function(week) {
            games.getGamesByWeek(week, $scope.currentSeason).success(function(data) {
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

        $scope.updateGames = function(weeknumber, gameData) {
            games.updateGamesByWeek(weeknumber, gameData).success(function(data) {
                $scope.currentGames = data;

            });
        }
    }])
