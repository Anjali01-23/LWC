public class AssigningCase_Q3 implements Database.Batchable<sObject>, Database.Stateful {
    public List<User>supportAgents;
    public Integer index=0;
    public AssigningCase_Q3 (){
       supportAgents=[Select Id from User where Profile.name='Support Agent' and IsActive=true LIMIT 10];
    }
    public Database.QueryLocator start(Database.BatchableContext bc){
        return System.Database.getQueryLocator('Select Id,OwnerId from Case where isClosed=false ');
    }
    public void execute(Database.BatchableContext bc,List<Case>CaseList){
        if(supportAgents.isEmpty())return ;
        List<Case>casess=new List<Case>();
        for(Case c:CaseList){
            c.OwnerId=supportAgents[index].id;
            casess.add(c);
            index=Math.Mod(index+1,supportAgents.size());
        }
        System.Database.update(casess,false);
    }
    
    public void finish(Database.BatchableContext bc){
       
    }
}