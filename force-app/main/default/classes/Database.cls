public class Database {
    public static void method(){
    List<Account>l1=[Select Name,NumberOfEmployees from Account];
    for(Account a:l1){
        System.debug('Name is->'+a.Name+' and NumberOfEmployees is->'+a.NumberOfEmployees);
    }
    }
}