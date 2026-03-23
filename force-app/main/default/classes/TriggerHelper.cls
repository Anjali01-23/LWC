public class TriggerHelper {
    public static void method1(List<Account>accList){
        try{
        Set<Id>accIds=new Map<Id,Account>(accList).keySet();
        List<Opportunity>opp=[Select Id, AccountId from Opportunity where AccountId IN :accIds];
        Map<Id,Opportunity>mpp=new Map<Id,Opportunity>();
        for(Opportunity oppur:opp){
            mpp.put(oppur.AccountId,oppur);
        }
        List<Opportunity>oppNewList=new List<Opportunity>();
        for(Account a:accList){
            if(!mpp.containsKey(a.Id)){
                Opportunity o=new Opportunity(name='First Opportunity-'+a.name,CloseDate=System.today(),StageName='Negotiation/Review',AccountId=a.Id);
                oppNewList.add(o);
            }
        }
        insert oppNewList;
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void method2(List<Account>accList){
        try{
            Set<Id>accIds=new Map<Id,Account>(accList).KeySet();
        List<Opportunity>opp=[Select Id, AccountId from Opportunity where AccountId IN :accIds and StageName='Prospecting'];
        Map<Id,Opportunity>mpp=new Map<Id,Opportunity>();
        for(Opportunity oppur:opp){
            mpp.put(oppur.AccountId,oppur);
        }
        for(Account a:accList){
            if(mpp.containsKey(a.Id)){
                a.addError('Cannot delete this account because it has open Opportunities related to it');
            }
        }
        }
        catch(Exception e){
           System.debug(e.getMessage()); 
        }
    }
    
    public static void method3(List<Lead>leadList){
       /* try{
        List<Database.leadConvert>leadPhone=new List<Database.leadConvert>();
        LeadStatus ls=[Select MasterLabel from LeadStatus where IsConverted=true LIMIT 1];
        for(Lead l:leadList){
            if(l.LeadSource=='Phone Inquiry' && l.IsConverted==false){
               Database.leadConvert lc=new Database.leadConvert();
               lc.setLeadId(l.Id);
               lc.setConvertedStatus(ls.MasterLabel);
               lc.setownerId('005fj00000AsNRiAAN');
               leadPhone.add(lc);
            }
        }
            if(!leadPhone.isEmpty()){
        System.Database.convertLead(leadPhone);
            }
        }
        catch(Exception e){
           System.debug(e.getMessage());            
        }*/
    }
    
    public static void totalAccounts(List<Bank_Account__c>bankacc){
        try{
           Set<Id>bankaccIds=new Map<Id,Bank_Account__c>(bankacc).keySet();
        List<Bank_Account__c>bankAccrec=[Select Branch__r.Bank__r.Id from Bank_Account__c where id IN :bankaccIds];
        Map<Id,Integer>count=new Map<Id,Integer>();
         for(Bank_Account__c bankrecNew:bankAccrec){
            if(count.containsKey(bankrecNew.Branch__r.Bank__r.Id)){
                count.put(bankrecNew.Branch__r.Bank__r.Id,count.get(bankrecNew.Branch__r.Bank__r.Id)+1);
            }
            else{
                count.put(bankrecNew.Branch__r.Bank__r.Id,1);
            }
        }
        
        List<Bank__c>bankRec=[Select TotalBankAccounts__c from Bank__c where ID IN :count.keySet()];
        for(Bank__c banks:bankRec){
            banks.TotalBankAccounts__c+=count.get(banks.id);
        }
       update bankRec;
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void DeleteBankAccounts(List<Bank_Account__c>bankAcc){
        try{
        Set<Id>bankaccIds=new Map<Id,Bank_Account__c>(bankAcc).keySet();
        List<Transaction__c>trans=[Select Bank_Account__r.Id from Transaction__c where Bank_Account__r.Id IN :bankaccIds];
        Set<Id>accId=new Set<Id>();
        for(Transaction__c t:trans){
            accId.add(t.Bank_Account__r.Id);
        }
        
        for(Bank_Account__c b:bankAcc){
            if(accId.contains(b.Id)){
                b.addError('Cannot delete this account as it is has a Transaction record');
            }
        }
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void activeUpdate(List<Branch__c>branchRec){
        try{
        Set<Id>branchRecIds=new Map<Id,Branch__c>(branchRec).keySet();
        List<Bank_Account__c>bankrec=[Select isActive__c from Bank_Account__c where Branch__r.Id IN :branchRecIds];
        for(Bank_Account__c banks:bankrec){
            banks.isActive__c='Inactive';
        }
        System.Database.update(bankrec,false);
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void caseCreation(List<Case>caselist){
        try{
      List<Case>OpencaseList=[Select Id,OwnerId from Case where isClosed=false ];
 
        for(Case c:caselist){
            Integer count=0;
            for(Case copen:OpencaseList){
                if(c.OwnerId==copen.OwnerId){
                    count++;
                }
                if(count>2){
                  c.addError('You cannot create this case.You already have two more than 2 open cases');
                } 
            }           
        }
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void duplicacyCheck(List<Opportunity>opp){
        try{
        Set<String>oppName=new Set<String>();
        Set<Id>AccId=new Set<Id>();
        for(Opportunity o:opp){
            oppName.add(o.name);
            AccId.add(o.AccountId);
        }
        List<Opportunity>oppdup=[Select name,AccountId from Opportunity where name IN :oppName and AccountId IN :AccId];
        for(Opportunity o1:opp){
            for(Opportunity o2:oppdup){
                if(o1.name==o2.name && o1.AccountId ==o2.AccountId){
                    o1.name=o1.Name+'Duplicate Opportunity';
                    break;
                }
            }
        }
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void newTransaction(List<Transaction__c>trans){
        
    }
    
     public static void backup(List<Account>acc){
         try{
        List<Account_Backup__c>back=new List<Account_Backup__c>();
        for(Account a:acc){
            if(a.MasterRecordId!=null){ //Trigger.old m delete hone se pehle ka version hota h and delete hone se pehle hi jo account delete ho rha h usme MasterRecordId fill kr di jayegi in case of merge operation.
                Account_Backup__c accBack=new  Account_Backup__c(name=a.Name,Phone__c=a.Phone);
                back.add(accBack);
            }
        }
        System.Database.insert(back,false);
         }
         catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    public static void taskRelated(List<Opportunity>opp){
        /*
        try{
        Set<Id>oppId=new Map<Id,Opportunity>(opp).keySet();
        List<Task>tasks=[Select Id,WhatId from Task where WhatId IN :oppId];
        Set<Id>oppTask=new Set<Id>();
        for(Task t:tasks){
            oppTask.add(t.WhatId);
        }
        for(Opportunity o: opp){
            if(!oppTask.contains(o.Id)){
                o.addError('You can\'t change the state until any task is related to it');
            }
        }
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
*/
    }
}