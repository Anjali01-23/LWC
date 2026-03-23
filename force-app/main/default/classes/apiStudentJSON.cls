@RestResource(urlMapping='/createStudentJSON')
global class apiStudentJSON {
@HttpPost
    global static string method(){
        
        //Handle Request
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString(); //It converts the JSON data into a JSON string.
        Map<String,Object>mpp=(Map<String,Object>)json.deserializeUntyped(str); //It parses/deserialize the JSON string into standard Apex collections (Map, List, String, Boolean, Integer).The (Map<String, Object>) cast converts the resulting Object into a map where keys are strings and values can be any type.And Object is a superclass for all Datatypes just like sObject for all salesforce objects.
        List<Student__c>student1=[Select Student_Name__c , Course_Opted__c,Father_Name__c from Student__c where Father_Name__c=:String.valueOf(mpp.get('Father'))];
        
        
        //Send Response
        Map<String,List<Map<String,Object>>>mpp1=new Map<String,List<Map<String,Object>>>();
            
        String JSONstr=JSON.serialize(mpp1);
        return JSONstr;
        
    }
}