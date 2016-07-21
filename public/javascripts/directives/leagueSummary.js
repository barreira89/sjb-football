app.directive('leagueSummary', function(){
	return {
		restrict: 'E',
		scope: {
			league: '=',
			username: '='
		},
		link: function(scope, elm, attr){
			scope.highlighted = function(globalName, rowName){
				return globalName == rowName ? {'color': 'red'} : {'color': 'black'};
			}
		},
		templateUrl: 'public/javascripts/directives/leagueSummary.html'
}});
