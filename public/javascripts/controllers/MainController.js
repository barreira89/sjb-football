app.controller('MainController', ['$scope', function($scope){
	var test = "First Test"
	$scope.test = test;
	$scope.schedule =
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
		}

}]);
