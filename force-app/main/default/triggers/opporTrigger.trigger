trigger opporTrigger on Opportunity (before insert,before update) {
   /* if(Trigger.isBefore && Trigger.isInsert){
        TriggerHelper.duplicacyCheck(Trigger.new);
    }
    else if(Trigger.isBefore && Trigger.isUpdate){
        Map<Id,Opportunity>oldrec=Trigger.oldMap;
        List<Opportunity>oppor=new List<Opportunity>();
        for(Opportunity o:Trigger.new){
            if(oldrec.get(o.Id).StageName!=o.StageName){
                oppor.add(o);
            }
        }
        if(!oppor.isEmpty()){
           TriggerHelper.taskRelated(oppor);
        }        
    }*/
}