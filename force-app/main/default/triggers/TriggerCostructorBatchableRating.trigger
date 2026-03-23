trigger TriggerCostructorBatchableRating on Rating__c (before update) {
   /* if(Trigger.isBefore && Trigger.isUpdate){
       
        Set<Id>ids=new Set<Id>{'a08fj00000Gd6E1AAJ','a08fj00000Gd67ZAAR'};
        
        BatchApexByConstructor b=new BatchApexByConstructor(ids);
        System.Database.executeBatch(b);  
    }*/
}