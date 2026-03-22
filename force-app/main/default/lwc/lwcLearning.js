// {
//     label: 'Status',
//     fieldName: 'statusField',
//     type: 'text', // Ya jo bhi type ho
//     cellAttributes: {
//         // 1. Agar constant (fixed) value deni ho:
//         iconName: 'utility:approval', 
        
//         // 2. Agar data se dynamic value uthani ho:
//         iconName: { fieldName: 'iconFieldNameInData' },
        
//         // 3. Alignment aur Position:
//         iconPosition: 'right', // 'left' is default
//         alignment: 'center'    // 'left', 'right', 'center'
//     }
// }

// LWC datatable cellAttributes dynamic class"

// "SLDS themes and helper classes" (background colors ke liye)

// "lightning-datatable styling hooks

// // Data process karte waqt class add karein
// this.data = rawData.map(item => {
//     return {
//         ...item,
//         myDynamicClass: item.Amount__c < 1000 ? 'slds-theme_error' : 'slds-theme_success'
//     };
// });

// // Column definition
// {
//     label: 'Tax Amount',
//     fieldName: 'Amount__c',
//     cellAttributes: {
//         class: { fieldName: 'myDynamicClass' } // Data se class uthayega
//     }
// }



// /* Custom class for background and border */
// .custom-column-style {
//     background-color: #f0f8ff !important;
//     border: 1px solid #0070d2 !important;
//     font-weight: bold;
// }

// {
//     label: 'Contact Email',
//     fieldName: 'Email',
//     cellAttributes: {
//         class: 'custom-column-style'
//     }
// }


// /* Custom Red Background */
// .my-red-cell {
//     background-color: #ffcccc !important; 
//     color: #990000 !important;
//     border: 1px solid #cc0000 !important;
//     font-weight: bold;
// }

// /* Custom Green Background */
// .my-green-cell {
//     background-color: #ccffcc !important;
//     color: #006600 !important;
//     border: 1px solid #009900 !important;
// }

// /* Custom Blue (for neutral cases) */
// .my-blue-cell {
//     background-color: #e6f3ff !important;
//     color: #004d99 !important;
// }

// this.data = rawData.map(item => {
//     let customClass = '';

//     // Multiple conditions ke hisab se class decide karein
//     if (item.Amount__c < 1000) {
//         customClass = 'my-red-cell';   // Low Amount
//     } else if (item.Amount__c >= 1000 && item.Amount__c < 5000) {
//         customClass = 'my-blue-cell';  // Medium Amount
//     } else {
//         customClass = 'my-green-cell'; // High Amount
//     }

//     return {
//         ...item,
//         myDynamicClass: customClass // Nayi property add ki
//     };
// });

// {
//     label: 'Tax Amount',
//     fieldName: 'Amount__c',
//     type: 'currency',
//     cellAttributes: {
//         class: { fieldName: 'myDynamicClass' } 
//     }
// }



// //Inline Edititng
// const columns = [
//     { label: 'Name', fieldName: 'LastName', editable: true }, // Edit allow hai
//     { label: 'Email', fieldName: 'Email', type: 'email', editable: true }, 
//     { label: 'Amount', fieldName: 'Amount__c', type: 'currency', editable: false } // Edit allow nahi hai
// ];
// <lightning-datatable
//     key-field="Id"
//     data={data}
//     columns={columns}
//     onsave={handleSave} 
//     draft-values={draftValues}> </lightning-datatable>

// import { LightningElement, track } from 'lwc';
// import updateRecords from '@salesforce/apex/YourClass.updateRecords'; // Apex method
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { refreshApex } from '@salesforce/apex';

// export default class MyDatatable extends LightningElement {
//     @track draftValues = []; // Edited data yahan store hota hai

//     handleSave(event) {
//         // 1. Edited records ko nikalne ke liye
//         const updatedFields = event.detail.draftValues;

//         // 2. Apex call karein records update karne ke liye
//         updateRecords({ data: updatedFields })
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Records updated successfully',
//                         variant: 'success'
//                     })
//                 );
//                 // 3. Draft values clear karein taaki Save button gayab ho jaye
//                 this.draftValues = [];
//                 // 4. Table data refresh karein (refreshApex use karein agar wire use ho raha hai)
//                 return refreshApex(this.wiredDataResult);
//             })
//             .catch(error => {
//                 console.error('Error updating records', error);
//             });
//     }
// }

// @AuraEnabled
// public static void updateRecords(List<SObject> data) {
//     if(data != null && !data.isEmpty()) {
//         update data;
//     }
// }


// //Custom Datatype-Pehle aapko ek alag LWC component banana hoga jo sirf image dikhayega.
// Maano iska naam hai datatableImageHelper.

// <template>
//     <img src={url} alt="Record Image" style="height:50px; width:50px; border-radius:50%;" />
// </template>

// datatableImageHelper.js

