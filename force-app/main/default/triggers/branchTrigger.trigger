trigger branchTrigger on Branch__c (after update) {
    if(Trigger.isAfter && Trigger.isUpdate){
        Map<Id,Branch__c>oldBranch=Trigger.oldMap;
        List<Branch__c>onlyInactive=new List<Branch__c>();
        for(Branch__c b:Trigger.new){
            Branch__c b1=oldBranch.get(b.Id);
            if(b1.isActive__c!='Inactive' && b.isActive__c=='Inactive'){
               onlyInactive.add(b);
            }
        }
        if(!onlyInactive.isEmpty()){
        TriggerHelper.activeUpdate(onlyInactive);
        }
            
    }
}