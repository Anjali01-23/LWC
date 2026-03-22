import { LightningElement,api} from 'lwc';

export default class FirstComponent extends LightningElement {
    // message = 'It is a message';
    message; // We can just declare them also like this.
  
    @api recordId;


    parentProperty = 'I am Parent';

    showMessage() {
        this.message = 'You have clicked on button so message is HAPPY HOLI';
    }

    fullname;

    makeFullName() {
        const first = this.template.querySelector('.firstname').value;
        const last = this.template.querySelector('.lastname').value;
        this.fullname = first + last;
        console.log(this.recordId);
        this.template.querySelector("c-second-component-child").childMethod();
    }
    // renderedCallback(){
    //     console.log(this.recordId);
    // }

    DatafromChild;
    GetData(event){
     this.DatafromChild=event.detail;
     console.log(JSON.parse(JSON.stringify(this.DatafromChild)));
     console.log(this.DatafromChild.Name);
    }
}
