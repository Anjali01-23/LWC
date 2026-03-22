import { LightningElement } from 'lwc';
import { subscribe,unsubscribe, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/lwcMessage__c';

export default class LMSOther extends LightningElement {
   context=createMessageContext();
   subs=null;//This variable will store the subscription reference.Salesforce returns a subscription object.You save it so that later you can stop listening by using unsubscribe.
   recData;
   connectedCallback(){
    this.subs=subscribe(this.context,sampleLMS,(message)=>{
        this.recData=message.Name;
        console.log(message);
    })
   }
   unsubscribeButton(){
    unsubscribe(this.subs);
    this.subs=null;
   }

}

//Subscription syntax:- subscribe(messageContext, messageChannel, listener, options)
//Listener means (callback function) It is a Function that runs when message arrives.

// Component loads
//     ↓
// connectedCallback runs
//     ↓
// subscribe() called
//     ↓
// Component starts listening
//     ↓
// Publisher sends message
//     ↓
// Listener runs
//     ↓
// recData updated