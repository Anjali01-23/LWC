import { LightningElement ,wire,track,api} from 'lwc'; //api also
import updateRecords from '@salesforce/apex/getRecordsImperative.updateRecordsOpp';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { refreshApex } from '@salesforce/apex';
import getRecordsOpp1 from '@salesforce/apex/getRecordsImperative.getRecordsOppALL';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi'; //ye bhii
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';//ye bhii


export default class PracticePaperDAP extends LightningElement {

  @api picklistFieldApiName; // Ye App Builder se aayega (e.g., StageName)
  @track tabValues = [];//....c/accountContactDetail
  data1;

  selectedTab;//ye bhii
  currentVal;
  // 1. Picklist Values nikalne ke liye (Standard Wire)
    @wire(getPicklistValuesByRecordType, { objectApiName: OPPORTUNITY_OBJECT, recordTypeId: '012000000000000AAA' })
    wiredPicklistValues({data}) {
        if (data && this.picklistFieldApiName) {
            // Jo API name user ne diya hai, uski values nikalna
            const fieldValues = data.picklistFieldValues[this.picklistFieldApiName];
            if (fieldValues) {
                this.tabValues = fieldValues.values;
                // Append "All Opportunities" option correctly to the array
                this.tabValues = [
                  { label: 'All Opportunities', value: 'All' },
                  ...this.tabValues,
                ];
                this.selectedTab = this.tabValues[0].value; // Default pehla tab select karna 
                if (this.selectedTab === "All") {
                  this.currentVal = null;
                } else {
                  this.currentVal = this.selectedTab;
                }
            }
            this.fetchRecords();
            console.log(JSON.parse(JSON.stringify(this.tabValues)));
            console.log(this.picklistFieldApiName);
            console.log(this.selectedTab);
        }
    }

    //  connectedCallback(){
    //  console.log(this.data1);
    //  this.fetchRecords();
    //  console.log(this.data1);
    // }

    // 2. Tab change hone par records fetch karna
    handleTabSelect(event){
        this.selectedTab = event.target.value;
        if (this.selectedTab === "All") {
          this.currentVal = null;
        } else {
          this.currentVal = this.selectedTab;
        }
        this.fetchRecords();
        console.log('Selected tab',this.selectedTab);
    }
    //ye bhii
    fetchRecords(){
      console.log(this.picklistFieldApiName);
      console.log(this.selectedTab);
      getRecordsOpp1({Picklist:this.picklistFieldApiName,Value:this.selectedTab}).then(data=>{
        if (data) {
          this.data1 = data.map((rec) => {
            return {
              ...rec,
              opportunityLink: "/" + rec.Id,
              AccountName: rec.Account ? rec.Account.Name : ""
            };
          });
          console.log("Data---> " + this.data1);
        }
      })
    }


  //activetabContent = "";
  //field = ["Name", "Type", "TotalOpportunityQuantity", "Email"];
  // tabChangeHandler(event) {
  //   this.activetabContent = event.target.value;
  //}

  columns1 = [
    { label: "Date", fieldName: "CreatedDate", sortable: true, editable: true },
    {
      label: "Referral Source",
      fieldName: "LeadSource",
      sortable: true,
      editable: true
    },
    { label: "Type", fieldName: "Type", sortable: true, editable: true },
    { label: "Account Name", fieldName: "AccountName", editable: true },
    {
      label: "Name",
      fieldName: "opportunityLink",
      editable: true,
      sortable: true,
      type: "url",
      typeAttributes: { label: { fieldName: "Name" }, target: "_blank" }
      // target:Determines how the link behaves when clicked
      // '_blank': Opens the link in a new browser tab or window
      // '_self': Opens the link in the same tab (default behavior)
    },
    //{label: 'Name', fieldName: 'Name',sortable: true ,editable: true},
    { label: "Quantity", fieldName: "TotalOpportunityQuantity", editable: true }
  ];

  @track draftValues = [];

  defaultSortDirection = "asc";
  sortDirection = "asc";
  sortedBy;
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

  // onHandleSort1(event) {
  //   const { fieldName: sortedBy, sortDirection } = event.detail;
  //   const cloneData = [...this.data1];

  //   cloneData.sort(this.sortBy(sortedBy, sortDirection === "asc" ? 1 : -1));
  //   this.data1 = cloneData;
  //   this.sortDirection = sortDirection;
  //   this.sortedBy = sortedBy;
  // }

  
  onHandleSort1(event) {
        let { fieldName, sortDirection } = event.detail;
        const cloneData = [...this.data1];

        let sortField=fieldName;
        if (fieldName === "opportunityLink") {
          sortField = "Name";
        } 
        cloneData.sort(this.sortBy(sortField, sortDirection === 'asc' ? 1 : -1));
        this.data1 = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = fieldName;
    }




  handleSave(event) {
    const updateList = event.detail.draftValues;
    console.log(updateList);
    updateRecords({ updateList: updateList })
      .then(() => {
        const event = new ShowToastEvent({
          title: "Success",
          message: "Record Updated",
          variant: "success"
        });
        this.dispatchEvent(event);
        this.draftValues = [];
        // return refreshApex(this.whole1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshTable() {
    
    this.fetchRecords();
  }

  isEditModal;
  handleModal() {
    this.isEditModal = true;
  }

  closeModaledit(){
    this.isEditModal=false;
  }



  savehandle() {
    this.isEditModal = false;
    this.fetchRecords();
    console.log('success');
    
      const event = new ShowToastEvent({
        title: "Success",
        message: "Record Updated",
        variant: "success"
      });
      this.dispatchEvent(event);
  }

  errorhandle(event1) {
    console.log('ERROR => ', event1.detail); 

    const errorMsg = event1.detail.message || 'Something went wrong';

    const event = new ShowToastEvent({
      title: "Failed",
      message: "Record Updation Failed",
      variant: "error"
    });
    this.dispatchEvent(event);
  }
}


















// @wire(getRecordsOpp1) opp1(result) {
//     if (result.data) {
//       this.whole1 = result;
//       this.data1 = result.data.map((rec) => {
//         return {
//           ...rec,
//           opportunityLink: "/" + rec.Id,
//           AccountName: rec.Account ? rec.Account.Name : ""
//         };
//       });
//       console.log(this.data1);
//     }
//   }