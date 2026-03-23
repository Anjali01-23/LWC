// 🔹 NavigationMixin kya hota hai?

// NavigationMixin ek helper hai jo use hota hai:

// 👉 Salesforce me page navigate karne ke liye (without page reload)

// 🔹 Kaha use hota hai?

// Jab tumhe kisi button click pe navigate karna ho:

// ✅ Common use cases:
// Record page open karna
// New record create page open karna
// Edit page open karna
// List view open karna
// Custom tab / component open karna
// External URL open karna
// 🔹 Import ka syntax
// import { NavigationMixin } from 'lightning/navigation';
// 🔹 Class me use kaise kare
// export default class MyComponent extends NavigationMixin(LightningElement) {

// 👉 Important:
// extends LightningElement ki jagah likhna hai
// ➡️ extends NavigationMixin(LightningElement)

// 🔹 Basic Syntax
// this[NavigationMixin.Navigate]({
//     type: 'standard__recordPage',
//     attributes: {
//         recordId: '001XXXXXXXXXXXX',
//         objectApiName: 'Account',
//         actionName: 'view'
//     }
// });
// 🔥 Ab sab important use cases ek ek karke 👇
// 1️⃣ Record Page Open (View Mode)
// handleView() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__recordPage',
//         attributes: {
//             recordId: '001XXXXXXXXXXXX',
//             objectApiName: 'Account',
//             actionName: 'view'
//         }
//     });
// }

// 👉 actionName:

// view
// edit
// clone
// 2️⃣ New Record Page
// handleNew() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__objectPage',
//         attributes: {
//             objectApiName: 'Account',
//             actionName: 'new'
//         }
//     });
// }
// 3️⃣ Edit Record Page
// handleEdit() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__recordPage',
//         attributes: {
//             recordId: '001XXXXXXXXXXXX',
//             objectApiName: 'Account',
//             actionName: 'edit'
//         }
//     });
// }
// 4️⃣ List View Open
// handleListView() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__objectPage',
//         attributes: {
//             objectApiName: 'Account',
//             actionName: 'list'
//         },
//         state: {
//             filterName: 'Recent'
//         }
//     });
// }

// 👉 filterName examples:

// Recent
// AllAccounts
// MyAccounts
// 5️⃣ Custom Tab / Nav Item Open
// handleTab() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__navItemPage',
//         attributes: {
//             apiName: 'My_Custom_Tab'
//         }
//     });
// }
// 6️⃣ External URL Open
// handleUrl() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__webPage',
//         attributes: {
//             url: 'https://www.google.com'
//         }
//     });
// }
// 🔥 BONUS (VERY IMPORTANT 🔥)
// 👉 Generate URL (without navigation)
// this[NavigationMixin.GenerateUrl](config)
//     .then(url => {
//         console.log(url);
//     });

// 👉 Use case:

// hyperlink banana
// new tab me open karna
// 🧠 Quick Summary (Interview ke liye 💯)

// 👉 NavigationMixin use hota hai:

// Salesforce pages me navigate karne ke liye
// SPA behavior maintain karta hai (no reload)

// 👉 Key cheeze:

// import NavigationMixin
// extend NavigationMixin(LightningElement)
// use this[NavigationMixin.Navigate]
// ⚡ Real-life example (button click)
// <lightning-button label="Open Account" onclick={handleClick}></lightning-button>
// handleClick() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__recordPage',
//         attributes: {
//             recordId: this.recordId,
//             objectApiName: 'Account',
//             actionName: 'view'
//         }
//     });
// }

// Agar tum chaho to main tumhe:
// 👉 datatable me row click → navigation
// 👉 toast + navigation combo
// 👉 Flow / LWC integration navigation

// bhi step-by-step sikha deta hu 🚀

// record page and object page m diff and kon konse ction kra skti hu and lista ko ko kon se filter de skti hu

// Perfect 👌 — ye concept NavigationMixin ka core hai, interview me bhi pakka puchte hain.
// Chalo simple + clear tareeke se samjhte hain 👇

// 🔹 1. Record Page vs Object Page (Difference)
// ✅ 🔸 Record Page

// 👉 Ek specific record open karta hai

