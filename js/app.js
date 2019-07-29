mainApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/root/home');
	$stateProvider
		.state('root', {
			url: '/root',
			abstract: true,
			templateUrl: 'templates/navbar.html',
			controller: 'mainCtrl'
		})
		.state('root.home', {
			url: '/home',
			views: {
				'contenido': {
					controller: 'homeCtrl',
					templateUrl: 'templates/home.html'
				}
			}
		})
		.state('root.nosotros', {
			url: '/nosotros',
			views: {
				'contenido': {
					controller: 'aboutCtrl',
					templateUrl: 'templates/nosotros.html'
				}
			}
		})
		.state('root.productos', {
			url: '/productos',
			views: {
				'contenido': {
					controller: 'merCtrl',
					templateUrl: 'templates/productos.html'
				}
			}
		})
});