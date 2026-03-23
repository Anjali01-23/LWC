public with sharing class OrderPlatform {
    @AuraEnabled(cacheable=true)
    public static List<Order_Log__c> getOrder(){
       return [Select Amount__c ,CustomerName__c,EventTime__c,Message__c,Name from Order_Log__c];
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