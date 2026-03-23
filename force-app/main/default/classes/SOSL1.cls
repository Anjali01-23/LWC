public class SOSL1 {
    public static void method(){
        List<List<sObject>>list1=[Find 'John' in Name fields Returning Account(Name,NumberOfEmployees Where NumberOfEmployees>1000) , Contact(Name,Lastname Limit 1) ];
        List<Account>Acc=list1[0];
        List<Contact>Con=list1[1];
        for(Account a:Acc){
            System.debug(a.Name+'---->'+a.NumberOfEmployees);
        }
        for(Contact a:Con){
            System.debug(a.Name+'---->'+a.Lastname);
        }
    }
}