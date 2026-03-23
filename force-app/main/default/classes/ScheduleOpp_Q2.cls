public class ScheduleOpp_Q2 implements Schedulable{
    public void execute(SchedulableContext sc){
        OpportunityBatchClass_Q2 o=new OpportunityBatchClass_Q2();
        System.Database.executeBatch(o);
    }
}