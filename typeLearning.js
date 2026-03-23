// Great 🔥 ab hum datatable ke type: 'action' (row actions) ko properly samajhte hain — ye exam + project dono ke liye important hai 💯

// 🔥 🎯 type: 'action' kya hota hai?

// 👉 Datatable me last column me:
// ➡️ 3 dots (⋮) aate hain
// ➡️ usme dropdown options milte hain

// 👉 jaise:

// Edit
// Delete
// View
// 🔥 1. Basic Syntax
// {
//     type: 'action',
//     typeAttributes: {
//         rowActions: actions
//     }
// }
// 🔥 2. Actions define karo
// actions = [
//     { label: 'View', name: 'view' },
//     { label: 'Edit', name: 'edit' },
//     { label: 'Delete', name: 'delete' }
// ];
// 🔥 3. Datatable me column add karo
// columns = [
//     { label: 'Name', fieldName: 'Name' },

//     {
//         type: 'action',
//         typeAttributes: { rowActions: this.actions }
//     }
// ];
// 🔥 4. Event handle karo (MOST IMPORTANT)
// <lightning-datatable
//     data={data1}
//     columns={columns}
//     key-field="Id"
//     onrowaction={handleRowAction}>
// </lightning-datatable>
// 🔥 5. JS me handle karo
// handleRowAction(event) {
//     const actionName = event.detail.action.name;
//     const row = event.detail.row;

//     switch (actionName) {
//         case 'view':
//             console.log('View', row.Id);
//             break;

//         case 'edit':
//             console.log('Edit', row.Id);
//             break;

//         case 'delete':
//             console.log('Delete', row.Id);
//             break;
//     }
// }
// 🔥 6. Real use cases (IMPORTANT)
// 👉 View
// window.open('/' + row.Id);
// 👉 Edit (modal open)
// this.recordId = row.Id;
// this.isEditModal = true;
// 👉 Delete
// import { deleteRecord } from 'lightning/uiRecordApi';

// deleteRecord(row.Id)
// .then(() => {
//     this.refreshTable();
// });
// 🔥 7. Dynamic Actions (ADVANCED 🔥)

// 👉 har row ke hisab se actions change kar sakte ho

// typeAttributes: {
//     rowActions: this.getRowActions
// }
// getRowActions(row, doneCallback) {
//     const actions = [];

//     if (row.StageName === 'Closed Won') {
//         actions.push({ label: 'View', name: 'view' });
//     } else {
//         actions.push({ label: 'Edit', name: 'edit' });
//     }

//     doneCallback(actions);
// }
// 🔥 8. Custom Actions (tum bana sakti ho)

// 👉 kuch examples:

// Approve
// Reject
// Clone
// Mark Complete
// Send Email
// { label: 'Clone', name: 'clone' }
// 🎯 Final Actions List
// Action	Use
// view	open record
// edit	open modal
// delete	delete record
// clone	duplicate
// custom	business logic
// ⚠️ Common mistakes

// ❌ onrowaction lagana bhool jana
// ❌ action name match na karna
// ❌ row.Id use na karna

// 🧠 Interview Line

// Row actions in lightning-datatable allow us to perform record-specific operations like edit, delete, or custom actions using a dropdown menu.

// 🚀 Tumhare project ke liye BEST combo

// 👉 implement ye karo:

// View
// Edit (modal)
// Delete (LDS)
// Clone (bonus 🔥)

// Agar chaho to next mai tumhe:
// 👉 row action + modal + LDS full working flow
// 👉 ya bulk actions (multiple rows delete)

// bhi sikha du 😄

// ni type:button krke ese bhi to hote h na

// Bilkul 🔥 tumne sahi pakda —
// 👉 type: 'button' bhi hota hai aur kaafi useful hota hai 💯

// Chalo clear karte hain 👇

// 🔥 🎯 type: 'button' kya hota hai?

// 👉 Datatable me:
// ➡️ har row me direct button show hota hai (no dropdown)

// 👉 Example:

// View button
// Edit button
// Approve button
// 🔥 1. Basic Syntax
// {
//     type: 'button',
//     typeAttributes: {
//         label: 'View',
//         name: 'view',
//         variant: 'brand'
//     }
// }
// 🔥 2. Full Column Example
// columns = [
//     { label: 'Name', fieldName: 'Name' },

