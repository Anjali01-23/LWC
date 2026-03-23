// Aapne abhi jo implement kiya hai, use Self-Referencing Tree kehte hain kyunki aapne ek hi object (Account) ke andar ParentId ka use karke hierarchy dikhayi hai.

// Agar aap Accounts ke andar unke Contacts dikhana chahte hain, toh ye Standard Parent-Child Relationship (Self-Referencing nahi) ban jayegi. Iske liye humein Apex mein "Inner Query" ka use karna padega aur JS mein thoda badlav.

// Niche iska poora code aur procedure diya gaya hai:

// 1. Apex Controller (getRecordsImperative.cls)
// Yahan hum Inner Query use karenge taaki har Account ke saath uske related Contacts mil jayein.

// Apex
// @AuraEnabled(cacheable=true)
// public static List<Account> getAccWithContacts() {
//     // Inner Query: Accounts ke saath unke Contacts bhi fetch karein
//     return [SELECT Id, Name, NumberOfEmployees, Phone, Owner.Name, BillingCity, 
//             (SELECT Id, Name, Phone, Email FROM Contacts) 
//             FROM Account LIMIT 50];
// }
// 2. LWC HTML File (accountContactTree.html)
// Tree-grid mein hum wahi columns dikhayenge jo dono (Account aur Contact) mein common ho ya unka mapping handle karenge.

// HTML
// <template>
//     <lightning-card title="Account & Contacts Tree" icon-name="standard:hierarchy">
//         <div class="slds-m-around_medium">
//             <lightning-tree-grid
//                 columns={columns}
//                 data={treeData}
//                 key-field="Id"
//                 hide-checkbox-column>
//             </lightning-tree-grid>
//         </div>
//     </lightning-card>
// </template>
// 3. LWC JavaScript File (accountContactTree.js)
// Yahan humein Accounts ke andar Contacts array ko _children mein convert karna hoga.

// JavaScript
// import { LightningElement, wire } from 'lwc';
// import getAccWithContacts from '@salesforce/apex/getRecordsImperative.getAccWithContacts';

// export default class AccountContactTree extends LightningElement {
//     treeData;
//     columns = [
//         { label: 'Name', fieldName: 'Name', type: 'text' },
//         { label: 'Phone', fieldName: 'Phone', type: 'phone' },
//         { label: 'Employees / Email', fieldName: 'EmailOrEmployees', type: 'text' }
//     ];

//     @wire(getAccWithContacts)
//     wiredData({ error, data }) {
//         if (data) {
//             this.treeData = data.map(acc => {
//                 // Agar Contacts hain, toh unhe _children property mein daalein
//                 let children = [];
//                 if (acc.Contacts) {
//                     children = acc.Contacts.map(con => {
//                         return {
//                             ...con,
//                             // Mapping: Contact mein Email dikhao, Account mein Employees
//                             EmailOrEmployees: con.Email
//                         };
//                     });
//                 }

//                 return {
//                     ...acc,
//                     EmailOrEmployees: acc.NumberOfEmployees ? acc.NumberOfEmployees.toString() : '0',
//                     _children: children.length > 0 ? children : null
//                 };
//             });
            
//             // Un accounts se _children hata do jinme contacts nahi hain
//             this.treeData = this.treeData.map(node => {
//                 if (node._children === null) {
//                     delete node._children;
//                 }
//                 return node;
//             });
//         } else if (error) {
//             console.error('Error fetching data', error);
//         }
//     }
// }
// Condition-Based Tree Grid (Explanation)
// Agar aapko "Condition" lagani hai (e.g., Sirf wahi Accounts dikhao jinke Employees > 100 hon), toh aap do tarike se kar sakte hain:

// Apex Level (Best for Performance):
// SELECT ... FROM Account WHERE NumberOfEmployees > 100

// JS Level (Best for Dynamic Filtering):
// Tree banane se pehle .filter() use karein:
// const filteredData = data.filter(acc => acc.NumberOfEmployees > 100);

// Dono mein Fark:
// Self-Referencing Tree: Ek hi table ka record apne hi table ke dusre record se juda hota hai (ParentId).

// Parent-Child Tree: Do alag objects (Account aur Contact) ko hierarchy mein dikhaya jata hai.

// Kya aap chahte hain ki main isme "Lazy Loading" add karun, jisme Contacts tabhi fetch hon jab aap Account ko expand karein? Isse page load fast ho jayega.



// Condition-based Tree Grid ka matlab hota hai ki aap data ko kisi filter ke basis par tree structure mein convert kar rahe hain (jaise ki sirf wahi Accounts dikhana jinke employees ek limit se zyada hon ya specific city ke hon).

