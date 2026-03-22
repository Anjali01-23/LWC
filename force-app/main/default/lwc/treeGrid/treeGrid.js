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
    
  buildTree(data){
    let mainData=[];
    let map={};

    data.forEach(item=>{
        if(item.ParentId){
         if(map[item.ParentId]  ){
            if(!map[item.ParentId]._children){
                map[item.ParentId]._children=[];
            }
            map[item.ParentId]._children.push(map[item.Id]);
         }
        }
        else{
            mainData.push(map[item.Id]);
        }
    })

    return mainData;
  }

    
}