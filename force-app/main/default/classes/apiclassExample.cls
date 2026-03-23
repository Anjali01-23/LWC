@RestResource(urlMapping='/createStudent')
global class apiclassExample {
@HttpPost
    global static string method(){
        
        //Handle Request
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString(); //It converts the JSON data into a JSON string.
        Map<String,Object>mpp=(Map<String,Object>)json.deserializeUntyped(str); //It parses/deserialize the JSON string into standard Apex collections (Map, List, String, Boolean, Integer).The (Map<String, Object>) cast converts the resulting Object into a map where keys are strings and values can be any type.And Object is a superclass for all Datatypes just like sObject for all salesforce objects.
        System.debug(mpp.get('Name'));
        
        //Process Request
        Student__c st=new Student__c();
        st.Student_Name__c=String.valueOf(mpp.get('Name'));
        st.Student_Phone__c=String.valueOf(mpp.get('Phone'));
        st.Student_Email__c=String.valueOf(mpp.get('Email'));
        Database.saveResult saves=System.Database.insert(st,false);
        
        //Send Response
            if(saves.isSuccess()){
                return st.id;
            }
            else{
                List<Database.Error>errors1=new List<Database.Error>();
                String error='These are errors :- ';
                errors1=saves.getErrors();
                for(Database.Error err:errors1){
                    error+=err.getMessage();
                }
                return error;
                }
        
    }
   /* @HttpGet
    global static string method2(){
        return 'From Get Method';
    }*/
    
    @HttpGet
global static String createStudentGet() {

    RestRequest req = RestContext.request;

    String name  = req.params.get('Name');
    String phone = req.params.get('Phone');
    String email = req.params.get('Email');

    Student__c s = new Student__c(
        Student_Name__c = name,
        Student_Phone__c = phone,
        Student_Email__c = email
    );

    insert s;
    return s.Id;
}

}