// Example:

// Account → “TCS Ltd” record
// Opportunity → “Deal #123”
// 🔹 Syntax type:
// type: 'standard__recordPage'
// 🔹 Required attributes:
// recordId ✅
// objectApiName (optional but recommended)
// actionName
// ✅ 🔸 Object Page

// 👉 Poore object ke level pe kaam karta hai

// Example:

// All Accounts list
// New Account create page
// 🔹 Syntax type:
// type: 'standard__objectPage'
// 🔹 Required attributes:
// objectApiName ✅
// actionName
// ⚡ Difference ek line me:

// 👉 Record Page = ek record
// 👉 Object Page = poora object (list / new)

// 🔥 2. Record Page me kaun kaun se actions?
// actionName:
// ✅ Allowed:
// view 👉 record open
// edit 👉 edit form
// clone 👉 clone record
// 🔹 Example:
// this[NavigationMixin.Navigate]({
//     type: 'standard__recordPage',
//     attributes: {
//         recordId: '001XXXXXXXX',
//         objectApiName: 'Account',
//         actionName: 'edit'
//     }
// });
// 🔥 3. Object Page me kaun kaun se actions?
// actionName:
// ✅ Allowed:
// list 👉 list view
// new 👉 new record create
// 🔹 Example:
// this[NavigationMixin.Navigate]({
//     type: 'standard__objectPage',
//     attributes: {
//         objectApiName: 'Account',
//         actionName: 'new'
//     }
// });
// 🔥 4. List View Filters (VERY IMPORTANT 🔥)

// 👉 Jab tum list use karte ho, tab tum filter apply kar sakte ho

// state: {
//     filterName: '...'
// }
// ✅ Common Filters:
// Filter Name	Meaning
// Recent	Recently viewed
// AllAccounts	All records
// MyAccounts	Sirf current user ke
// MyOpportunities	My Opportunities
// AllOpportunities	All Opportunities
// 🔹 Example:
// this[NavigationMixin.Navigate]({
//     type: 'standard__objectPage',
//     attributes: {
//         objectApiName: 'Opportunity',
//         actionName: 'list'
//     },
//     state: {
//         filterName: 'MyOpportunities'
//     }
// });
// 🔥 ⚠️ Important Tip (Interview Trick)

// 👉 filterName kya hoga ye depend karta hai:

// Standard list view name
// Ya custom list view API name
// 🔹 Custom List View kaise use kare?
// state: {
//     filterName: '00BXXXXXXXXXXXX'
// }

// 👉 Ye hota hai List View ID

// 🧠 Final Summary (Shortcut yaad rakhne ke liye)
// 🔹 Record Page:
// type → standard__recordPage
// actions → view, edit, clone
// needs → recordId
// 🔹 Object Page:
// type → standard__objectPage
// actions → list, new
// needs → objectApiName
// 🔹 List Filters:
// Recent
// AllAccounts
// MyAccounts
// ya custom list view ID

// Agar tum chaho next step me main tumhe:
// 👉 datatable row click → record open (real scenario)
// 👉 dynamic navigation (recordId runtime pe)
// 👉 navigation after record create (toast + redirect)

// ye sab real project wale examples sikha deta hu 🚀

// handleTab() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__navItemPage',
//         attributes: {
//             apiName: 'My_Custom_Tab'
//         }
//     });
// }
// 6️⃣ External URL Open
// handleUrl() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__webPage',
//         attributes: {
//             url: 'https://www.google.com'
//         }
//     });
// }e dono batana and ye bi this[NavigationMixin.GenerateUrl](config)
//     .then(url => {
//         console.log(url);
//     });

// 👉 Use case: ands clone in record page clone 👉 clone record and ye bhi state: {
//     filterName: '00BXXXXXXXXXXXX'
// }

// Great 👍 — ab tum advanced NavigationMixin level pe aa gaye ho. Chalo ek ek cheez clear + real use case + interview ready tareeke se samjhte hain 👇

// 🔥 1. standard__navItemPage (Custom Tab open)
// 👉 Ye kab use hota hai?

// Jab tumhe:

