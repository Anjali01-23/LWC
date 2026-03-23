public class apiInvoice {

    @future(callout=true)
    public static void generateInvoiceAPI(Set<Id>orderId){
        List<ContentVersion>cvList=new List<ContentVersion>();
        StripeApia__c data1=StripeApia__c.getOrgDefaults();
        String endpoint=data1.StripeEndPoint__c;
        String customerId=data1.StripeCustomer__c;
        String secretKey=data1.StripeKey__c;
        HttpRequest req=new HttpRequest();
        req.setMethod('POST');
        req.setEndPoint(endpoint);
        req.setHeader('Authorization','Bearer '+secretKey);
        String body='customer='+customerId;
        req.setBody(body);
        Http htp=new Http();
        HttpResponse res=htp.send(req);
      //  System.debug(res.getBody());
        String invoiceId;
        try{
            if(res.getStatusCode()==200){
                Map<String,Object>mpp=(Map<String,Object>)JSON.deserializeUntyped(res.getBody());
                invoiceId=String.ValueOf(mpp.get('id'));
            }
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
        
        /*StripeApib__c data1=StripeApib__c.getOrgDefaults();
        String endpoint1=data1.StripeEndPoint__c;
        String secretKey1=data1.StripeKey__c; */ 
        List<Order>orders=[Select Id, TotalAmount,Name from Order where ID IN :orderId];
        
        
        for(Order o:orders){
        Httprequest req1=new HttpRequest();
        req1.setMethod('POST');
        req1.setEndPoint('https://api.stripe.com/v1/invoiceitems');
        req1.setHeader('Authorization','Bearer sk_test_51T4EjfJG4z7AWuW5hhgHbSaPhMpxQHZKbVsWNsHfmTIvCfSwVKzBy71YMaZz3jjE39KB34DMpn3f38AS3nM2WUK400E6XBzjsf');
        String body1 = 'customer=' + customerId + 
                      '&invoice=' + invoiceId + 
                      '&amount=' + (o.TotalAmount).intValue() + 
                      '&currency=usd&description='+o.Name;
        req1.setBody(body1);
        Http htp1=new Http();
        HttpResponse res1=htp1.send(req1);
        System.debug(res1.getBody());
        
        HttpRequest req2=new HttpRequest();
        req2.setEndPoint('https://api.stripe.com/v1/invoices/'+invoiceId+'/finalize');
        req2.setMethod('POST');
        req2.setHeader('Authorization','Bearer sk_test_51T4EjfJG4z7AWuW5hhgHbSaPhMpxQHZKbVsWNsHfmTIvCfSwVKzBy71YMaZz3jjE39KB34DMpn3f38AS3nM2WUK400E6XBzjsf');
         Http htp2=new Http();
        HttpResponse res2=htp2.send(req2);
        System.debug(res2.getBody());
        
        String pdfUrl;
        if(res2.getStatusCode()==200){
                Map<String,Object>mpp=(Map<String,Object>)JSON.deserializeUntyped(res2.getBody());
                pdfUrl=String.ValueOf(mpp.get('invoice_pdf'));
            System.debug(pdfUrl);
        }   
        Http htp3=new Http();
        HttpRequest request=new HttpRequest();
        request.setEndPoint(pdfUrl);
        request.setMethod('GET');

        HttpResponse res3=htp3.send(request);
        System.debug(res3.getStatusCode());
            
        if(res3.getStatusCode() == 302 || res3.getStatusCode() == 301) {
        String newLocation = res3.getHeader('Location');
        System.debug('Redirecting to: ' + newLocation);
        
        HttpRequest redirReq = new HttpRequest();
        redirReq.setEndPoint(newLocation);
        redirReq.setMethod('GET');
        
        res3 = htp3.send(redirReq);
        System.debug('Redirect ke baad status: ' + res3.getStatusCode()); 
    }
         
          if(res3.getStatusCode()==200){
            Blob pdfBlob=res3.getBodyAsBlob();
            ContentVersion cv = new ContentVersion();
            cv.Title = 'Attached PDF';
            cv.PathOnClient = 'document.pdf';
            cv.VersionData = pdfBlob;
            cv.FirstPublishLocationId = o.Id;
            cvList.add(cv);
            }
            
        }
        System.debug(cvList);
        System.database.insert(cvList);
    }
}