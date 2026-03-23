public class ApexBasicAssignment5 {
    public static List<List<string>> removeDuplicateAndSort(List<List<string>> list1){
        List<List<string>> list2=new List<List<string>>();
        for(integer i=0;i<list1.size();i++){
            Set<string>set1=new Set<string>();
            set1.addall(list1[i]);
            List<string>list_new=new List<string>();
            list_new.addall(set1);
            list_new.sort();
            list2.add(list_new);
        }
        return list2;
    }
}