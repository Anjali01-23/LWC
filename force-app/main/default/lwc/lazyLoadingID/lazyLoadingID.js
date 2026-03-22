import { LightningElement ,wire} from 'lwc';
import getInitialAccounts from '@salesforce/apex/getRecordsImperative.getInitialAccounts';
import getMoreAccounts from '@salesforce/apex/getRecordsImperative.getMoreAccounts';
import getCountAcc from '@salesforce/apex/getRecordsImperative.getCountAcc';


export default class LazyLoadingID extends LightningElement {
    totalRecord;
    accounts=[];
    columns = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text'},
    { label: 'Rating', fieldName: 'Rating', type: 'text'}
  
    ];

    @wire(getInitialAccounts) initial({ data }) {
        if (data) {
            this.accounts=data;
        }
    }

    @wire(getCountAcc) count({ data }) {
        if (data) {
            this.totalRecord = data;
        }
    }

    // connectedCallback(){
    //     console.log('lll');
    // }
    lastname='';
    id='';
    loadData(){
        return  getMoreAccounts({ lastName:this.lastname , lastId:this.id })
        .then(result => {
            let updatedRecords = [...this.accounts, ...result];
            this.accounts = updatedRecords;
            this.error = undefined;
        })
        .catch(error => {
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
        let lastRecord=this.accounts[this.accounts.length-1];
        this.lastname=lastRecord.Name;
        this.id=lastRecord.Id;
        
        this.loadData()
            .then(()=> {
                target.isLoading = false;
            });   
    }


}