// Custom tab open karna ho
// Lightning app ka koi nav item open karna ho
// ✅ Syntax:
// handleTab() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__navItemPage',
//         attributes: {
//             apiName: 'My_Custom_Tab'
//         }
//     });
// }
// 🧠 Important:

// 👉 apiName = Tab ka Developer Name

// 🔍 Kaha milega?

// Setup → Tabs → Custom Tab → Developer Name

// 🎯 Real Use Case:

// 👉 Tumne ek LWC ko tab me expose kiya hai
// 👉 Button click → direct us tab pe le jana

// 🔥 2. standard__webPage (External URL open)
// 👉 Kab use hota hai?
// External website open karna
// Salesforce ke bahar redirect
// ✅ Syntax:
// handleUrl() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__webPage',
//         attributes: {
//             url: 'https://www.google.com'
//         }
//     });
// }
// 🎯 Real Use Case:
// Help page open
// Documentation link
// Payment gateway redirect
// ⚠️ Important:

// 👉 Ye same tab me open hota hai
// 👉 Agar new tab chahiye → use GenerateUrl

// 🔥 3. GenerateUrl (VERY IMPORTANT 🔥)
// 👉 Ye kya karta hai?

// 👉 Navigation nahi karta
// 👉 Sirf URL generate karta hai

// ✅ Syntax:
// this[NavigationMixin.GenerateUrl]({
//     type: 'standard__recordPage',
//     attributes: {
//         recordId: '001XXXXXXXX',
//         objectApiName: 'Account',
//         actionName: 'view'
//     }
// }).then(url => {
//     console.log(url);
// });
// 🎯 Use Cases:
// ✅ 1. New tab me open karna
// this[NavigationMixin.GenerateUrl](config).then(url => {
//     window.open(url, '_blank');
// });
// ✅ 2. Anchor tag (link banana)
// <a href={generatedUrl}>Open Record</a>
// ✅ 3. Datatable me clickable link banana
// 🧠 Difference yaad rakh:
// Method	Work
// Navigate	direct redirect
// GenerateUrl	URL banata hai
// 🔥 4. Clone Record (Record Page ka action)
// 👉 Ye kya karta hai?

// 👉 Existing record ka copy bana deta hai

// ✅ Syntax:
// handleClone() {
//     this[NavigationMixin.Navigate]({
//         type: 'standard__recordPage',
//         attributes: {
//             recordId: '001XXXXXXXX',
//             objectApiName: 'Account',
//             actionName: 'clone'
//         }
//     });
// }
// 🎯 Real Use Case:
// Same data ke saath new record banana
// Opportunity duplicate karna
// ⚠️ Important:

// 👉 Ye pre-filled form open karta hai
// 👉 Save karne pe new record create hota hai

// 🔥 5. state: { filterName } (Custom List View)
// 👉 Ye kya karta hai?

// 👉 Specific list view open karata hai

// ✅ Syntax:
// state: {
//     filterName: '00BXXXXXXXXXXXX'
// }
// 🧠 Ye kya hai?

// 👉 Ye hai List View ID

// 🔍 Kaha milega?

// 👉 Jab tum list view open karte ho URL me:

// .../lightning/o/Account/list?filterName=00BXXXXXXXXXXXX

// 👉 wahi ID use karni hai

// 🎯 Example:
// this[NavigationMixin.Navigate]({
//     type: 'standard__objectPage',
//     attributes: {
//         objectApiName: 'Account',
//         actionName: 'list'
//     },
//     state: {
//         filterName: '00BXXXXXXXXXXXX'
//     }
// });
// ✅ Alternate (Name se bhi)
// state: {
//     filterName: 'AllAccounts'
// }
// 🧠 FINAL REVISION (💯)
// 🔹 navItemPage

// 👉 Custom tab open
// 👉 apiName

// 🔹 webPage

// 👉 External URL
// 👉 same tab open

// 🔹 GenerateUrl

// 👉 URL generate
// 👉 new tab / link use

// 🔹 Clone

// 👉 record copy form
// 👉 actionName = clone

// 🔹 filterName

// 👉 list view control
// 👉 name ya ID dono chalti hai

// Agar tum next level jana chahte ho 🔥
// main tumhe sikha sakta hu:

