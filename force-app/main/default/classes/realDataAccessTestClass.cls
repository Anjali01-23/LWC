@isTest(SeeAllData=true)
public class realDataAccessTestClass {

    @isTest
    static void dataAccess(){
        Account a=new Account(name='Test vala h ye ');
        insert a;
        List<Account>listacc=[Select name from Account];
        System.debug(listacc.size());        
    }
    
   // @isTest(SeeAllData=false) It is not possible as we have given it as true at class level.
    static void dataAccess2(){
        List<Account>listacc=[Select name from Account];
        System.debug(listacc.size());        
    }
    
    
}