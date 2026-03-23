@isTest
public class testStartStop {
    @isTest static void testStartAndStop(){
        Batch__c a=new Batch__c(name='9:30',Course__c='a04fj000001BNwnAAG');
        insert a;
        
        Test.startTest();
        Batch__c a1=new Batch__c(name='7:30',Course__c='a04fj000001BNwnAAG');
        insert a1;
        Test.stopTest();
        
        Batch__c a2=new Batch__c(name='5:30',Course__c='a04fj000001BNwnAAG');
        insert a2;
    }
}