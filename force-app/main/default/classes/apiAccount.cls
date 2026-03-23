@RestResource(urlMapping='/createAccount')
global class apiAccount {
 @HttpPost
    global static string method(){
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString(); //It converts the JSON data into a JSON string.
        Map<String,Object>mpp=(Map<String,Object>)json.deserializeUntyped(str);
        
        Account acc=new Account();
        acc.Name=String.valueOf(mpp.get('Name'));
        Database.saveResult saves=System.Database.insert(acc,false);
        if(saves.isSuccess()){
            Contact c=new Contact();
            c.LastName=String.valueOf(mpp.get('LastName'));
            c.AccountId=saves.Id;
            insert c;
            return 'Contact is created'+c.id;
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
}