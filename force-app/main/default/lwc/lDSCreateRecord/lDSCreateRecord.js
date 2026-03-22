import { LightningElement,api} from 'lwc';
import { createRecord , deleteRecord,updateRecord} from "lightning/uiRecordApi";
import getRecords from '@salesforce/apex/getRecordsImperative.getRecords22';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
];

export default class LDSCreateRecord extends LightningElement {

columns=[
    {label:'Name',fieldName:'Name'},
    {label:'Number Of Employees',fieldName:'NumberOfEmployees'},
    {label:'Industry',fieldName:'Industry'},
    {label:'Id',fieldName:'Id'},
    {
        type: 'action',
        typeAttributes: { rowActions:actions},
    },
];

datass;
selectedIds = [];

flag=true;
renderedCallback(){
 if(this.flag==true){
   getRecords().then(data=>{
    this.datass=data;
    console.log(this.datass);
    this.flag=false;
   })
 }
}


handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                deleteRecord(row.Id).then(()=>{
                    console.log('deleted');
                    getRecords().then(data=>{
                    this.datass=data;
                    console.log(this.datass);
                    this.flag=false;
   })

                }).catch(error => console.error(error));
               
        }
}

handleRowSelection(event){
    const selectedRowss=event.detail.selectedRows;
    console.log(selectedRowss);
  this.selectedIds=selectedRowss.map(row=>{
    return row.Id;
  });
}

handleDelete11(){
    const promises=this.selectedIds.map(Id=>deleteRecord(Id));
    Promise.all(promises)
            .then(() => {
                console.log('Records deleted');
                getRecords().then(data=>{
                    this.datass=data;
                    console.log(this.datass);
                    this.flag=false;
   })
            })
            .catch(error => {
                console.error(error);
            });
}









    recId='';
    objectname='Account';
    field=['Name','NumberOfEmployees','Description'];
    @api recordId;

    newRecord(){
    let name=this.template.querySelector('.account2').value;
    let data={
        'apiName':'Account',
        'fields':{
            'Name':name
        }
    }
    createRecord(data).then(result=>{
        console.log(result.id);
        console.log(result);
        this.recId=result.id;
        this.template.querySelector('.account2').value='';
    });

    }

    handleDelete(){
        console.log('RecordId->',this.recId);
     deleteRecord(this.recId).then(res=>{
        console.log("Deleted");
     }).catch(err=>{
        console.log(err);
     });
    }
    
    handleUpdate(){
      let data={
        fields:{
            Id:this.recId,
            NumberOfEmployees:1000
        }
      }
      updateRecord(data).then(res=>{
        console.log("Record Updated Successfully");
      })
    }
}


// 🔹 What are createRecord, updateRecord, deleteRecord?

// They are:
// ✅ Pre-built JavaScript functions (APIs)
// provided by Salesforce LDS.


// 🧩 1️⃣ createRecord()
// ✅ Purpose:

// Create a new Salesforce record

// ✅ Syntax:
// createRecord(recordInput)
// ✅ recordInput structure:
// {
//   apiName: 'ObjectApiName',
//   fields: {
//      FieldApiName: value
//   }
// }



// 🧩 2️⃣ updateRecord()
// ✅ Purpose:

// Update existing record

// ✅ Syntax:
// updateRecord(recordInput)
// ✅ recordInput structure:
// {
//   fields: {
//      Id: 'recordId',
//      FieldApiName: value
//   }
// }


// 🧩 3️⃣ deleteRecord()
// ✅ Purpose:

// Delete a record

// ✅ Syntax:
// deleteRecord(recordId)
// ✅ Your Example:
// deleteRecord(this.recId)

// Only record Id needed.


// 🔁 All return Promises
// So we use:

// .then()   // success
// .catch()  // error






//Code Explaination
// Zaroor! Yeh code ek Salesforce Lightning Web Component (LWC) hai jo ek data table dikhata hai aur records ko delete karne ki functionality provide karta hai.

// Iska main kaam Records Fetch karna, Row Actions handle karna aur Bulk Delete (Multiple records ek sath delete karna) hai.

// Niche har function aur logic ka summary di gayi hai:

// 1. Initial Data Fetching (LWC Lifecycle)
// renderedCallback(): Yeh function tab chalta hai jab component screen par render hota hai.

// flag variable: Iska use isliye kiya gaya hai taaki getRecords() baar-baar na chale (sirf ek baar initialize ho).

// Kaam: Yeh server se records mangwata hai aur this.datass mein store karta hai taaki table mein data dikh sake.

