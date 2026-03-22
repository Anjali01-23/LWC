import { api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class DemoModal extends LightningModal {
     @api header = 'Are you Sure';
     closeIt(){
        this.close();
     }
     forward(){
        this.close('confirm');
     }
}