import { LightningElement } from 'lwc';
import fetchData from '@salesforce/apex/getRecordsImperative.getRecords';
import createData from '@salesforce/apex/getRecordsImperative.createRecords';
import { ShowToastEvent } from "lightning/platformShowToastEvent"; //Toast k liye import

import { NavigationMixin } from "lightning/navigation";//For Navigation
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils"; //For Default Values

export default class GetRecordImperative extends NavigationMixin(LightningElement) {
    accounts;

    recId;
    //Navigation function here when we click on a button this function get called and it will take us to this record page.
    openRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId:this.recId,
                objectApiName: 'Account',
                actionName: 'edit'
            }
        })
    }

    newRecord(){  //For getting default value we need to use  encode Default value
         let def= encodeDefaultFieldValues({
            Name:"JP Morgan"
         })
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            },
            state:{
                defaultFieldValues:def
            }
        })
    }

    handle(){
        let search=this.template.querySelector('.accountt').value;
        console.log(search);
        fetchData({searchName:search}).then(data=>{
          this.accounts=data;
        }).catch(error=>{
            console.log(error);
        })
        console.log(this.accounts);
    }

    createRecords(){
        let name=this.template.querySelector('.account1').value;
        let employees=this.template.querySelector('.account2').value;
        
        createData({name:name,NumEmployees:employees}).then(data=>{
          console.log(data);
          this.recId=data;
          this.dispatchEvent(new ShowToastEvent({  //Show toast here
              title: "Record Created Successfully",
              message: "Account Record Created  {0}",
              variant: "warning",
              messageData:[
                {
                    url:'/'+data,
                    label:name
                }
              ],
              mode:'pester'

          }));
        }).catch(error=>{
            console.log(error);
        })
    }
}

