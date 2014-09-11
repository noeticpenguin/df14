angular.module('ionicOne')

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	// $locationProvider.html5Mode(true).hashPrefix('!');
	$stateProvider

	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "/apex/ionicOne_menu",
		controller: 'AppCtrl'
	})

	// .state('app.search', {
	// 	url: "/search",
	// 	views: {
	// 		'menuContent': {
	// 			templateUrl: "/apex/ionicOne_search"
	// 		}
	// 	}
	// })

	// .state('app.browse', {
	// 	url: "/browse",
	// 	views: {
	// 		'menuContent': {
	// 			templateUrl: "/apex/ionicOne_browse"
	// 		}
	// 	}
	// })

	// Master list of Accounts
	.state('app.accounts', {
		url: "/accounts",
		views: {
			'menuContent': {
				templateUrl: "/apex/ionicOne_accountsList",
				controller: 'accountListCtrl'
			}
		}
	})

	.state('app.single', {
		url: "/account/:accountId",
		views: {
			'menuContent': {
				templateUrl: "/apex/ionicOne_accountContactList",
				controller: 'accountContactsList'
			}
		}
	})

	.state('app.contact', {
		url: "/contact/:contactId",
		views: {
			'menuContent': {
				templateUrl: "/apex/ionicOne_ContactCard",
				controller: 'contactCardCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/accounts');
});