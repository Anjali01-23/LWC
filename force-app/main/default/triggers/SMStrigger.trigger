trigger SMStrigger on Student__c (after insert) {
  List<Student__c>studentt=Trigger.new;
    for(Student__c s:studentt){
        apiSMS.method(s.Student_Name__c,s.Student_Phone__c,s.Student_Email__c);
        apiIPAddress.method(s.IPAddress__c,s.Id);
    }
}