public with sharing class getStudentRecords {
    @AuraEnabled
    public static List<Student__c> getRecords(String name){
        List<Student__c> stuList= [SELECT Name FROM Student__c WHERE Name like :name+'%'];
        return stuList;
    }

    @AuraEnabled
    public static List<Account> getRecord(){
        List<Account> stuList= [SELECT Name,Phone FROM Account];
        return stuList;
    }
}