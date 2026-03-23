public class SchemaClassPractice {
  public static Map<String,DisplayType> method(String obj){
        Map<String,sObjectType>userObj=Schema.getGlobalDescribe();
        Map<String, sObjectField>mpp=userObj.get(obj).getDescribe().fields.getMap(); //Here the key name and value name both are same.Both are fields.
        Map<String,DisplayType>mapResult=new Map<String,DisplayType>();
        for(String s:mpp.keySet()){
         DisplayType datatypes = mpp.get(s).getDescribe().getType();
         mapResult.put(s,datatypes);
        }      
        System.debug(mapResult);    
        return mapResult;
    }
    public static List<String> method1(String obj, String picklist){
        Map<String,sObjectType>userObj=Schema.getGlobalDescribe();
        Map<String, sObjectField>mpp=userObj.get(obj).getDescribe().fields.getMap(); 
        List<PicklistEntry>pickvalue=mpp.get(picklist).getDescribe().getPicklistValues();
        List<String>answer=new List<String>();
        for(PicklistEntry p:pickvalue){
            answer.add(p.getValue());
        }
        System.debug(answer);    
        return answer;
    }
    
     public static void method2(String obj){
        Map<String,sObjectType>userObj=Schema.getGlobalDescribe();
        Map<String, sObjectField>mpp=userObj.get(obj).getDescribe().fields.getMap(); 
        List<String>fields1=new List<String>();
        for(String s:mpp.keySet()){ 
            if(s.contains('__c')){
                fields1.add(s);
            }
        }
        System.debug(fields1);    
    }
    
    public static boolean isFieldEditable(String obj,String fieldname){
        Map<String,sObjectType>userObj=Schema.getGlobalDescribe();
        Map<String, sObjectField>mpp=userObj.get(obj).getDescribe().fields.getMap(); 
        return mpp.get(fieldname).getDescribe().isUpdateable(); 
    }
    
     public static List<String> childNames(String obj){
        Map<String,sObjectType>userObj=Schema.getGlobalDescribe();
        List<Schema.ChildRelationship>childObj=userObj.get(obj).getDescribe().getChildRelationships();
        List<String>childName=new List<String>();
         for(Schema.ChildRelationship s:childObj){
           childName.add(s.getChildSObject().getDescribe().getName());
         }
         System.debug(childName);
        return childName;
    }
    
}