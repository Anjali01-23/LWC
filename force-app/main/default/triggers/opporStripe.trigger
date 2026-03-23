trigger opporStripe on Opportunity (after update) {
  if(Trigger.isAfter && Trigger.isUpdate){
        List<Opportunity>opp=Trigger.new;
        Map<Id,Opportunity>old=Trigger.oldMap;
        Set<Id>passOpp=new Set<Id>();
        for(Opportunity o:opp){
            Opportunity oldOpp=old.get(o.Id);
            if(oldOpp.StageName!='Closed Won' && o.StageName=='Closed Won' && o.HasOpportunityLineItem==true){
                passOpp.add(o.Id);
            }
        }
        apiStripe a=new apiStripe(passOpp);
        System.Database.executeBatch(a);
    }
}