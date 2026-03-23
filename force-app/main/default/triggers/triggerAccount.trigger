/*trigger triggerAccount on Account (after insert, after update, before delete,after delete) {
    if(Trigger.isafter){
        if(Trigger.isInsert){
           // TriggerHelper.method1(Trigger.new);
           Map<Id,Decimal>amountWithId=new Map<Id,Decimal>();
            for(Account a:Trigger.new){
                if(a.ParentId!=NULL && a.Amount__c!=NULL){
                    amountWithId.put(a.ParentId, a.Amount__c);
                }
            }
            if(!amountWithId.isEmpty()) {
              parentAccountAmount.method(amountWithId);
            }
        }
        
        
        else if(Trigger.isUpdate){
           // TriggerHelper.method1(Trigger.new);
           Map<Id,Decimal>amountWithId=new Map<Id,Decimal>();
           for(Account a : Trigger.new) {
                Account oldAcc = Trigger.oldMap.get(a.Id);
                
                // Case 1: Normal Update
                if(a.ParentId == oldAcc.ParentId && a.ParentId != null) {
                    Decimal diff = (a.Amount__c != null ? a.Amount__c : 0) - (oldAcc.Amount__c != null ? oldAcc.Amount__c : 0);
                    amountWithId.put(a.ParentId, diff);
                }
                
                // Case 2: Reparenting
                else if(a.ParentId != oldAcc.ParentId) {
                    // Purane parent se purana amount subtract karo
                    if(oldAcc.ParentId != null) {
                        amountWithId.put(oldAcc.ParentId, - (oldAcc.Amount__c != null ? oldAcc.Amount__c : 0));
                    }
                    // Naye parent mein naya amount add karo
                    if(a.ParentId != null) {
                        amountWithId.put(a.ParentId, (a.Amount__c != null ? a.Amount__c : 0));
                    }
                }
            }
            
            if(!amountWithId.isEmpty()) {
        parentAccountAmount.method(amountWithId);
    }
            
    }
    else if(Trigger.isAfter){
        if(Trigger.isDelete){
            //TriggerHelper.method2(Trigger.old);
            Map<Id,Decimal>amountWithId=new Map<Id,Decimal>();
            for(Account a:Trigger.old){
                if(a.ParentId!=NULL && a.Amount__c!=NULL){
                    amountWithId.put(a.ParentId,-(a.Amount__c));
                }
            }
             if(!amountWithId.isEmpty()) {
        parentAccountAmount.method(amountWithId);
         }
        }
    }
}
}*/
trigger triggerAccount on Account (before delete) {
    
    if(Trigger.isBefore && Trigger.isDelete){
        helper.method(Trigger.old);
    }
 /*   Map<Id, Decimal> amountWithId = new Map<Id, Decimal>();

    // Common helper to fill the map without overwriting
    // Isse aapka bulk insert/delete kabhi fail nahi hoga
    if(Trigger.isAfter) {
        
        if(Trigger.isInsert) {
            for(Account a : Trigger.new) {
                if(a.ParentId != null && a.Amount__c != null) {
                    Decimal current = amountWithId.containsKey(a.ParentId) ? amountWithId.get(a.ParentId) : 0;
                    amountWithId.put(a.ParentId, current + a.Amount__c);
                }
            }
        }
        
        else if(Trigger.isUpdate) {
            for(Account a : Trigger.new) {
                Account oldAcc = Trigger.oldMap.get(a.Id);
                
                if(a.ParentId == oldAcc.ParentId && a.ParentId != null) {
                    Decimal diff = (a.Amount__c != null ? a.Amount__c : 0) - (oldAcc.Amount__c != null ? oldAcc.Amount__c : 0);
                    Decimal current = amountWithId.containsKey(a.ParentId) ? amountWithId.get(a.ParentId) : 0;
                    amountWithId.put(a.ParentId, current + diff);
                }
                else if(a.ParentId != oldAcc.ParentId) {
                    // Reparenting: Old minus, New plus
                    if(oldAcc.ParentId != null) {
                        Decimal oldParentCur = amountWithId.containsKey(oldAcc.ParentId) ? amountWithId.get(oldAcc.ParentId) : 0;
                        amountWithId.put(oldAcc.ParentId, oldParentCur - (oldAcc.Amount__c != null ? oldAcc.Amount__c : 0));
                    }
                    if(a.ParentId != null) {
                        Decimal newParentCur = amountWithId.containsKey(a.ParentId) ? amountWithId.get(a.ParentId) : 0;
                        amountWithId.put(a.ParentId, newParentCur + (a.Amount__c != null ? a.Amount__c : 0));
                    }
                }
            }
        }
        
        else if(Trigger.isDelete) {
            for(Account a : Trigger.old) {
                if(a.ParentId != null && a.Amount__c != null) {
                    Decimal current = amountWithId.containsKey(a.ParentId) ? amountWithId.get(a.ParentId) : 0;
                    amountWithId.put(a.ParentId, current - a.Amount__c);
                }
            }
        }

        // Sabse last mein sirf EK baar call
        if(!amountWithId.isEmpty()) {
            parentAccountAmount.method(amountWithId);
        }
    } */
    
}