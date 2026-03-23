public class testClassCalculator {
 private integer a,b,result;
    
    @TestVisible
    Integer privateinteger=0;
    public testClassCalculator(Integer a , Integer b){
        this.a=a;
        this.b=b;
    }
    public void add(){
        result=a+b;
    }
    public void subtract(){
        result=a-b;
    }
    public Integer getResult(){
        return result;
    }
    
    @TestVisible
    void privateMethod(){
        System.debug('Private but Public for Test Class');
    }
}