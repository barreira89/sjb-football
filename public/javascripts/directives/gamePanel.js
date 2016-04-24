app.directive('gamePanel', ['schedule' , function(schedule){
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'public/javascripts/directives/gamePanel.html',
		link: function(scope, element, attrs){
			scope.logoByTeam = function (team) {
				return schedule.getLogoByTeam(team)
			}
			scope.game.pic = {
				visitor: schedule.getLogoByTeam(scope.game.visitor),
				home: schedule.getLogoByTeam(scope.game.home)
			}
		}
}}]);