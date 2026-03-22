import { LightningElement ,wire} from 'lwc';
import fetchData from '@salesforce/apex/getRecordsWire.getRecords';
export default class GetRecordComponent extends LightningElement {
    
    industryName='Banking';
    @wire(fetchData,{industry:'$industryName'}) recordData;

    renderedCallback(){
        console.log(this.recordData);
    }

    changeIndustry(){
        this.industryName='Agriculture';
    }
}