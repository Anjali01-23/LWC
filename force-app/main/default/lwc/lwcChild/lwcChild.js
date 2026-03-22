import { LightningElement } from 'lwc';

export default class LwcChild extends LightningElement {
    
constructor() {
    super();
    console.log('1 Component Created');
}

connectedCallback() {
    console.log('2 Component Added to Page');
}

renderedCallback() {
    console.log('3 Component Rendered');
}

disconnectedCallback() {
    console.log('4 Component Removed');
}
}