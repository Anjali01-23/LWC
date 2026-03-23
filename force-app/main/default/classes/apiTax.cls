@RestResource(urlMapping='/createTax')
global class apiTax {
 @HttpPost
    global static String method(){
         String error;
         Integer SaveCount=0;
        Integer FailedCount=0;
        List<WrapperPractice.RecordClass>errorMap=new  List<WrapperPractice.RecordClass>();
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString(); 
        List<Object>listData=(List<Object>)json.deserializeUntyped(str);
        
        List<Contact>con=new List<sObject>();
        List<Tax_Return__c>tax=new List<Tax_Return__c>();
        
        
        for(Object datas:listData){
            Map<String,Object>data=(Map<String,Object>)datas;
            Contact ref=new Contact(Email=String.valueOf(data.get('Email')));
            Contact c=new Contact(LastName=String.valueOf(data.get('Name')),Email=String.valueOf(data.get('Email')));
            con.add(c);
            List<Object>data2=(List<Object>)data.get('Salaries');
            for(Object o:data2){
                Map<String,Object>mpp=(Map<String,Object>)o;
                Tax_Return__c t=new Tax_Return__c(Amount__c=Decimal.valueOf(String.valueOf((mpp.get('Amount')))),Month__c=String.valueOf(mpp.get('Month')),External_Id__c=String.valueOf(mpp.get('external_id_c')),Contact__r=ref);
                tax.add(t);
            }
            
        }
      List<String>res=new List<String>();
         System.debug(con);
        System.debug(tax);
       List<Database.upsertResult> save=System.Database.upsert(con,Contact.Fields.Email,false);
        List<Database.upsertResult> save2=System.Database.upsert(tax,Tax_Return__c.Fields.External_Id__c,false);
        List<Database.Error>err=new List<Database.Error>();
        for(Integer i=0; i<save.size();i++){
        if(save[i].isSuccess()){
            SaveCount++;       
        }
        else{
            Contact c=con[i];
            FailedCount++;
            String errMess='';
            for(Database.Error e:save[i].getErrors()){
                errMess+=e.getMessage();
            }
            WrapperPractice.RecordClass mm1=new WrapperPractice.RecordClass();
            mm1.record=c.Email;
            mm1.error=errMess;
            errorMap.add(mm1);
            
        }
        }
        List<String>res2=new List<String>();
           
        for(Integer i1=0; i1<save2.size();i1++){
        if(save2[i1].isSuccess()){
            SaveCount++;
        }
        else{
           FailedCount++;
            Tax_Return__c c1=tax[i1];
            String errMess1='';
            for(Database.Error e1:save2[i1].getErrors()){
                errMess1+=e1.getMessage();
            }
            WrapperPractice.RecordClass mm=new WrapperPractice.RecordClass();
            mm.record=c1.External_Id__c;
            mm.error=errMess1;
            errorMap.add(mm);
        }
        }
        WrapperPractice wrap=new WrapperPractice();
        wrap.Save=SaveCount;
        wrap.Failed=FailedCount;
        wrap.Records=errorMap;
        String responseBody=JSON.serialize(wrap); 
        return responseBody; 
    }
       
}