public class SchemaClassFile {
    public static void method(String obj){
        Map<String,sObjectType>userObj=Schema.getGlobalDescribe();
        Map<String, sObjectField>mpp=userObj.get(obj).getDescribe().fields.getMap(); //Here the key name and value name both are same.Both are fields.
        List<String>fields1=new List<String>();
        for(String s:mpp.keySet()){ //But it will have both standard and custom fields and i want only custom fields so I check it whether the field is custom or not.
            if(s.contains('__c')){
                fields1.add(s);
            }
        }
        System.debug(fields1);    
    }
}