@isTest
public class testSetupClass {

    @TestSetup
    static void setupMethod(){
        List<Account>acc=new List<Account>(2);
        for(integer i=0;i<2;i++){
         Account a=new Account(name='TestSetup'+i,NumberOfEmployees=100);
            acc[i]=a;
        }
        insert acc;
    }
    
    @isTest
    static void setupTestmethod(){
        Account a=[Select name , NumberOfEmployees from Account where name='TestSetup0' LIMIT 1];
        a.NumberOfEmployees=2000;
        update a;
        System.debug(a);
    }
    
    @isTest
    static void setupTestmethod2(){
        Account a=[Select name , NumberOfEmployees from Account where name='TestSetup0' LIMIT 1];
        System.debug(a);
    }
}