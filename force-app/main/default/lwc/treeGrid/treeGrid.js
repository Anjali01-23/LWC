import { LightningElement ,wire} from 'lwc';
import getRecords from '@salesforce/apex/getRecordsImperative.getAcc';

export default class TreeGrid extends LightningElement {
    columns1 = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Employees', fieldName: 'NumberOfEmployees' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Owner Name', fieldName: 'OwnerName' },
        {label: 'Billing City', fieldName: 'BillingCity' },

    ];
    datas;
  @wire(getRecords)accounts({data}){
    if(data){
        this.datas=data.map(rec=>{
            return {
                ...rec,
                OwnerName:rec.Owner? rec.Owner.Name : '',
            }
        })    
        this.datas=this.buildTree(this.datas);
    }
  };
    
//   buildTree(data) {
//     let mainData = [];
//     let map = {};

//     // Step 1: Pehle saare records ko map mein daalein
//     data.forEach(item => {
//         // Hum har item ki ek copy banate hain aur usme empty _children array set karte hain
//         map[item.Id] = { ...item, _children: [] };
//     });

//     // Step 2: Ab parent-child relationship banayein
//     data.forEach(item => {
//         let currentItem = map[item.Id];
        
//         if (item.ParentId && map[item.ParentId]) {
//             // Agar ParentId hai, toh ise parent ke _children mein push karein
//             map[item.ParentId]._children.push(currentItem);
//         } else {
//             // Agar koi ParentId nahi hai, toh ye Root node hai
//             mainData.push(currentItem);
//         }
//     });

//     // Step 3: Cleanup - Jin items ke bacche nahi hain, unse _children hata dein (optional)
//     return mainData.map(node => {
//         if (node._children && node._children.length === 0) {
//             delete node._children;
//         }
//         return node;
//     });
// }
    


buildTree(data) {
    let map = {};
    let mainData = [];

    // Step 1: Sabko map mein daalein
    data.forEach(item => {
        map[item.Id] = { ...item, _children: [] };
    });

    // Step 2: Relationships banayein
    data.forEach(item => {
        let currentItem = map[item.Id];
        if (item.ParentId && map[item.ParentId]) {
            map[item.ParentId]._children.push(currentItem);
        } else {
            mainData.push(currentItem);
        }
    });

    // Step 3: Deep Cleanup Function (Yeh har level par check karega)
    const cleanEmptyChildren = (node) => {
        if (node._children && node._children.length === 0) {
            delete node._children; // Agar bacche nahi hain toh property hi hata do
        } else if (node._children) {
            // Agar bacche hain, toh unke andar bhi check karo (Recursion)
            node._children.forEach(child => cleanEmptyChildren(child));
        }
    };

    // Pura tree clean karein
    mainData.forEach(rootNode => cleanEmptyChildren(rootNode));

    return mainData;
}
}