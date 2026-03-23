public class DynamicQuery {
    public static void method(){
    String s='Select name, Student_Email__c from Student__c';
    List<sObject>list1=System.Database.query(s);
    System.debug(list1);
        
    //Dynamically generate string    
    String s0='Select name ';
    String s1=', Student_Name__c ';
    String s2='From Student__c';
    s0=s0+s1+s2;
    List<sObject>list2=System.Database.query(s0);
    System.debug(list2);
    }
}