public class MapPracticeAssignment {
 public static Map<String, Contact> getContactMapByEmail() {
   List<Contact>list1=[Select FirstName, LastName, Email from Contact Where Email!=NULL];
     Map<String,Contact>mpp=new Map<String,Contact>();
     for(Contact c:list1){
         mpp.put(c.Email,c);
     }
     return mpp;
 }
    public static Map<String, List<Account>> getAccountMapByIndustry() {
        List<Account>acc=[Select Name,NumberOfEmployees,Industry from Account where Industry!=NULL];
        Map<String,List<Account>> mpp=new Map<String,List<Account>>();
        for(Account a:acc){
            mpp.put(a.Industry,new List<Account>());
        }
        for(Account a:acc){
            mpp.get(a.Industry).add(a);
        }
        return mpp;
    }
    
    public static Map<String,List<Contact>> groupContactsByFirstLetter() {
        List<Contact>con=[Select FirstName,LastName, Email from Contact where FirstName!=NULL];
        Map<String,List<Contact>>mpp=new Map<String,List<Contact>>();
        for(Contact c:con){
            String s1=c.FirstName;
            String s=c.FirstName.substring(0,1);
            if(!mpp.containsKey(s)){
                mpp.put(s,new List<Contact>{c});
            }
            else{
                mpp.get(s).add(c);
            }
        }
        return mpp;
    }

    public static Map<String, Decimal> calculateStageAmounts() {
        List<Opportunity>opp1=[Select StageName, Amount from Opportunity];
        Map<String, Decimal>mpp=new Map<String, Decimal>();
        for(Opportunity o:opp1){
            Decimal amt=0;
            for(Opportunity o1:opp1){
                if(o.StageName==o1.StageName){
                    amt+=o1.Amount;
                }
            }
            mpp.put(o.StageName,amt);
        }
        return mpp;
    }

    public static Map<String,List<Opportunity>>groupOpportunitiesByLeadSourceAndStage(){
        List<Opportunity>opportunity1=[Select Name,LeadSource,StageName from Opportunity where LeadSource!=NULL AND StageName!=NULL];
        Map<String,List<Opportunity>>mpp=new Map<String,List<Opportunity>>();
        for(Opportunity o:opportunity1){
            String s=o.LeadSource+'-'+o.StageName;
            if(!mpp.containsKey(s)){
                mpp.put(s,new List<Opportunity>{o});
            }
            else{
                mpp.get(s).add(o);
            }
        }
        return mpp;
    }
    
    public static Map<String, List<Lead>> groupLeadsByStatus() {
        Map<String,List<Lead>>mpp=new Map<String,List<Lead>>();
        List<Lead>lead1=[Select FirstName, LastName, Email, Status from Lead WHERE Status!=NULL];
        for(Lead l:lead1){
            if(!mpp.containsKey(l.Status)){
                mpp.put(l.Status,new List<Lead>{l});
            }
            else{
                mpp.get(l.Status).add(l);
            }
        }
        return mpp;
    }

    public static Map<String, List<Bank_Account__c>> getBankAccountsByRecordType(){
        Map<String, List<Bank_Account__c>>mpp=new Map<String, List<Bank_Account__c>>();
        List<Bank_Account__c>bankAccount=[Select Name,Branch__r.Name,Account_Type__c,RecordTypeId from Bank_Account__c];
        for(Bank_Account__c b:bankAccount){
            if(!mpp.containsKey(b.RecordTypeId)){
                mpp.put(b.RecordTypeId,new List<Bank_Account__c>{b});
            }
            else{
                mpp.get(b.RecordTypeId).add(b);
            }
        }
        return mpp;
    }

    public static Map<String, List<Case>> getCasesByPriority() {
        Map<String, List<Case>>mpp=new Map<String, List<Case>>();
        List<Case>case1=[Select Priority,CaseNumber from Case];
        for(Case c1:case1){
             if(!mpp.containsKey(c1.Priority)){
                mpp.put(c1.Priority,new List<Case>{c1});
            }
            else{
                mpp.get(c1.Priority).add(c1);
            }
        }
        return mpp;
    }

    public static Map<String, Integer> buildStudentMap(){
        Map<String,Integer>mpp=new Map<String,Integer>();
        List<Student__c>stud=[Select Student_Name__c, Student_Email__c , CreatedBy.Name from Student__c];
        for(Student__c s:stud){
            Integer i=0;
            for(Student__c s1:stud){
                if(s.CreatedBy==s1.CreatedBy){
                    i++;
                } 
            }
            mpp.put(s.CreatedBy.Name,i);
        }
        return mpp;
    }
   public static Map<String, List<Account>> buildAccountMap() {
       Map<String,List<Account>>mpp=new Map<String,List<Account>>();
       List<Account>account1=[Select Name, AccountNumber, BillingCountry from Account where BillingCountry!=NULL];
       for(Account a:account1){
           if(!mpp.containsKey(a.BillingCountry)){
                mpp.put(a.BillingCountry,new List<Account>{a});
            }
            else{
                mpp.get(a.BillingCountry).add(a);
            }
       }
       return mpp;
   }
    public static Map<String, List<Contact>> getContactsByMailingState() {
        Map<String, List<Contact>>mpp=new Map<String, List<Contact>>();
        List<Contact>contact2=[Select Name,Account.Name, MailingState from Contact where MailingState!=NULL];
        for(Contact c3:contact2){
            if(!mpp.containsKey(c3.MailingState)){
                mpp.put(c3.MailingState,new List<Contact>{c3});
            }
            else{
                mpp.get(c3.MailingState).add(c3);
            }
       }
        return mpp;
    }
    public static Map<Id, List<Faculty__c>> getFacultyByOwner() {
        Map<Id, List<Faculty__c>>mpp=new Map<Id, List<Faculty__c>>();
        List<Faculty__c>faculty1=[Select Name, Faculty_Email__c, OwnerId from Faculty__c];
        for(Faculty__c f:faculty1){
          if(!mpp.containsKey(f.OwnerId)){
                mpp.put(f.OwnerId,new List<Faculty__c>{f});
            }
            else{
                mpp.get(f.OwnerId).add(f);
            }
        }
        return mpp;
    }


}