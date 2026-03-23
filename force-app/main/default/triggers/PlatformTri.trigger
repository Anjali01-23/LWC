trigger PlatformTri on Order_Platform__e (after insert) {
 List<Order_Log__c>logList=new List<Order_Log__c>();
 for(Order_Platform__e o:Trigger.new){
   Order_Log__c ord=new Order_Log__c();
        ord.Amount__c=o.Amount__c;
        ord.CustomerName__c=o.CustomerName__c;
        ord.Name=o.OrderName__c;
        ord.Message__c=o.Message__c;
        ord.EventTime__c=o.EventTime__c;
        logList.add(ord);
 }
 System.debug(logList);
 insert logList;
}