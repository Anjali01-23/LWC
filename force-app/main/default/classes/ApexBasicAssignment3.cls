public class ApexBasicAssignment3 {
    public static List<integer> reverseList(List<Integer>inputList){
        List<integer>list2=new List<Integer>();
        for(integer i=inputList.size()-1;i>=0;i--){
            list2.add(inputList[i]);
        }
        return list2;
    }
}