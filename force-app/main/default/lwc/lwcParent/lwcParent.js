import { LightningElement,track } from 'lwc';

export default class LwcParent extends LightningElement {

    array=['Anjali','Kashish','Raj','Sneha'];

    array2=[{id:1,Name:'Anjali'},{id:2,Name:'Manisha'},{id:3,Name:'Manoj'}]
    flag=true;
    
    idElement;
    
    prop='name';
    handle(){
        this.flag=false;
    }


    // For @track
    @track person1={'name':'Sneha','id':1};

    changeName(){
       console.log(JSON.stringify(this.person1));
        this.person1.name='Raj';
        console.log(JSON.parse(JSON.stringify(this.person1)));
    }
 

    @track trackArray=[1,2,3,4];

    addArray(){
        this.trackArray.push(5);
    }
    
constructor() {
    super();
    console.log('1 Parent Component Created');
}

connectedCallback() {
    console.log('2  Parent Component Added to Page');
    
}


renderedCallback() {
    console.log('3 Parent Component Rendered');
    this.idElement=this.template.querySelector(`[data-id="${this.prop}"]`);
    console.log(this.idElement.textContent);
}

disconnectedCallback() {
    console.log('4 Parent Component Removed');
}



}