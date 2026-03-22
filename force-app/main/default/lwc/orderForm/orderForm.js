import { LightningElement,track } from 'lwc';
import { publish, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/orderMessage__c';
import { createRecord , deleteRecord,updateRecord} from "lightning/uiRecordApi";

export default class OrderForm extends LightningElement {

    context=createMessageContext(); 
    get options(){
        return [
            {label:'Item A',value:'Item A'},
            {label:'Item B',value:'Item B'},
            {label:'Item C',value:'Item C'},
        ]
    }
    @track value1='';
    @track value2='';
    @track value3='';
    handleChange1(event){
    this.value1=event.target.value;
    }

    handleChange2(event){
    this.value2=event.target.value;
    }

    handleChange3(event){
    this.value3=event.target.value;
    }

    placeOrder() {

    const allValid = [
        ...this.template.querySelectorAll('lightning-input'),
        ...this.template.querySelectorAll('lightning-combobox')
    ].reduce((validSoFar, field) => {
        field.reportValidity();  
        return validSoFar && field.checkValidity(); 
    }, true);


    if (!allValid) {
        return; 
    }

    const orderId = 'ORD' + Date.now();

    const data = {
        CustomerName: this.value1,
        Item: this.value2,
        Quantity: this.value3,
        Status: 'Placed',
        OrderID: orderId
    };
     let inputdata={
        'apiName':'orderCustom__c',
        'fields':{
            'CustomerName__c':this.value1,
            'Quantity__c':this.value3,
            'Item__c':this.value2
        }
     }
    createRecord(inputdata).then(()=>{
        console.log('Record Created');
    }).catch((err)=>{
        console.log(err);
    })
    publish(this.context, sampleLMS, data);
    this.value1 = '';
    this.value2 = '';
    this.value3 = '';
}
}