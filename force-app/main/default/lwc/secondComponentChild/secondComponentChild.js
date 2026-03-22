import { LightningElement,api } from 'lwc';

export default class SecondComponentChild extends LightningElement {
    @api childFromParent;
    @api childMethod(){
        console.log("Ham to bachhe h bhaiya");
    }

    eventData={'Name':''};
    handleData(){
        this.eventData.Name=this.template.querySelector('.class1').value;
        const event=new CustomEvent('myevent',{
            detail:this.eventData
        })
        this.dispatchEvent(event);
    }
}