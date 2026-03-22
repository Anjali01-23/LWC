import { LightningElement ,wire} from 'lwc';
import getCount from '@salesforce/apex/getRecordsImperative.getCount';
import getAllContacts2 from '@salesforce/apex/getRecordsImperative.getAllContacts2';

export default class PaginationServer extends LightningElement {
    columns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email' }
    ];

    paginatedData;

    totalContact;
    @wire(getCount)totalContact({data}){
        if(data){
            this.totalContact=data;
            this.totalPages=Math.ceil(this.totalContact/this.pagelength);
        }
    }

    pagelength=10;
    currentPage=1;
    totalPages=0;

    fetchrecords(){
      getAllContacts2({pagesize:this.pagelength,pageNo:this.currentPage}).then(data=>{
            this.paginatedData=data;
        }).catch(err=>{
            console.log(err);
        })
    }
    connectedCallback(){
        this.fetchrecords();
    }

    // updatePaginatedData() {
    //     const start = (this.currentPage - 1) * this.pageSize;
    //     const end = start + this.pageSize;
    //     this.paginatedData = this.contacts.slice(start, end);
    // }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchrecords();
        }

    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchrecords();
        }
    }

    get isPreviousDisabled() {
        return this.currentPage === 1;
    }

    get isNextDisabled() {
        return this.currentPage === this.totalPages;
    }
}