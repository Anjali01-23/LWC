public class DMLStatement {
    public static void method(){
        
        //Insert
       /* List<Account>accList=new List<Account>();
        for(integer i=1;i<=10;i++){
            accList.add(new Account(Name='Test Account'+i));
        }
        //insert accList;*/
        
        
        //Update
        //List<Account>accList=[Select name from Account where name like 'Test Account%'];
        
        /*for(Account a:accList){
            a.Name='Update '+a.Name;
        }
        update accList;*/
        
        
        //Upsert
        List<Account>accList=[Select name,NumberOfEmployees from Account where name like '%Test Account%'];
        /*for(integer i=1;i<=10;i++){
            accList.add(new Account(Name='Upsert Test Account Again'+i));
        }
        for(Account a:accList){
            a.NumberOfEmployees=200;
        }
        upsert accList;
    }*/
        
       //Delete
       //List<Account>accList=[Select name,NumberOfEmployees from Account where name like '%Test Account%' and isDeleted=True ALL ROWS];
       //delete accList;
        
       //Undelete
       //undelete accList;
        
        //Merge
        Account a=accList[2];
        Account b=accList[3];
        Account c=accList[4];
        Account d=accList[5];
        List<Account>mergeList=new List<Account>{b,c};
        merge a mergeList;
}
}