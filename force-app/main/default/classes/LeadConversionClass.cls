public class LeadConversionClass {
    /*public static void method(List<Lead>convertLead){
        List<Contact>addiCon=[Select Id,Lead__r.Id from Contact where Lead__r.Id IN :convertLead];
        Map<Id,Id>AccLead=new Map<Id,Id>();
        for(Lead l:convertLead){
            AccLead.put(l.Id,l.ConvertedAccountId);
        }
        for(Contact c:addiCon){
            c.AccountId=AccLead.get(c.Lead__r.Id);
            c.Lead__c=NULL;
        }
        update addiCon;
    }*/
}