import { LightningElement } from 'lwc';
import { subscribe,unsubscribe, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/orderMessage__c';

export default class OrderTable extends LightningElement {
 context=createMessageContext();
    subs=null;
    data=[];
    count=this.data.length;

    datas;
       columns1 = [
        { label: 'Order Id', fieldName: 'OrderID' },
        { label: 'Customer Name', fieldName: 'CustomerName' },
        { label: 'Item', fieldName: 'Item' },
        { label: 'Quantity', fieldName: 'Quantity' },
        {label: 'Status', fieldName: 'Status' },
    ];
    get flag(){
      return this.data.length===0;
    }
    
    connectedCallback(){
        this.subs=subscribe(this.context,sampleLMS,(info)=>{
          this.data=[...this.data,info];
          this.datas=this.data;
          this.count=this.data.length;
          console.log(this.datas);
          console.log(JSON.parse(JSON.stringify(this.data)));
        })
    }


}
