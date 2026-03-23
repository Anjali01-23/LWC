public class BatchApexByConstructor implements Database.Batchable<sObject>, Database.Stateful{
 
    Set<Id>Rating_Id=new Set<Id>();
    public BatchApexByConstructor(Set<Id>Idss){
        this.Rating_Id=Idss;
    }
    public Database.QueryLocator start(Database.BatchableContext bc){
        return System.Database.getQueryLocator('Select Id,Rating_For__c from Rating__c where ID IN :Rating_Id');
    }
    
    public void execute(Database.BatchableContext bc,List<Rating__c>RatingList){
        for(Rating__c o:RatingList){
            o.Rating_For__c='Project';
        }
        update RatingList;
    }
    
    public void finish(Database.BatchableContext bc){
        //My this trigger is going in infinite loop so call it by Execute Batch.
    }
}