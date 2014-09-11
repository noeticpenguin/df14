@isTest
public class OpportunityTriggerHandler_Tests {
	@isTest static void test_before_insert_validations() {
		List<Opportunity> opps = testUtils.getNOpportunities(195, false);
		for (Opportunity O : opps) {
			o.Amount = 995.00;
		}

		Boolean didProperlyFailValidations = false;
		Test.startTest();
		try {
			insert opps;
		} catch (DMLException dmle) {
			didProperlyFailValidations = true;
		}
		Test.stopTest();
		System.assert(didProperlyFailValidations, 'Expected a DML Exception, as validation method requires ammount > 1000');
	}

	@isTest static void test_after_update() {
		List<Opportunity> opps = testUtils.getNOpportunities(195, false);
		for (Opportunity O : opps) {
			o.Amount = 1195.00;
		}

		insert opps;

		Test.startTest();
		for (Opportunity O : opps) {
			o.Amount = 3195.00;
		}
		update opps;
		Test.stopTest();
	}

	@isTest static void test_hitMaxLoopCount() {
		List<Opportunity> opps = testUtils.getNOpportunities(195, false);
		Boolean didProperlyHitMaxLoopCount = false;
		for (Opportunity O : opps) {
			o.Amount = 1195.00;
		}

		insert opps;

		OpportunityTriggerHandler oth = new OpportunityTriggerHandler();
		oth.triggerNew = opps;
		oth.setMaxLoopCount(2);
		Test.startTest();
		try {
			oth.addToLoopCount();
			oth.addToLoopCount();
			oth.afterUpdateHitsMaxLoopCount();
		} catch (Exception e) {
			system.debug('Properly hit Max Loop Count. Error is: ' + e.getMessage());
			didProperlyHitMaxLoopCount = true;
		}
		Test.stopTest();
		System.assert(didProperlyHitMaxLoopCount, 'Expected a max loop count error.');
	}

	@isTest static void test_callingIsDeleteMethods() {
		List<Opportunity> opps = testUtils.getNOpportunities(195, true);
		delete opps;
		undelete opps;
	}

	@isTest static void exercise_UnusedContextMethods() {
		// *********************
		// THIS IS NOT A UNIT TEST
		// IT EXISTS FOR THE SOLE PURPOSE OF CALLING ALL THE CONTEXT METHODS
		// WHICH, SHORT OF HAVING A FAR MORE EXHAUSTIVE SET OF TRIGGERS
		// IS THE ONLY WAY TO EXERCISE PARTS OF THE TRIGGERHANDLER.CLS
		//
		// DO NOT DEPLOY THIS TO PRODUCTION.
		// *********************
		OpportunityTriggerHandler oth = new OpportunityTriggerHandler();
		oth.beforeUpdate();
		oth.afterInsert();
	}

}