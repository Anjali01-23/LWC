@RestResource(urlMapping='/getAccCont')
global class apiAssignment {
    @HttpPost
    global static string getAccountAndContact(){
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString();
        Map<String,Object>mpp=(Map<String,Object>)json.deserializeUntyped(str);
        List<Account>acc=[ Select (Select Name from Contacts),name ,NumberOfEmployees from Account where name=:String.valueOf(mpp.get('Name')) LIMIT 1];
        if(acc.isEmpty()) {
        return 'No Account Exists with name ' + mpp.get('Name') ; 
        }
        WrapperAccount wrap=new WrapperAccount();
        wrap.Name=acc[0].Name;
        wrap.NumberOfEmployees=acc[0].NumberOfEmployees;
        
        Map<String,WrapperAccount.ContactClass>mpp1=new Map<String,WrapperAccount.ContactClass>();
        Integer i=1;
        for(Contact c:acc[0].Contacts){
            WrapperAccount.ContactClass con=new WrapperAccount.ContactClass();
            con.Name=c.Name;
            mpp1.put('Contact'+i,con);
            i++;
        }
        wrap.Contacts=mpp1;
        String responseBody = JSON.serialize(wrap); 
        return responseBody;
    }
   
}