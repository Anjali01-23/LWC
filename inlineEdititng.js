// Perfect 🔥 ab hum real scenario bana rahe hain 💯
// 👉 Opportunity records + Date Filter + Custom Table + Double Click Inline Edit

// 👉 ye tumhare project / paper ke liye full combo answer hai 😄

// 🔥 🎯 FINAL FEATURES

// ✔️ Apex se data
// ✔️ Date filter
// ✔️ Custom HTML table
// ✔️ Double click → edit
// ✔️ Inline update (UI)

// 🧩 1. APEX (same rahega)
// @AuraEnabled
// public static List<Opportunity> getFilteredOpp(Date startDate, Date endDate){

//     if(startDate == null && endDate == null){
//         return [SELECT Id, Name, StageName, CloseDate FROM Opportunity];
//     }
//     else if(startDate != null && endDate == null){
//         return [
//             SELECT Id, Name, StageName, CloseDate 
//             FROM Opportunity
//             WHERE CloseDate >= :startDate
//         ];
//     }
//     else if(startDate == null && endDate != null){
//         return [
//             SELECT Id, Name, StageName, CloseDate 
//             FROM Opportunity
//             WHERE CloseDate <= :endDate
//         ];
//     }
//     else{
//         return [
//             SELECT Id, Name, StageName, CloseDate 
//             FROM Opportunity
//             WHERE CloseDate >= :startDate 
//             AND CloseDate <= :endDate
//         ];
//     }
// }
// 🧩 2. HTML (Custom Table + Edit)
// <template>

//     <!-- 🔥 DATE FILTER -->
//     <lightning-input type="date" label="Start Date" onchange={handleStart}></lightning-input>
//     <lightning-input type="date" label="End Date" onchange={handleEnd}></lightning-input>

//     <!-- 🔥 CUSTOM TABLE -->
//     <table class="slds-table slds-table_bordered slds-m-top_medium">
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Stage</th>
//                 <th>Close Date</th>
//             </tr>
//         </thead>

//         <tbody>
//             <template for:each={data} for:item="rec">
//                 <tr key={rec.Id}>

//                     <!-- 🔥 NAME -->
//                     <td ondblclick={handleEdit} data-id={rec.Id} data-field="Name">
//                         <template if:false={rec.isEditingName}>
//                             {rec.Name}
//                         </template>

//                         <template if:true={rec.isEditingName}>
//                             <lightning-input
//                                 value={rec.Name}
//                                 data-id={rec.Id}
//                                 data-field="Name"
//                                 onchange={handleChange}
//                                 onblur={handleSave}>
//                             </lightning-input>
//                         </template>
//                     </td>

//                     <!-- 🔥 STAGE -->
//                     <td ondblclick={handleEdit} data-id={rec.Id} data-field="StageName">
//                         <template if:false={rec.isEditingStage}>
//                             {rec.StageName}
//                         </template>

//                         <template if:true={rec.isEditingStage}>
//                             <lightning-input
//                                 value={rec.StageName}
//                                 data-id={rec.Id}
//                                 data-field="StageName"
//                                 onchange={handleChange}
//                                 onblur={handleSave}>
//                             </lightning-input>
//                         </template>
//                     </td>

//                     <!-- 🔥 DATE -->
//                     <td>
//                         {rec.CloseDate}
//                     </td>

//                 </tr>
//             </template>
//         </tbody>
//     </table>

// </template>
// 🧩 3. JS (FULL LOGIC)
// import { LightningElement, track } from 'lwc';
// import getFilteredOpp from '@salesforce/apex/getRecordsImperative.getFilteredOpp';

// export default class CustomOppTable extends LightningElement {

//     @track data = [];

//     startDate;
//     endDate;

//     connectedCallback(){
//         this.fetchData();
//     }

//     // 🔥 DATE FILTER
//     handleStart(event){
//         this.startDate = event.target.value;
//         this.fetchData();
//     }

//     handleEnd(event){
//         this.endDate = event.target.value;
//         this.fetchData();
//     }

//     // 🔥 FETCH DATA
//     fetchData(){
//         getFilteredOpp({
//             startDate: this.startDate,
//             endDate: this.endDate
//         })
//         .then(result => {
//             // 🔥 editing flags add karo
//             this.data = result.map(rec => ({
//                 ...rec,
//                 isEditingName: false,
//                 isEditingStage: false
//             }));
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     }

