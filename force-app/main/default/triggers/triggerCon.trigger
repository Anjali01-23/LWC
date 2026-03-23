trigger triggerCon on Contact (after insert) {
    if(Trigger.isInsert && Trigger.isAfter){
        helper.method2(Trigger.newMap);
    }
}