public class apiIPAddress{
    
    @future(callout=true)
    public static void method(String IPAddress,Id StudentId){   
        HttpRequest req=new HttpRequest();
        req.setEndPoint('https://api.ipgeolocation.io/v3/ipgeo?apiKey=ef8d0b1d45134806b57a92adcb1281c9&ip='+IPAddress); //URL
        req.setMethod('GET');//Method
                
        HttpResponse res=new HttpResponse();//For response
        
        Http htp=new Http(); //Use to send Request
        res=htp.send(req);
        Map<String,Object>mpp=(Map<String,Object>)JSON.deserializeUntyped(res.getBody());
        Map<String,Object>locationMap=(Map<String,Object>)mpp.get('location');
        Student__c stu=[select id from Student__c where id=:StudentId];
        stu.Location__c=String.valueOf(locationMap.get('country_name'));
        System.debug(locationMap);
        update stu;
        /*System.debug(res);
        System.debug(res.getStatus());*/
    }
}