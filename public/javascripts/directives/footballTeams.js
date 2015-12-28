app.directive('footballTeams', ['schedule', function(schedule){
	return {
		restrict: 'E',
		scope:{
			info: '=',
			pics: '=',
			games: '=',
			winners: '=',
			user: '='
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
					body.picks = scope.games;
					body.username = scope.user;
					body.week = scope.info.Week;
					schedule.postWinners(body);
				}
			}
		}
}}]);