//     {
//         label: 'Action',
//         type: 'button',
//         typeAttributes: {
//             label: 'Edit',
//             name: 'edit',
//             variant: 'brand'
//         }
//     }
// ];
// 🔥 3. Handle click (IMPORTANT)

// 👉 same event use hota hai:

// <lightning-datatable
//     data={data1}
//     columns={columns}
//     key-field="Id"
//     onrowaction={handleRowAction}>
// </lightning-datatable>
// 🔥 4. JS handle
// handleRowAction(event) {
//     const actionName = event.detail.action.name;
//     const row = event.detail.row;

//     if (actionName === 'edit') {
//         console.log('Edit', row.Id);
//     }
// }
// 🔥 5. Dynamic Label (advanced)
// typeAttributes: {
//     label: { fieldName: 'buttonLabel' },
//     name: 'action'
// }

// 👉 data me:

// buttonLabel: 'Approve'
// 🔥 6. Button Variants
// Variant	Look
// brand	blue
// neutral	grey
// destructive	red
// success	green
// variant: 'destructive'
// 🔥 7. Button Icon (🔥 bonus)
// type: 'button-icon',
// typeAttributes: {
//     iconName: 'utility:edit',
//     name: 'edit',
//     variant: 'border-filled'
// }
// 🔥 8. type: button vs type: action
// Feature	button	action
// UI	visible button	3 dots menu
// actions	1 per column	multiple
// UX	quick click	dropdown
// 🎯 Best use cases
// 👉 type: button
// Edit
// View
// Approve
// 👉 type: action
// multiple actions
// less clutter UI
// 💥 Example (combo use 🔥)
// columns = [
//     { label: 'Name', fieldName: 'Name' },

//     {
//         type: 'button',
//         typeAttributes: {
//             label: 'View',
//             name: 'view',
//             variant: 'brand'
//         }
//     },

//     {
//         type: 'action',
//         typeAttributes: { rowActions: this.actions }
//     }
// ];
// 🧠 Interview line

// type: 'button' is used to display a direct action button in each row, while type: 'action' provides multiple actions in a dropdown menu.

// 🚀 Tumhare project ke liye best

// 👉 use karo:

// 🔵 View button
// ✏️ Edit (modal)
// 🗑️ Delete (action menu)

// 👉 clean + professional UI 💯

// Agar chaho to next mai tumhe:
// 👉 button + modal + LDS full flow (real working)
// 👉 ya conditional button (disable/hide)

// bhi sikha du 😄

// type url and type button icon bhi dena 

// Perfect 🔥 ab hum datatable ke type: 'url' aur type: 'button-icon' dono ko properly samajhte hain — syntax + real use 💯

// 🔥 🎯 1. type: 'url'

// 👉 Use: clickable link banane ke liye

// ✅ Basic Syntax
// {
//     label: 'Website',
//     fieldName: 'websiteUrl',
//     type: 'url'
// }
// 🔥 Advanced (MOST USED 🔥)

// 👉 Tumhare case jaisa (Opportunity link)

// {
//     label: 'Name',
//     fieldName: 'opportunityLink',
//     type: 'url',
//     typeAttributes: {
//         label: { fieldName: 'Name' },   // 👈 display text
//         target: '_blank'                // 👈 new tab
//     }
// }
// 🔥 Data prepare karna
// this.data1 = data.map(rec => {
//     return {
//         ...rec,
//         opportunityLink: '/' + rec.Id   // 👈 link banaya
//     };
// });
// 🎯 Result

// 👉 UI:

// text → Name
// click → record open
// ⚠️ Important

// ❌ editable nahi hota
// ❌ sirf display ke liye

// 🔥 🎯 2. type: 'button-icon'

// 👉 Use: icon button (edit/delete icon)

// ✅ Basic Syntax
// {
//     type: 'button-icon',
//     typeAttributes: {
//         iconName: 'utility:edit',
//         name: 'edit',
//         variant: 'border-filled'
//     }
// }
// 🔥 Common Icons
// Action	iconName
// Edit	utility:edit
// Delete	utility:delete
// View	utility:preview
// Clone	utility:copy
// 🔥 Full Example
// columns = [
//     { label: 'Name', fieldName: 'Name' },

