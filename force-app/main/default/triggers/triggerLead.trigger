trigger triggerLead on Lead (after insert) {
    if(Trigger.isAfter){
        if(Trigger.isInsert){
            TriggerHelper.method3(Trigger.new);
        }
    }
}