//     // 🔥 DOUBLE CLICK → EDIT
//     handleEdit(event){
//         const recordId = event.currentTarget.dataset.id;
//         const field = event.currentTarget.dataset.field;

//         this.data = this.data.map(rec => {
//             if(rec.Id === recordId){
//                 if(field === 'Name'){
//                     return { ...rec, isEditingName: true };
//                 }
//                 if(field === 'StageName'){
//                     return { ...rec, isEditingStage: true };
//                 }
//             }
//             return rec;
//         });
//     }

//     // 🔥 CHANGE VALUE
//     handleChange(event){
//         const recordId = event.target.dataset.id;
//         const field = event.target.dataset.field;
//         const value = event.target.value;

//         this.data = this.data.map(rec => {
//             if(rec.Id === recordId){
//                 return { ...rec, [field]: value };
//             }
//             return rec;
//         });
//     }

//     // 🔥 SAVE (blur)
//     handleSave(event){
//         const recordId = event.target.dataset.id;
//         const field = event.target.dataset.field;

//         this.data = this.data.map(rec => {
//             if(rec.Id === recordId){
//                 if(field === 'Name'){
//                     return { ...rec, isEditingName: false };
//                 }
//                 if(field === 'StageName'){
//                     return { ...rec, isEditingStage: false };
//                 }
//             }
//             return rec;
//         });

//         // 🔥 yaha Apex updateRecord laga sakti ho
//         console.log('Saved');
//     }
// }
// 🔥 🎯 FINAL FLOW
// Date select
//     ↓
// Apex call
//     ↓
// data load
//     ↓
// table show
//     ↓
// double click
//     ↓
// input open
//     ↓
// value change
//     ↓
// blur
//     ↓
// save + UI update
// 💥 RESULT

// 👉 ab tumhare paas:

// ✔️ custom table
// ✔️ filtering
// ✔️ inline editing
// ✔️ double click UX

// 👉 🔥 FULL ADVANCED COMPONENT 🔥

// 🧠 INTERVIEW GOLD LINE

// Custom inline editing with double click is implemented by toggling UI state and updating local data, while filtering is handled via Apex.

// 🚀 NEXT LEVEL (optional)

// 👉 agar tum aur strong banana chahti ho:

// 🔥 Apex updateRecord save
// 🔥 picklist inline edit
// 🔥 highlight edited row
// 🔥 undo changes











// Custom table mein Double Click Inline Editing implement karna standard datatable se thoda advanced hai kyunki isme humein manually cell ka state (view mode vs edit mode) manage karna padta hai.

// Iska logic ye hai ki hum har cell ke liye ek toggle rakhte hain. Jab user double click karta hai, hum isEditing property ko true kar dete hain, jisse cell mein text ki jagah input field dikhne lagti hai.

// Niche poora code aur explanation diya gaya hai:

// 1. Apex Controller (TableController.cls)
// Ye class data fetch aur update karne ke liye use hogi.

// Apex
// public with sharing class TableController {
//     @AuraEnabled(cacheable=true)
//     public static List<Opportunity> getOpportunities() {
//         return [SELECT Id, Name, StageName, Amount FROM Opportunity LIMIT 10];
//     }

//     @AuraEnabled
//     public static void updateOpportunity(String recordId, String fieldName, String fieldValue) {
//         SObject record = Id.valueOf(recordId).getSObjectType().newSObject(recordId);
//         record.put(fieldName, fieldValue);
//         update record;
//     }
// }
// 2. LWC HTML File (customTable.html)
// Yahan hum check karte hain ki cell.isEditing true hai ya nahi.

