import { LightningElement, wire, track } from 'lwc';
import getOrder from '@salesforce/apex/OrderPlatform.getOrder';
import { subscribe, onError } from 'lightning/empApi';
import getLatestLog from '@salesforce/apex/OrderPlatform.getLatestLog';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class PlatformEventPaper extends LightningElement {

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Customer Name', fieldName: 'CustomerName__c' },
        { label: 'Amount', fieldName: 'Amount__c' },
        { label: 'Message', fieldName: 'Message__c' },
        { label: 'Event Time', fieldName: 'EventTime__c' }
    ];

    @track datas = [];
    subscription = null;

    // ✅ Load existing data (NO duplicate issue)
    @wire(getOrder)
    order({ data, error }) {
        if (data) {
            this.datas = data;
            console.log('Initial Data:', JSON.stringify(this.datas));
        } else if (error) {
            console.error('Wire Error:', error);
        }
    }

    // ✅ Correct channel name
    channelName = '/event/Order_Platform__e';

    connectedCallback() {

        // ✅ Message handler
        const messageCallback = (event) => {

    const payload = event.data.payload;

    getLatestLog({ orderName: payload.OrderName__c })
        .then(result => {

            const newRow = {
                Id: result.Id,
                Name: result.OrderName__c,
                CustomerName__c: result.CustomerName__c,
                Amount__c: result.Amount__c,
                Message__c: result.Message__c,
                EventTime__c: result.EventTime__c
            };

            this.datas = [newRow, ...this.datas];
        })
        .catch(error => {
            console.error(error);
        });
};

        // ✅ Proper subscription
        subscribe(this.channelName, -1, messageCallback).then(response => {
            console.log('Subscribed to channel:', response.channel);
            this.subscription = response;
        });

        // ✅ Error handling
        onError(error => {
            console.error('EMP API error:', error);
        });
    }
}