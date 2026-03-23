/*<template>
    <lightning-card>


        <div class="slds-text-align_right">
            <lightning-button label="New" onclick={handleClick} class="slds-m-left_x-small"></lightning-button>
        </div>
        <div class="slds-grid slds-wrap">
            <div class="slds-col slds-size_12-of-12 slds-p-around_medium">
                <p class="slds-align_absolute-center">Filters</p>
            </div>
            <div class="slds-col slds-size_6-of-12 slds-p-around_medium">
                <lightning-combobox name="type" label="Type Of Document" value={value} placeholder="Select Property"
                    options={options} onchange={handleChange} class="type"></lightning-combobox>
            </div>
            <div class="slds-col slds-size_6-of-12 slds-p-around_medium">
                <lightning-combobox name="valid" label="Valid" value={valueValid} placeholder="Select Property"
                    options={optionsValid} onchange={handleChangeValid} class="valid"></lightning-combobox>
            </div>
            <div class="slds-col slds-size_12-of-12 slds-p-around_medium">



                <lightning-accordion allow-multiple-sections-open >
                    <template for:each={data} for:item="menuItem">
                        <lightning-accordion-section key={menuItem.year} name={menuItem.year} label={menuItem.year}>
                            <lightning-datatable 
                            key-field="Id"
                            data={menuItem.documents}
                            columns={columns} 
                            hide-checkbox-column
                            onrowaction={callRowAction}
                            show-row-number-column
                            default-sort-direction={defaultSortDirection}
                            sorted-direction={sortDirection}
                            sorted-by={sortBy}
                            onsort={onHandleSort}>
                            </lightning-datatable>

                        </lightning-accordion-section>
                    </template>



                </lightning-accordion>

            </div>
        </div>

    </lightning-card>
</template>


import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getValidFromYears from '@salesforce/apex/getRecords.getValidFromYears';
const columns = [
    { label: 'Title', fieldName: 'Document_Name__c'},
    { label: 'Valid From', fieldName: 'Valid_From__c', sortable: "true"},
    { label: 'Valid To', fieldName: 'Valid_To__c', sortable: "true"},
    { label: 'Document Type', fieldName: 'Document_Type__c'},
    { label: 'Valid', fieldName: 'Active__c'},
    {
        type: "button", label: 'View', initialWidth: 100, typeAttributes: {
            
            name: 'View',
            title: 'View',
            disabled: false,
            value: 'view',
            iconPosition: 'left',
            iconName:'utility:preview',
            variant:'Neutral'
        }
    },
]
export default class DocumentPP1 extends NavigationMixin(LightningElement) {
    value;
    valueValid;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection;
    sortBy;
    
    data = [];
    loadData(){
        getValidFromYears({DocumentType: this.value, Valid: this.valueValid}).then(result =>{
            console.log(result);
            const groupByYear = result.reduce((acc, doc) => {
                const y = new Date(doc.Valid_From__c).getFullYear();

                if(!acc[y]){
                    acc[y] = [];
                }

                acc[y].push(doc);
                return acc;
            },{});
            console.log(groupByYear);
            this.data = Object.keys(groupByYear).map(year => ({
                year: year,
                documents: groupByYear[year]
            }));
            console.log(this.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    connectedCallback(){
        this.loadData();
    }
    get options() {
        return [
            { label: 'Identity Proof', value: 'Identity Proof' },
            { label: 'Address Proof', value: 'Address Proof' },
            { label: 'Education Proof', value: 'Education Proof' },
        ];
    }

    get optionsValid() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        //this.valueValid = this.template.querySelector('.valid').value;
        //console.log("Change Kr di valid");
        this.loadData();
    }

    handleChangeValid(event) {
        //this.value = this.template.querySelector('.type').value;
        this.valueValid = event.detail.value;
        //console.log("Change Kr di valid");
        this.loadData();
    }

    handleClick(){
        this[NavigationMixin.Navigate]({
                type: "standard__objectPage",
                attributes: {
                    objectApiName: "Document__c",
                    actionName: "new",
                },});
    }

    callRowAction(event) {
        const recId = event.detail.row.Id;
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recId,
                objectApiName: "Document__c",
                actionName: "edit"
            }
        })
    }

    onHandleSort(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }
}


<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>66.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>
            lightning__HomePage
        </target>
    </targets>
</LightningComponentBundle>



@AuraEnabled
    public static List<Document__c> getValidFromYears(String DocumentType, String Valid){
        Boolean active = (Valid == 'Yes') ? true : false;
        Boolean isValidFilter = (Valid != null && Valid != '');
        Boolean isTypeFilter = (DocumentType != null && DocumentType != '');
        
        if(!isValidFilter && !isTypeFilter){
            return [Select Id, Document_Name__c, Valid_From__c, Valid_To__c, Document_Type__c, Active__c  from Document__c];
        }
        else if(isTypeFilter && !isValidFilter){
            return [Select Id, Document_Name__c, Valid_From__c, Valid_To__c, Document_Type__c, Active__c from Document__c Where Document_Type__c = :DocumentType];
        }
        else if(!isTypeFilter && isValidFilter){
            return [Select Id, Document_Name__c, Valid_From__c, Valid_To__c, Document_Type__c, Active__c from Document__c Where Active__c = :active];
        }
        
        return [Select Id, Document_Name__c, Valid_From__c, Valid_To__c, Document_Type__c, Active__c from Document__c Where Active__c = :active AND Document_Type__c = :DocumentType ];

    }*/