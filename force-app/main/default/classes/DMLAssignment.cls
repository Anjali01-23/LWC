public class DMLAssignment {
    public static void appendingName(){
        List<Student__c>student1=[Select Student_Name__c, Id from Student__c where Name like 'S%'];
        Integer i=student1.size();
        for(integer j=1;j<=i;j++){
            student1[j-1].Student_Name__c=student1[j-1].Student_Name__c+'Test'+j;
        }
        System.Database.update(student1,false);
    }
    
    public static void createOpportunitiesWithoutLinks(){
        List<Account>accounts=[Select Name, Id from Account where Id NOT IN (Select AccountId from Opportunity)];
        List<Opportunity>opp=new List<Opportunity>();
        for(Account a: accounts){
            String str=a.name+' First Opportunity';
            Opportunity opp1=new Opportunity(name=str, AccountId=a.Id,StageName='Closed Won',CloseDate=Date.today());
            opp.add(opp1);
        }
        insert opp;
    }
    
    public static void manipulateAccountAndContact(){
        Savepoint sp1=System.Database.setSavePoint();
        try{
        Account a=new Account(name='Unive Container');
        insert a;
        Contact c=new Contact(LastName='Carter Last',AccountId=a.Id);
        insert c;
        delete a;
       undelete a; 
        }
        catch(exception e){
            System.Database.rollback(sp1);
        }
    }
    
    public static void deleteStudentsWithSecondLetterR(){
        List<Student__c>student2=[Select First_Name__c from Student__c where First_Name__c like '_r%' and isDeleted=TRUE ALL ROWS];
        System.Database.emptyRecycleBin(student2);
    }
    
    public static void undeleteStudentsDeletedByDemoUser(Date dateValue1 ,Date dateValue2){
        List<Student__c>student2=[Select Id , LastModifiedDate from Student__c where LastModifiedDate>= :dateValue1 and LastModifiedDate<= :dateValue2 and LastModifiedBy.Name='SalesForce Demo' and isDeleted=true ALL ROWS];
          System.debug(student2);
      System.Database.undelete(student2);
    }

    public static void insertAccountContactRecords(){
        Account a=new Account(Company_Email__c='CompanyEmail@gmail.com');
        Account a1=new Account(name='Test Account',Company_Email__c='CompanyEmail@gmail.com');
        Contact c=new Contact(Lastname='Doe',Account=a);
        List<sObject>list1=new List<sObject>{a1,c};
        insert list1;
    } 
    
    public static List<sObject> insertAndCreateRelatedRecords(){
        List<sObject>allObject=new List<sObject>();
        List<Account>accounts1=new List<Account>();
        for(integer i=1;i<=5;i++){
            Account a=new Account(name='Account For Test'+i);
            accounts1.add(a);
        }
        System.Database.insert(accounts1,false);
        List<Contact>contact1=new List<Contact>();
        for(Account acc:accounts1){
            Contact a=new Contact(LastName='Contact-'+acc.name,AccountId=acc.Id );
            contact1.add(a);
        }
        System.Database.insert(contact1,false);
        List<Opportunity>Opportunity1=new List<Opportunity>();
        for(Account acc:accounts1){
            Opportunity a=new Opportunity(name='Opportunity-'+acc.name,CloseDate=Date.today(),StageName='Closed Won',AccountId=acc.Id);
            Opportunity1.add(a);
        }
        System.Database.insert(Opportunity1,false);
        PriceBook2 p=[Select Id from PriceBook2 where name='Standard Price Book' and IsStandard=true and IsActive=true LIMIT 1];
        Product2 product1=[Select Id from Product2 where name='GenWatt Diesel 10kW'and IsActive=true LIMIT 1];
        PricebookEntry pb=[Select Id,UnitPrice from PricebookEntry where IsActive=true and 	Pricebook2Id=:p.Id and Product2Id=:product1.Id LIMIT 1];
        for(Opportunity oppur:Opportunity1){
            oppur.Pricebook2Id=p.id;
        }
        update Opportunity1;
        List<OpportunityLineItem>oppLineItem=new List<OpportunityLineItem>();
        for(Opportunity oppur:Opportunity1){
           OpportunityLineItem o1=new OpportunityLineItem(OpportunityId=oppur.Id,PricebookEntryId=pb.Id,Quantity=1,UnitPrice=pb.UnitPrice);
           oppLineItem.add(o1);
        }      
        System.Database.insert(oppLineItem,false);
        allObject.addAll(accounts1);
        allObject.addAll(contact1);
        allObject.addAll(Opportunity1);
        allObject.addAll(oppLineItem);
        System.debug(accounts1);
        System.debug(contact1);
        System.debug(Opportunity1);
        System.debug(oppLineItem);
        return allObject;
    }
    
    public static void deleteOpp(){
        List<AggregateResult>opp=[Select AccountId from Opportunity where StageName NOT IN ('Closed Won', 'Closed Lost') GROUP BY AccountId Having Count(Id)>2];
        List<AggregateResult>opp1=[Select AccountId from Opportunity where StageName IN ('Closed Won', 'Closed Lost') GROUP BY AccountId Having Count(Id)>0];
        Set<Id>set1=new Set<Id>();
        Set<Id>set2=new Set<Id>();
        for(AggregateResult a:opp){
            set1.add((Id)a.get('AccountId'));
        }
        for(AggregateResult a:opp1){
            set2.add((Id)a.get('AccountId'));
        }
        set1.removeAll(set2);
        List<Account>acc=[Select Id from Account where Id IN:set1];
        System.debug(acc);
        System.Database.delete(acc,false);
    }
    
    public static Integer totalRecordsInObject(String objectName){
        String DynamicSoql='Select Count() from '+objectName;
        Integer count=System.Database.countquery(DynamicSoql);
        System.debug(count);
        return count;
    }
    public static void rollbackStudentRecords(List<Student__c> stdToInsertList){
        Savepoint sp1=System.Database.setSavePoint();
            Database.saveResult[] saves=System.Database.insert(stdToInsertList,false);
            Integer mainList=stdToInsertList.size();
            Integer successList=0;
            for(Database.saveResult s: saves){
                if(s.isSuccess()){
                    successList++;
                }
            }
            if(successList<0.8*mainList){
                System.debug('Insertion is less than 80%');
                System.Database.rollback(sp1);
            }
        }
        //Student__c s1=new Student__c(Student_Name__c='Rana',Course_Opted__c='Python',Student_Phone__c='8955264102',Student_Email__c='anhu@gmail.com');
}