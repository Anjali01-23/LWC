public class GroupBy {
    public static void method(){
        List<AggregateResult>ar=[Select StageName,MIN(Amount)from Opportunity GROUP BY StageName];
        System.debug(ar);
    }
}