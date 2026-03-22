import { LightningElement ,wire,track} from 'lwc';
import getOppData from '@salesforce/apex/getRecordsImperative.getRecords26';
import getOppDataFilter from '@salesforce/apex/getRecordsImperative.getRecordsSearch';
import UpdateData from '@salesforce/apex/getRecordsImperative.UpdateRecords';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class OpportunityStatus extends LightningElement {

   @track value=''; //For Combobox

    columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Status', fieldName: 'StageName'},
    { label: 'Id', fieldName: 'Id' },
    { label: 'Amount', fieldName: 'Amount' },
];

dataOpp;
@wire(getOppData)
Oppdata(result){
    this.dataWhole=result;
    if(result.data){
        this.dataOpp=result.data;
        console.log(this.dataOpp);
    }
}

searchValue='';
searchKeyword(event){
 this.searchValue=event.target.value;
//  getOppDataFilter({searchKey:this.searchValue}).then(data=>{
//         this.dataOpp=data;
//     }).catch(err=>{
//         console.log(err);
//     })
}

handleSearchKeyword(){
        getOppDataFilter({searchKey:this.searchValue}).then(data=>{
        this.dataOpp=data;
        this.searchValue='';
        if(this.dataOpp.length==0){
            const toastEvent1=new ShowToastEvent({
            title:'No Records Available for this Search...',
            variant:'success',
        });
        this.dispatchEvent(toastEvent1);     
        }
    }).catch(err=>{
        console.log(err);
    })
}
    


handleRefresh(){
    console.log('Refreshed');
    this.searchValue='';
    getOppDataFilter({searchKey:''}).then(data=>{
      this.dataOpp=data;
    }).catch(err=>{
        console.log(err);
    })
}

get options(){
    return [
        {label:"Prospecting",value:"Prospecting"},
        {label:"Qualification",value:"Qualification"},
        {label:"Needs Analysis",value:"Needs Analysis"},
        {label:"Value Proposition",value:"Value Proposition"},
        {label:"Id. Decision Makers",value:"Id. Decision Makers"},
        {label:"Perception Analysis",value:"Perception Analysis"},
        {label:"Proposal/Price Quote",value:"Proposal/Price Quote"},
        {label:"Negotiation/Review",value:"Negotiation/Review"},
        {label:"Closed Won",value:"Closed Won"},
        {label:"Closed Lost",value:"Closed Lost"},
        
    ];
}

selectedId=[];
handleRowSelection(event){
 this.selectedId=event.detail.selectedRows.map(row=>{
    return row.Id;
 });
}
handleChange(event){
 let statusValue=event.detail.value;
 UpdateData({OppId:this.selectedId,stage:statusValue}).then(data=>{
    console.log('Success');
    this.value=undefined;//Force value memory to forget its old value and set to undefined.
    console.log('Value',this.value);
    getOppDataFilter({searchKey:''}).then(data=>{
      this.dataOpp=data;
      this.value=''; //Here we again set it to empty string and now it again takes the placeholder.
    }).catch(err=>{
        console.log(err);
    })
 }).catch(err=>{
    console.log(err);
 })

}

}