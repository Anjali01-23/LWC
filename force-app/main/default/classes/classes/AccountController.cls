public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Industry, NumberOfEmployees FROM Account WITH USER_MODE LIMIT 10];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Id id) {
        //Id accountId = (Id) id;
        return [SELECT Id, Name,Phone  FROM Contact WHERE AccountId = :id WITH USER_MODE LIMIT 10];
    }
    // PRactice Sheet 6
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList() {
        //Id accountId = (Id) id;
        return [SELECT Id,Subject,Status,Description,Priority,CreatedDate  FROM Case WITH USER_MODE];
    }

    @AuraEnabled
    public static List<Opportunity> getOpportunityList(String oppName) {
        //Id accountId = (Id) id;
        return [SELECT Id,Name,Account.Name,StageName  FROM Opportunity WHERE isClosed = false AND Name Like : oppName + '%' WITH USER_MODE];
    }
    @AuraEnabled
    public static List<Account> getAccountData(Map<String,String> filters){

        String query = 'SELECT Id,Name,Industry,Website,Phone,Rating FROM Account';
        Boolean check = true;
        for(String key : filters.keySet()){
            System.debug( key + '---> ' + filters.get(key));
            if(!String.isBlank(filters.get(key))){
                System.debug('Inside---> ' +  key + '---> ' + filters.get(key));
                if(check){
                    
                    query += ' WHERE ' + key + ' LIKE ' + '\'' +  filters.get(key)  + '%\' ' ;

                    System.debug('Query--> ' + query);
                    check=false;
                }else{
                    query += ' AND ' + key + ' LIKE '  + '\'' + filters.get(key)  + '%\' '; 
                }
            }
        }

        return Database.query(query);
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getRecordsOfAccount(){
        return [SELECT Id,Name,NumberOfEmployees,Phone,OwnerId,Owner.Name,BillingAddress,ParentId FROM Account];
    }
}