// HTML
// <template>
//     <lightning-card title="Double Click to Edit Table" icon-name="standard:record">
//         <div class="slds-p-around_medium">
//             <table class="slds-table slds-table_bordered slds-table_cell-buffer">
//                 <thead>
//                     <tr class="slds-line-height_reset">
//                         <th scope="col">Name</th>
//                         <th scope="col">Stage</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <template for:each={records} for:item="row">
//                         <tr key={row.Id}>
//                             <td ondblclick={handleDoubleClick} data-id={row.Id} data-field="Name">
//                                 <template if:true={row.NameEditing}>
//                                     <lightning-input 
//                                         value={row.Name} 
//                                         onblur={handleBlur} 
//                                         data-id={row.Id} 
//                                         data-field="Name" 
//                                         variant="label-hidden" 
//                                         focus-on-render>
//                                     </lightning-input>
//                                 </template>
//                                 <template if:false={row.NameEditing}>
//                                     {row.Name}
//                                 </template>
//                             </td>
//                             <td ondblclick={handleDoubleClick} data-id={row.Id} data-field="StageName">
//                                 <template if:true={row.StageNameEditing}>
//                                     <lightning-input 
//                                         value={row.StageName} 
//                                         onblur={handleBlur} 
//                                         data-id={row.Id} 
//                                         data-field="StageName" 
//                                         variant="label-hidden">
//                                     </lightning-input>
//                                 </template>
//                                 <template if:false={row.StageNameEditing}>
//                                     {row.StageName}
//                                 </template>
//                             </td>
//                         </tr>
//                     </template>
//                 </tbody>
//             </table>
//         </div>
//     </lightning-card>
// </template>
// 3. LWC JavaScript File (customTable.js)
// Yahan hum double click aur blur (save) events ko handle karte hain.

// JavaScript
// import { LightningElement, wire, track } from 'lwc';
// import getOpportunities from '@salesforce/apex/TableController.getOpportunities';
// import updateOpportunity from '@salesforce/apex/TableController.updateOpportunity';
// import { refreshApex } from '@salesforce/apex';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class CustomTable extends LightningElement {
//     @track records = [];
//     wiredResult;

//     @wire(getOpportunities)
//     wiredOpps(result) {
//         this.wiredResult = result;
//         if (result.data) {
//             // Data ko map karke edit flags add karna
//             this.records = result.data.map(item => ({
//                 ...item,
//                 NameEditing: false,
//                 StageNameEditing: false
//             }));
//         }
//     }

//     // Double Click par Edit mode on karna
//     handleDoubleClick(event) {
//         const recordId = event.currentTarget.dataset.id;
//         const fieldName = event.currentTarget.dataset.field;
        
//         this.records = this.records.map(item => {
//             if (item.Id === recordId) {
//                 return { ...item, [`${fieldName}Editing`]: true };
//             }
//             return { ...item, [`${fieldName}Editing`]: false }; // Baki sab close
//         });
//     }

//     // Input se focus hat-te hi save karna
//     handleBlur(event) {
//         const recordId = event.target.dataset.id;
//         const fieldName = event.target.dataset.field;
//         const newValue = event.target.value;

//         // Edit mode off karna
//         this.records = this.records.map(item => {
//             if (item.Id === recordId) {
//                 return { ...item, [`${fieldName}Editing`]: false, [fieldName]: newValue };
//             }
//             return item;
//         });

//         // Database update
//         updateOpportunity({ recordId, fieldName, fieldValue: newValue })
//             .then(() => {
//                 this.dispatchEvent(new ShowToastEvent({
//                     title: 'Success',
//                     message: 'Record updated',
//                     variant: 'success'
//                 }));
//                 return refreshApex(this.wiredResult);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
// }
// Samjhauta (Explanation):
// Data Transformation: @wire se jo data aata hai wo "Immutable" (read-only) hota hai. Isliye humne .map() ka use karke uski ek copy banayi aur usme NameEditing jaise extra fields jode.

// ondblclick: Jab user kisi cell par double click karta hai, hum us record ki specific field ka editing flag true kar dete hain. Isse HTML mein <template if:true> wala block trigger ho jata hai.

// onblur: Jab user input field se bahar click karta hai (focus hat-ta hai), tab hum assume karte hain ki editing poori ho gayi. Hum Apex call karke value save karte hain aur UI ko wapas normal mode mein le aate hain.

// data- attributes: HTML mein data-id aur data-field ka use kiya gaya hai taaki JS ko pata chale ki kaunsa record aur kaunsii field update karni hai.

// Kya aap chahte hain ki main isme "Cancel" button ya "Esc" key se edit cancel karne ka feature bhi jod doon?JavaScript mein yeh ek Dynamic Property Key (ES6 Computed Property Name) hai. Iska use tab kiya jata hai jab aapko kisi object ki key (property name) ka naam pehle se pata na ho aur wo kisi variable par depend karta ho.

// Aapke code ke context mein iska matlab samjhte hain:

// 1. Yeh kaam kaise karta hai?
// Normal object mein hum aise likhte hain:
// { NameEditing: true } — Yahan key fixed hai.

