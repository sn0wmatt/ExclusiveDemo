var progressBarApp = angular.module('progressBar', []);
var socket = io.connect('127.0.0.1:1337/');

progressBarApp.controller('mainController', $scope => {
	$scope.btnText = "Interact";

	// -- $scope functions -- //
		// ---------- makeProgress() ---------- //
		// Emits a 'make progress' event, and   //
		// increases the $scope.progress value. //
		//--------------------------------------//
	$scope.makeProgress = function() {
		socket.emit('button click');
	}

	socket.on('data update', data => {
		$scope.$apply(() => {
			$scope.progress = data.progress;
			$scope.direction = data.direction;
		});
	});
});