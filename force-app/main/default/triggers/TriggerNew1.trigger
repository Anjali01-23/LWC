trigger TriggerNew1 on Account (before insert) {
    //Bulkified
    Account a=Trigger.new[0];
    a.NumberOfEmployees=1200;
    
    //Non-Bulkified
    /*for(Account acc:Trigger.new){
       acc.NumberOfEmployees=1200;
    }*/
}