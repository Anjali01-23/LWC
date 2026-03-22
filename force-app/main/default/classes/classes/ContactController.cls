public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getRecords(List<Id> AccountId){
        return [SELECT Name,Account.Name,Birthdate,Email,MobilePhone,Department FROM Contact WHERE AccountId IN : AccountId];
    }
}