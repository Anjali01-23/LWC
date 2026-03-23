/*public class parentAccountAmount {    
    public static void method(Map<Id,Decimal>mpp){
        List<Account>ParentaccList=[Select id,ParentId,Amount__c,	Total_Amount__c from Account where id IN :mpp.keySet()];
        Map<Id,Decimal>amountWithId=new Map<Id,Decimal>();
        for(Account a:ParentaccList){
            a.Total_Amount__c=(a.Total_Amount__c==null ? 0 : a.Total_Amount__c) + mpp.get(a.Id);
            if(a.ParentId!=NULL){
              amountWithId.put(a.ParentId,mpp.get(a.Id));
            }
        }
        update ParentaccList;
        if(!amountWithId.isEmpty()){
            method(amountWithId);
        }
        
       
    }
}*/
public class parentAccountAmount {    
    public static void method(Map<Id, Decimal> mpp) {
        if(mpp == null || mpp.isEmpty()) return;

        // Query parents
        List<Account> parentAccList = [SELECT Id, ParentId, Total_Amount__c FROM Account WHERE Id IN :mpp.keySet()];
        Map<Id, Decimal> nextLevelMap = new Map<Id, Decimal>();

        for(Account a : parentAccList) {
            Decimal change = mpp.get(a.Id);
            a.Total_Amount__c = (a.Total_Amount__c == null ? 0 : a.Total_Amount__c) + change;

            if(a.ParentId != null) {
                // Yahan hum ternary operator use kar rahe hain taaki data overwrite na ho
                Decimal existingChange = nextLevelMap.containsKey(a.ParentId) ? nextLevelMap.get(a.ParentId) : 0;
                nextLevelMap.put(a.ParentId, existingChange + change);
            }
        }

        if(!parentAccList.isEmpty()) {
            update parentAccList;
        }

        if(!nextLevelMap.isEmpty()) {
            method(nextLevelMap);
        }
    }
}