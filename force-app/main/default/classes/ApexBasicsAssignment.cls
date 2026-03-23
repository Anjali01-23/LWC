/**
 * @description ApexBasicsAssignment
 */
public class ApexBasicsAssignment{
    /**
 * @description     Question 1
 * @author Anjali Goyal
 * @return Boolean It returns boolean.
 * @param str It stores String used for palindrome check.
 */

    public static Boolean isPalindrome(String str){
        String s1='';
        for(Integer i=str.length()-1;i>=0;i--){
            s1+=str.substring(i,i+1);
        }
        if(s1==str){
            return true;
        }else{
            return false;
        }
    }

/**
 * @description     Question 2
 * @author Anjali Goyal
 * @return Integer It returns Integer.
 * @param num It stores num whose Sum is done.
 */
    public static Integer sumOfDigits(Integer num){
        Integer sum=0;
        string s=string.valueOf(num);
        for(Integer i=0;i<s.length();i++){
            Integer no=Integer.valueOf(s.substring(i,i+1));
            sum+=no;
        }
        return sum;
    }

     /**
 * @description     Question 3
 * @author Anjali Goyal
 * @return List<Integer> It returns list with Integer datatype.
 * @param inputList It is the list which we have to reverse.
 */
    public static List<Integer> reverseList(List<Integer>inputList){
        List<Integer>list2=new List<Integer>();
        for(Integer i=inputList.size()-1;i>=0;i--){
            list2.add(inputList[i]);
        }
        return list2;
    }

    /**
 * @description     Question 4
 * @author Anjali Goyal
 * @return Map<Integer,List<Integer>> It returns map.
 * @param InputList It is the 2D list which we have to convert it in Map .
 */
      public static  Map<Integer,List<Integer>> map2DList(List<List<Integer>>InputList){
        Map<Integer,List<Integer>>mpp=new Map<Integer,List<Integer>>();
        for(Integer i=0;i<InputList.size();i++){
            Set<Integer>set1=new Set<Integer>();
            set1.addall(InputList[i]);
            List<Integer>list2=new List<Integer>();
            list2.addall(set1);
            mpp.put(i,list2);
        }
        return mpp;
    }

    /**
 * @description     Question 5
 * @author Anjali Goyal
 * @return List<List<string>> It returns list which stores list of strings.
 * @param inputList It is the 2D list from where we have to remove duplicates and sort it. .
 */
    public static List<List<String>>removeDuplicatesAndSort(List<List<String>> inputList){
        for (integer i=0;i<inputList.size();i++){
            for(integer j=0;j<inputList[i].size();j++){
                List<string>newList=new List<string>();
                newList=inputlist[i][j].split(';');
                Set<string> s=New Set<string>(newList);
                newList.clear();
                newList.addAll(s);
                newList.sort();
                inputList[i][j]=String.join(newList,';');
            }
            
        }
        return inputList;
    }
     /**
 * @description     Question 6.a
 * @author Anjali Goyal
 * @return List<Integer> It returns list which stores Integers.
 * @param inputList Store list
 * @param positions Store positions
 */
   public static List<Integer> rotateClockwise(List<Integer> inputList, Integer positions){
        Integer N=inputlist.size();
        if(N>0){positions=math.mod(positions,N);
        List<Integer>rotated=new List<Integer>();
        for(Integer i=N-positions;i<N;i++){
            rotated.add(inputList[i]);
        }
        for(Integer i=N-1;i>=positions;i--){
            inputList[i]=inputlist[i-positions];
        }
        for(Integer i=0;i<positions;i++){
            inputList[i]=rotated[i];
        }
    }
        return inputList;
    }
    /**
 * @description     Question 6.b
 * @author Anjali Goyal
 * @return List<Integer> It returns list which stores Integers.
 * @param inputList Store list
 * @param positions Store positions
 */
    public static List<Integer> rotateAntiClockwise(List<Integer> inputList, Integer positions){
        Integer N=inputlist.size();
        if(N>0){positions=math.mod(positions,N);
        List<Integer>rotated=new List<Integer>();
        for(Integer i=0;i<positions;i++){
            rotated.add(inputList[i]);
        }
        for(Integer i=positions;i<N;i++){
            inputList[i-positions]=inputlist[i];
        }
        for(Integer i=N-positions;i<N;i++){
            inputList[i]=rotated[i-(N-positions)];
        }
    }
        return inputList;
    }
    /**
 * @description     Question 7
 * @author Anjali Goyal
 * @return List<Integer> It returns list which stores Integers.
 * @param inputList Store the list 
 */
     public static List<Integer> findLeaders(List<Integer> inputList){
        integer n=inputList.size();
        List<Integer> ans=new List<integer>();
        if(n>0){ans.add(inputList[n-1]);
        integer sum=inputList[n-1];
        for(integer i=n-2;i>=0;i--){
            if(sum<inputList[i]){ans.add(inputList[i]);}
            sum+=inputList[i];
        }
        integer i=0;
        integer j=ans.size()-1;
        while(i<j){
            INTEGER temp =ans[i];
            ans[i]=ans[j];
            ans[j]=temp;
            i++;
            j--;
        }
    }
        return ans;
    }
}