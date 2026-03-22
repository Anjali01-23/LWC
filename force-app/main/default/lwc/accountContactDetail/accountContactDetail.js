import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/getRecordsImperative.getRecords22';

export default class AccountContactDetail extends LightningElement {

    columns=[
    {label:'Name',fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'},
    {label:'Industry',fieldName:'Industry'},
];

accId=[];
datass;
flag=true;

renderedCallback(){
 if(this.flag==true){
   getRecords().then(data=>{
    this.datass=data;
    console.log(this.datass);
    this.flag=false;
   })
 }
}

handleRowSelection(event){
  this.accId=event.detail.selectedRows.map(row=>{
    return row.Id;
  })
  console.log('Accountid are',this.accId);
  const event1=new CustomEvent('myevent',{
    detail:this.accId,
  });
  this.dispatchEvent(event1);
  console.log(event1.detail);
  console.log('Event dispatch');
}

}