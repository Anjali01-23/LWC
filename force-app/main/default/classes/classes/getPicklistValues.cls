public with sharing class getPicklistValues {
    @AuraEnabled
    public static List<String> getValues(String pickName){
        String objName='Opportunity';
        Map<String,sObjectField> m1 = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
        List<PicklistEntry> pE = m1.get(pickName).getDescribe().getPicklistValues();
        List<String> pickValues = new List<String>();
        for(PickListEntry p:pE){
            pickValues.add(p.getValue());
        }
        return pickValues;
    }
}