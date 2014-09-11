public class OpportunityTriggerHandler extends TriggerHandler {

	@testVisible private Map<Id, Opportunity> triggerNewMap;
	@testVisible private List<Opportunity> triggerNew;

	public OpportunityTriggerHandler() {
		this.setMaxLoopCount(5);
		this.triggerNew = (List<Opportunity>) Trigger.new;
		this.triggerNewMap = (Map<Id, Opportunity>) Trigger.newMap;
	}

	/****************************************
	* context method overrides
	****************************************/

	protected override void beforeInsert() {
		runValidations();
	}

	protected override void afterUpdate() {
		TriggerHandler.bypass('OpportunityTriggerHandler');
		List<Opportunity> opps = [SELECT Id FROM Opportunity WHERE Id IN :Trigger.newMap.keyset()];
		update opps;
		TriggerHandler.clearBypass('AccountTriggerHandler');
	}

	@testVisible private void afterUpdateHitsMaxLoopCount() {
		// No operation method that is only visible or called during tests.
	}

	// as yet unused Context methods.
	@testVisible protected override void beforeUpdate() {}
	@testVisible protected override void beforeDelete() {}
	@testVisible protected override void afterInsert() {}
	@testVisible protected override void afterDelete() {}
	@testVisible protected override void afterUndelete() {}


	/****************************************
	* private processing methods
	****************************************/

	private void runValidations() {
		for (Opportunity o : (List<Opportunity>) Trigger.new) {
			if (o.Amount < 1000) {
				o.Amount.addError('Opportunities must be over $1000!');
			}
		}
	}

}