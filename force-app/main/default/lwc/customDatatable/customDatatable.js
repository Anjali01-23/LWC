import LightningDatatable from 'lightning/datatable';
import imageTemplate from './imageTemplate.html';
import picklistTemplate from './picklistTemplate.html';
import picklistEditTemplate from './picklistEditableTemplate.html';

export default class CustomDatatable extends LightningDatatable {
    static customTypes = {
        image: {
            template: imageTemplate,
            standardCellLayout: true,
            typeAttributes: ['url']
        },

         picklist: {
            template: picklistTemplate,
            standardCellLayout: true,
            editTemplate: picklistEditTemplate,
            typeAttributes: ['options', 'value', 'context']
        }
    };

//     handleChange(event) {
//     const value = event.detail.value;
//     const recordId = event.target.dataset.id;
//     console.log('Val',value);
//     // 🔥 parent ko event bhejo
//     this.dispatchEvent(
//         new CustomEvent('picklistchange', {
//             composed: true,
//             bubbles: true,
//             detail: {
//                 recordId,
//                 value
//             }
//         })
//     );
// }
}