// public class PerformanceClass {
//     public static void handlePerformance(List<Performance__c> pList, Map<Id, Performance__c> pMap){
//         // Create an email message object
//         Set<Id> empIds = new Set<Id>();
//         Map<Id, Decimal> empIdToPRating = new Map<Id, Decimal>();
        
//         for(Performance__c p : pList){
//             empIds.add(p.InfoTech_Employee__c);
//             empIdToPRating.put(p.InfoTech_Employee__c, p.Rating__c );
//         }
        
//         System.debug(empIds);
        
//         Map<Id, Decimal> EmpIdWithAvg = new Map<Id, Decimal>();
//         for( AggregateResult ar : [
//             SELECT InfoTech_Employee__c, AVG(Rating__c) avgRating
//             FROM Performance__c
//             WHERE InfoTech_Employee__c IN :empIds
//             GROUP BY InfoTech_Employee__c
//         ]){
//             EmpIdWithAvg.put(
//                 (Id) ar.get('InfoTech_Employee__c'),
//                 (Decimal) ar.get('avgRating')
//             );
//         }
        
//         System.debug(EmpIdWithAvg);
        
//         List<Employee_InfoTech__c> empList = [SELECT Id, Name, Average_rating__c, Bonus__c, CTC__c,  Email__c, End_Date__c, Hire_date__c, Monthly_Pay__c  FROM Employee_InfoTech__c WHERE Id IN : empIds ];
        
//         for( Employee_InfoTech__c  emp : empList){
//             Decimal avg = EmpIdWithAvg.get(emp.Id);
//             if(avg  == 5){
//                 emp.Bonus__c = 20;
//             }else if(avg >= 4 && avg < 5 ){
//                  emp.Bonus__c = 15;
//             }else if(avg >= 3 && avg < 4 ){
//                  emp.Bonus__c = 10;
//             }else if(avg >= 2 && avg < 3 ){
//                  emp.Bonus__c = 5;
//             }else{
//                 emp.Bonus__c = 0;
//             }
            
            
//             Decimal oldCTC = emp.CTC__c;
//             Decimal newCTC = oldCTC + ( oldCTC * emp.Bonus__c/ 100);
//             emp.CTC__c = newCTC;
//             Decimal monhtlyIncome = newCTC * (0.70)/12;
//             emp.Monthly_Pay__c = monhtlyIncome;
//             emp.Average_rating__c = EmpIdWithAvg.get(emp.Id);
            
//         }
        
//         update empList;
          
//          // Create an email message object
//         //Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
//         List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        
//         for(Employee_InfoTech__c emp : empList ){
//             //List<String> toAddresses  = new List<String>();
//             //toAddresses.add(emp.Email__c) ;
//             //System.debug('Printing the current address  - ' + toAddresses);
            
//             String body = 'Hi ' + emp.Name + '\n\n';
//             body += 'I hope You are Doing well. We are delighted to inform you that your recent perfromance review and you got rating ' + empIdToPRating.get(emp.ID)  +   '\n';
//             body += 'As per your performance you also got ' + emp.Bonus__c  + '% and your revised CTC will be '  + emp.CTC__c  + ' and your monthly pay will be -  '   + emp.Monthly_Pay__c  +   '\n\n\n';
//             body += 'Thanks & Reegards' + '\n';
//             body += 'HR Department' + '\n';
                
                
//              // Create an email message object
//             Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            
//             mail.setToAddresses(new List<String>{emp.Email__c});
//             mail.setSubject('Performance Review Mail');
//             mail.setPlainTextBody(body);
            
//              // Pass this email message to the built-in sendEmail method 
//             // of the Messaging class
            
//            mails.add(mail);
                
//         }
        
//          Messaging.sendEmail( mails);
            
        

        
//     }
    
    
    
//     public static void companyCantChange(List<Employee_InfoTech__c> empiList, Map<Id, Employee_InfoTech__c> oldMap){
//         for( Employee_InfoTech__c emp : empiList ){
//             if(emp.InfoTech_Company__c != oldMap.get(emp.Id).InfoTech_Company__c && (  Date.Today() > emp.Hire_date__c &&  Date.Today() < emp.End_Date__c) ) {
//                     emp.addError('You cant change the Company while the employee is in contract Period');
//             }
//         }
//     }
    
