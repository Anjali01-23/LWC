public class OpportunityBatchClass_Q2 implements Database.Batchable<sObject>{
    public Database.QueryLocator start(Database.BatchableContext bc){
        Datetime targetDate=System.now().addHours(-23).addMinutes(-30).addSeconds(-30);
        return System.Database.getQueryLocator('Select StageName from Opportunity where isClosed=false and LastModifiedDate<:targetDate');
    }
    
    public void execute(Database.BatchableContext bc,List<Opportunity>OpportunityList){
        for(Opportunity o:OpportunityList){
            o.StageName='Closed Lost';
        }
        update OpportunityList;
    }
    
    public void finish(Database.BatchableContext bc){
        Datetime nexttimeRun=System.now().addMinutes(390);
        String cron=nexttimeRun.second()+' '+nexttimeRun.minute()+' '+nexttimeRun.hour()+' '+nexttimeRun.day()+' '+nexttimeRun.month()+' '+'?';
        System.schedule('ApexJob'+nexttimeRun.getTime(),cron,new ScheduleOpp_Q2());
    }
}