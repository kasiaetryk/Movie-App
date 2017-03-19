var myMovieApp = angular.module('myMovieApp', []);

myMovieApp.controller('MovieController', function($scope, $http){
	console.log('MovieController loaded ...');

	$scope.titleParam = "";

//	$scope.$watch('titleParam', function(){
//		$scope.search();
//	});
	$scope.search = function() {
		$http.get("https://www.omdbapi.com/?s=" + $scope.titleParam + "&tomatoes=true")
			.then(function(response){
					$scope.details = response.data.Search;
					console.log($scope.details);

				angular.forEach($scope.details, function(obj){
					$http.get("https://www.omdbapi.com/?i=" + obj.imdbID + "&plot=full")
					.then(function(response){
						obj.details = response.data;
					});
				});
				console.log($scope.details);
				$scope.titleParam = "";
			});
	};
});