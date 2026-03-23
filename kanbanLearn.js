// Kanban Board ka logic bahut simple hai: Yeh sirf Drag and Drop API ka khel hai jo Salesforce ke data (Opportunities/Tasks) ko columns mein divide karke visual banata hai.

// Aaiye iske core logic ko breakdown karte hain taaki aap ise kisi bhi object par apply kar sakein:

// 1. Data Fetching aur Grouping (@wire & groupTasks)
// Kanban ka sabse pehla kaam hai records ko unke status (Stage) ke hisaab se baantna.

// wiredTasks: Apex se saara data (Opportunities) lata hai.

// groupTasks: Yeh main logic hai. Yeh stages array (Closed Won, Closed Lost, Open) par loop chalata hai aur har stage ke liye pure data ko filter karke ek naya array banata hai.

// Seekhne wali baat: Agar aapko Case object ke liye karna hai, toh aap yahan Status field use karenge.

// 2. Drag and Drop Events (Asli Magic)
// Kanban mein 3 main events hote hain:

// Event	Function	Kya ho raha hai?
// ondragstart	handleDragStart	Jab aap card pakadte hain, hum us card ki ID (draggedTaskId) save kar lete hain.
// ondragover	handleDragOver	Yeh browser ko bolta hai, "Haan, is column ke upar drop karna allow hai." Iske bina drop kaam nahi karega.
// ondrop	handleDrop	Jab card choda jata hai, hum column se New Stage ka naam uthate hain aur Apex ko bolte hain, "Is ID ka Stage badal do."
// 3. Modal aur Theme Logic
// Aapne code mein advanced features bhi dale hain:

// handleClick: Card par click karne par LightningModal khulta hai jo Amount aur Name edit karne deta hai. refreshApex ka use isliye kiya hai taaki edit ke baad Board apne aap update ho jaye.

// handleTheme: Yeh kaafi cool feature hai. User modal se color select karta hai, aur aap querySelectorAll ka use karke DOM elements ka background style dynamically change kar dete hain.

// Agar kisi alag object par banana ho toh kya badalna hoga?
// Sirf 3 chizein badalni hongi:

// Apex Query: SELECT Id, Name, StageName FROM Opportunity ki jagah apna object aur status field dalein.

// JS stages array: Apne object ke status/stages ki list yahan dalein.

// HTML Mapping: Card ke andar jo fields dikhani hain (jaise task.Name), unhe badal dein.

// Ek Choti Tip (Data Consistency)
// Aapne JSON.parse(JSON.stringify(data)) use kiya hai. Yeh bahut acchi practice hai kyunki Salesforce ka wired data Read-Only hota hai. Copy banane se aap usme changes kar paate hain.

// Example for Practice:
// Agar aapko Lead object ke liye banana ho jahan status 'New', 'Working', aur 'Closed' ho:

// stages = ['New', 'Working', 'Closed'] karein.

// groupTasks mein task.Status check karein.

// updateTaskStage Apex mein Lead record update karein.

// Kya aap chahte hain ki main isme "Drag and Drop" ke waqt ek "Highlight Effect" (Border change) wala code add kar doon taaki user ko pata chale wo kaha drop kar raha hai?




// Yeh handleClick function aapke Kanban board ke ek "Card" par click karne par trigger ho raha hai. Iska main kaam hai user ko ek Edit Modal dikhana aur phir data ko refresh karna.

// Aaiye iska step-by-step breakdown dekhte hain:

// 1. Card ki ID nikalna
// JavaScript
// let str = JSON.parse(JSON.stringify(event.currentTarget.dataset.id));
// Sabse pehle, function us card ki Record ID nikalta hai jis par aapne click kiya hai (event.currentTarget.dataset.id).

// JSON.parse(JSON.stringify(...)) ka use yahan string ko clean copy banane ke liye kiya gaya hai.

// 2. Specific Record ko dhoondna
// JavaScript
// let temp = this.oppData.filter(element => str == element.Id );
// this.oppData (jisme saari Opportunities hain) mein se yeh line us specific record ko filter karti hai jiski ID hamare clicked card se match hoti hai.

// temp[0] ab aapka wo target record hai jise aap edit karna chahte hain.

// 3. Modal Kholna (Lightning Modal)
// JavaScript
// let a = await ModalDemoAllForm.open({
//     size: 'medium',
//     Amount : temp[0].Amount,
//     Name : temp[0].Name,
//     oppId : temp[0].Id,
//     // ...
// });
// Yahan LightningModal ka open method call ho raha hai.

// Aap clicked card ka data (Amount, Name, Id) modal ko Input Parameters ke taur par bhej rahe hain taaki modal ke andar pehle se values bhari hui dikhein.

// await ka matlab hai ki code tab tak ruka rahega jab tak user modal ko band nahi kar deta.

// 4. Modal se Data wapas lena
// JavaScript
// if(a != "done"){
//     temp[0].draftValues = a.draftValuesData;
// }
// Jab modal band hota hai, toh wo kuch data return karta hai (variable a).

// Agar modal "done" ke alawa kuch return karta hai, toh aap apne local data (temp[0]) mein wo nayi values (draftValuesData) update kar dete hain.

// 5. UI Refresh karna
// JavaScript
// return refreshApex(this.wiredTasksResult);
// Modal band hone ke baad, yeh line sabse zaroori hai.

// refreshApex Salesforce database se taaza data mangwata hai aur aapke Kanban board ko automatic update kar deta hai taaki user ko naye badlav (changes) dikh jayein.

// Iska Flow (Visual)
// Summary: Click kiya -> Data nikala -> Modal khola -> User ne edit kiya -> Modal band hua -> Board refresh ho gaya.

// Kya aap chahte hain ki main aapko bataun ki is Modal ke andar handleSave function kaise likha jata hai jo data ko sach mein database mein save kare?