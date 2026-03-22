import { LightningElement,wire } from 'lwc';
import getRecordsCase from '@salesforce/apex/getRecordsImperative.getRecords25';
import { subscribe,unsubscribe, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/caseMessage__c';

export default class CaseOtherComponent extends LightningElement {
  context=createMessageContext();
  subs=null;
  caseIdd=[];
    datas;
  connectedCallback(){
    this.subs=subscribe(this.context,sampleLMS,(caseeId)=>{
        this.caseIdd=caseeId;
        console.log(caseeId);
    })
   }

   @wire(getRecordsCase,{CaseId:'$caseIdd'})
   caseData({data}){
    if(data){
      this.datas=data;
    }
   }

   disConnectedCallback(){
    unsubscribe(this.subs);
    this.subs=null;
   }
}