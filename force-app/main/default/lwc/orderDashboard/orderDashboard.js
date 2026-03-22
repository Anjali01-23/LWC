import { LightningElement } from 'lwc';
import { subscribe,unsubscribe, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/orderMessage__c';
export default class OrderDashboard extends LightningElement {
    context=createMessageContext();
    subs=null;
    data=null;
    get flag(){
        return this.data==null;
    }
    connectedCallback(){
        this.subs=subscribe(this.context,sampleLMS,(info)=>{
          this.data=info;
          console.log(JSON.parse(JSON.stringify(this.data)));
        })
    }

}