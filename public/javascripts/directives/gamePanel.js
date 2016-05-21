app.directive('gamePanel', ['schedule' , function(schedule){
	var controller = ['$scope', function ($scope){
		
		function init(){
			if (!$scope.game.pickModel) {
				$scope.game.pickModel = {
					game : $scope.game._id,
					userId : $scope.userModel._id,
					weekNumber : $scope.game.weekNumber
				}
			}
			
			if($scope.userModel.pickModel){
				$scope.userModel.pickModel.push($scope.game.pickModel)
			} else {
				$scope.userModel.pickModel = [];
				$scope.userModel.pickModel.push($scope.game.pickModel);
			}
		}
		
		//findPickById
		
		init()
		
	}]
	
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'public/javascripts/directives/gamePanel.html',
		controller: controller,
		link: function(scope, element, attrs){
			// scope.pickModel = {
				// game: scope.game._id,
				// userId: scope.userModel._id,
				// weekNumber: scope.game.weekNumber
			// }
		}
}}]);