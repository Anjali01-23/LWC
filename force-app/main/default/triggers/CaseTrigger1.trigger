trigger CaseTrigger1 on Case (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        TriggerHelper.caseCreation(Trigger.new);
    }
}