public class OpportunityBatch implements Database.Batchable<sObject>,Schedulable,Database.Stateful{
 public Integer totalOverdueOpportunities=0;
 public string overdueInfo='';
    public Database.QueryLocator start(Database.BatchableContext bc){
        Date current=System.today();
        System.debug(System.now());
        
        return System.Database.getQueryLocator('Select Overdue__c ,Name, CloseDate,Overdue_Days_c__c, isClosed ,AccountId from Opportunity where CloseDate<:Current');
    }
    
    public void execute(Database.BatchableContext bc, List<Opportunity>opp){
       
        
        for(Opportunity o:opp){
            if(o.Overdue__c==false && o.IsClosed==false){
                o.Overdue__c=true;
                Date close=o.CloseDate;
                Date current=System.today();
                o.Overdue_Days_c__c=close.daysbetween(current);
                totalOverdueOpportunities++;
                overdueInfo+='This Opportunity is overdue '+o.Name+' and overdue days are'+o.Overdue_Days_c__c+' ';
            }
            else if(o.Overdue__c==true && o.IsClosed==true){
                o.Overdue__c=false;
                            
            }
            
        }
        update opp;
        
        List<Id>AccId=new List<Id>();
        for(Opportunity o:opp){
            AccId.add(o.AccountId);
        }
       List<Account>accLists=[Select Total_Number_Of_Overdue__c,Closed_Opportunities__c from Account where Id IN :AccId];
       System.debug(accLists);
       List<AggregateResult>agr=[Select AccountId, Count(Id)Closed from Opportunity where isClosed=true and Overdue__c=false and AccountId in :AccId Group BY AccountId];
       List<AggregateResult>agr1=[Select AccountId, Count(Id)Overdue from Opportunity where isClosed=false and Overdue__c=true and AccountId in :AccId Group BY AccountId];
       Map<Id,Integer>ClosedOpp=new Map<Id,Integer>();
       Map<Id,Integer>OverDueOpp=new Map<Id,Integer>();
        
       for(AggregateResult a:agr){
          ClosedOpp.put((Id)a.get('AccountId'),Integer.valueOf(a.get('Closed')));  
       }
       
       for(AggregateResult a:agr1){
          OverDueOpp.put((Id)a.get('AccountId'),Integer.valueOf(a.get('Overdue')));  
       }
        
        for(Account a:accLists){
            if(OverDueOpp.get(a.Id)!=NULL){
               a.Total_Number_Of_Overdue__c=OverDueOpp.get(a.Id);
            }
            else{
               a.Total_Number_Of_Overdue__c=0;
            }
            if(ClosedOpp.get(a.Id)!=NULL){
                a.Closed_Opportunities__c=ClosedOpp.get(a.Id);
            }
            else{
               a.Closed_Opportunities__c=0; 
            }
          
        }
       System.database.update(accLists,false);
        System.debug(accLists);
    }
    
    public void finish(Database.BatchableContext bc){
        Messaging.SingleEmailMessage mes=new Messaging.SingleEmailMessage();
        List<string>EmailAddress=new List<string>{'anjaligoyal4102@gmail.com'};
        mes.toAddresses=EmailAddress;
        mes.setSubject('Opportunity Closed or Overdue');
        mes.plainTextbody='The total Overdue Opportunites count is'+totalOverdueOpportunities+' And Overdue Opportunity details are '+overdueInfo;
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{mes});
        System.debug('Message sent');
    }
    
    public void execute(SchedulableContext sc){
        
    }
}