trigger orderTrigger on Order (before insert,after insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        OrderInvoice.assignPriceBook(Trigger.new);
    }
    if(Trigger.isAfter && Trigger.isInsert){
        OrderInvoice.invoiceGenerate(Trigger.new);
    }
}