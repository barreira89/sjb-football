app.directive('footballTeams', function(){
	return {
		restrict: 'E',
		scope: {
			info: '=',
		},
		templateUrl: 'public/javascripts/directives/footballTeam.html'
		}	
	});