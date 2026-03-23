@RestResource(urlMapping='/convertLead')
global class LeadConvertApi_Q1b {
@HttpPost
    global static string convertLeadApi(){
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString();
        List<Object>mapList=(List<Object>)json.deserializeUntyped(str);
        Map<String,String>mpp=new Map<String,String>();
        for(Object obj:mapList){
            Map<String,Object>m=(Map<String,Object>)obj;
            mpp.put(String.valueOf(m.get('LeadName')),String.valueOf(m.get('Create_opp')));
        }
        List<Lead>leadList=[Select Id ,Name from Lead where name IN :mpp.keySet() and IsConverted=false];
        
        List<Database.Leadconvert>leadss=new List<Database.Leadconvert>();
        List<Id>leadId=new List<Id>();
        
        LeadStatus ls=[Select MasterLabel from LeadStatus where IsConverted=true LIMIT 1];
        for(Lead l:leadList){
          Database.Leadconvert lc=new Database.Leadconvert();
          lc.setLeadId(l.Id);
          lc.setConvertedStatus(ls.MasterLabel);
            if(mpp.get(l.name)=='false'){
              lc.setDoNotCreateOpportunity(true); 
            }
           leadss.add(lc);
        }
        List<Database.LeadConvertResult>saves=System.Database.Convertlead(leadss);
        for(Database.LeadConvertResult s:saves){
            if(s.isSuccess()){
                leadId.add(s.getLeadId());
            }
        }
        String convertLead=JSON.serialize(leadId);
        String response='These leads are converted:'+convertLead;
        return response;
    }
}