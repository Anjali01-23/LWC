import LightningModal from 'lightning/modal'; 
export default class ConfirmationModal extends LightningModal {

    header='Delete Contact';
    handleProceed(){
      this.close('proceed');
    }
    handleClose(){
        this.close();
    }
}