// JavaScript
// import { LightningElement, api } from 'lwc';
// export default class DatatableImageHelper extends LightningElement {
//     @api url; // Ye URL column definition se aayega
// }

// import LightningDatatable from 'lightning/datatable';
// import imageTemplate from './datatableImageHelper.html';

// export default class CustomDatatable extends LightningDatatable {
//     static customTypes = {
//         customImage: {
//             template: imageTemplate,
//             standardCellLayout: true,
//             typeAttributes: ['url']
//         }
//     };
// }
// const columns = [
//     { label: 'Name', fieldName: 'Name' },
//     { 
//         label: 'Logo', 
//         type: 'customImage', 
//         typeAttributes: { 
//             url: 'https://www.example.com/logo.png' // Hardcoded URL
//         } 
//     }
// ];
// const columns = [
//     { label: 'Product Name', fieldName: 'Name' },
//     { 
//         label: 'Product Image', 
//         type: 'customImage', 
//         typeAttributes: { 
//             url: { fieldName: 'Product_URL__c' } // Data field se dynamic uthayega
//         } 
//     }
// ];
// this.data = rawData.map(item => {
//     return {
//         ...item,
//         // Logic ke hisab se URL assign karein
//         statusImage: item.Amount__c > 0 ? '/resource/success_icon' : '/resource/error_icon'
//     };
// });

// // Column Definition
// { 
//     label: 'Status', 
//     type: 'customImage', 
//     typeAttributes: { 
//         url: { fieldName: 'statusImage' } 
//     } 
// }

// import SUCCESS_ICON from '@salesforce/resourceUrl/success_icon';
// import ERROR_ICON from '@salesforce/resourceUrl/error_icon';

// // Phir data map karte waqt use karein:
// this.data = rawData.map(item => {
//     return {
//         ...item,
//         statusImage: item.Amount__c > 0 ? SUCCESS_ICON : ERROR_ICON
//     };
// });

// import { LightningElement, track } from 'lwc';

// export default class MyComponent extends LightningElement {
//     @track data = [
//         { id: '1', Name: 'Success Record', imgUrl: '/resource/success_icon' },
//         { id: '2', Name: 'Error Record', imgUrl: '/resource/error_icon' }
//     ];

//     // Yahan aayenge aapke columns
//     columns = [
//         { label: 'Name', fieldName: 'Name' },
//         { 
//             label: 'Status Image', 
//             type: 'customImage', // Ye wahi naam hai jo Step 1 mein register kiya
//             typeAttributes: { 
//                 url: { fieldName: 'imgUrl' } // Data field se mapping
//             } 
//         }
//     ];
// }

// Step 3: HTML mein Twist (myComponent.html)Ab yahan dhyan dena! Aap HTML mein <lightning-datatable> use nahi karenge. Aap apne banaye huye "Engine" (Step 1) ka tag use karenge.Agar aapke Step 1 wale component ka naam customDatatable hai, toh tag hoga <c-custom-datatable>.HTML<template>
//     <lightning-card title="Custom Image Table">
//         <c-custom-datatable
//             key-field="id"
//             data={data}
//             columns={columns}>
//         </c-custom-datatable>
//     </lightning-card>
// </template>
// Summary: Kaun kya extend karega?FileKya extend karega?Kyun?Engine JSLightningDatatableTaaki hum standard datatable ke features mein apna "custom type" add kar sakein.Dashboard JSLightningElementTaaki hum screen par data dikha sakein, wire service use kar sakein, aur columns define karein.

// @RestResource(urlMapping='/createTax')
// global class apiTax {

//     @HttpPost
//     global static void method() {

//         RestRequest req = RestContext.request;
//         String str = req.requestBody.toString();

//         // ✅ JSON array → List<RecordClass>
//         List<RecordClass> listData =
//             (List<RecordClass>) JSON.deserialize(str, List<RecordClass>.class);

//         List<Contact> conList = new List<Contact>();
//         List<Tax_Return__c> taxList = new List<Tax_Return__c>();

//         // 🔁 Loop through records
//         for (RecordClass rec : listData) {

//             // 👉 Create Contact
//             Contact c = new Contact(
//                 LastName = rec.Name,
//                 Email = rec.Email
//             );
//             conList.add(c);

//             // 👉 Loop Salaries
//             if (rec.Salaries != null) {

//                 for (RecordClass.Salary sal : rec.Salaries) {

//                     Tax_Return__c t = new Tax_Return__c(
//                         Amount__c = sal.Amount,
//                         Month__c = sal.Month,
//                         External_Id__c = sal.external_id__c,

//                         // relation via external id (Email)
//                         Contact__r = new Contact(Email = rec.Email)
//                     );

//                     taxList.add(t);
//                 }
//             }
//         }

//         // ✅ DML operations
//         if (!conList.isEmpty()) {
//             upsert conList Email;
//         }

//         if (!taxList.isEmpty()) {
//             upsert taxList External_Id__c;
//         }
//     }
// }