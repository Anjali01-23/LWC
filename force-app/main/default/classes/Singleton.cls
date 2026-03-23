public class Singleton {
    
    // Step 1 — static instance variable
    private static Singleton instance;

    // Step 2 — private constructor
    private Singleton() {
        System.debug('Singleton object created');
    }

    // Step 3 — public static method to get instance
    public static Singleton getInstance() {
        if(instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    // sample method
    public void sayHello() {
        System.debug('Hello from Singleton');
    }
}