// 2. Table Configuration
// columns: Isme table ke headers (Name, Industry, etc.) defined hain.

// type: 'action': Yeh har row ke end mein ek drop-down menu (Show details, Delete) banata hai.

// 3. Single Record Delete (handleRowAction)
// Jab aap kisi specific row ke menu par jaakar "Delete" click karte ho, tab yeh trigger hota hai.

// Logic:

// Yeh check karta hai ki kaunsa action click hua (case: 'delete').

// deleteRecord(row.Id) ko call karke Salesforce se us record ko delete karta hai.

// Delete hone ke baad, yeh getRecords() ko fir se call karta hai taaki table refresh ho jaye aur deleted record hat jaye.

// 4. Selecting Multiple Records (handleRowSelection)
// Jab aap table ke checkboxes ko select karte ho, tab yeh function chalta hai.

// Kaam: Yeh saare selected rows ki Ids ko nikaalta hai (map function ka use karke) aur unhe this.selectedIds array mein save kar leta hai.

// 5. Bulk Delete (handleDelete11)
// Yeh function tab chalta hai jab aap screen par kisi "Delete Selected" button (jo HTML mein hoga) par click karte ho.

// Logic:

// Promise.all: Yeh sabse important part hai. Yeh selectedIds array mein jitni bhi Ids hain, un sabke liye ek saath deleteRecord call karta hai.

// Jab saare selected records delete ho jaate hain, tab yeh table ko refresh karne ke liye getRecords() call karta hai.

// Key Concepts jo use huye hain:
// getRecords(): Server-side (Apex) se data laane ke liye.

// deleteRecord(Id): Salesforce ka standard wire adapter (UI API) record delete karne ke liye.

// Promise.all(): Jab ek se zyada asynchronous kaam (jaise multiple deletes) ek saath karne hon.

// Agli baar jab aap ise padhenge: Bas itna yaad rakhein ki datass aapka data holder hai, selectedIds aapki list hai, aur getRecords() aapka refresh button ki tarah kaam kar raha hai.





//Refresh APEX

// refreshApex() ek specialized Salesforce LWC function hai jo server se data ko re-fetch karne ke liye use hota hai bina poore page ko reload kiye.

// Jab aap @wire use karte ho, toh Salesforce us data ko cache (save) kar leta hai performance badhane ke liye. Agar database mein koi badlav hota hai (jaise record delete ya update), toh cache ko purana data hi dikhta hai. refreshApex us cache ko "invalid" bolkar naya data lane par majboor karta hai.

// Refresh Apex Kaise Kaam Karta Hai?
// Yeh tabhi kaam karta hai jab aapne data lane ke liye @wire ka istemal kiya ho.

// Ise Use Karne Ka Sahi Tarika
// Ise use karne ke liye aapko 3 steps follow karne hote hain:

// Step 1: Import Karein
// Sabse pehle ise salesforce/apex module se import karna hota hai.

// JavaScript
// import { refreshApex } from '@salesforce/apex';
// Step 2: Ek Variable mein "Wired Result" Save Karein
// Aapko poora result object (jisne data aur error dono hote hain) ek variable mein store karna hoga. Sirf data ko store karne se kaam nahi chalega.

// JavaScript
// wiredRecordsResult; // Yeh variable poore response ko hold karega

// @wire(getRecords)
// wiredAccount(result) {
//     this.wiredRecordsResult = result; // Poora result save kiya
//     if (result.data) {
//         this.datass = result.data;
//     }
// }
// Step 3: Refresh Function ko Call Karein
// Jab koi action (jaise delete ya update) poora ho jaye, tab refreshApex ko call karein aur wahi variable pass karein.

// JavaScript
// handleDelete() {
//     deleteRecord(someId)
//         .then(() => {
//             // Table ko refresh karne ke liye
//             return refreshApex(this.wiredRecordsResult); 
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
// Dhyan Rakhne Wali Baatein (Tips):
// Async Nature: refreshApex() ek Promise return karta hai. Iska matlab hai ki jab tak naya data nahi aa jata, aap uske aage ka kaam .then() mein likh sakte hain.

// Variable Pass Karna: Hamesha poora result object pass karein (jo @wire ke andar milta hai), sirf this.datass (data) pass karne se refresh nahi hoga.

// Imperative Calls: Agar aap @wire use nahi kar rahe aur seedha getRecords().then() use kar rahe hain, toh refreshApex kaam nahi karega. Us case mein aapko dubara wahi function call karna padega.