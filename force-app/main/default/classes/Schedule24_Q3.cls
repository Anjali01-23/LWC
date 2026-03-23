public class Schedule24_Q3 implements Schedulable{
   public void execute(SchedulableContext sc){
      AssigningCase_Q3 a=new AssigningCase_Q3();
        System.Database.executeBatch(a,200);
    }
}