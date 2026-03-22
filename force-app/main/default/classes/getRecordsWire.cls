public with sharing class getRecordsWire {
    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords(String industry) {
      return [Select Id, Name,Industry from Account where Industry=:industry];
    }

}