// }
    
//     /*
    
//     public static void sendingMailToManager(List<Employee_InfoTech__c> empiList, Map<Id, Employee_InfoTech__c> oldMap){
//         User Manager = [select id, name, profile.name, userrole.name , email
//                         from user  
//                         where profile.name = 'Trip Managers' LIMIT 1];
        
        
//     }
    
//     */


// public class EmailForLowPerform implements schedulable {
//     @Future
//     public static void sendingMail(){
        
//        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        
//        for( Employee_InfoTech__c emp : [
//         SELECT Id, Name, Email__C, Average_rating__c, Monthly_Pay__c
//         FROM Employee_InfoTech__c
//         WHERE Average_rating__c < 4]){
                     
//             Map<String,String> emailToBody = new Map<String,String>();
            
//             String body = 'Hi ' + emp.Name + '\n';
//             body += 'I hope this email finds you well. We need to inform you that your performance last month was not great and ';
//             body += 'You got an average rating of  ' + emp.Average_rating__c + ' and you need to step up your performance and work harder otherwise we would have to make some unwanted decisions. ';
//             body += 'If you have any queries related to it then feel free to reach out to your manager.';
//             body += '\n Thanks & Regards' + '\n' + 'HR Department';
//             emailToBody.put(emp.Email__c, body);
            
//             system.debug(emailToBody);
            
//              // Create an email message object
//             Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            
//             mail.setToAddresses(new List<String>{emp.Email__c});
//             mail.setSubject('Performance Review Mail');
//             mail.setPlainTextBody(body);
            
//              // Pass this email message to the built-in sendEmail method 
//             // of the Messaging class
            
//            mails.add(mail);
            
            
//         } 
        
//         Messaging.sendEmail( mails);
        
//     }
    
    
    
    
//      public void execute(SchedulableContext sc) {
//         EmailForLowPerform.sendingMail();
//     }
// }



// trigger triggerforrecursion on Account (before insert,before delete,after insert,after update,after delete,before update, after undelete) {
//     if(trigger.isafter){
//  		if(trigger.isinsert||trigger.isupdate||trigger.isundelete){
//             Recursionhelperclass.insertparent(trigger.newmap);   
//         }
//     }
//     if(trigger.isbefore){
//         if(trigger.isdelete){
//             Recursionhelperclass.deleteparent(trigger.oldmap);
//         }
//         if(trigger.isupdate){
//             Recursionhelperclass.deleteparent(trigger.oldmap);
//         }
//     }
   
// }



// /**
//  * @description     Recursive score class
//  * @author          Aman Shivdasani
//  */
// public with sharing class recursionclass {

//      /**
//      * @description function.
//      * @author  Aman Shivdasani
//      * @param emp list of employee
//      */
//     public static void insertscore(map<id,employee__c>emp){
       
//         list<employee__c>parentlist=[select recordtype.name, id, max_ba_score__c,max_dev_score__c,sum_dev_score__c,sum_ba_score__C,(select  id, max_ba_score__c,max_dev_score__c,sum_dev_score__c,sum_ba_score__c,recordtype.name,ba_score__c,dev_score__c from employees__r where id in :emp.keyset()) from employee__c with security_enforced];
//         list<employee__c>updatelist= new list<employee__c>();
//         for( employee__c pe:parentlist){
            
