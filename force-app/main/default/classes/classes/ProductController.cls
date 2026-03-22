public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getRecords(){
        return [SELECT Name,Image__c,Description,(SELECT UnitPrice From PricebookEntries WHERE UseStandardPrice = true ) From Product2 WHERE ID  IN (SELECT Product2Id From PricebookEntry WHERE UseStandardPrice = true)];
    }
}