public class EmployeeClass {
    public static void method(List<Employee__c>Emp,Map<Id,Employee__c>oldMap){
        List<Id>ParentIds=new List<Id>();
        for(Employee__c e: Emp){
            if(e.Parent_Employee__c!=NULL){
                ParentIds.add(e.Parent_Employee__c);
            }           
        }
        List<Employee__c>ParentEmployee=[Select RecordTypeId , Id , (Select Id from Employees__r) from Employee__c where ID in :ParentIds];
        Map<Id,Employee__c>mpp1=new Map<Id,Employee__c>();
        for(Employee__c e: ParentEmployee){
            mpp1.put(e.Id,e);
        }
        for(Employee__c e:Emp){
            if(e.Parent_Employee__c!=NULL){
            if(e.RecordTypeId=='012fj000004RPWHAA4'){         
                if(e.RecordTypeId==mpp1.get(e.Parent_Employee__c).RecordTypeId){
                    e.addError('The parent of Developer cannot be another Developer');
                }
            }
            Boolean isParentChanged = (oldMap == null || e.Parent_Employee__c != oldMap.get(e.Id).Parent_Employee__c);
            if(isParentChanged && mpp1.get(e.Parent_Employee__c).Employees__r.size()>0){
                    e.addError('The parent cannot have more than 1 Child');
            }
        }    
    }
}
    
    public static void anotherBA(Map<Id,Integer>MapEmp){
        List<Employee__c>ParentEmpList=[Select Id, Parent_Employee__c,BA_Score__c,DEV_Score__c,MAX_BA_score__c,MAX_DEV_Score__c,SUM_BA_score__c, SUM_DEV_Score__c from Employee__c where ID In :MapEmp.KeySet()];
        Map<Id,Integer>againPass00=new Map<Id,Integer>();
    //    Map<Id,Integer>againPass01=new Map<Id,Integer>();
        for(Employee__c e:ParentEmpList){
            e.MAX_BA_score__c=(e.MAX_BA_score__c==NULL)?MapEmp.get(e.Id): Math.max(MapEmp.get(e.Id),e.MAX_BA_score__c);
            e.MAX_DEV_Score__c=(e.MAX_DEV_score__c==NULL)?0:e.MAX_DEV_score__c;
            e.SUM_BA_score__c=(e.SUM_BA_score__c==NULL)?MapEmp.get(e.Id):MapEmp.get(e.Id)+e.SUM_BA_score__c;
            e.SUM_DEV_Score__c=(e.SUM_DEV_Score__c==NULL)?0:e.SUM_DEV_Score__c;
            if(e.Parent_Employee__c!=NULL){
              againPass00.put(e.Parent_Employee__c,MapEmp.get(e.Id));
            }
           /* else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
               againPass01.put(e.Parent_Employee__c,MapEmp.get(e.Id)); 
            }*/
        }
        update ParentEmpList;
        if(!againPass00.isEmpty()){
            anotherBA(againPass00);
        }
      /*  if(!againPass01.isEmpty()){
            anotherBA(againPass01);
        }*/

        
    }
    
