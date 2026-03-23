public class OrderInvoice {
    public static void assignPricebook(List<Order> ord){
    PriceBook2 p = [SELECT Id FROM PriceBook2 WHERE IsStandard = true LIMIT 1];               
    for(Order o : ord){
        if(o.Pricebook2Id == null){
            o.Pricebook2Id = p.Id;  
        }
    }
}
    public static void invoiceGenerate(List<Order>ord){
        Map<Id,Order>orderMap=new Map<Id,Order>();
        for(Order o:ord){
            orderMap.put(o.Id,o);
        }
        Map<Id,Map<String,Integer>>mpp=new Map<Id,Map<String,Integer>>();
        List<Product2>prod=[Select Name from Product2];
        
        Map<String, Id> productMap = new Map<String, Id>();
        for(Product2 p:prod){
            productMap.put(p.Name,p.Id);
        }
        
        Set<String>namesProd=new Set<String>();
        for(Product2 p:prod){
            namesProd.add(p.Name);
        }
        for(Order o:ord){
            List<String>splitComma=o.Product__c.split(',');
            Map<String,Integer>ProdInfo=new Map<String,Integer>();
            for(String s:splitComma){
                if(ProdInfo.containsKey(s.subStringBefore('(').trim())){
                    o.addError('Product name need to be Unique');
                }
                else if(!namesProd.contains(s.subStringBefore('(').trim())){
                    o.addError('Product is not Present');
                }
                else{
                    ProdInfo.put(s.subStringBefore('(').trim(),Integer.valueOf(s.subStringBetween('(',')').trim()));
                }
            }
          mpp.put(o.Id,ProdInfo);  
        }
        List<PricebookEntry>pb=[Select Id,UnitPrice,Product2Id from PricebookEntry where IsActive=true and Product2Id IN :productMap.values()];
        Map<Id,PriceBookEntry>mapp=new Map<Id,PriceBookEntry>();
        for(PricebookEntry pe:pb){
            mapp.put(pe.Product2Id,pe);
        }
        List<OrderItem>orderPro=new List<OrderItem>();
        for(Id orderIds:mpp.keySet()){
            Map<String,Integer>mNew=mpp.get(orderIds);
            for(String s:mNew.keySet()){
                if(mapp.get(productMap.get(s))==NULL){
                    orderMap.get(orderIds).addError(s+'Has no Price Book Entry');
                }
                else{
                   orderPro.add(new OrderItem(OrderId=orderIds,PriceBookEntryId=mapp.get(productMap.get(s)).Id,Quantity=mNew.get(s),UnitPrice=mapp.get(productMap.get(s)).UnitPrice));

                }
            }
        }
        List<Database.saveResult>saves=System.Database.insert(orderPro);
        List<Id>orderProIDS=new List<Id>();
        for(Database.saveResult s:saves){
            if(s.isSuccess()){
                orderProIDS.add(s.getId());
            }
        }
        apiInvoice.generateInvoiceAPI(orderMap.keySet());
    }
    
}