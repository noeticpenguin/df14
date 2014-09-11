public with sharing class ngAppController {

	Public Boolean useLocalResources {get; private set;}

	public ngAppController() {
		useLocalhostResources__c useLocal = useLocalhostResources__c.getValues('default');
		useLocalResources = useLocal.Use_Localhost_resources__c;
	}
}