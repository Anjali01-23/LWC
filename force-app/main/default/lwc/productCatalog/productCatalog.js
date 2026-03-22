import { LightningElement } from 'lwc';
import IMAGE_FOLDER from '@salesforce/resourceUrl/image';
export default class ProductCatalog extends LightningElement {
    value = 'all';

    get options() {
      const arr1=[{label:'All',value:'all'}]
        const array=this.productData.map((item)=>{
          return {label:item.name,value:item.name}
        });
        return [...arr1,...array];
    }

    get options1() {
        return [
            { label: 'All', value: 'all' },
            { label: 'Low To High', value: 'LowToHigh' },
            { label: 'High To Low', value: 'HighToLow' },
        ];
    }

    get options2() {
        return [
            { label: 'All', value: 'all' },
            { label: 'High To Low', value: 'HighToLow' },
            { label: 'Low To High', value: 'LowToHigh' },
        ];
    }

    productData=[
    {
      "id": 1,
      "name": "Electronics",
      "products": [
        {
          "id": 101,
          "name": "Smartphone",
          "description": "Latest model smartphone with a 6.5-inch display.",
          "price": 699,
          "stockStatus": "In Stock",
          "image": IMAGE_FOLDER+'/mobile.jpeg',
          "rating": 5,
          "reviews": [
            {
              "user": "Rahul Sharma",
              "rating": 5,
              "comment": "Amazing phone, great value for money!"
            }
          ]
        },
        {
          "id": 102,
          "name": "Laptop",
          "description": "A high-performance laptop with Intel i7 processor.",
          "price": 999,
          "stockStatus": "Out of Stock",
          "image": IMAGE_FOLDER+"/laptop2.jpeg",
          "rating": 3,
          "reviews": [
            {
              "user": "Priya Verma",
              "rating": 3,
              "comment": "Decent laptop but a bit overpriced."
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Clothing",
      "products": [
        {
          "id": 201,
          "name": "T-shirt",
          "description": "Comfortable cotton t-shirt available in various colors.",
          "price": 25,
          "stockStatus": "In Stock",
          "image": IMAGE_FOLDER+"/tShirtt.jpeg",
          "rating": 3,
          "reviews": [
            {
              "user": "Ankit Mehra",
              "rating": 3,
              "comment": "Good fit, but color faded after one wash."
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Home Appliances",
      "products": [
        {
          "id": 301,
          "name": "Air Conditioner",
          "description": "Energy-efficient AC with smart controls.",
          "price": 499,
          "stockStatus": "In Stock",
          "image": IMAGE_FOLDER+"/AC.jpeg",
          "rating": 4,
          "reviews": [
            {
              "user": "Sneha Iyer",
              "rating": 4,
              "comment": "Cools the room quickly and operates quietly."
            }
          ]
        }
      ]
    }
  ]

  mainData = [];

  connectedCallback() {
    this.productData.forEach(element => {
      this.mainData=[...this.mainData,...element.products];
    });
  }

  isModalOpen;
  proData;
  category='all';
  openModal(event){
   let index=event.target.dataset.index;
   this.proData=this.mainData[index];
   this.isModalOpen=true;
  }

  closeModal(){
   this.isModalOpen=false;
   this.proData=undefined;
  }

  handleChange(event){
    this.category=event.detail.value;
  }

  sortPrice='all';

  handleChange1(event){
    this.sortPrice=event.detail.value;
  }

  sortRating='all';
  handleChange2(event){
    this.sortRating=event.detail.value;
  }

  addFilter(){
    let tempData=[];
    this.productData.forEach(element => {
      if(element.name===this.category || this.category==='all'){
       tempData=[...tempData,...element.products];
      }     
    });

    
    if(this.sortPrice==='LowToHigh'){
      tempData.sort((a,b)=>{
        return a.price-b.price
      })
    }
    else if(this.sortPrice==='HighToLow'){
      tempData.sort((a,b)=>{
        return b.price-a.price
      })
    }

    if(this.sortRating==='LowToHigh'){
      tempData.sort((a,b)=>{
        return a.rating-b.rating
      })
    }
    else if(this.sortRating==='HighToLow'){
      tempData.sort((a,b)=>{
        return b.rating-a.rating
      })
    }
    this.mainData=tempData;

    if(this.mainData.length===0){
      alert('No products are available for the applied filter. ');
    }

  }
}