     public static void anotherDEV(Map<Id,Integer>MapEmp){
        List<Employee__c>ParentEmpList1=[Select Id, Parent_Employee__c,BA_Score__c,DEV_Score__c,MAX_BA_score__c,MAX_DEV_Score__c,SUM_BA_score__c, SUM_DEV_Score__c from Employee__c where ID In :MapEmp.KeySet()];
        Map<Id,Integer>againPass11=new Map<Id,Integer>();
      //   Map<Id,Integer>againPass22=new Map<Id,Integer>();
        for(Employee__c e:ParentEmpList1){
            e.MAX_DEV_score__c=(e.MAX_DEV_score__c==NULL)?MapEmp.get(e.Id): Math.max(MapEmp.get(e.Id),e.MAX_DEV_score__c);
            e.MAX_BA_Score__c=(e.MAX_BA_score__c==NULL)?0:e.MAX_BA_score__c;
            e.SUM_DEV_score__c=(e.SUM_DEV_score__c==NULL)?MapEmp.get(e.Id):MapEmp.get(e.Id)+e.SUM_DEV_score__c;
            e.SUM_BA_Score__c=(e.SUM_BA_Score__c==NULL)?0:e.SUM_BA_Score__c;
            if(e.Parent_Employee__c!=NULL){
              againPass11.put(e.Parent_Employee__c,MapEmp.get(e.Id));
            }
            /*else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
               againPass22.put(e.Parent_Employee__c,MapEmp.get(e.Id)); 
            }   */       
        }
         
         update ParentEmpList1;
        if(!againPass11.isEmpty() ){
            anotherDEV(againPass11);
        }
        
        /*if(!againPass22.isEmpty() ){
            anotherBA(againPass22);
        }*/
        }
    
    
    public static void anotherBAforUpdate(Map<Id,Integer>MapEmp){
        List<Employee__c>ParentEmpList=[Select Id, Parent_Employee__c,BA_Score__c,DEV_Score__c,MAX_BA_score__c,MAX_DEV_Score__c,SUM_BA_score__c, SUM_DEV_Score__c from Employee__c where ID In :MapEmp.KeySet()];
        Map<Id,Integer>againPass00=new Map<Id,Integer>();
    //    Map<Id,Integer>againPass01=new Map<Id,Integer>();
        for(Employee__c e:ParentEmpList){
            e.MAX_BA_score__c=(e.MAX_BA_score__c==NULL)?MapEmp.get(e.Id): Math.max(e.MAX_BA_score__c,(MapEmp.get(e.Id)+e.MAX_BA_score__c));
            e.MAX_DEV_Score__c=(e.MAX_DEV_score__c==NULL)?0:e.MAX_DEV_score__c;
            e.SUM_BA_score__c=(e.SUM_BA_score__c==NULL)?MapEmp.get(e.Id):MapEmp.get(e.Id)+e.SUM_BA_score__c;
            e.SUM_DEV_Score__c=(e.SUM_DEV_Score__c==NULL)?0:e.SUM_DEV_Score__c;
            if(e.Parent_Employee__c!=NULL){
              againPass00.put(e.Parent_Employee__c,MapEmp.get(e.Id));
            }
           /* else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
               againPass01.put(e.Parent_Employee__c,MapEmp.get(e.Id)); 
            }*/
        }
        update ParentEmpList;
        if(!againPass00.isEmpty()){
            anotherBAforUpdate(againPass00);
        }
      /*  if(!againPass01.isEmpty()){
            anotherBA(againPass01);
        }*/

        
    }
    
