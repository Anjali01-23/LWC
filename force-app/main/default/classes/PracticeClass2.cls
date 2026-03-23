public class PracticeClass2{
       //Private method
        static void methodd(){
            System.debug('Private Method');
        }     
        public static void another(){
            System.debug('Public Method');
            methodd();
        }
    public String name;
    public String age;
    public String city;
    public static String species;
    
    /*public static void m1(){
        System.debug('Hello from static method');
    }
    public void m2(){
        System.debug('Hello'+species+'from Non-Static method');
    }*/
    public PracticeClass2(){
        this('Dummy','0','Dummy','Dummy');
        System.debug('Non-Parameterized Constructor');
    }
    
     public PracticeClass2(String name, String age, String city,String species){
        System.debug('Parameterized Constructor called');
         this.name=name;
         this.age=age;
         this.city=city;
         PracticeClass2.species=species;
    }
    
    
}