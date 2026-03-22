public with sharing class getRecordsImperative {
    @AuraEnabled
    public static List<sObject> getRecords(String searchName) {
      return [Select Id, Name,Industry from Account where name like :searchName+'%'];
    }

    @AuraEnabled
    public static string createRecords(String name, Integer NumEmployees) {
      Account a=new Account(name=name,NumberOfEmployees=NumEmployees);
      insert a;
      return a.Id;
      // List<Account>list1=[Select NumberOfEmployees from Account where name like 'L%'];

      // for(Account a:list1){
      //   a.NumberOfEmployees=2;
      // }
      // update list1;
      // return 'Ky hua';
    }

    @AuraEnabled
    public static List<sObject> getRecords22() {
      return [Select Id, Name,Industry,NumberOfEmployees from Account where isDeleted=false ALL ROWS];
    }

@AuraEnabled(cacheable=true)
    public static List<sObject> getRecords23(List<Id>AccId) {
      return [Select Id, Name,Account.Name,Email,Phone from Contact where AccountId IN :AccId];
    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords24() {
      return [Select Id,Subject,Status,	CreatedDate,Priority from Case];
    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords25(List<Id>CaseId) {
      return [Select Id,Subject,Status,	CreatedDate,Description,Priority from Case where Id IN:CaseId];
    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords26() {
      return [Select Id,Name,Amount,StageName from Opportunity where isClosed=False];
    }

    @AuraEnabled
    public static List<sObject> getRecordsSearch(string searchKey) {
      string searchK='%'+searchKey+'%';
      return [Select Id,Name,Amount,StageName from Opportunity where isClosed=False and (name like :searchK or StageName like :searchK)];
    }

    @AuraEnabled
    public static string UpdateRecords(List<Id>OppId,String stage) {
      List<Opportunity>oppList=[Select Id, StageName from Opportunity where Id IN:OppId];
      for(Opportunity o:oppList){
        o.StageName=stage;
      }
      update oppList;
      return 'Records Updated';
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getRecords27() {
      return [Select Count(Id)countt,Status from Case  where isClosed=false Group By Status] ;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact() {
      return [Select Name,Email,Account.Name,LeadSource from Contact] ;
    }

    @AuraEnabled(cacheable=true)
    public static List<Document__c> getDocument() {
      return [Select Name, isActive__c,Valid_from_Date__c,Valid_To_Date__c,	Document_Type__c from Document__c] ;
    }

    @AuraEnabled
    public static List<Document__c> getDocumentYear(List<Integer>years) {
      return [Select Name, isActive__c,Valid_from_Date__c,Valid_To_Date__c,	Document_Type__c from Document__c Where CALENDAR_YEAR(Valid_from_Date__c) IN :years] ;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAcc() {
      return [Select Name, NumberOfEmployees,Phone,Owner.Name,BillingCity,ParentId from Account] ;
    }


    @AuraEnabled
    public static List<Opportunity> getRecordsOppALL(String Picklist,String Value){
      String queryy='Select Id,Name,Account.Name,TotalOpportunityQuantity,Type,LeadSource,CreatedDate from Opportunity';
      if(Value!='All'){
       queryy+=' Where '+String.escapeSingleQuotes(Picklist)+' = \'' + Value+'\'' ;
      }
      
      System.debug(queryy);
      List<Opportunity>opp=System.Database.query(queryy);
      return opp;
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getRecordsOppHold() {
      return [Select Id,Name,StageName from Opportunity where isClosed=false];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getRecordsOppWon() {
      return [Select Id,Name,Account.Name,TotalOpportunityQuantity,Type,LeadSource,CreatedDate from Opportunity where StageName='Closed Won'];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getRecordsOppLost() {
      return [Select Id,Name,Account.Name,TotalOpportunityQuantity,Type,LeadSource,CreatedDate from Opportunity where StageName='Closed Lost'];
    }

    @AuraEnabled
     public static void updateRecordsOpp(List<Opportunity>updateList) {
     if(updateList!=null && !updateList.isEmpty()){
        update updateList;
     }
    }


    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts() {
        return [SELECT Id, FirstName, LastName, Email FROM Contact];
    }

    @AuraEnabled
    public static List<Contact> getAllContacts2(Integer pagesize,Integer pageNo){
        Integer offsetVal=(pageNo-1)*pagesize;
        return [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT :pagesize OFFSET :offsetVal];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getCount(){
      return [Select Count() from Contact];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountss(Integer limitSize, Integer offset){
        List<Account> accountList = [SELECT Id,Name,Rating
                                     FROM Account
                                     ORDER BY CreatedDate
                                     LIMIT :limitSize
                                     OFFSET :offset
                                     ];
        return accountList;
    }

    //Total Accounts
    @AuraEnabled(cacheable=true)
    public static Integer getCountAcc(){
      return [Select Count() from Account];
    }


    public static final Integer PAGE_SIZE = 5;

    // Initial Data
    @AuraEnabled(cacheable=true)
    public static List<Account> getInitialAccounts() {
        return [
            SELECT Id, Name, Industry, Rating
            FROM Account
            ORDER BY Name, Id
            LIMIT :PAGE_SIZE
        ];
    }

    // Load More Data (Keyset Pagination)
    @AuraEnabled
    public static List<Account> getMoreAccounts(String lastName, String lastId) {
        return [
            SELECT Id, Name, Industry, Rating
            FROM Account
            WHERE (Name > :lastName)
               OR (Name = :lastName AND Id > :lastId)
            ORDER BY Name, Id
            LIMIT :PAGE_SIZE
        ];
    }
    


}