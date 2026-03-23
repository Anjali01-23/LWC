@isTest
public class apiIPTestClass {
    @isTest static void testIP(){
        Test.setMock(HttpCalloutMock.class,new apiIPMockClass());
        apiIPAddress.method('91.128.103.196','a09fj000008kN8HAAU');
    }
}