// 👉 datatable me clickable record link (NavigationMixin + typeAttributes)
// 👉 toast + navigation after save (real project use case)
// 👉 dynamic navigation (runtime recordId)

// bas bol dena 🚀

// isme developer name konsa h

// Good question 👍

// 👉 Salesforce me Developer Name = Tab Name (API Name) hota hai.

// 📌 Tumhare screenshot me:
// Tab Label: Platform Event
// Tab Name (Developer Name): Platform_Event ✅
// 🧠 Final Answer:

// 👉 Developer Name = Platform_Event

// 🔥 NavigationMixin me kaise use karoge?
// this[NavigationMixin.Navigate]({
//     type: 'standard__navItemPage',
//     attributes: {
//         apiName: 'Platform_Event'
//     }
// });
// ⚠️ Yaad rakhna:
// UI me jo dikhta hai → Label
// Code me jo use hota hai → Developer Name / API Name

// Agar tum chaho to main tumhe next step me ye bhi sikha sakta hu:
// 👉 “LWC tab create → expose → navigation end-to-end” 🚀

// this[NavigationMixin.GenerateUrl]({
//     type: 'standard__recordPage',
//     attributes: {
//         recordId: '001XXXXXXXX',
//         objectApiName: 'Account',
//         actionName: 'view'
//     }
// }).then(url => {
//     console.log(url);
// }); isse jo url genertaa hua use use kse kre

// Great 👍 — ab tum GenerateUrl ka real use samajhne wale ho (ye interview + project dono me kaam aata hai).

// Tumne sahi code likha hai 👇
// Ab question hai: generated URL ka use kaise kare?

// 🔥 1. URL ko store karo (IMPORTANT)

// Pehle URL ko ek variable me store karna padega:

// generatedUrl;

// connectedCallback() {
//     this[NavigationMixin.GenerateUrl]({
//         type: 'standard__recordPage',
//         attributes: {
//             recordId: '001XXXXXXXX',
//             objectApiName: 'Account',
//             actionName: 'view'
//         }
//     }).then(url => {
//         this.generatedUrl = url;
//     });
// }
// 🔥 2. HTML me use karo (Link banane ke liye)
// <a href={generatedUrl} target="_blank">Open Record</a>

// 👉 Result:

// Click → record open
// target="_blank" → new tab me open
// 🔥 3. Button click pe new tab open
// handleClick() {
//     this[NavigationMixin.GenerateUrl](config).then(url => {
//         window.open(url, '_blank');
//     });
// }
// 🔥 4. Datatable me use (REAL PROJECT 🔥)

// 👉 Sabse common use yahi hota hai

// columns = [
//     {
//         label: 'Account Name',
//         fieldName: 'recordLink',
//         type: 'url',
//         typeAttributes: {
//             label: { fieldName: 'Name' },
//             target: '_blank'
//         }
//     }
// ];
// Data prepare karte waqt:
// this.data = result.map(row => {
//     return {
//         ...row,
//         recordLink: `/lightning/r/Account/${row.Id}/view`
//     };
// });

// 👉 Ya phir GenerateUrl bhi use kar sakte ho (dynamic org-safe way)

// 🔥 5. Navigate vs GenerateUrl (clear difference)
// Case	Kya use kare
// Direct redirect	Navigate
// Link banana	GenerateUrl
// New tab open	GenerateUrl
// Datatable link	GenerateUrl
// 🔥 6. Best Practice (Interview 🔥)

// 👉 Direct URL hardcode mat karo:

// ❌ Wrong:

// /lightning/r/Account/Id/view

// ✅ Correct:

// NavigationMixin.GenerateUrl

// 👉 Kyunki:

// Different org / domain me kaam karega
// Safe + recommended
// 🧠 Final samajh lo (one line):

// 👉 GenerateUrl = URL banata hai → tum decide karte ho usko kaise use karna hai

// Agar tum chaho next step me main tumhe sikha sakta hu:
// 👉 datatable me fully dynamic clickable links (GenerateUrl + async mapping)
// 👉 multiple records ke liye bulk URL generation

// ye thoda advanced hai but bahut useful 🚀