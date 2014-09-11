angular.module('ionicOne')
	.controller('accountListCtrl', function($scope, $stateParams, $log, sfrquery) {

		sfrquery.query("SELECT Id, Name, BillingAddress, Phone, Type FROM Account")
			.then(function(accounts) {
				$scope.accounts = _(accounts).select('Type').value();
				$scope.types = _(accounts).select('Type').pluck('Type').uniq().value();
			})
			.catch(function(e) {
				$log.error(e);
			});

	})