public class BatchApexExample implements Database.Batchable<sObject>,Schedulable,Database.Stateful{
    public Integer successcount=0;
    public Database.QueryLocator start(Database.BatchableContext bc){
        return System.Database.getQueryLocator('Select Id, Name from Account');
    }
    public void execute(Database.BatchableContext bc,List<Account>accList){
        System.debug(accList.size());
        for(Account a: accList){
            a.name=a.name+'-BatchAPEX';
        }
       List<Database.saveResult> saves=System.Database.update(accList,false);
       for(Database.saveResult s:saves){
            if(s.isSuccess()){
                successcount++;
            }  
        }
    }
    public void finish(Database.BatchableContext bc){  
        
        AsyncApexJob async=[Select Id, status, NumberOfErrors,TotalJobItems from AsyncApexJob where Id=:bc.getJobId()];//here by bc.getJobId() it will return only data of current Job and not of all Jobs.
        Messaging.SingleEmailMessage sem=new Messaging.SingleEmailMessage();
        List<string>emailAddress=new List<String>{'anjaligoyal@cyntexa.com'};
        sem.toaddresses=emailAddress; //toaddresses is a variable.
        sem.setSubject('Batch Job Completed');
        sem.plaintextbody='Total batches-'+async.TotalJobItems;
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{sem});
    }
    public void execute(SchedulableContext sc){
        BatchApexExample bae=new BatchApexExample();
        System.Database.executeBatch(bae,10);
    }
}