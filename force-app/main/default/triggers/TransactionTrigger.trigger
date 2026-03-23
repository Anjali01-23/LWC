trigger TransactionTrigger on Transaction__c (after insert,after update, after delete) {
    if(Trigger.isAfter){
        if(Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete){
            TriggerHelper.newTransaction(Trigger.new);
        }
    }
}