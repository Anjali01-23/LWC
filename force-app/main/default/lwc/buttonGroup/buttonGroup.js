import { LightningElement } from 'lwc';
import DemoModal from 'c/demoModal';
import { NavigationMixin } from "lightning/navigation";

export default class ButtonGroup extends NavigationMixin(LightningElement) {
     demoResult = 'unset';

    async handleModal(event) {

       let apiname='';
        let labelValue=event.target.label;
            if(labelValue=='Accounts'){
                apiname='Account';
            }
            else if(labelValue=='Contacts'){
                apiname='Contact';
            }
            else if(labelValue=='Opportunities'){
                apiname='Opportunity';
            }
            else{
                apiname='Lead';
            }
        const result = await DemoModal.open({
            size: 'small',
        });
        if (result === null) {
            this.demoResult = 'dismiss';
        } 
        else if(result=='confirm'){
            this.demoResult = result;
            this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName:apiname,
                actionName: 'new'
            }
        })
        }
    }
}