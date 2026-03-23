public class ContactInsertQ_Q4 implements Queueable {
    public void execute(QueueableContext qc){
        List<Contact>conList=new List<Contact>();
        for(integer i=0;i<2;i++){
            conList.add(new Contact(Lastname='ContactQueuable'+i));
        }
        System.Database.insert(conList,false);
        System.enqueuejob(new SysAdminReviewQ_Q4 ());
    }
}