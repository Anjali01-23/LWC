public class PracticeClass {
    public static void method(){
        Id id='0015g00002AabcD';
        System.debug(id);
        String s1='0015g00002AabcDAAR';
        Id id2=s1;
        System.debug(s1);
        System.debug(id2);
        Integer i=2147483647 + 1;
        System.debug(i);
        Double d=2;
        System.debug(d);
        Double d1=23.45;
        Integer i1=Integer.valueOf(d1);
        System.debug(i1);
        
        
        //List
        List<Integer>l1=new List<Integer>{1,2,3,4};
        List<Integer>l2=new List<Integer>{55,66};
        l2=l1.clone();
        System.debug(l2);
        Integer[] ii1=new Integer[]{1,2,3,4,56};
        System.debug(ii1[4]);
        
        
        //Set
        Set<string> set1=new Set<String>{'I', 'Miss','You','I'};
            for(string stri:set1){
                System.debug(stri);
            }
        Set<String>set2=new Set<String>{'Anja'};
        set2=set1.clone();
          for(string stri:set2){
                System.debug(stri);
            }
        
        //Map
        Map<String,Integer>mpp=new Map<String,Integer>{'A'=>10,'B'=>20};
         mpp.put('C',30);
        mpp.put('A',100);
        for(string map_name:mpp.keySet()){
            Integer no=mpp.get(map_name);
            System.debug(map_name+'---->'+no);
        }
        Map<String,Integer>mpp2=new Map<String,Integer>{'D'=>200};
            mpp2.putall(mpp);
        for(string map_name:mpp2.keySet()){
            Integer no=mpp2.get(map_name);
            System.debug(map_name+'---->'+no);
        }
        
       
    }
}