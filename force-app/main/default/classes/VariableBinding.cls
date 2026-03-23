public class VariableBinding {
    public static void method(String Name){
        List<Student__c>list1=[Select Student_Name__c , Course_Opted__c from Student__c where Student_Name__c=:Name];
        List<Student__c>list2=[Select Student_Name__c , Course_Opted__c from Student__c where Student_Name__c='Anjali Goyal'];
        for(Student__c s:list1){
            System.debug(s.Student_Name__c+'--->'+s.Course_Opted__c);
        }
        for(Student__c s:list2){
            System.debug(s.Student_Name__c+'--->'+s.Course_Opted__c);
        }
    }
}