// Niche iska complete code diya gaya hai:

// 1. Apex Controller (getRecordsImperative.cls)
// Aapke query mein humne ParentId ko include kiya hai taaki hierarchy bani rahe.

// Apex
// public with sharing class getRecordsImperative {
//     @AuraEnabled(cacheable=true)
//     public static List<Account> getAcc() {
//         // Querying necessary fields for TreeGrid and filtering
//         return [SELECT Id, Name, NumberOfEmployees, Phone, Owner.Name, BillingCity, ParentId 
//                 FROM Account 
//                 ORDER BY Name];
//     }
// }
// 2. LWC HTML File (conditionTreeGrid.html)
// HTML
// <template>
//     <lightning-card title="Condition-Based Account Tree" icon-name="standard:hierarchy">
//         <div class="slds-m-around_medium">
//             <lightning-tree-grid
//                 columns={columns1}
//                 data={datas}
//                 key-field="Id"
//                 hide-checkbox-column>
//             </lightning-tree-grid>
//         </div>
//     </lightning-card>
// </template>
// 3. LWC JavaScript File (conditionTreeGrid.js)
// Is code mein humne Condition lagayi hai: "Sirf wahi accounts dikhao jinki BillingCity 'Jaipur' hai ya NumberOfEmployees 100 se zyada hai."

// JavaScript
// import { LightningElement, wire } from 'lwc';
// import getRecords from '@salesforce/apex/getRecordsImperative.getAcc';

// export default class ConditionTreeGrid extends LightningElement {
//     columns1 = [
//         { label: 'Name', fieldName: 'Name' },
//         { label: 'Employees', fieldName: 'NumberOfEmployees', type: 'number' },
//         { label: 'Phone', fieldName: 'Phone', type: 'phone' },
//         { label: 'Owner Name', fieldName: 'OwnerName' },
//         { label: 'Billing City', fieldName: 'BillingCity' }
//     ];
//     datas;

//     @wire(getRecords)
//     accounts({ error, data }) {
//         if (data) {
//             // STEP 1: Pehle data ko format karein (Owner Name handle karne ke liye)
//             let formattedData = data.map(rec => {
//                 return {
//                     ...rec,
//                     OwnerName: rec.Owner ? rec.Owner.Name : ''
//                 };
//             });

//             // STEP 2: CONDITION LAGANA (Filter)
//             // Example: Sirf wahi records jo kisi criteria ko match karein
//             let filteredData = formattedData.filter(item => {
//                 return item.NumberOfEmployees >= 100 || item.BillingCity === 'Jaipur';
//             });

//             // STEP 3: Tree structure banana
//             this.datas = this.buildTree(filteredData);
//         } else if (error) {
//             console.error('Error:', error);
//         }
//     }

//     buildTree(data) {
//         let map = {};
//         let mainData = [];

//         // Sabko map mein daalein
//         data.forEach(item => {
//             map[item.Id] = { ...item, _children: [] };
//         });

//         // Relationship establish karein
//         data.forEach(item => {
//             let currentItem = map[item.Id];
//             if (item.ParentId && map[item.ParentId]) {
//                 map[item.ParentId]._children.push(currentItem);
//             } else {
//                 mainData.push(currentItem);
//             }
//         });

//         // Recursive cleanup taaki empty children icons na dikhein
//         const cleanEmptyChildren = (node) => {
//             if (node._children && node._children.length === 0) {
//                 delete node._children;
//             } else if (node._children) {
//                 node._children.forEach(child => cleanEmptyChildren(child));
//             }
//         };

//         mainData.forEach(rootNode => cleanEmptyChildren(rootNode));
//         return mainData;
//     }
// }
// Is Code mein "Condition" kaha hai?
// JavaScript Filter: formattedData.filter(...) wala part asli condition hai.

// Logic: Agar aap koi aisa record filter kar dete hain jo kisi ka Parent hai, toh uske niche ke bacche (Children) automatic Root node ban jayenge kyunki unka map[item.ParentId] upar check karte waqt undefined milega.

// Tips for Condition-Based Tree:
// Apex vs JS: Agar aapke paas 10,000+ records hain, toh condition hamesha Apex (SOQL WHERE clause) mein lagayein.

// Parent Missing: Agar aap child ko filter mein rakhte hain lekin uske parent ko filter se nikal dete hain, toh tree-grid mein wo child ek "Root" (top-level) ki tarah dikhega.

// Kya aap chahte hain ki main isme ek Search Bar add karun jisse user dynamically filter kar sake?



// Dynamic way ka matlab hai ki aap LWC se filter ki value (condition) Apex ko bhejenge aur Apex wahi data filter karke layega. Isse performance behtar rehti hai kyunki hum sara data fetch nahi karte.