//     {
//         type: 'button-icon',
//         typeAttributes: {
//             iconName: 'utility:edit',
//             name: 'edit',
//             title: 'Edit',
//             variant: 'border-filled'
//         }
//     }
// ];
// 🔥 Handle click
// handleRowAction(event) {
//     const actionName = event.detail.action.name;
//     const row = event.detail.row;

//     if (actionName === 'edit') {
//         console.log('Edit', row.Id);
//     }
// }
// 🔥 🎯 Bonus (dynamic icon)
// typeAttributes: {
//     iconName: { fieldName: 'iconName' },
//     name: 'action'
// }

// 👉 data me:

// iconName: 'utility:check'
// 🔥 🎯 Comparison
// Type	Use	Editable
// url	link	❌
// button	text button	❌
// button-icon	icon button	❌
// action	dropdown menu	❌
// 💥 🔥 Best Combo (tumhare project ke liye)
// columns = [
//     {
//         label: 'Name',
//         fieldName: 'opportunityLink',
//         type: 'url',
//         typeAttributes: {
//             label: { fieldName: 'Name' },
//             target: '_blank'
//         }
//     },

//     {
//         type: 'button-icon',
//         typeAttributes: {
//             iconName: 'utility:edit',
//             name: 'edit',
//             title: 'Edit'
//         }
//     },

//     {
//         type: 'button-icon',
//         typeAttributes: {
//             iconName: 'utility:delete',
//             name: 'delete',
//             title: 'Delete'
//         }
//     }
// ];
// 🧠 Interview Line

// type 'url' is used to display clickable links, while type 'button-icon' is used to render icon-based actions for each row.

// 🚀 Pro Tip

// 👉 use karo:

// 🔗 url → navigation
// ✏️ edit icon → quick action
// 🗑️ delete icon → fast delete

// 👉 clean + modern UI 💯

// Agar chaho to next mai tumhe:
// 👉 icon + tooltip + conditional disable (advanced UI)
// 👉 ya custom styling in datatable

// bhi sikha du 😄

// and aur kon konse hote h ese type

// Great 🔥 ab tum full datatable mastery mode me aa gayi ho 😄
// Chalo ab main tumhe ALL important type list + kya kaam aate hain de deti hoon — exam + project dono ke liye 💯

// 🔥 🎯 ALL Datatable Types (LWC)
// ✅ 1. text (default)

// 👉 normal text

// { label: 'Name', fieldName: 'Name' }

// ✔️ editable ✅

// ✅ 2. number
// { label: 'Amount', fieldName: 'Amount', type: 'number' }

// ✔️ numeric formatting
// ✔️ editable ✅

// ✅ 3. currency
// {
//   label: 'Amount',
//   fieldName: 'Amount',
//   type: 'currency',
//   typeAttributes: { currencyCode: 'USD' }
// }

// ✔️ ₹ / $ format

// ✅ 4. percent
// { label: 'Probability', fieldName: 'Probability', type: 'percent' }

// ✔️ % format

// ✅ 5. date
// { label: 'Close Date', fieldName: 'CloseDate', type: 'date' }

// ✔️ date format

// ✅ 6. date-local

// 👉 timezone ignore karta hai

// { label: 'Date', fieldName: 'CreatedDate', type: 'date-local' }
// ✅ 7. boolean
// { label: 'Closed', fieldName: 'IsClosed', type: 'boolean' }

// ✔️ checkbox UI

// ✅ 8. email
// { label: 'Email', fieldName: 'Email', type: 'email' }

// ✔️ clickable mail

// ✅ 9. phone
// { label: 'Phone', fieldName: 'Phone', type: 'phone' }

// ✔️ clickable

// ✅ 10. url 🔥

// 👉 already discussed

// ✅ 11. button 🔥

// 👉 text button

// ✅ 12. button-icon 🔥

// 👉 icon button

// ✅ 13. action 🔥

// 👉 dropdown (⋮)

// ✅ 14. location
// {
//   label: 'Location',
//   fieldName: 'Location',
//   type: 'location'
// }

// 👉 lat-long

// ✅ 15. richText
// {
//   label: 'Description',
//   fieldName: 'Description',
//   type: 'richText'
// }

// 👉 formatted HTML

// ✅ 16. custom 🔥🔥 (ADVANCED)

