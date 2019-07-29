let mainApp = angular.module('mainApp', ['ui.router', 'ngAnimate']);
mainApp.controller('mainCtrl', function($scope, $rootScope, $state) {
});

mainApp.controller('homeCtrl', function($scope,$rootScope,$state,$http) {
	$scope.submit = function (data) {		
		$scope.city = data.City;
		$rootScope.datos = [];
		$http({
			// Metodo para obtener la api
			method: 'GET',
			// Hacer la llamada a la api. Template string.
			url: `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&appid=0fe7ba98499cbc5e957ea206ee61bda9&lang=es`
			}).then(function (snapshot) {
				$rootScope.datos.push(snapshot);
				console.log(snapshot);
			});
	};
	$scope.submitK = function (event, data) {
		if(event.keyCode === 13) {
      event.preventDefault();
      $scope.city = data.City;
		$rootScope.datos = [];
		$http({
			// Metodo para obtener la api
			method: 'GET',
			// Hacer la llamada a la api. Template string.
			url: `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&appid=0fe7ba98499cbc5e957ea206ee61bda9&lang=es`
			}).then(function (snapshot) {
				$rootScope.datos.push(snapshot);
				console.log(snapshot);
			});
    };
	};
});

mainApp.controller('merCtrl', function ($scope, $rootScope, $http) {
});

mainApp.controller('aboutCtrl', function ($scope, $rootScope, $state) {
});


	/*$scope.submit = function (data) {
			$scope.city = data.City;
			$scope.countryCode = data.countryCode;
			console.log(`https://api.openweathermap.org/data/2.5/weather?q=${$scope.city},${$scope.countryCode}&appid=0fe7ba98499cbc5e957ea206ee61bda9&lang=es`)
			$rootScope.datos = [];
			$http({
				method: 'GET',
				url: `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city},${$scope.countryCode}&appid=0fe7ba98499cbc5e957ea206ee61bda9&lang=es`
			}).then(function (snapshot) {
				$rootScope.datos.push(snapshot)
				console.log(snapshot)
			});
	};*/	