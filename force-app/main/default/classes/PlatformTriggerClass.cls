public class PlatformTriggerClass {
    public static void method1(List<Order11__c>orderList){
        System.debug('List1');
        List<Order_Platform__e>list1=new List<Order_Platform__e>();
        for(Order11__c o:orderList){
        Order_Platform__e ord=new Order_Platform__e();
        ord.Amount__c=o.Amount__c;
        ord.CustomerName__c=o.CustomerName__c;
        ord.OrderName__c=o.Name;
        ord.Source__c=o.Source__c;
        ord.Status__c=o.Status__c;
        ord.Message__c='Record Created';
        ord.EventTime__c=System.now();
        System.debug('order'+ord);

        list1.add(ord);
        
        }
        System.debug('List'+list1);
        EventBus.publish(list1);
        
    }
    
    
    public static void method2(List<Order11__c>orderList){
        List<Order_Platform__e>list1=new List<Order_Platform__e>();
        for(Order11__c o:orderList){
        Order_Platform__e ord=new Order_Platform__e();
        ord.Amount__c=o.Amount__c;
        ord.CustomerName__c=o.CustomerName__c;
        ord.OrderName__c=o.Name;
        ord.Source__c=o.Source__c;
        ord.Status__c=o.Status__c;
        ord.Message__c='Record Updated';
        ord.EventTime__c=System.now();
        list1.add(ord);
        }
        
        EventBus.publish(list1);
        
    }
}