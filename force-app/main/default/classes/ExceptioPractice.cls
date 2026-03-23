public class ExceptioPractice {
  public static void myMethod() {
    try {
        Integer a;
        Integer b = a * 5; // Yahan Error aaya (Stop!)
        System.debug('Main skip ho gaya'); 
    } catch(Exception e) {
        System.debug('Error pakad liya!'); // Handling step 1
        System.debug(e.getStackTraceString()); //Gives complete info. about the process.
        System.debug(e.getTypeName());
    }

    // YEH HAI ASLI HANDLING!
    System.debug('Main execute ho raha hoon!'); 
    System.debug('Program abhi bhi zinda hai.');
}
}