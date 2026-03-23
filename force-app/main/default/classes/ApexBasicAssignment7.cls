public class ApexBasicAssignment7 {
    public static void reverseList(List<Integer>list1,integer start, integer endd){
        while(start<=endd){
            integer temp=list1[start];
            list1[start]=list1[endd];
            list1[endd]=temp;
            start++;
            endd--;
        }
        return;
    }
    public static List<Integer> findLeaders(List<Integer> inputList){
        List<Integer>ans=new List<Integer>();
        ans.add(inputList[inputList.size()-1]);
        for(integer i=inputList.size()-2;i>=0;i--){
            if(inputList[i]>ans[ans.size()-1]){
                ans.add(inputList[i]);
            }
        }
        reverseList(ans,0,ans.size()-1);
        return ans;
    }

}