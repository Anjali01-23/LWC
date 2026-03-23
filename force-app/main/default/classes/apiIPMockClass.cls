public class apiIPMockClass implements HTTPCalloutMock{

    public HttpResponse respond(HttpRequest req){
        HttpResponse res=new HttpResponse();
        if(req.getEndPoint()=='https://api.ipgeolocation.io/v3/ipgeo?apiKey=ef8d0b1d45134806b57a92adcb1281c9&ip=91.128.103.196' && req.getMethod()=='GET'){
            String jsonResponse='Ye response h';
            res.setStatus('200');
            res.setBody(jsonResponse);           
        }
        return res;
    }
}