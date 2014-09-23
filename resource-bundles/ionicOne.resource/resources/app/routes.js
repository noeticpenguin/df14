angular.module('ionicOne')

.config(function($stateProvider, $urlRouterProvider, $locationProvider, ngForceConfig) {
	// $locationProvider.html5Mode(true)

	var sf1SafeTemplatePath = ngForceConfig.resourceUrl.split('?')[0] + "/resources/templates/";

	$stateProvider
		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: sf1SafeTemplatePath + "menu.html",
			controller: 'AppCtrl'
		})
	// Master list of Accounts
	.state('app.accounts', {
		url: "/accounts",
		views: {
			'menuContent': {
				templateUrl: sf1SafeTemplatePath + "accountsList.html",
				controller: 'accountListCtrl'
			}
		}
	})

	.state('app.single', {
		url: "/accounts/:accountId",
		views: {
			'menuContent': {
				templateUrl: sf1SafeTemplatePath + "singleAccount.html",
				controller: 'accountContactsList'
			}
		}
	})

	.state('app.contact', {
		url: "/contact/:contactId",
		views: {
			'menuContent': {
				templateUrl: sf1SafeTemplatePath + "contactCard.html",
				controller: 'contactCardCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/accounts');
});