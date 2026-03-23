public class helper {
    public static void method(List<Account>AccList){
        Set<Id>accId=new Set<Id>();
        for(Account a:AccList){
            accId.add(a.Id);
        }
        List<AggregateResult>oppList=[Select SUM(Amount)amt,AccountId from Opportunity where StageName='Closed Won' and 
                                      AccountId IN:accId GROUP BY AccountId
                                     ];
        
        Map<Id,Decimal>mpp=new Map<Id,Decimal>();
        for(AggregateResult a:oppList){
            mpp.put((Id)a.get('AccountId'),(Decimal)a.get('amt'));
        }
        
        for(Account a:AccList){
            if(mpp.containsKey(a.Id)){
                if(mpp.get(a.Id)>100000){
                    a.addError('Cannot delete');
                }
            }
        }
    }
    public static void method2(Map<Id,Contact>conMap){
        Set<Id>accId=new Set<Id>();
        for(Contact c:conMap.values()){
            accId.add(c.AccountId);
        }
        List<Account>accList=[Select Id,Name from Account where Id IN:accId];
        List<Contact>conList=[Select Id,AccountId ,Name from Contact where AccountId IN :accId];
        List<Id>accIdss=new List<Id>();
        List<Opportunity>oppl=new List<Opportunity>();
        
        for(Account a:accList){
            Integer i=0;
            for(Contact c:conList){
                if(a.Id==c.AccountId){
                    i++;
                }
            }
             if(i==5){
                    accIdss.add(a.Id);
             }
          
                else if(i==3){
                    Opportunity o=new Opportunity(name=a.Name+'Opp',CloseDate=System.today(),StageName='Negotiation/Review',AccountId=a.Id,Active__c=true,Email__c='anjaligoyal41@gmail.com');
                    oppl.add(o);
                }
        }
        
        insert(oppl);
        List<Opportunity>oppNew=[Select StageName,Active__c from Opportunity where Active__c=true and AccountId IN:accIdss];
        for(Opportunity o:oppNew){
            o.StageName='Closed Won';
        }
        update(oppNew);
    }
}