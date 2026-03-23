@RestResource(urlMapping='/createStudentJSONN')
global class apiStudentJSON1 {
@HttpPost
    global static string method(){
        
        //Handle Request
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString(); //It converts the JSON data into a JSON string.
        Map<String,Object>mpp=(Map<String,Object>)json.deserializeUntyped(str); //It parses/deserialize the JSON string into standard Apex collections (Map, List, String, Boolean, Integer).The (Map<String, Object>) cast converts the resulting Object into a map where keys are strings and values can be any type.And Object is a superclass for all Datatypes just like sObject for all salesforce objects.
        List<Student__c>student1=[Select Student_Name__c , Course_Opted__c,Father_Name__c from Student__c where Father_Name__c=:String.valueOf(mpp.get('Father'))];
        
        
        //Send Response
        Map<String,List<Map<String,Object>>>mpp1=new Map<String,List<Map<String,Object>>>();
        List<Map<String,Object>>list1=new List<Map<String,Object>>();
        for(Student__c s:student1){
            Map<String,Object>mpp2=new Map<String,Object>();
            mpp2.put('Student Name',s.Student_Name__c);
            mpp2.put('Student Course',s.Course_Opted__c);
            mpp2.put('Father Name',s.Father_Name__c);
            list1.add(mpp2);
        }
        mpp1.put(String.valueOf(mpp.get('Father')),list1);
        String JSONstr=JSON.serialize(mpp1);
        return JSONstr;
        
    }
}