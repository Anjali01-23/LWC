trigger bankAccountTrigger on Bank_Account__c (after insert,before delete) {
    if(Trigger.isAfter){
        if(Trigger.isInsert){
            TriggerHelper.totalAccounts(Trigger.new);
        }
    }
    else if(Trigger.isBefore){
        if(Trigger.isDelete){
            TriggerHelper.DeleteBankAccounts(Trigger.old);
        }
    }
}