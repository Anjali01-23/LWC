public class BulkPhoneEnquiryLeadsConvertion implements Database.Batchable<sObject>,Database.Stateful{
    public Integer failCount=0;
    public Integer leadtotal=0;
    private String convertedStatus;

    // Constructor mein hi status nikal lete hain
    public BulkPhoneEnquiryLeadsConvertion() {
        LeadStatus ls = [SELECT MasterLabel FROM LeadStatus WHERE IsConverted = true LIMIT 1];
        this.convertedStatus = ls.MasterLabel;
    }
    public Database.QueryLocator start(Database.BatchableContext bc){
        return System.Database.getQueryLocator('Select Id from Lead where LeadSource=\'Phone Inquiry\' and isConverted=false ');
    }
    public void execute(Database.BatchableContext bc,List<Lead>LeadList){
        List<Database.leadConvert>leadPhone=new List<Database.leadConvert>();
        for(Lead l:LeadList){
               Database.leadConvert lc=new Database.leadConvert();
               lc.setLeadId(l.Id);
               lc.setConvertedStatus(convertedStatus);
               leadPhone.add(lc);
        }
        List<Database.LeadConvertResult>saves=new List<Database.LeadConvertResult>();
        if(!leadPhone.isEmpty()){
           saves=System.Database.convertLead(leadPhone);
        }
        for(Database.LeadConvertResult s:saves){
            if(!s.isSuccess()){
                failCount++;
            }
        }
        leadtotal+=LeadList.size();
        }
    
    public void finish(Database.BatchableContext bc){
        Messaging.SingleEmailMessage sem=new Messaging.SingleEmailMessage();
        List<string>emailAddress=new List<String>{'anjaligoyal@cyntexa.com'};
        sem.toaddresses=emailAddress; //toaddresses is a variable.
        sem.setSubject('Batch Job Completed');
        sem.setPlainTextbody('Total Number Of Leads-'+leadtotal+'and Total Number Of Leads failed to convert'+failCount+'and Batch Job Id is'+bc.getJobId());
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{sem});
    }
    }