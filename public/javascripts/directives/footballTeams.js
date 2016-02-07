app.directive('footballTeams', ['schedule', 'users', function(schedule, users){
	return {
		restrict: 'E',
		scope:false,
		templateUrl: 'public/javascripts/directives/footballTeam.html',
		link: function(scope, element, attrs){
			
			scope.reset = function (){
				console.log(scope.games);
				scope.games = {};				
			}
			
			scope.submit = function (){
				if(scope.un){
					var body = {};
					body.picks = scope.pickos;
					body.username = scope.un;
					body.week = scope.result.Week;
					schedule.postWinners(body);
					scope.submitted = "Submitted picks for week" + scope.result.Week + " # Of Picks:" + numOfPicks(scope.pickos);
				}
				refreshUser();
			}
			
			refreshUser = function(){
				users.getUser(scope.un).success(
					function(data){
						scope.use = data;
				});
			}
			
			numOfPicks = function(data){
				if(data){
					return Object.keys(data).length;
				}else{
					return 0;
				}
			}
		}

}}]);