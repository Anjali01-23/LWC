trigger triggerCustomCase on Custom_Case__c (after insert,before update,before insert,after delete) {
    if(Trigger.isInsert && Trigger.isAfter){
        CustomCasetrigger.method();
    }
    else if(Trigger.isUpdate && Trigger.isBefore){
        CustomCasetrigger.method1(Trigger.new,Trigger.oldMap);
    }
    else if(Trigger.isInsert && Trigger.isBefore){
        CustomCasetrigger.method2(Trigger.new);
    }
    else if(Trigger.isDelete && Trigger.isAfter){
        CustomCasetrigger.method();
    }
    
}