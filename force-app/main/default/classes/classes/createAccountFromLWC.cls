public with sharing class createAccountFromLWC {
    @AuraEnabled
    public static string createAccount(String name){
        Account a = new Account(Name=name);
        insert a;
        return (String)a.Id;
    }
}