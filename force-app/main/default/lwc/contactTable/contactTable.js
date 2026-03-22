import { LightningElement, wire } from "lwc";
import fetchData from "@salesforce/apex/getRecordsImperative.getContact";
import { NavigationMixin } from "lightning/navigation";
import { getRecord, getFieldValue, deleteRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Contact.Name";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import LEADSOURCE_FIELD from "@salesforce/schema/Contact.LeadSource";
import ACCOUNT_NAME from "@salesforce/schema/Contact.Account.Name";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import ConfirmationModal from "c/confirmationModal";

import NAME_FIELD1 from "@salesforce/schema/Account.Name";
import EMPLOYEES from "@salesforce/schema/Account.NumberOfEmployees";
import PHONE from "@salesforce/schema/Account.Phone";
import INDUSTRY from "@salesforce/schema/Account.Industry";

const fields = [NAME_FIELD, EMAIL_FIELD, LEADSOURCE_FIELD, ACCOUNT_NAME];

const fields1 = [NAME_FIELD1, EMPLOYEES, PHONE, INDUSTRY];

const actions = [
  { label: "View", name: "view" },
  { label: "Edit", name: "edit" },
  { label: "Delete", name: "delete" }
];
export default class ContactTable extends NavigationMixin(LightningElement) {
  datas;
  isModalOpen;
  isEditModal;
  accModal;
  columns1 = [
    { label: "Name", fieldName: "Name" },
    { label: "Email", fieldName: "Email" },
    {
      label: "Account Name",
      type: "button",
      fieldName: "accId",
      typeAttributes: {
        label: {
          fieldName: "AccountName"
        },
        name: "view_account",
        variant: "base"
      }
    },
    { label: "Lead Source", fieldName: "LeadSource" },
    {
      type: "action",
      typeAttributes: { rowActions: actions }
    }
  ];

  @wire(fetchData)
  contactRec(result) {
    this.wholeData = result;
    if (result.data) {
      this.datas = result.data.map((rec) => {
        return {
          ...rec,
          AccountName: rec.Account ? rec.Account.Name : "",
          accId: rec.Account ? rec.Account.Id : ""
        };
      });
    }
  }

  recId = "";
  wholeData;
  accountId = "";

  @wire(getRecord, {
    recordId: "$recId",
    fields: fields
  })
  conData;

  @wire(getRecord, {
    recordId: "$accountId",
    fields: fields1
  })
  accountData;

  get name() {
    return getFieldValue(this.conData.data, NAME_FIELD);
  }

  get email() {
    return getFieldValue(this.conData.data, EMAIL_FIELD);
  }

  get leadsource() {
    return getFieldValue(this.conData.data, LEADSOURCE_FIELD);
  }

  get AccountName() {
    return getFieldValue(this.conData.data, ACCOUNT_NAME);
  }

  get nameAcc() {
    return getFieldValue(this.accountData.data, NAME_FIELD1);
  }

  get employee() {
    return getFieldValue(this.accountData.data, EMPLOYEES);
  }

  get phone() {
    return getFieldValue(this.accountData.data, PHONE);
  }

  get industry() {
    return getFieldValue(this.accountData.data, INDUSTRY);
  }
  handleRowAction(event) {
    const actionname = event.detail.action.name;
    const row = event.detail.row;
    switch (actionname) {
      case "view":
        this.recId = row.Id;
        this.isModalOpen = true;
        break;
      case "edit":
        this.recId = row.Id;
        this.isEditModal = true;
        break;
      case "delete": {
        this.recId = row.Id;
        ConfirmationModal.open({
          size: "small"
        })
          .then((result) => {
            if (result === "proceed") {
              deleteRecord(this.recId)
                .then(() => {
                  refreshApex(this.wholeData).then(() => {
                    const event = new ShowToastEvent({
                      title: "Success",
                      message: "Record Deleted",
                      variant: "success"
                    });
                    this.dispatchEvent(event);
                  });
                })
                .catch((err) => {
                  console.log(err);
                  const event = new ShowToastEvent({
                    title: "Failed",
                    message: `Record Deletion Failed because of error ${err.body.message}`,
                    variant: "error"
                  });
                  this.dispatchEvent(event);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "view_account":
        this.accountId = row.accId;
        this.accModal = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
  closeModaledit() {
    this.isEditModal = false;
  }

  closeModalacc() {
    this.accModal = false;
    this.accountId = undefined;
  }

  savehandle() {
    this.isEditModal = false;

    refreshApex(this.wholeData).then(() => {
      const event = new ShowToastEvent({
        title: "Success",
        message: "Record Updated",
        variant: "success"
      });
      this.dispatchEvent(event);
    });
  }

  errorhandle() {
    this.isEditModal = false;
    this.recId = undefined;
    const event = new ShowToastEvent({
      title: "Failed",
      message: "Record Updation Failed",
      variant: "error"
    });
    this.dispatchEvent(event);
  }

  createNew() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "new"
      }
    });
  }

  recent() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "list"
      },
      state:{
        filterName:'Recent'
      }
    });
  }
}
