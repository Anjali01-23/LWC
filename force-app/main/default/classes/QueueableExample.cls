public class QueueableExample implements Queueable {
    public void execute(QueueableContext qc){
        List<Account>list1=new List<Account>{new Account(name='Aaa re pritam pyare')};
        System.debug(list1);
        QueueableExample2 q=new QueueableExample2();
        System.enqueueJob(q);
    }
}