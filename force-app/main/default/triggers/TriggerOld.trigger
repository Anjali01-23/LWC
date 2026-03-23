trigger TriggerOld on Opportunity (before update) {
    for(Opportunity opp:Trigger.old){
        for(Opportunity opp1:Trigger.new){
            if(opp.id==opp1.id & opp.Amount!=opp1.Amount){
                opp1.Amount.addError('Ye ni ho skta amount ni badal skte h');
            }
        }
    }
}