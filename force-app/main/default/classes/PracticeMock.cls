public class PracticeMock {
    public static void main(){
  Account a=new Account();
  Database.saveResult res=System.Database.insert(a,false);
   
  System.debug(res.getId());
   
}
}