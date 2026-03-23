import { LightningElement } from 'lwc';
import getFilteredOpp from "@salesforce/apex/getRecordsImperative.getFilteredOpp";
export default class FilterOpp extends LightningElement {
    filteredData;
    columns=[
        {label:'Name',fieldName:'Name'},
        {label:'StageName',fieldName:'StageName'},
        {label:'CloseDate',fieldName:'CloseDate'},
    ];

    startDate;
    endDate;

handleStart(event1){
    this.startDate = event1.target.value;
    this.fetchData();
}

handleEnd(event2){
    this.endDate = event2.target.value;
    this.fetchData();
}

fetchData(){
    getFilteredOpp({
        startDate: this.startDate,
        endDate: this.endDate
    })
    .then(result => {
        this.filteredData = result;
    })
    .catch(error => {
        console.log(error);
    });
}

}