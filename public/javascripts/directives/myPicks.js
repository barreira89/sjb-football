app.directive('myPicks', ['users', 'picks', function(users, picks){
	return {
		restrict: 'E',
		scope: {
			userpicks: '='
		},
		link: function(scope, elm, attr) {
			scope.updatePick = function (pickId, pick){
				picks.updatePick(pickId, pick).success(function(data){
					console.log(data);
				});
			}
		},
		templateUrl: 'public/javascripts/directives/myPicks.html'
}}]);
