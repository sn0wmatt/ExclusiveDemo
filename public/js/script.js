var progressBarApp = angular.module('progressBar', []);

progressBarApp.controller('mainController', function($scope) {
	$scope.progress = 30;
	$scope.direction = +1;
	$scope.btnText = "Interact";
	$scope.makeProgress = function() {
		$scope.progress += 10*$scope.direction;

		// Simple as it gets
		if ($scope.progress == 100) $scope.direction = -1;
		if ($scope.progress == 0) $scope.direction = +1;
	}
});