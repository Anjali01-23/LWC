trigger triggerEmployee on Employee__c (after insert, after update,after delete,before insert,before update) {
    if(Trigger.isInsert && Trigger.isAfter){
        Map<Id,Integer>scoreCard=new Map<Id,Integer>(); 
        Map<Id,Integer>scoreCard1=new Map<Id,Integer>(); 
        for(Employee__c e : Trigger.new) {
                if(e.Parent_Employee__c != null && e.BA_Score__c == null ) {
                   scoreCard.put(e.Parent_Employee__c, Integer.valueOf(e.DEV_Score__c));
                }
            else if(e.Parent_Employee__c != null && e.Dev_Score__c == null){
                scoreCard1.put(e.Parent_Employee__c, Integer.valueOf(e.BA_Score__c));
            }
        }
        if(!scoreCard.isEmpty()){
            EmployeeClass.anotherDEV(scoreCard);
        }
        if(!scoreCard1.isEmpty()){
            EmployeeClass.anotherBA(scoreCard1);
        }
    }
    else if(Trigger.isBefore && Trigger.isInsert){
              EmployeeClass.method(Trigger.new,Trigger.oldMap);  
    }
    else if(Trigger.isBefore && Trigger.isUpdate){
              EmployeeClass.method(Trigger.new,Trigger.oldMap);  
    } 
    else if(Trigger.isUpdate && Trigger.isAfter){
        
       Map<Id,Integer>map1=new Map<Id,Integer>();
       Map<Id,Integer>map2=new Map<Id,Integer>();
           for(Employee__c e : Trigger.new) {
               Employee__c  oldEmp = Trigger.oldMap.get(e.Id);
                if(e.Parent_Employee__c == oldEmp.Parent_Employee__c && e.Parent_Employee__c != null && e.BA_Score__c==NULL) {
                    Integer diff = Integer.valueOf((e.DEV_Score__c != null ? e.DEV_Score__c : 0) - (oldEmp.DEV_Score__c != null ? oldEmp.DEV_Score__c : 0));
                    map1.put(e.Parent_Employee__c, diff);
                }
               else if(e.Parent_Employee__c == oldEmp.Parent_Employee__c && e.Parent_Employee__c != null && e.DEV_Score__c==NULL){
                  Integer diff1 =Integer.valueOf((e.BA_Score__c != null ? e.BA_Score__c : 0) - (oldEmp.BA_Score__c != null ? oldEmp.BA_Score__c : 0));
                  map2.put(e.Parent_Employee__c, diff1); 
               }

                else if(e.Parent_Employee__c != oldEmp.Parent_Employee__c && e.DEV_Score__c==NULL ) {
                    if(oldEmp.Parent_Employee__c != null) {
                        map2.put(oldEmp.Parent_Employee__c, Integer.valueOf(- (oldEmp.BA_Score__c != null ? oldEmp.BA_Score__c : 0)));
                    }
                    if(e.Parent_Employee__c != null) {
                        map2.put(e.Parent_Employee__c, Integer.valueOf( (e.BA_Score__c != null ? e.BA_Score__c : 0)));
                    }
                }
               
                    else if(e.Parent_Employee__c != oldEmp.Parent_Employee__c && e.BA_Score__c==NULL ) {
                    if(oldEmp.Parent_Employee__c != null) {
                        map2.put(oldEmp.Parent_Employee__c,Integer.valueOf(- (oldEmp.DEV_Score__c != null ? oldEmp.DEV_Score__c : 0)));
                    }
                    if(e.Parent_Employee__c != null) {
                        map2.put(e.Parent_Employee__c, Integer.valueOf((e.DEV_Score__c != null ? e.DEV_Score__c : 0)));
                    }
                }
            }
            
           if(!map1.isEmpty()){
            EmployeeClass.anotherDEVforUpdate(map1);
          }
        if(!map2.isEmpty()){
            EmployeeClass.anotherBAforUpdate(map2);
          } 
            
    }
    else if(Trigger.isDelete && Trigger.isAfter){
       Map<Id,Integer>map3=new Map<Id,Integer>();
        Map<Id,Integer>map4=new Map<Id,Integer>();
            for(Employee__c e:Trigger.old){
                if(e.Parent_Employee__c!=NULL && e.BA_Score__c==NULL){
                    map3.put(e.Parent_Employee__c,Integer.valueOf(-(e.DEV_Score__c)));
                }
                else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
                    map4.put(e.Parent_Employee__c,Integer.valueOf(-(e.BA_Score__c)));
                }
            }
          if(!map3.isEmpty()){
            EmployeeClass.anotherDEVforDelete(map3);
          }
         if(!map4.isEmpty()){
            EmployeeClass.anotherBAforDelete(map4);
          } 
               
    }
}