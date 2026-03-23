@RestResource(urlMapping='/createCustomCase')
global class apiCustomCase {
@HttpPost
    global static void method(){
        RestRequest req=RestContext.request;
        String str=req.requestBody.toString(); 
        Map<String,Object>mpp=(Map<String,Object>)json.deserializeUntyped(str);
        Custom_Case__c c=new Custom_Case__c();
        
        String autonum=String.valueOf(mpp.get('PreviousCase'));
        String model=String.valueOf(mpp.get('TrackerModel'));
        Custom_Case__c previous;
        Tracker_Model__c track;
        if(!String.isBlank(autonum)){
           previous=[Select Id from Custom_Case__c where Name=:autonum LIMIT 1];
        }
        if(!String.isBlank(model)){
            track=[Select Id from Tracker_Model__c  where Name=:model LIMIT 1];
        }
        
        
        
        List<Object> options = (List<Object>)mpp.get('TroubleshootingStepsTaken');
        String multiValues = String.join(options, ';');
        
       c.Previous_Case__c=String.isBlank(autonum)?null:previous.Id;
        // c.Previous_Case__c=Id.valueOf(previous.Id);
        c.Subject__c=String.valueOf(mpp.get('Subject'));
        c.User_Email__c=String.valueOf(mpp.get('UserEmail'));
        c.User_Name__c=String.valueOf(mpp.get('UserName'));
        c.Description__c=String.valueOf(mpp.get('Description'));
        c.Tracker_Model__c=String.isBlank(model)?null:track.Id;
        c.TroubleShooting_Steps_Taken__c=multiValues;
        c.Sync_Issue__c=String.valueOf(mpp.get('SyncIssue'));

        Database.saveResult saves=System.Database.insert(c,true);
        if(saves.isSuccess()){
            EmailTemplate et = [SELECT Id,Subject, Body FROM EmailTemplate WHERE DeveloperName =:'CustomCase'];
            Messaging.SingleEmailMessage email = Messaging.renderStoredEmailTemplate(et.Id,UserInfo.getUserId(),saves.getId());
            String emailSubject = email.getSubject();
            String emailTextBody = email.getPlainTextBody();
            email.setTargetObjectId(UserInfo.getUserId());
            email.setSubject(emailSubject);
            email.setPlainTextBody(emailTextBody);
            email.saveAsActivity = false;

/*if(!Test.isRunningTest()) {
  Messaging.SendEmailResult[] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
}*/
            /*mail.setTemplateId(et.Id);
            mail.setToAddresses(toAddress);*/
            //mail.setSubject(et.subject);
            //mail.setHTMLBody(et.Body);
            /*mail.setTargetObjectId(UserInfo.getUserId());
            mail.setWhatId(saves.getId());
            mail.setSaveAsActivity(false);
            mail.setUseSignature(false);
            List<Messaging.SingleEmailMessage> allmsg = new List<Messaging.SingleEmailMessage>();
            allmsg.add(mail);*/

            try {
               
             Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
             
 
            } catch (Exception e) { 
             System.debug(e.getMessage());
            }
        }
        
    }
}