public with sharing class CouponCartController {
    @AuraEnabled(cacheable = true)
    public static List<CouponCart__c> getRecords(){
        return [SELECT Name,Discount__c,Product_Name__c,Quantity__c FROM CouponCart__c];
    }
}