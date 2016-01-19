app.directive('footballTeams', ['schedule', 'users', function(schedule, users){
	return {
		restrict: 'E',
		scope:{
			info: '=',
			pics: '=',
			games: '=',
			winners: '=',
			user: '=',
			pickos: '='
		},
		templateUrl: 'public/javascripts/directives/footballTeam.html',
		link: function(scope, element, attrs){
			
			scope.reset = function (){
				console.log(scope.games);
				scope.games = {};				
			}
			
			scope.submit = function (){
				if(scope.user){
					var body = {};
					body.picks = scope.pickos;
					body.username = scope.user;
					body.week = scope.info.Week;
					schedule.postWinners(body);
				}
				refreshUser();
			}
			
			refreshUser = function(){
				users.getUser(scope.user).success(
					function(data){
						scope.use = data;
						console.log("Refreshed");
				});
			}
		}

}}]);