@isTest
public class TestClassOfCalc {
    
    @isTest
    static void testadd(){
        testClassCalculator c=new testClassCalculator(10,20);
        c.add();
        
       Integer res=c.getResult();
        System.assertEquals(30,res);
    }
    
    static testmethod void testsubtract(){
        testClassCalculator c=new testClassCalculator(40,20);
        c.subtract();
        
       Integer res=c.getResult();
        System.assertEquals(20,res);
    }
    
    static testmethod void privateVisible(){
        testClassCalculator c=new testClassCalculator(4,2);

        Integer privateVariable=c.privateinteger;
        c.privateMethod();
        System.assertEquals(0,privateVariable,'Wrong privateVariable value');
    }
}