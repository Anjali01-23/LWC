// 🔥 1. LDS kya hota hai?

// 👉 Lightning Data Service (LDS) =
// Salesforce ka built-in system jo data ko bina Apex ke handle karta hai

// 👉 simple words:

// “Direct Salesforce se data lo aur save karo — bina Apex likhe”

// 🔥 2. LDS ke 2 main parts
// ✅ A. Base Components (HTML wale)
// Component	Use
// lightning-record-form	simple form (view + edit)
// lightning-record-edit-form	custom edit/create
// lightning-record-view-form	read-only view
// ✅ B. JS APIs (wire/adapters)
// Function	Use
// getRecord	record fetch
// createRecord	record create
// updateRecord	record update
// deleteRecord	record delete
// 🔥 3. Base Components (detail me)
// ✅ 1. lightning-record-form (sabse easy)
// <lightning-record-form
//     object-api-name="Opportunity"
//     layout-type="Full"
//     mode="edit">
// </lightning-record-form>
// 🔥 Features:
// auto fields
// auto buttons
// minimal code
// ❌ Limitation:
// control nahi milta
// ✅ 2. lightning-record-edit-form (MOST IMPORTANT 🔥)

// 👉 tum already use kar rahi ho

// <lightning-record-edit-form 
//     object-api-name="Opportunity"
//     onsuccess={handleSuccess}
//     onerror={handleError}>

//     <lightning-input-field field-name="Name"></lightning-input-field>
//     <lightning-input-field field-name="StageName"></lightning-input-field>

//     <lightning-button type="submit" label="Save"></lightning-button>

// </lightning-record-edit-form>
// 🔥 Key points:
// Feature	Explanation
// create	record-id nahi diya
// edit	record-id diya
// validation	auto
// picklist	auto dropdown
// 🔥 Events
// handleSuccess(event) {
//     console.log(event.detail.id); // new record Id
// }

// handleError(event) {
//     console.log(event.detail.message);
// }
// ✅ 3. lightning-record-view-form
// <lightning-record-view-form 
//     object-api-name="Opportunity"
//     record-id={recordId}>

//     <lightning-output-field field-name="Name"></lightning-output-field>

// </lightning-record-view-form>

// 👉 read-only display

// 🔥 4. JS APIs (VERY IMPORTANT)
// ✅ 1. getRecord
// import { getRecord } from 'lightning/uiRecordApi';

// @wire(getRecord, { 
//     recordId: '$recordId', 
//     fields: ['Opportunity.Name'] 
// })
// record;

// 👉 use:

// single record fetch
// ✅ 2. createRecord
// import { createRecord } from 'lightning/uiRecordApi';

// createRecord({
//     apiName: 'Opportunity',
//     fields: {
//         Name: 'Test Opp',
//         StageName: 'Prospecting',
//         CloseDate: '2026-03-25'
//     }
// })
// .then(result => {
//     console.log(result.id);
// });
// ✅ 3. updateRecord
// import { updateRecord } from 'lightning/uiRecordApi';

// updateRecord({
//     fields: {
//         Id: recordId,
//         Name: 'Updated Name'
//     }
// });
// ✅ 4. deleteRecord
// import { deleteRecord } from 'lightning/uiRecordApi';

// deleteRecord(recordId)
// .then(() => {
//     console.log('Deleted');
// });
// 🔥 5. Important Concepts
// ✅ Auto Features (LDS ka magic 🔥)
// validation rules apply
// required fields check
// FLS (field level security)
// sharing rules

// 👉 bina code ke

// ✅ Caching

// 👉 LDS automatically:

// data cache karta hai
// performance fast hoti hai
// 🔥 6. LDS vs Apex (MOST IMPORTANT)
// Feature	LDS	Apex
// Single record	✅	✅
// Bulk records	❌	✅
// Datatable	❌	✅
// Complex logic	❌	✅
// No code	✅	❌
// 🔥 7. Tumhare project me kaha use hoga
// Feature	Use
// Modal Create	LDS ✅
// Modal Edit	LDS ✅
// Datatable	Apex ✅
// Inline edit save	Apex ✅
// 🔥 8. Real Example (tumhare case ka)

// 👉 Modal:

// <lightning-record-edit-form object-api-name="Opportunity">

// 👉 Datatable:

// Apex call (getRecordsOpp1)

// 👉 combo = best practice 💯

// 🔥 9. Common Mistakes

// ❌ record-id galat dena
// ❌ required field miss karna
// ❌ error handle na karna
// ❌ LDS ko bulk me use karna

// 🧠 FINAL INTERVIEW ANSWER

// Lightning Data Service allows us to perform CRUD operations on single records without Apex while automatically handling security, validation, and caching.

// 🚀 FINAL SUMMARY

// 👉 LDS use karo:

// form
// create/edit/view
// single record

// 👉 Apex use karo:

// datatable
// bulk update
// complex logic

// Agar chaho to next mai tumhe:
// 👉 LDS + modal + default value + validation full working template
// 👉 ya LDS vs Apex real interview questions

// bhi kara du 😄

// isme kon kon se fields aate h<lightning-record-form
//     object-api-name="Opportunity"
//     layout-type="Full"
//     mode="edit">
// </lightning-record-form>

// Great question 👍 — ye lightning-record-form ka core behavior hai.

// 🔥 🎯 Tumne poocha:
// <lightning-record-form
//     object-api-name="Opportunity"
//     layout-type="Full"
//     mode="edit">
// </lightning-record-form>

// 👉 Isme kaun kaun se fields aayenge?

// ✅ ✅ Answer

// 👉 Isme Salesforce Page Layout ke fields aate hain
// 👉 specifically:

// Opportunity ke “Full Layout” me jo fields configured hain

