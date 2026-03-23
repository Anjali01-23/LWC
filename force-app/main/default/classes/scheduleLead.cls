public class scheduleLead implements Schedulable{
 public void execute(SchedulableContext sc){
        BulkPhoneEnquiryLeadsConvertion b=new BulkPhoneEnquiryLeadsConvertion();
        System.Database.executeBatch(b);
    }
}