app.controller('MainController', ['$scope', function($scope){
	var test = "First Test"
	var schedule = [
		{	
			"Week" : 1,
			"Teams" : [{
					"visitor" : "Steelers",
					"home" : "Patriots"
				}, {
					"visitor" : "Packers",
					"home" : "Bears"
				}, {
					"visitor" : "Chiefs",
					"home" : "Texans"
				}, {
					"visitor" : "Browns",
					"home" : "Jets"
				}, {
					"visitor" : "Colts",
					"home" : "Bills"
				}, {
					"visitor" : "Dolphins",
					"home" : "Redskins"
				}, {
					"visitor" : "Panthers",
					"home" : "Jaguars"
				}, {
					"visitor" : "Seahawks",
					"home" : "Rams"
				}, {
					"visitor" : "Saints",
					"home" : "Cardinals"
				}, {
					"visitor" : "Lions",
					"home" : "Chargers"
				}, {
					"visitor" : "Titans",
					"home" : "Buccaneers"
				}, {
					"visitor" : "Bengals",
					"home" : "Raiders"
				}, {
					"visitor" : "Ravens",
					"home" : "Broncos"
				}, {
					"visitor" : "Giants",
					"home" : "Cowboys"
				}, {
					"visitor" : "Eagles",
					"home" : "Falcons"
				}, {
					"visitor" : "Vikings",
					"home" : "49ers"
				}
			]
			
		},
		{
			"Week" : 2,
			"Teams" : [{
					"home" : "Broncos",
					"visitor" : "Chiefs"
				}, {
					"home" : "Texans",
					"visitor" : "Panthers"
				}, {
					"home" : "49ers",
					"visitor" : "Steelers"
				}, {
					"home" : "Buccaneers",
					"visitor" : "Saints"
				}, {
					"home" : "Lions",
					"visitor" : "Vikings"
				}, {
					"home" : "Cardinals",
					"visitor" : "Bears"
				}, {
					"home" : "Patriots",
					"visitor" : "Bills"
				}, {
					"home" : "Chargers",
					"visitor" : "Bengals"
				}, {
					"home" : "Titans",
					"visitor" : "Browns"
				}, {
					"home" : "Falcons",
					"visitor" : "Giants"
				}, {
					"home" : "Rams",
					"visitor" : "Redskins"
				}, {
					"home" : "Dolphins",
					"visitor" : "Jaguars"
				}, {
					"home" : "Ravens",
					"visitor" : "Raiders"
				}, {
					"home" : "Cowboys",
					"visitor" : "Eagles"
				}, {
					"home" : "Seahawks",
					"visitor" : "Packers"
				}, {
					"home" : "Jets",
					"visitor" : "Colts"
				}
			]
		}
		]
	$scope.test = test;
	$scope.result = {};
	
	$scope.getByWeek = function(week){
		for(x in schedule){
			var curr = schedule[x].Week;
			if (curr==week){
				console.log(curr + " : " + week)
				$scope.result = schedule[x].Teams;
			}
		}
	}
	
	

}]);
