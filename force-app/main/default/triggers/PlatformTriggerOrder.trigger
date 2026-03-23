trigger PlatformTriggerOrder on Order11__c (after insert,after update) {
    if(Trigger.isInsert && Trigger.isAfter){
        PlatformTriggerClass.method1(Trigger.new);
    }
    else if(Trigger.isUpdate && Trigger.isAfter){
        PlatformTriggerClass.method2(Trigger.new);
    }
}