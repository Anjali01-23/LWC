public with sharing class OrderPlatform {

    @AuraEnabled(cacheable=true)
    public static List<Order_Log__c> getOrder(){
        return [
            SELECT Id, Name, CustomerName__c, Amount__c, Message__c, EventTime__c
            FROM Order_Log__c
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static Order_Log__c getLatestLog(String orderName) {
        return [
            SELECT Id, Name, CustomerName__c, Amount__c, Message__c, EventTime__c
            FROM Order_Log__c
            WHERE Name = :orderName
            ORDER BY CreatedDate DESC
            LIMIT 1
        ];
    }
}