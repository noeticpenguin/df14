@isTest
public class TriggerHandler_Tests {

	@isTest static void test_triggerHandlerBasicMethods() {
		TriggerHandler th = new TriggerHandler();

		th.setMaxLoopcount(0);
		th.clearMaxLoopCount();
		TriggerHandler.bypass('testTrigger');
		TriggerHandler.clearByPass('testTrigger');
		TriggerHandler.isBypassed('testTrigger');
		TriggerHandler.clearAllBypasses();
	}

	@isTest static void test_loopCountPrivateClass() {
		TriggerHandler.LoopCount lc = new TriggerHandler.LoopCount();
		lc.getCount();
		lc.setMax(2);
		System.assertEquals(lc.getCount(), 0, 'getCount not 0 before execution of trigger method!');
		System.assertEquals(2, lc.getMax());
	}

	@isTest static void test_Non_TriggerExecutionContext() {
		TriggerHandler lc = new TriggerHandler();
		Boolean didSuccessfullyTrapTriggerHandlerException = false;
		try {
			lc.validateRun();
		} catch (TriggerHandler.TriggerHandlerException the) {
			didSuccessfullyTrapTriggerHandlerException = true;
		}
		System.assert(didSuccessfullyTrapTriggerHandlerException, 'expected a non-trigger execution error and did not get one');
	}

}