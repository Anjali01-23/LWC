import { LightningElement,wire } from 'lwc';
import getFieldSetFields from '@salesforce/apex/fieldSetController.getFieldSetFields';
import getData from '@salesforce/apex/fieldSetController.getOpp';

export default class FieldSet extends LightningElement {
columns = [];
data1 = [];

connectedCallback() {
    getFieldSetFields({
        objectName: 'Opportunity',
        fieldSetName: 'Opportunity_field'
    })
    .then(result => {
        console.log('FIELDSET => ', result);

        // 🔥 convert to datatable columns
        this.columns = result.map(field => {
            return {
                label: field.label,
                fieldName: field.fieldName
            };
        });
        let newCol={
            label:'Account Name',
            fieldName:'AccountName'
            
        }
        this.columns=[...this.columns,newCol];
        console.log('COLUMNS => ', this.columns);
    })
    .catch(error => {
        console.error(error);
    });
}
data1;
@wire(getData)datas({data}){
    if(data){
    this.data1=data.map(rec=>{
        return{
            ...rec,
            AccountName:rec.Account ? rec.Account.Name : ''
        }
    })
    }
}

}

