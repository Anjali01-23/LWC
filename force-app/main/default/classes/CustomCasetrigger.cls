public class CustomCasetrigger {
    public static void method(){
        List<Custom_Case__c>customList=[Select Tracker_Model__c from Custom_Case__c];
        Map<Id,Integer>mpp=new Map<Id,Integer>();
        for(Custom_Case__c c:customList){
            if(mpp.containsKey(c.Tracker_Model__c)){
                mpp.put(c.Tracker_Model__c,mpp.get(c.Tracker_Model__c)+1);
            }
            else{
                mpp.put(c.Tracker_Model__c,1);
            }
        }
        List<Tracker_Model__c>listTrack=[Select Total_Cases__c from Tracker_Model__c where Id IN :mpp.keySet()];
        for(Tracker_Model__c t:listTrack ){
            t.Total_Cases__c=mpp.get(t.Id);
        }
        System.debug(listTrack);
        update listTrack;
        
    }
    
    
    public static void method1(List<Custom_Case__c>customList,Map<Id,Custom_Case__c>old){
        for(Custom_Case__c c:customList){
            Custom_Case__c c1=old.get(c.Id);
            if(String.isBlank(c1.Resolution_Details__c) && !String.isBlank(c.Resolution_Details__c)){
                c.Status__c='Resolved';
            }
            else if(String.isBlank(c1.Resolution_Details__c) && String.isBlank(c.Resolution_Details__c) && c.Status__c=='Resolved'){
                c.addError('Cannot update the Status until details are not filled');
            }
        }
    }

    public static void method2(List<Custom_Case__c>cusList){
        for(Custom_Case__c c:cusList){
            if(c.Status__c!='Open'){
                c.addError('By default it should be Open');
            }
        }
    }  
}