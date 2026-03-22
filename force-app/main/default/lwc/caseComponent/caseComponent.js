import { LightningElement,wire } from 'lwc';
import getRecordsCase from '@salesforce/apex/getRecordsImperative.getRecords24';
import { publish, createMessageContext } from 'lightning/messageService';
import sampleLMS from '@salesforce/messageChannel/caseMessage__c';
import { refreshApex } from '@salesforce/apex';
import getRecordsCase1 from '@salesforce/apex/getRecordsImperative.getRecords27';

export default class CaseComponent extends LightningElement {

    context=createMessageContext(); 
    
    wirerefreshResult;

    columns1 = [
        { label: 'Case Id', fieldName: 'Id' },
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Status', fieldName: 'Status' },
        { label: 'Priority', fieldName: 'Priority' },
        {label: 'Created Date', fieldName: 'CreatedDate' },
    ];
    datas;
    n;
    work;
    esc;
    @wire(getRecordsCase)
    caseData(result){
        this.n=0;
        this.work=0;
        this.esc=0;
        this.wirerefreshResult=result;
        if(result.data){
           this.datas=result.data;
           this.datas.forEach((rec)=>{
            if(rec.Status=='New')this.n++;
            else if(rec.Status=='Working')this.work++;
            else if(rec.Status=='Escalated')this.esc++;
        })
        }

    }
 
    summary;

    @wire(getRecordsCase1)casedetail({data}){
        if(data){
            this.summary=data;
            console.log(this.summary);
        }
    }
    caseId=[];
    handleRowSelection(event){
        this.caseId=event.detail.selectedRows.map(row=>{
            return row.Id;
        });
        publish(this.context,sampleLMS,this.caseId);
    }

    handleRefresh(){
        refreshApex(this.wirerefreshResult);
    }
}
