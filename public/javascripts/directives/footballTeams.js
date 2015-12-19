app.directive('footballTeams', function(){
	return {
		restrict: 'E',
		scope: {
			info: '=',
			pics: '='
		},
		templateUrl: 'public/javascripts/directives/footballTeam.html'
		}	
	});