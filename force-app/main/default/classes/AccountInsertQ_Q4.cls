public class AccountInsertQ_Q4 implements Queueable {
    public void execute(QueueableContext qc){
        List<Account>accList=new List<Account>();
        for(integer i=0;i<2;i++){
            accList.add(new Account(name='AccountQueuablee'+i));
        }
        System.Database.insert(accList,false);
        ContactInsertQ_Q4 c=new ContactInsertQ_Q4();
        System.enqueuejob(c);
    }
}