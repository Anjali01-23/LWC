public class AggregateFunctions {
    public static void method(){
        
        //SUM
       /* AggregateResult ar1=[Select SUM(Amount) from Opportunity];
        System.debug(ar1);
        Decimal i=(Decimal)ar1.get('expr0');
        System.debug(i);
        Integer i1=Integer.valueOf(i);
        System.debug(i1);*/
        
        //MAX
        AggregateResult ar1=[Select MAX(Amount) , SUM(Amount) from Opportunity];
        System.debug(ar1);
        Decimal i=(Decimal)ar1.get('expr0');
        System.debug(i);
        Integer i1=Integer.valueOf(i);
        System.debug(i1);
        
        //MIN
        /*AggregateResult ar1=[Select MIN(Amount) from Opportunity];
        System.debug(ar1);
        Decimal i=(Decimal)ar1.get('expr0');
        System.debug(i);
        Integer i1=Integer.valueOf(i);
        System.debug(i1);*/
        
        //Count 
        /*Integer ar1=[Select Count() from Opportunity];
        System.debug(ar1);*/
        
        
        //Count(Id)
        /*AggregateResult ar1=[Select Count(Id) from Opportunity];
        System.debug(ar1);
        Integer i=(Integer)ar1.get('expr0');
        System.debug(i);*/
        
        //Count(fieldname)
        /*AggregateResult ar1=[Select Count(Amount) from Opportunity];
        System.debug(ar1);
        Integer i=(Integer)ar1.get('expr0');
        System.debug(i);*/
        
        //Count_Distinct
        /*AggregateResult ar1=[Select Count_Distinct(Amount) from Opportunity];
        System.debug(ar1);
        Integer i=(Integer)ar1.get('expr0');
        System.debug(i);*/
        
        //Avg
       /* AggregateResult ar1=[Select Avg(Amount) from Opportunity];
        System.debug(ar1);
        Decimal i=(Decimal)ar1.get('expr0');
        System.debug(i);*/
    }
}