// Lekin agar aapke paas ek variable hai const fieldName = 'StageName', aur aap chahte hain ki key automatic 'StageNameEditing' ban jaye, toh aap square brackets [] aur backticks ` ka use karte hain:

// JavaScript
// [`${fieldName}Editing`]: true
// 2. Breakdown:
// ${fieldName}: Yeh ek template literal hai jo fieldName variable ki value uthata hai (e.g., 'Name' ya 'StageName').

// Editing: Yeh ek suffix (piche jodne wala shabd) hai jo humne har field ke saath fix rakha hai.

// [] (Square Brackets): Yeh JavaScript ko batata hai ki "Bhai, brackets ke andar jo bhi expression hai, use pehle solve karo aur jo result aaye use Key banao."

// 3. Example Se Samjhein:
// Maaniye aapki table mein do columns hain.

// Case A: Jab user 'Name' column par double click karega:

// fieldName ki value hogi "Name".

// JavaScript ise solve karke banayega: { NameEditing: true }.

// Case B: Jab user 'StageName' column par double click karega:

// fieldName ki value hogi "StageName".

// JavaScript ise solve karke banayega: { StageNameEditing: true }.

// Iska Fayda Kya Hai?
// Iska sabse bada fayda yeh hai ki aapko har column ke liye alag-alag function likhne ki zaroorat nahi padti. Ek hi generic function (handleDoubleClick) saare columns ko handle kar leta hai.

// Summary Table:

// Input fieldName	Resulting Object Key
// "Name"	NameEditing
// "Amount"	AmountEditing
// "StageName"	StageNameEditing
// Kya aap chahte hain ki main dikhaun ki isi logic ka use karke aap "Save" button ke bina pure row ko ek saath kaise update kar sakte hain?



// Yeh Apex code ka ek bahut hi smart aur dynamic tarika hai records ko update karne ka. Iska sabse bada fayda ye hai ki aapko pehle se nahi pata hona chahiye ki aap Opportunity update kar rahe ho ya Account, ya phir kaunsa field.

// Aaiye iska step-by-step breakdown samajhte hain:

// 1. Id.valueOf(recordId).getSObjectType()
// Kya karta hai?: Har Salesforce ID ke shuruati 3 characters (Prefix) batate hain ki wo kis Object ki ID hai (e.g., 006 Opportunity ke liye hota hai).

// Fayda: Yeh line automatic pata laga leti hai ki di gayi ID kis object ki hai. Agar aapne Opportunity ki ID bheji hai, toh ye Opportunity object type return karega.

// 2. .newSObject(recordId)
// Kya karta hai?: Yeh us specific ID ke liye memory mein ek naya sObject instance (blank record) create karta hai.

// Kyun?: Humein pura record database se SELECT karke lane ki zaroorat nahi hai. Hum sirf ID set karke update maar sakte hain, jo performance ke liye bahut fast hai.

// 3. record.put(fieldName, fieldValue)
// Kya karta hai?: Yeh dynamic assignment hai.

// Kaise?: Agar fieldName mein "StageName" hai aur fieldValue mein "Closed Won", toh ye piche record.StageName = 'Closed Won' jaisa kaam karega.

// Zaroori: Isse aap ek hi method se Name, Amount, ya Stage—kuch bhi update kar sakte hain.

// 4. update record
// Kya karta hai?: Yeh DML operation hai jo database mein jaakar changes save kar deta hai.

// Iska Poora Flow (Diagram)
// Is Logic ka Fayda Kya Hai?
// Aapne jo LWC table banayi hai, usme user kisi bhi column par double click kar sakta hai. Is Apex logic ki wajah se aapko har field ke liye alag method nahi likhna pada:

// Agar Name edit kiya: fieldName = "Name" bankar jayega.

// Agar Stage edit kiya: fieldName = "StageName" bankar jayega.

// Apex Controller isse handle kar lega bina code badle.

// Ek Choti Savdhan (Best Practice)
// Jab aap fieldValue bhejte hain, toh wo String format mein hoti hai. Agar aap Amount (Currency) ya Date field update kar rahe hain, toh aapko Apex mein use Typecast karna pad sakta hai, kyunki record.put ko sahi data type chahiye hota hai.

// Kya aap chahte hain ki main aapko bataun ki Date ya Number fields ke liye is Apex code mein "Type Casting" kaise jodein?