// 👉 tum khud bana sakti ho

// Examples:

// picklist dropdown
// lookup field
// link + edit combo
// 🎯 SUMMARY TABLE
// Type	Use	Editable
// text	normal	✅
// number	numeric	✅
// currency	money	✅
// percent	%	✅
// date	date	✅
// boolean	checkbox	❌
// email	mail link	❌
// phone	call link	❌
// url	link	❌
// button	button	❌
// button-icon	icon	❌
// action	dropdown	❌
// richText	HTML	❌
// custom	advanced	🔥
// 🔥 💥 MOST IMPORTANT (exam focus)

// 👉 tumhe ye types definitely use karne chahiye:

// text
// number
// date
// url
// button
// button-icon
// action
// custom (bonus 🔥)
// 🚀 BEST PROJECT COMBO (tumhare liye)

// 👉 tum ye implement karo:

// ✔️ Name → url
// ✔️ Amount → currency
// ✔️ CloseDate → date
// ✔️ Stage → text/picklist
// ✔️ Edit → button-icon
// ✔️ Delete → button-icon
// ✔️ More → action

// 🧠 Interview line

// Lightning datatable supports multiple column types like text, number, date, currency, url, button, and custom types to enhance UI and functionality.

// 🔥 Pro Tip

// 👉 sab types ek saath use karogi:
// 👉 🔥 project standout ho jayega


// 🔥 🎯 Utility Icons (MOST IMPORTANT LIST)

// 👉 Syntax yaad rakhna:

// <lightning-icon icon-name="utility:edit"></lightning-icon>
// 🔥 ✅ 1. Basic Actions Icons
// Icon	Use
// utility:add	➕ add / new
// utility:edit	✏️ edit
// utility:delete	🗑️ delete
// utility:close	❌ close
// utility:check	✅ success
// utility:save	💾 save
// 🔥 ✅ 2. Navigation / UI Icons
// Icon	Use
// utility:back	⬅️ back
// utility:forward	➡️ next
// utility:refresh	🔄 refresh
// utility:home	🏠 home
// 🔥 ✅ 3. Datatable / Action Icons
// Icon	Use
// utility:preview	👁️ view
// utility:download	⬇️ download
// utility:upload	⬆️ upload
// utility:copy	📄 clone
// utility:settings	⚙️ settings
// 🔥 ✅ 4. Status Icons
// Icon	Use
// utility:success	✅ success
// utility:error	❌ error
// utility:warning	⚠️ warning
// utility:info	ℹ️ info
// 🔥 ✅ 5. Search & Filter Icons
// Icon	Use
// utility:search	🔍 search
// utility:filterList	filter
// utility:sort	sorting
// 🔥 ✅ 6. Communication Icons
// Icon	Use
// utility:email	email
// utility:call	phone
// utility:chat	message
// 🔥 🎯 Datatable me use kaise karte hain
// 👉 Button Icon Column
// {
//     type: 'button-icon',
//     typeAttributes: {
//         iconName: 'utility:edit',
//         name: 'edit',
//         title: 'Edit'
//     }
// }
// 👉 Cell me icon show karna
// {
//     label: 'Status',
//     fieldName: 'Status__c',
//     cellAttributes: {
//         iconName: 'utility:check'
//     }
// }
// 🔥 🎯 Conditional Icon (ADVANCED 🔥)
// {
//     label: 'Status',
//     fieldName: 'Status__c',
//     cellAttributes: {
//         iconName: { fieldName: 'iconName' }
//     }
// }

// 👉 data me:

// iconName: 'utility:success'
// 🔥 🎯 Most Important (Paper ke liye yaad rakhna)

// 👉 ye 10 pakka yaad rakho:

// utility:add
// utility:edit
// utility:delete
// utility:close
// utility:check
// utility:refresh
// utility:preview
// utility:search
// utility:warning
// utility:error
// 🧠 Interview Line

// Utility icons are used to visually represent actions and statuses in Lightning components, improving user experience and clarity.

// 🚀 Pro Tip

// 👉 Tum apne project me ye use karo:

// ➕ Add button
// ✏️ Edit icon
// 🗑️ Delete icon
// 🔄 Refresh button
// 👁️ View icon

// 👉 🔥 UI professional lagne lagega