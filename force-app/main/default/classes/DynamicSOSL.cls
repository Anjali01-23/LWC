public class DynamicSOSL {
    public static void method(){
        String s='Find \'John\' in Name Fields Returning Contact';
        List<List<Contact>>list1=Search.query(s);
        System.debug(list1);
    }
}