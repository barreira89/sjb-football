app.controller('MainController', ['$scope', function($scope){
	var test = "First Test"
	$scope.schedule = [
		{	
			"Week" : "1",
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
			"Week" : "2",
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
		];
	$scope.pics ={
			Patriots: 'public/logos/New_England_Patriots_Helmet.jpg',
			Steelers:'public/logos/Pittsburgh_Steelers_Helmet.jpg',
			Browns: 'public/logos/Cleveland_Browns_Helmet.jpg',
			Cardinals: 'public/logos/Arizona_Cardinals_Helmet.jpg',
			Ravens: 'public/logos/Baltimore_Ravens_Helmet.jpg',
			Falcons: 'public/logos/Atlanta_Falcons_Helmet.jpg',
			Bills: 'public/logos/Buffalo_Bills_Helmet.jpg',
			Panthers: 'public/logos/Carolina_Panthers_Helmet.jpg',
			Bears: 'public/logos/Chicago_Bears_Helmet.jpg',
			Bengals: 'public/logos/Cincinnati_Bengals_Helmet.jpg',
			Cowboys: 'public/logos/Dallas_Cowboys_Helmet.jpg',
			Broncos: 'public/logos/Denver_Broncos_Helmet.jpg',
			Lions:'public/logos/Detroit_Lions_Helmet.jpg',
			Packers:'public/logos/Green_Bay_Packers_Helmet.jpg',
			Texans:'public/logos/Houston_Texans_Helmet2.jpg',
			Colts:'public/logos/Indianapolis_Colts_Helmet.jpg',
			Jaguars:'public/logos/Jacksonville_Jaguars_Helmet_2013b.jpg',
			Chiefs:'public/logos/Kansas_City_Chiefs_Helmet.jpg',
			Rams:'public/logos/St_Louis_Rams_Helmet.jpg',
			Dolphins:'public/logos/Miami_Dolphins_Helmet_2013.jpg',
			Vikings:'public/logos/Minnesota_Vikings_Helmet_2013.jpg',
			Saints:'public/logos/New_Orleans_Saints_Helmet2.jpg',
			Giants:'public/logos/New_York_Giants_Helmet.jpg',
			Jets:'public/logos/New_York_Jets_Helmet.jpg',
			Raiders:'public/logos/Oakland_Raiders_Helmet.jpg',
			Eagles:'public/logos/Philadelphia_Eagles_Helmet.jpg',
			Chargers:'public/logos/San_Diego_Chargers_Helmet.jpg',
			'49ers':'public/logos/San_Francisco_49ers_Helmet.jpg',
			Seahawks:'public/logos/Seattle_Seahawks_Helmet_2012.jpg',
			Buccaneers:'public/logos/Tampa_Bay_Buccaneers_2014_Helmet.jpg',
			Titans:'public/logos/Tennessee_Titans_Helmet.jpg',
			Redskins:'public/logos/Washington_Redskins_Helmet.jpg',
			};
	$scope.test = test;
	$scope.result = {};
	$scope.weeks = [{week:"1",id:"1"},{week:"2",id:"2"},{week:"3",id:"3"}];
	
	
	$scope.getByWeek = function(week){
		for(x in $scope.schedule){
			var curr = $scope.schedule[x].Week;
			if (curr==week.Week){
				console.log(curr + " : " + week)
				$scope.result = $scope.schedule[x].Teams;
			}
		}
	}
	
	

}]);
