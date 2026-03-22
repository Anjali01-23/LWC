import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

 selectedId=[];
 handleEvent(event){
    this.selectedId=event.detail;
    console.log('SelectediD',this.selectedId);
 }
}