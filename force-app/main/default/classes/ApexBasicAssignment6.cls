public class ApexBasicAssignment6 {
    public static void reverseList(List<Integer> inputList,integer start, integer endd){
        while(start<=endd){
            integer temp=inputList[endd];
            inputList[endd]=inputList[start];
            inputList[start]=temp;     
            start++;
            endd--;
        }
        return ;
    }
    public static List<Integer> rotateClockwise(List<Integer> inputList, Integer positions){
        reverseList(inputList,0,inputList.size()-1);
        reverseList(inputList,0,positions-1);
        reverseList(inputList,positions,inputList.size()-1);
        return inputList;
    }
    public static List<Integer> rotateAntiClockwise(List<Integer> inputList, Integer positions){
        reverseList(inputList,0,positions-1);
        reverseList(inputList,positions,inputList.size()-1);
        reverseList(inputList,0,inputList.size()-1);
        return inputList;
    }
}