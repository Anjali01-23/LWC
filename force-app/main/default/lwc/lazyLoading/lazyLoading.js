import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/getRecordsImperative.getAccountss';
import getCountAcc from '@salesforce/apex/getRecordsImperative.getCountAcc';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text'},
    { label: 'Rating', fieldName: 'Rating', type: 'text'}
  
];

export default class LazyLoading extends LightningElement {
    accounts=[];
    error;
    columns = columns;
    rowLimit =25;
    rowOffSet=0;
    totalRecord;
    connectedCallback() {
        this.loadData();
    }

        @wire(getCountAcc)count({data}){
        if(data){
            this.totalRecord=data;
        }
    }
    loadData(){
        return  getAccounts({ limitSize: this.rowLimit , offset : this.rowOffSet })
        .then(result => {
            let updatedRecords = [...this.accounts, ...result];
            this.accounts = updatedRecords;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.accounts = undefined;
            console.log(error);
        });
    }

    loadMoreData(event) {
        const currentRecord = this.accounts;
        const { target } = event;
        target.isLoading = true;
        if(this.accounts.length>=this.totalRecord){
            target.isLoading = false;
            return;
        }
        this.rowOffSet = this.rowOffSet + this.rowLimit;
        
        this.loadData()
            .then(()=> {
                target.isLoading = false;
            });   
    }


}