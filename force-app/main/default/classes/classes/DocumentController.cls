public with sharing class DocumentController {
    
    @AuraEnabled(cacheable=true)
    public static List<Document__c> getRecords(){
        return [SELECT Name,Valid_To_Date__c,Valid_From_Date__c,isValid__c,Document_Type__c FROM Document__c];
    }
}