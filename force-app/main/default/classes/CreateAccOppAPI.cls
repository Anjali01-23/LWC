@RestResource(urlMapping='/CreateAccOpp')
global class CreateAccOppAPI {
@HttpPost
    global static Map<String,String>accOpp(){
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString();
        List<Object>mapList=(List<Object>)json.deserializeUntyped(str);
        
        List<Account>acc=new List<Account>();
  
        for(Object obj:mapList){
            Map<String,Object>m=(Map<String,Object>)obj;
            acc.add(new Account(name=String.valueOf(m.get('AccountName'))));
        }
        List<Database.saveResult>Accsaves=System.Database.insert(acc,false);
        List<Opportunity>oppor=new List<Opportunity>();
        
        Map<String,String>response=new Map<String,String>();
        
        for(integer i=0;i<Accsaves.size();i++){
            Map<String,Object>accData=(Map<String,Object>)mapList[i];

            if(Accsaves[i].isSuccess()){
                response.put(acc[i].name,'Account Inserted Successfully');
                List<Object>oppList=(List<Object>)accData.get('Opportunities');
                for(Object objj: oppList){
                    Map<String,Object> opp1=(Map<String,Object>)objj;
                    oppor.add(new Opportunity(name=String.valueOf(opp1.get('Name')),CloseDate=(opp1.get('closeDate') != null && String.valueOf(opp1.get('closeDate')) != '') ? Date.valueOf(String.valueOf(opp1.get('closeDate'))) : null,StageName=String.valueOf(opp1.get('Stage')),AccountId=Accsaves[i].getId(),Email__c=String.valueOf(opp1.get('Email')) ));
                }
            }
            else{
                String Key= (acc[i].name==''||acc[i].name==null)?'null':acc[i].name;
                response.put(key,'Account Creation failed with realted opportunity');
            }
        }
        List<Database.saveResult>saves1=System.Database.insert(oppor,false);
        for(integer i=0;i<saves1.size();i++){
            if(saves1[i].isSuccess()){
                response.put(oppor[i].name,'Opportunity Inserted Successfully');
            }
            else{
                response.put(oppor[i].name,'Opportunity Insertion Failed');
            }
        }
        return response;
    }
}