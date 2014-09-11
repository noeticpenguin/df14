angular.module('df14').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('root', {
			resolve: {
				// objects and promises set here will resolve before handing off to the root state.
			},
			controller: 'masterAppPageCtrl',
			templateUrl: '/apex/df14_nav',
			abstract: true
		})
		.state('root.firstPage', {
			controller: 'firstPageCtrl',
			url: '/first',
			templateUrl: '/apex/PP_Pricing'
		});
	$urlRouterProvider.when('', '/first');

});