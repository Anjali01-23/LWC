public class ApexBasicAssignment2 {
    public static Integer sumOfDigits(Integer num){
        integer sum=0;
        string s=string.valueOf(num);
        for(integer i=0;i<s.length();i++){
            integer no=integer.valueOf(s.substring(i,i+1));
            sum+=no;
        }
        return sum;
    }
    
}