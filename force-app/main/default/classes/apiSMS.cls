public class apiSMS {
    
    @future(callout=true)
    public static void method(String Name, String Phone, String Email){   
        HttpRequest req=new HttpRequest();
        req.setEndPoint('https://api.twilio.com/2010-04-01/Accounts/ACfacda2f4cc58f682d6edb3c6ad84091d/Messages'); //URL
        req.setMethod('POST');//Method
        Blob b=Blob.valueOf('ACfacda2f4cc58f682d6edb3c6ad84091d:773b4ed6a57821e893ddf9c129c805e0');
        String str=EncodingUtil.base64Encode(b);
        req.setHeader('Authorization','Basic '+str); //Authentication
        
        //Request Parametersgg
        String message='Hello'+Name;
        String body='From='+EncodingUtil.urlEncode('+14092543962','UTF-8')+'&To='+EncodingUtil.urlEncode(Phone,'UTF-8')+'&Body='+EncodingUtil.urlEncode(message,'UTF-8');
        req.setBody(body);
        
        HttpResponse res=new HttpResponse();//For response
        
        Http htp=new Http(); //Use to send Request
        res=htp.send(req);
        
    }
}