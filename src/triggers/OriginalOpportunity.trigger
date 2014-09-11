trigger OriginalOpportunity on Opportunity (after update) {

	//List<id> accountIds = new List<id>();

	//for (Opportunity o : trigger.new) {
	//  accountIds.add(o.AccountId);
	//}

	//Map<Id, Account> affectedAccounts = new Map<Id, Account>([SELECT id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode,
	//    BillingCountry, BillingLatitude, BillingLongitude FROM Account WHERE Id in: accountIds]);

	//for (Opportunity o : trigger.new) {
	//  Account a = affectedAccounts.get(o.AccountId);
	//  if (a.BillingState == 'tx') {
	//    o.amount = o.amount + .37;
	//  }
	//}

	//update trigger.new;

}