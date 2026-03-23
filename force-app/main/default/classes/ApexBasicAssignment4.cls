public class ApexBasicAssignment4 {
    public static  Map<Integer,List<integer>> map2DList(List<List<Integer>>list1){
        Map<Integer,List<integer>>mpp=new Map<Integer,List<integer>>();
        for(integer i=0;i<list1.size();i++){
            Set<integer>set1=new Set<Integer>();
            set1.addall(list1[i]);
            List<Integer>list2=new List<Integer>();
            list2.addall(set1);
            mpp.put(i,list2);
        }
        return mpp;
    }
}