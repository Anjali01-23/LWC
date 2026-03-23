// Normal Search (client-side)
// Dynamic Query (Apex search)
// Date Filter search

// Main tumhe code + samjha ke dono dungi 😄

// 🔥 🎯 1. NORMAL SEARCH (Client Side)
// 🧩 HTML
// <lightning-input 
//     type="search" 
//     label="Search" 
//     onchange={handleSearch}>
// </lightning-input>

// <lightning-datatable
//     key-field="Id"
//     data={filteredData}
//     columns={columns}>
// </lightning-datatable>
// 🧩 JS
// data = [];          // original data
// filteredData = [];  // filtered data

// handleSearch(event){
//     const searchKey = event.target.value.toLowerCase();

//     this.filteredData = this.data.filter(rec => {
//         return (
//             rec.Name?.toLowerCase().includes(searchKey) ||
//             rec.Type?.toLowerCase().includes(searchKey)
//         );
//     });
// }
// 🧠 SAMJHO

// 👉 ye backend nahi ja raha
// 👉 browser me hi filter ho raha

// data → filter() → filteredData → UI
// 🔥 🎯 2. DYNAMIC QUERY (Apex Search)

// 👉 jab data zyada ho → server pe search karo

// 🧩 Apex
// @AuraEnabled
// public static List<Opportunity> searchOpp(String searchKey){
//     return [
//         SELECT Id, Name, Type 
//         FROM Opportunity 
//         WHERE Name LIKE :('%' + searchKey + '%')
//     ];
// }
// 🧩 JS
// import searchOpp from '@salesforce/apex/YourClass.searchOpp';

// handleSearch(event){
//     const searchKey = event.target.value;

//     searchOpp({ searchKey })
//     .then(result => {
//         this.filteredData = result;
//     });
// }
// 🧠 SAMJHO
// User input
//    ↓
// Apex call
//    ↓
// SOQL LIKE
//    ↓
// filtered result

// 👉 large data ke liye best 🔥




// @AuraEnabled
// public static List<Opportunity> getFilteredOpp(Date startDate, Date endDate){

//     // 🔥 no filter → all data
//     if(startDate == null && endDate == null){
//         return [
//             SELECT Id, Name, CloseDate, StageName 
//             FROM Opportunity
//         ];
//     }

//     // 🔥 only start date
//     else if(startDate != null && endDate == null){
//         return [
//             SELECT Id, Name, CloseDate, StageName 
//             FROM Opportunity
//             WHERE CloseDate >= :startDate
//         ];
//     }

//     // 🔥 only end date
//     else if(startDate == null && endDate != null){
//         return [
//             SELECT Id, Name, CloseDate, StageName 
//             FROM Opportunity
//             WHERE CloseDate <= :endDate
//         ];
//     }

//     // 🔥 both dates
//     else{
//         return [
//             SELECT Id, Name, CloseDate, StageName 
//             FROM Opportunity
//             WHERE CloseDate >= :startDate 
//             AND CloseDate <= :endDate
//         ];
//     }
// }


import getFilteredOpp from '@salesforce/apex/YourClass.getFilteredOpp';

startDate;
endDate;

handleStart(event1){
    this.startDate = event1.target.value;
    this.fetchData();
}

handleEnd(event2){
    this.endDate = event2.target.value;
    this.fetchData();
}

fetchData(){
    getFilteredOpp({
        startDate: this.startDate,
        endDate: this.endDate
    })
    .then(result => {
        this.data = result;
    })
    .catch(error => {
        console.log(error);
    });
}