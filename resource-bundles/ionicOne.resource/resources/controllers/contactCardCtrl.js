angular.module('ionicOne')
	.controller('contactCardCtrl', function($scope, $stateParams, $log, sfrquery) {
		$log.log('state params in contactCardCtrl: ', $stateParams);
		sfrquery.query("SELECT Id, Name, Title, Phone, OtherPhone, Email, MailingAddress, Department, Description, Birthdate, AssistantName, AssistantPhone FROM Contact WHERE Id = '" + $stateParams.contactId + "'")
			.then(function(contact) {
				$scope.contact = contact[0];
				$log.log('Contact', $scope.contact);
			})
			.catch(function(e) {
				$log.error(e);
			});

	});