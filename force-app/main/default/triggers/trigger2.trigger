trigger trigger2 on Contact (after insert) {
 Contact c=Trigger.new[0];
  Account a=new Account();
    a.name=c.lastname+'& Company';
    insert a;
}