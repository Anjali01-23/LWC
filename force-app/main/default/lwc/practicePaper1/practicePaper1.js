import { LightningElement ,wire,track} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getRecords from '@salesforce/apex/getRecordsImperative.getDocument';
import getRecordsYear from '@salesforce/apex/getRecordsImperative.getDocumentYear';
import { refreshApex } from '@salesforce/apex';

export default class PracticePaper1 extends NavigationMixin(LightningElement) {


   defaultSortDirection = 'asc';
   sortDirection = 'asc';
   sortedBy= 'Valid_from_Date__c';
   sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        let { fieldName, sortDirection } = event.detail;
        const cloneData = [...this.documentData];

        let sortField=fieldName;
        if (fieldName === "ValidYearFrom") {
          sortField = "Valid_from_Date__c";
        } else if (fieldName === "ValidYearTo") {
          sortField = "Valid_To_Date__c";
        }
        cloneData.sort(this.sortBy(sortField, sortDirection === 'asc' ? 1 : -1));
        this.documentData = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = fieldName;
    }

  @track Typevalue='';
 @track Validvalue='';
    columns = [
        { label: 'Title', fieldName: 'Name'},
        { label: 'Valid From', fieldName: 'ValidYearFrom' ,sortable: true},
        { label: 'Valid Till', fieldName: 'ValidYearTo',sortable: true },
        { label: 'Document Type', fieldName: 'Document_Type__c' },
        {
            
            label: 'isValid',
            fieldName:'',
            cellAttributes: { 
              iconName:{
                fieldName: 'isValid'
              }
              
            }
        },

        {
        type: 'button',
        typeAttributes: {
            iconName: 'utility:preview',
      
        }
    }
    ];

    get options1(){
        return [
            {label:'Aadhar',value:'Aadhar'},
            {label:'EWS',value:'EWS'},
            {label:'PAN',value:'PAN'},
        ]
    }

    get options2(){
        return [
            {label:'Valid',value:'Valid'},
            {label:'InValid',value:'InValid'},
        ]
    }

  handleClick() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Document__c",
        actionName: "new"
      }
    });
  }

  documentData;
  years = [];

  wholeData;
  @wire(getRecords)
  doctData(result) {
   this.wholeData=result;
    if (result.data) {
      this.documentData=result.data.map(rec=>{
        
        return {
          ...rec,
          isValid:rec.isActive__c===true?'utility:check':'',
          ValidYearFrom:new Date(rec.Valid_from_Date__c).getFullYear(),
          ValidYearTo:new Date(rec.Valid_To_Date__c).getFullYear()
          
        }
      })

      console.log(this.documentData);
      const yearSet=new Set();
      this.documentData.forEach((data1) => {
        if(data1.ValidYearFrom){
          yearSet.add(data1.ValidYearFrom);
        }
      });
      this.years=Array.from(yearSet).sort((a,b)=>{
         return a-b
      })
      console.log(this.years);

      
    }
  }

 
  get yearsView() {
    return this.years.map((yr) => {
      let dataR=this.documentData.filter(item=>{
       return item.ValidYearFrom===yr;
      });

      if (this.Typevalue) {
        dataR = dataR.filter((item) => {
          return item.Document_Type__c===this.Typevalue;
        });
      }

      if (this.Validvalue) {
        const status=(this.Validvalue==='Valid');
        dataR = dataR.filter((item) => {
          return item.isActive__c===status;
        });
      }
      

    if(dataR.length>0){
       return {
        year: yr,
        records:dataR ? dataR : ''
      };
    }
    else return null;
     
    }).filter(item=>{
      return item!==null;
    })
  }

  handleEdit(event){
    let recId=event.detail.row.Id;
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Document__c",
        actionName: "edit",
        recordId:recId
      }
    });
    
  }


  handleChange11(event){
   this.Typevalue=event.target.value;
   console.log(this.Typevalue);
  }

  handleChange22(event){
    this.Validvalue=event.target.value;
  }
}
