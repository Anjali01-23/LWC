public with sharing class fieldSetController {
    
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getFieldSetFields(String objectName, String fieldSetName) {
        
        List<Map<String, String>> fieldList = new List<Map<String, String>>();
        
        Schema.SObjectType objType = Schema.getGlobalDescribe().get(objectName);
        Schema.FieldSet fieldSet = objType.getDescribe().fieldSets.getMap().get(fieldSetName);
        
        for (Schema.FieldSetMember f : fieldSet.getFields()) {
            Map<String, String> fieldMap = new Map<String, String>();
            fieldMap.put('label', f.getLabel());
            fieldMap.put('fieldName', f.getFieldPath());
            fieldList.add(fieldMap);
        }
        
        return fieldList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpp(){
       return [Select Name , Type ,Email__c,CloseDate,LeadSource, Id, AccountId,Account.Name,TotalOpportunityQuantity,StageName from Opportunity];
    }
}