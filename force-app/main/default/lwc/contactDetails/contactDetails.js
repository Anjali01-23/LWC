import { LightningElement, api, wire } from 'lwc';
import getRecordsContact from '@salesforce/apex/getRecordsImperative.getRecords23';

export default class ContactDetails extends LightningElement {
    @api accountId;
    
    columns1 = [
        { label: 'Contact Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Account Name', fieldName: 'AccountName' }
    ];

   datas;

   @wire(getRecordsContact,{AccId:'$accountId'}) 
   recordData({data}){
    if(data){
      this.datas=data.map(rec=>{
        return {
            ...rec,
            AccountName:rec.Account.Name
        }
      })  
      console.log('Dta are',this.datas);
    }
   }
   


}
