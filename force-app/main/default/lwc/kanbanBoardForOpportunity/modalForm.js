import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import updateOppRecords from '@salesforce/apex/getOppRecords.updateOppRecords';
//import ModalAllMulti from './allmulti';

// this form is loosely based on SLDS form blueprint, Stacked Alignment
// https://www.lightningdesignsystem.com/components/form-element/#Stacked-Alignment

export default class ModalForm extends LightningModal {
    @api heading = '';
    @api options = [];
    @api Name;
    @api Amount;
    @api oppId;
    @api draftValues;

    // toggle disable close button state
    toggleCloseButtonLabel = {
        label: 'Disable Close Button',
        labelToggle: 'Enable Close Button',
    };
    //computedDisableCloseLabel = this.toggleCloseButtonLabel.label;

    // form fields
    

    heading="Modal";

    connectedCallback(){
        console.log("Connected Modal");
        console.log(JSON.stringify(this.draftValues));
        if(this.draftValues == undefined){
            this.draftValues = {Name : this.Name , Amount : this.Amount};
        }else{
            this.draftValues = JSON.parse(JSON.stringify(this.draftValues));
            this.Name = this.draftValues.Name;
            this.Amount = this.draftValues.Amount;
        }
    }

    handleChange(){
        let newName = this.template.querySelector('[data-id="nameInput"]').value;
        let newAmount = this.template.querySelector('[data-id="amountInput"]').value;
        this.draftValues.Amount = newAmount;
        this.draftValues.Name = newName;
    }    

    async handleSave(){
        let newName = this.template.querySelector('[data-id="nameInput"]').value;
        let newAmount = this.template.querySelector('[data-id="amountInput"]').value;
        console.log(newName);
        await updateOppRecords({ oppId : this.oppId,oppName : newName, oppAmount :newAmount})
                .then(() => {
                    // refresh data after update
                    console.log("Done");
                    this.handleButtonCancel();
                    
                })
                .then(() => {
                    console.log(`Task moved to `);
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                });
    }

    handleButtonCancel() {
        this.close({ draftValuesData: this.draftValues });
    }

    handleClickOutside(){
        console.log("Clicked Outside");
    }

    

    

    // these are by no means intended to be complete country or province lists
    // only enough values to provide some examples to choose from
    

    

    
}