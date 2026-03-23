public class apiStripe implements Database.Batchable<sObject>,Database.AllowsCallouts{
    Set<Id>oppIds=new Set<Id>();
    public apiStripe(Set<Id>idss){
        this.oppIds=idss;
    }
    public Database.QueryLocator start(Database.BatchableContext bc){
        return System.Database.getQueryLocator('Select Name, Amount, Email__c , (Select Name,UnitPrice,Quantity,Product2.Name from OpportunityLineItems) From Opportunity where Id IN :oppIds');
    }
    
    public void execute(Database.BatchableContext bc,List<Opportunity>oppList){
      List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
      StripeApii__c data=StripeApii__c.getOrgDefaults();
      String stripeKey=data.stripeKey__c;
      String stripeEndPoint=data.stripeSessionEndPoint__c;
        
        
      for(Opportunity o:oppList){
      HttpRequest req=new HttpRequest();
      req.setMethod('POST');
      req.setHeader('Authorization','Bearer '+stripeKey);
      req.setEndPoint(stripeEndPoint);
      req.setHeader('Content-Type','application/x-www-form-urlencoded');
        
      
      String body='success_url=https://example.com/success&mode=payment';
      
          Integer index=0;
          for(OpportunityLineItem o1:o.OpportunityLineItems){
              body+='&line_items['+index+'][price_data][unit_amount]='+Integer.valueOf(o1.UnitPrice)+'&line_items['+index+'][quantity]='+Integer.valueOf(o1.Quantity)+'&line_items['+index+'][price_data][currency]=INR'+
                    '&line_items['+index+'][price_data][product_data][name]='+o1.Product2.Name;
                  index++;
          }
          req.setBody(body);
          
                    Http htp=new Http();
          HttpResponse res=htp.send(req);
          System.debug(res.getBody());
          try{
              if(res.getStatusCode()==200){
                  Map<String,Object>mpp1=(Map<String,Object>)JSON.deserializeUntyped(res.getBody());
                  String link=String.ValueOf(mpp1.get('url'));
                  Messaging.SingleEmailMessage sem=new Messaging.SingleEmailMessage();
                  List<string>EmailAddress=new List<String>{o.Email__c};
                  sem.toAddresses=EmailAddress;
                  sem.setSubject('Complete the Payment');
                  sem.setPlainTextBody('Please pay here'+link);
                  emailList.add(sem);
              }
          }
          catch(Exception e){
              System.debug(e.getMessage());
          }
    }
        Messaging.sendEmail(emailList);

          
    }
    
    public void finish(Database.BatchableContext bc){
        
    }
    
}