//             if(pe.employees__r==NULL||pe.employees__r.isempty()){
//                 pe.max_ba_score__c=0;
//                 pe.max_dev_score__c=0;
//                 pe.sum_dev_score__c=0;
//                 pe.sum_ba_score__C=0;
//                 continue;
//             }
//             if(pe.max_ba_score__c==null){pe.max_ba_score__c=0;}
//                 if(pe.sum_ba_score__c==null){pe.sum_ba_score__c=0;}
//                 if(pe.sum_dev_score__c==null){pe.sum_dev_score__c=0;}
//                 if(pe.max_dev_score__c==null){pe.max_dev_score__C=0;}
//             for( employee__c e:pe.employees__r){
//                  if(pe.recordtype.name=='DEV'&&e.RecordType.name=='DEV'){
//                     emp.get(e.id).adderror('Devs can be assigned to BA only');
//                 }
//                 if(e.max_ba_score__c==null){e.max_ba_score__c=0;}
//                 if(e.sum_ba_score__c==null){e.sum_ba_score__c=0;}
//                 if(e.sum_dev_score__c==null){e.sum_dev_score__c=0;}
//                 if(e.max_dev_score__c==null){e.max_dev_score__C=0;}
//                 if(e.recordtype.name=='BA'){
//                     if(e.BA_SCORE__c==NULL){
//                         e.BA_SCORE__c=0;
//                     }
//                     e.DEV_SCORE__c=0;
//                     pe.SUM_BA_SCORE__c+=e.BA_SCORE__c;
//                 }
//                 if(e.recordtype.name=='DEV'){
//                     if(e.DEV_SCORE__c==NULL){
//                         e.DEV_SCORE__c=0;
//                     }
//                     e.BA_SCORE__c=0;
//                     pe.SUM_DEV_SCORE__c+=e.DEV_SCORE__c;
//                 }
//                 pe.SUM_BA_SCORE__c+=e.SUM_BA_SCORE__c;
//                 pe.SUM_DEV_SCORE__c+=e.SUM_DEV_SCORE__c;
//                 pe.MAX_BA_SCORE__c=Math.max(e.BA_SCORE__c,e.MAX_BA_SCORE__c);
//                 pe.MAX_DEV_SCORE__c=math.max(e.DEV_SCORE__c,e.MAX_DEV_SCORE__c);
                
//             }
//             updatelist.add(pe);
//         }
//         if(Schema.sObjectType.employee__c.isUpdateable()){
//             try{
//             	update(updatelist);
//             }
//             catch(exception e){
//                 for(employee__c em:emp.values()){
//                     emp.get(em.id).adderror('chain formation');
//                 }
//             }
//         }
//     }
//     /**
//      * @description function.
//      * @author  Aman Shivdasani
//      * @param emp list of employee
//      */
//     public static void deletescore(map<id,employee__c>emp){
//         list<employee__c>parentlist=[select id, max_ba_score__c,max_dev_score__c,sum_dev_score__c,sum_ba_score__C,(select  id, max_ba_score__c,max_dev_score__c,sum_dev_score__c,sum_ba_score__c,recordtype.name,ba_score__c,dev_score__c from employees__r where id in :emp.keyset()) from employee__c with security_enforced];
//         list<employee__c>updatelist= new list<employee__c>();
//         for( employee__c pe:parentlist){
//             if(pe.employees__r==NULL||pe.employees__r.isempty()){
//                 pe.max_ba_score__c=0;
//                 pe.max_dev_score__c=0;
//                 pe.sum_dev_score__c=0;
//                 pe.sum_ba_score__C=0;
//                 continue;
//             }
//             for( employee__c e:pe.employees__r){
//                 if(e.max_ba_score__c==null){e.max_ba_score__c=0;}
//                 if(e.sum_ba_score__c==null){e.max_dev_score__c=0;}
//                 if(e.sum_dev_score__c==null){e.sum_dev_score__c=0;}
//                 if(e.max_dev_score__c==null){e.sum_ba_score__C=0;}
//                 if(e.recordtype.name=='BA'){
//                     if(e.BA_SCORE__c==NULL){
//                         e.BA_SCORE__c=0;
//                     }
//                     pe.SUM_BA_SCORE__c=0;
//                 }
//                 if(e.recordtype.name=='DEV'){
//                     if(e.DEV_SCORE__c==NULL){
//                         e.DEV_SCORE__c=0;
//                     }
//                     pe.SUM_DEV_SCORE__c=0;
//                 }
//                 pe.SUM_BA_SCORE__c=0;
//                 pe.SUM_DEV_SCORE__c=0;
//                 pe.MAX_BA_SCORE__c=0;
//                 pe.MAX_DEV_SCORE__c=0;
                
//             }
//             updatelist.add(pe);
//         }
//         if(Schema.sObjectType.employee__c.isUpdateable()){
//             update(updatelist);
//         }
//     }
// }