// 🔥 Detail me samjho
// 👉 layout-type="Full"

// 👉 iska matlab:

// Salesforce → Object Manager → Opportunity
// Page Layout → jo layout assign hai user ko
// us layout ke ALL fields show honge
// 👉 Example

// Agar tumhare layout me ye fields hain:

// Name
// StageName
// CloseDate
// Amount
// Account
// Type

// 👉 to form me ye sab dikhenge automatically ✅

// ⚠️ IMPORTANT POINTS
// 🔥 1. Admin control

// 👉 Developer control nahi karta
// 👉 Admin decide karta hai:

// kaunse fields
// kis order me
// kaun required
// 🔥 2. Required fields

// 👉 layout me required → form me bhi required

// 🔥 3. FLS apply hota hai

// 👉 agar user ke paas permission nahi:

// field dikhega hi nahi ❌
// 🔥 4. Sections bhi aate hain

// 👉 layout me jo sections hain:

// wo bhi show honge
// ❌ Control nahi milta

// 👉 tum:

// 2 column control ❌
// specific fields choose ❌
// custom layout ❌
// 🔥 Alternative (control chahiye to)
// 👉 Specific fields:
// <lightning-record-form
//     object-api-name="Opportunity"
//     fields={fields}>
// </lightning-record-form>
// fields = ['Name', 'StageName', 'CloseDate'];
// 👉 Full control:

// 👉 use:

// lightning-record-edit-form
// 🎯 Summary
// Property	Result
// layout-type="Full"	full page layout fields
// layout-type="Compact"	compact layout
// fields=[]	custom fields
// 🧠 Interview line

// lightning-record-form displays fields based on the page layout when layout-type is used, and developers can override it using the fields attribute.

// 🚀 Tumhare project ke context me

// 👉 ye use karo jab:

// quick form chahiye
// admin control chahiye

// 👉 mat use karo jab:

// modal design custom ho
// 2 column layout chahiye
// default values set karni ho

// Agar chaho to mai tumhe:
// 👉 Full vs Compact vs Fields ka difference diagram style me
// 👉 ya real interview tricky questions on LDS

// bhi samjha du 😄

// getrecord ka proper tareeke se do ki fields value kse get krte j ye sab bhi

// Perfect 👍 ab hum getRecord ko properly (real project level) samjhenge —
// 👉 kaise use hota hai
// 👉 fields ki value kaise nikalte hain
// 👉 best practices 💯

// 🔥 1. getRecord kya karta hai?

// 👉 LDS ka function hai
// 👉 single record fetch karta hai (without Apex)

// 🔥 2. Basic Syntax
// import { getRecord } from 'lightning/uiRecordApi';
// import NAME_FIELD from '@salesforce/schema/Opportunity.Name';

// @wire(getRecord, {
//     recordId: '$recordId',
//     fields: [NAME_FIELD]
// })
// record;
// 🔥 3. Field Value kaise nikalein (MOST IMPORTANT 🔥)

// 👉 Direct aise nahi:

// this.record.Name ❌

// 👉 correct way:

// this.record.data.fields.Name.value ✅
// 🔥 4. Better way (recommended)

// 👉 helper use karo:

// import { getFieldValue } from 'lightning/uiRecordApi';

// get name() {
//     return getFieldValue(this.record.data, NAME_FIELD);
// }
// 🔥 5. HTML me use
// <p>{name}</p>
// 🔥 6. Multiple fields ka example
// import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
// import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

// @wire(getRecord, {
//     recordId: '$recordId',
//     fields: [NAME_FIELD, STAGE_FIELD]
// })
// record;

// get stage() {
//     return getFieldValue(this.record.data, STAGE_FIELD);
// }
// 🔥 7. Relationship fields (IMPORTANT)

// 👉 Example: Account Name

// import ACCOUNT_NAME from '@salesforce/schema/Opportunity.Account.Name';

// get accountName() {
//     return getFieldValue(this.record.data, ACCOUNT_NAME);
// }
// 🔥 8. Complete Example (BEST)
// import { LightningElement, api, wire } from 'lwc';
// import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
// import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

// export default class Example extends LightningElement {

//     @api recordId;

//     @wire(getRecord, {
//         recordId: '$recordId',
//         fields: [NAME_FIELD, STAGE_FIELD]
//     })
//     record;

//     get name() {
//         return getFieldValue(this.record.data, NAME_FIELD);
//     }

//     get stage() {
//         return getFieldValue(this.record.data, STAGE_FIELD);
//     }
// }
// 🔥 HTML
// <template>
//     <p>Name: {name}</p>
//     <p>Stage: {stage}</p>
// </template>
// 🔥 9. Error Handling
// @wire(getRecord, {...})
// wiredRecord({ data, error }) {
//     if (data) {
//         console.log(data);
//     } else if (error) {
//         console.error(error);
//     }
// }
// 🔥 10. Important Notes
// ✅ Always import fields
// import NAME_FIELD from '@salesforce/schema/Opportunity.Name';

// 👉 hardcode mat karo ❌

// ✅ Use $recordId

// 👉 reactive hai

// ❌ Bulk data ke liye use mat karo

// 👉 datatable → Apex use karo

// 🔥 11. Output Structure (samajhne ke liye)
// record.data.fields.Name.value

// 👉 structure:

// data
//  └── fields
//       └── Name
//            └── value
// 🎯 FINAL SUMMARY
// Task	Syntax
// fetch record	getRecord
// get value	getFieldValue
// relationship	Account.Name
// error handling	wired function
// 🧠 Interview Line

// getRecord is used to fetch a single record using LDS, and field values are accessed using getFieldValue or record.data.fields.fieldName.value.

// 🚀 Next step (agar chaho)