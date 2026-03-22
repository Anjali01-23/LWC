import { LightningElement ,track} from 'lwc';
import { publish, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/lwcMessage__c';//Here we are importing our MessageChannel.
export default class LMSOne extends LightningElement {
    context=createMessageContext(); //It creates a message connection/session for your component.Means like “Prepare this component so it can send messages.”
    @track data={'Name':''};
    sendData(){
        this.data.Name=this.template.querySelector('.class1').value;
        publish(this.context,sampleLMS,this.data);
    }
}

//Publish means:

// Send message using:
// this component’s connection (context)
// this channel (sampleLMS)
// this data (payload)