// Niche iska poora code hai:

// 1. Apex Controller (getRecordsImperative.cls)
// Isme humne ek String parameter liya hai jo filter ki tarah kaam karega. Humne Database.query ka use kiya hai taaki query flexible rahe.

// Apex
// public with sharing class getRecordsImperative {
//     @AuraEnabled(cacheable=true)
//     public static List<Account> getAccDynamic(String cityFilter, Integer minEmployees) {
//         // Dynamic SOQL query
//         String query = 'SELECT Id, Name, NumberOfEmployees, Phone, Owner.Name, BillingCity, ParentId FROM Account';
//         String whereClause = '';

//         if (String.isNotBlank(cityFilter)) {
//             whereClause += ' BillingCity = :cityFilter';
//         }

//         if (minEmployees != null) {
//             if (whereClause != '') whereClause += ' AND ';
//             whereClause += ' NumberOfEmployees >= :minEmployees';
//         }

//         if (whereClause != '') {
//             query += ' WHERE ' + whereClause;
//         }

//         query += ' ORDER BY Name';
//         return Database.query(query);
//     }
// }
// 2. LWC HTML File (dynamicTreeGrid.html)
// Yahan humne do inputs lagaye hain taaki user khud decide kare ki use kya filter karna hai.

// HTML
// <template>
//     <lightning-card title="Dynamic Condition Tree Grid" icon-name="standard:hierarchy">
//         <div class="slds-grid slds-gutters slds-p-around_medium">
//             <div class="slds-col">
//                 <lightning-input type="text" label="Enter City" onchange={handleCityChange}></lightning-input>
//             </div>
//             <div class="slds-col">
//                 <lightning-input type="number" label="Min Employees" onchange={handleEmpChange}></lightning-input>
//             </div>
//         </div>

//         <div class="slds-p-around_medium">
//             <lightning-tree-grid
//                 columns={columns}
//                 data={datas}
//                 key-field="Id"
//                 hide-checkbox-column>
//             </lightning-tree-grid>
//         </div>
//     </lightning-card>
// </template>
// 3. LWC JavaScript File (dynamicTreeGrid.js)
// Yahan @wire automatic trigger hoga jab bhi cityFilter ya minEmployees ki value badlegi.

// JavaScript
// import { LightningElement, wire, track } from 'lwc';
// import getAccDynamic from '@salesforce/apex/getRecordsImperative.getAccDynamic';

// export default class DynamicTreeGrid extends LightningElement {
//     @track cityFilter = '';
//     @track minEmployees = 0;
//     @track datas;

//     columns = [
//         { label: 'Name', fieldName: 'Name' },
//         { label: 'City', fieldName: 'BillingCity' },
//         { label: 'Employees', fieldName: 'NumberOfEmployees' }
//     ];

//     // Wire service with parameters
//     @wire(getAccDynamic, { cityFilter: '$cityFilter', minEmployees: '$minEmployees' })
//     wiredAccounts({ error, data }) {
//         if (data) {
//             this.datas = this.buildTree(data);
//         } else if (error) {
//             console.error(error);
//         }
//     }

//     handleCityChange(event) {
//         this.cityFilter = event.target.value;
//     }

//     handleEmpChange(event) {
//         this.minEmployees = event.target.value;
//     }

//     buildTree(data) {
//         let map = {};
//         let mainData = [];

//         // Map setup
//         data.forEach(item => {
//             map[item.Id] = { ...item, _children: [] };
//         });

//         // Hierarchy logic
//         data.forEach(item => {
//             let currentItem = map[item.Id];
//             if (item.ParentId && map[item.ParentId]) {
//                 map[item.ParentId]._children.push(currentItem);
//             } else {
//                 mainData.push(currentItem);
//             }
//         });

//         // Cleanup empty children
//         const clean = (node) => {
//             if (node._children && node._children.length === 0) {
//                 delete node._children;
//             } else if (node._children) {
//                 node._children.forEach(child => clean(child));
//             }
//         };

//         mainData.forEach(node => clean(node));
//         return mainData;
//     }
// }
// Iska Fayda:
// Reactivity: Jaise hi user input field mein kuch type karega, @wire parameters update honge aur Apex method apne aap call ho jayega (Lazy Search).

// Performance: Database level par hi filtering ho rahi hai, isliye browser par faltu data load nahi hoga.

// Flexibility: Aap koi bhi dynamic parameter (Stage, Date, Industry) Apex mein bhej kar tree-grid filter kar sakte hain.

// Kya aap chahte hain ki main isme ek "Export to CSV" ka button bhi add kar doon taaki filtered data download ho sake?