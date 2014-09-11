angular.module('ionicOne')
	.controller('accountContactsList', function($scope, $stateParams, $log, sfrquery) {
		$log.log('test', $stateParams);
		sfrquery.query("SELECT Id, Name, Title, AccountId FROM Contact WHERE AccountId = '" + $stateParams.accountId + "'")
			.then(function(contacts) {
				$scope.contacts = contacts;
			})
			.catch(function(e) {
				$log.error(e);
			});

	});