     public static void anotherDEVforUpdate(Map<Id,Integer>MapEmp){
        List<Employee__c>ParentEmpList1=[Select Id, Parent_Employee__c,BA_Score__c,DEV_Score__c,MAX_BA_score__c,MAX_DEV_Score__c,SUM_BA_score__c, SUM_DEV_Score__c from Employee__c where ID In :MapEmp.KeySet()];
        Map<Id,Integer>againPass11=new Map<Id,Integer>();
      //   Map<Id,Integer>againPass22=new Map<Id,Integer>();
        for(Employee__c e:ParentEmpList1){
            e.MAX_DEV_score__c=(e.MAX_DEV_score__c==NULL)?MapEmp.get(e.Id): Math.max(MapEmp.get(e.Id)+e.MAX_DEV_score__c,e.MAX_DEV_score__c);
            e.MAX_BA_Score__c=(e.MAX_BA_score__c==NULL)?0:e.MAX_BA_score__c;
            e.SUM_DEV_score__c=(e.SUM_DEV_score__c==NULL)?MapEmp.get(e.Id):MapEmp.get(e.Id)+e.SUM_DEV_score__c;
            e.SUM_BA_Score__c=(e.SUM_BA_Score__c==NULL)?0:e.SUM_BA_Score__c;
            if(e.Parent_Employee__c!=NULL){
              againPass11.put(e.Parent_Employee__c,MapEmp.get(e.Id));
            }
            /*else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
               againPass22.put(e.Parent_Employee__c,MapEmp.get(e.Id)); 
            }   */       
        }
         
         update ParentEmpList1;
        if(!againPass11.isEmpty() ){
            anotherDEVforUpdate(againPass11);
        }
        
        /*if(!againPass22.isEmpty() ){
            anotherBA(againPass22);
        }*/
        }    
    
    
        public static void anotherBAforDelete(Map<Id,Integer>MapEmp){
        List<Employee__c>ParentEmpList=[Select Id, Parent_Employee__c,BA_Score__c,DEV_Score__c,MAX_BA_score__c,MAX_DEV_Score__c,SUM_BA_score__c, SUM_DEV_Score__c from Employee__c where ID In :MapEmp.KeySet()];
        Map<Id,Integer>againPass00=new Map<Id,Integer>();
    //    Map<Id,Integer>againPass01=new Map<Id,Integer>();
        for(Employee__c e:ParentEmpList){
            System.debug(MapEmp.get(e.Id));
            System.debug(e.MAX_BA_score__c);
            e.MAX_BA_score__c=(e.MAX_BA_score__c==NULL)?MapEmp.get(e.Id): Math.max(e.MAX_BA_score__c +MapEmp.get(e.Id),MapEmp.get(e.Id));
            e.MAX_DEV_Score__c=(e.MAX_DEV_score__c==NULL)?0:e.MAX_DEV_score__c;
            e.SUM_BA_score__c=(e.SUM_BA_score__c==NULL)?MapEmp.get(e.Id):MapEmp.get(e.Id)+e.SUM_BA_score__c;
            e.SUM_DEV_Score__c=(e.SUM_DEV_Score__c==NULL)?0:e.SUM_DEV_Score__c;
            if(e.Parent_Employee__c!=NULL){
              againPass00.put(e.Parent_Employee__c,MapEmp.get(e.Id));
            }
           /* else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
               againPass01.put(e.Parent_Employee__c,MapEmp.get(e.Id)); 
            }*/
        }
        update ParentEmpList;
        if(!againPass00.isEmpty()){
            anotherBAforDelete(againPass00);
        }
      /*  if(!againPass01.isEmpty()){
            anotherBA(againPass01);
        }*/

        
    }
    
     public static void anotherDEVforDelete(Map<Id,Integer>MapEmp){
        List<Employee__c>ParentEmpList1=[Select Id, Parent_Employee__c,BA_Score__c,DEV_Score__c,MAX_BA_score__c,MAX_DEV_Score__c,SUM_BA_score__c, SUM_DEV_Score__c from Employee__c where ID In :MapEmp.KeySet()];
        Map<Id,Integer>againPass11=new Map<Id,Integer>();
      //   Map<Id,Integer>againPass22=new Map<Id,Integer>();
        for(Employee__c e:ParentEmpList1){
            e.MAX_DEV_score__c=(e.MAX_DEV_score__c==NULL)?MapEmp.get(e.Id): Math.max(MapEmp.get(e.Id)+e.MAX_DEV_score__c,MapEmp.get(e.Id));
            e.MAX_BA_Score__c=(e.MAX_BA_score__c==NULL)?0:e.MAX_BA_score__c;
            e.SUM_DEV_score__c=(e.SUM_DEV_score__c==NULL)?MapEmp.get(e.Id):MapEmp.get(e.Id)+e.SUM_DEV_score__c;
            e.SUM_BA_Score__c=(e.SUM_BA_Score__c==NULL)?0:e.SUM_BA_Score__c;
            if(e.Parent_Employee__c!=NULL){
              againPass11.put(e.Parent_Employee__c,MapEmp.get(e.Id));
            }
            /*else if(e.Parent_Employee__c!=NULL && e.DEV_Score__c==NULL){
               againPass22.put(e.Parent_Employee__c,MapEmp.get(e.Id)); 
            }   */       
        }
         
         update ParentEmpList1;
        if(!againPass11.isEmpty() ){
            anotherDEVforDelete(againPass11);
        }
        
        /*if(!againPass22.isEmpty() ){
            anotherBA(againPass22);
        }*/
        }      
        
    }