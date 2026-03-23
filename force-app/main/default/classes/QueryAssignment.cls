public class QueryAssignment {
    public static List<AggregateResult>getClosedOpportunitySumByFiscalYear(){
        List<AggregateResult>l1=new List<AggregateResult>();
        Id userId=UserInfo.getUserId() ;
        l1=[Select FISCAL_YEAR(CreatedDate), SUM(Amount)from Opportunity where StageName='Closed Won' AND OwnerId=:userId
                              Group By FISCAL_YEAR(CreatedDate)];
        System.debug(l1);
        return l1;
    }
    
    public static List<Opportunity>fetchOpportunitiesBetweenDates(Date firstDate, Date secondDate){
        List<Opportunity>opportunity1=[Select name from Opportunity where CloseDate>=:firstDate AND CloseDate<=:secondDate AND Owner.Name='Saurman D\'souza'];
        System.debug(opportunity1);
        return opportunity1;
    }
    
    public static List<Account> fetchAccountsWithRelatedData(){
        List<Account>account1=[Select name, AccountNumber, (Select name,Amount FROM Opportunities) , (Select name,AssistantName FROM Contacts)from Account where Name like 'B%'];
        System.debug(account1);
        return account1;
    }
    
    public static List<Opportunity> fetchRelatedDataForOpportunity(){
        List<Opportunity>opportunity1=[Select Account.name,(Select ContactId from OpportunityContactRoles ), name,Amount from Opportunity where Name like '%A'];
        System.debug(opportunity1);
        return opportunity1;
    }
    
    public static List<List<sObject>> fetchTestOpportunityRecords(){
        Id userId=UserInfo.getUserId() ;
        List<List<sObject>>obj=[Find 'Test' IN ALL FIELDS Returning Account(name, AccountNumber Where OwnerId=:userId),Opportunity(name,Amount, CloseDate where CloseDate=THIS_FISCAL_YEAR)];
        System.debug(obj);
        return obj;
    }
     public static Map<Id, List<Opportunity>> opportunitiesRelatedToAccountMap = new Map<Id, List<Opportunity>>();
     public static Map<Id, List<Contact>> contactsRelatedToAccountMap = new Map<Id, List<Contact>>();
     public static void setOppContactNotesRelatedToAccount(){
       List<Account>account1=[Select Id, (Select name,Amount FROM Opportunities) , (Select name FROM Contacts)from Account where Name like 'B%'];
         for(Account a: account1){
           opportunitiesRelatedToAccountMap.put(a.Id,a.Opportunities);
           contactsRelatedToAccountMap.put(a.Id,a.Contacts);
         }
         System.debug(opportunitiesRelatedToAccountMap);
         System.debug(contactsRelatedToAccountMap);
     }
    
    
    public static List<AggregateResult> totalStudentsOfEachBatch(){
        List<AggregateResult>aggresult=[Select Batch_of_Student__c, Count(Id) from Student_in_Batch__c GROUP BY Batch_of_Student__c];
        System.debug(aggresult);
        return aggresult;
    }

    public static List<AggregateResult> sortedListOfStudentWithAvgRating(){
        List<AggregateResult>aggresult=[Select Rating_of_Student__c , AVG(Rating_out_of_10__c) from Rating__c Group By Rating_of_Student__c ORDER By AVG(Rating_out_of_10__c)];
        System.debug(aggresult);
        return aggresult;
    }

    public static List<Student__c> getStudentsStartWithAA(){
        List<Student__c>student1=[Select Student_Name__c from Student__c where 	Student_Name__c like '%aa%'];
        System.debug(student1);
        return student1;
    }

   public static List<Batch__c>getBatchesWithCourseAndFaculty(){
        List<Batch__c>batch1=[Select name , Course__r.name , Course__r.Faculty_Name__r.name from Batch__c];
       System.debug(batch1);
       return batch1;
    }

    public static List<AggregateResult> getDiscreteStudentsCount(){
        List<AggregateResult>aggregateResult1=[Select Count_Distinct(Student_Name__c) from Student__c];
        System.debug(aggregateResult1);
        return aggregateResult1;
    }

    public static List<Student__c> getSortedStudentsOver25(){
        Date cutoff=Date.today().addYears(-25);
        List<Student__c>student1=[Select Student_Name__c, Id,Student_DOB__c from Student__c where Student_DOB__c<=:cutoff ORDER BY Student_DOB__c DESC NULLS LAST];
        System.debug(student1);
        return student1;
    }

    public static List<Student_in_Batch__c> getRecordsWithNameTesting(){
        List<Student_in_Batch__c>studentbatch=[Select name from Student_in_Batch__c where Student_Enrolled_in_Batch__r.Student_Name__c like '%Testing%' AND Batch_of_Student__r.Course__r.Faculty_Name__r.Name like '%Testing%'];
        System.debug(studentbatch);
        return studentbatch;
    }

    public static List<Student__c> getStudentPresentInList(){
        List<String>names=new List<String>{'John','Jack','Will','David'};
        List<Student__c>student2=[Select Student_Name__c ,Id from Student__c where Student_Name__c in :names AND Registration_Date__c=THIS_QUARTER];
        System.debug(student2);
        return student2;
    }
    public static List<String> getStudentCourseFacultyNameList(){
        List<Student_in_Batch__c>studentcoursefac=[Select Student_Enrolled_in_Batch__r.Student_Name__c,Batch_of_Student__r.Course__r.Faculty_Name__r.Name, Batch_of_Student__r.Course__r.Name from Student_in_Batch__c where Student_Enrolled_in_Batch__r.Student_Name__c like 'Kri%' AND Batch_of_Student__r.Course__r.Faculty_Name__r.Name like 'Kri%' AND Batch_of_Student__r.Course__r.Name !='Php'];
        List<String>result=new List<String>();
        for(Student_in_Batch__c s:studentcoursefac){
            result.add(s.Student_Enrolled_in_Batch__r.Student_Name__c+'-'+s.Batch_of_Student__r.Course__r.Name+'-'+s.Batch_of_Student__r.Course__r.Faculty_Name__r.Name);
        }
        System.debug(result);
        return result;
    }

    public static List<Student__c> getStudentsBasedOnCourseAndFee(String courseName, Integer fee1, Integer fee2){
        List<Student__c>student1=[Select Student_Name__c , Id from Student__c where Course_Opted__c=:courseName AND Fee_Deposite__c >=:fee1 AND Fee_Deposite__c <=:fee2];
        System.debug(student1);
        return student1;
    }
}