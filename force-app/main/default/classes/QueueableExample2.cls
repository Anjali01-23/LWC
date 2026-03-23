public class QueueableExample2 implements Queueable {
    public void execute(QueueableContext qc){
        List<Account>list1=new List<Account>{new Account(name='Naaaaa re pritam pyare')};
        System.debug(list1);
        
    }
}