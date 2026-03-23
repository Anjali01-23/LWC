public class RelationShipQuery {
    public static void method(){
        //Child to parent
        /*List<Contact>list1=[Select name, Department , Account.name,Account.NumberOfEmployees from Contact];
        List<Rating__c>list2=[Select name, Rating_of_Student__r.name,Rating_of_Student__r.Student_Email__c from Rating__c];*/
        
        //Parent to child
        /*List<Account>list1=[Select name,NumberOfEmployees,(Select name from Contacts) from Account];
        List<Student__c>list2=[Select name , Student_Name__c ,(Select name from Ratings__r)from Student__c];*/
        
        //Multi level Reln
        List<OpportunityLineItem>list1=[Select name,Opportunity.name,Opportunity.Account.Name from OpportunityLineItem];
    }
}