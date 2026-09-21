export type CategoryField={key:string;label:string;type:"text"|"tel"|"time"|"number"|"textarea"};
export type Category={id:string;name:string;icon:string;fields:CategoryField[]};
export const categories:Category[]=[
{id:"health",name:"স্বাস্থ্য",icon:"🏥",fields:[{key:"specialization",label:"বিশেষত্ব",type:"text"},{key:"chamber",label:"চেম্বার",type:"text"},{key:"visitingTime",label:"সাক্ষাতের সময়",type:"text"}]},
{id:"business",name:"ব্যবসা",icon:"🏪",fields:[{key:"businessType",label:"ব্যবসার ধরন",type:"text"},{key:"openingHours",label:"খোলার সময়",type:"text"}]},
{id:"education",name:"শিক্ষা",icon:"🏫",fields:[{key:"institutionType",label:"প্রতিষ্ঠানের ধরন",type:"text"},{key:"eiin",label:"EIIN",type:"text"}]},
{id:"service",name:"সেবা",icon:"🔧",fields:[{key:"serviceType",label:"সেবার ধরন",type:"text"},{key:"availability",label:"সেবার সময়",type:"text"}]},
{id:"transport",name:"পরিবহন",icon:"🚌",fields:[{key:"route",label:"রুট",type:"text"},{key:"departure",label:"ছাড়ার সময়",type:"time"},{key:"counter",label:"কাউন্টার",type:"text"}]},
{id:"lawyer",name:"আইনজীবী",icon:"⚖️",fields:[{key:"court",label:"আদালত",type:"text"},{key:"specialization",label:"আইনের ক্ষেত্র",type:"text"}]},
{id:"food",name:"হোটেল ও রেস্টুরেন্ট",icon:"🍴",fields:[{key:"cuisine",label:"খাবারের ধরন",type:"text"},{key:"openingHours",label:"খোলার সময়",type:"text"}]},
{id:"emergency",name:"জরুরি সেবা",icon:"🚨",fields:[{key:"emergencyType",label:"সেবার ধরন",type:"text"},{key:"hotline",label:"হটলাইন",type:"tel"}]}
];