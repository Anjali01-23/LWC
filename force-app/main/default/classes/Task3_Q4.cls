public class Task3_Q4 {
    public static void  createTask(){
        User adminUser = [SELECT Id FROM User WHERE Profile.Name = 'System Administrator' AND IsActive = true and name='Anjali Goyal' LIMIT 1];
        Task t=new Task();
        t.Subject='Review and verify the new created Accounts and Contactsssss';
        t.OwnerId=adminUser.Id;
        System.Database.insert(t,false);
        System.debug(t.Id);
    }
}