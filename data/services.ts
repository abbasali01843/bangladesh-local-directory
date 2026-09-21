export type Service={id:string;name:string;category:string;district:string;upazila:string;area:string;phone:string;verified:boolean;description:string;fields:Record<string,string>};
export const services:Service[]=[
{id:"demo-1",name:"সেবা কেন্দ্র",category:"service",district:"শেরপুর",upazila:"শেরপুর সদর",area:"শেরপুর শহর",phone:"",verified:true,description:"স্থানীয় সেবা ও তথ্যের একটি নমুনা profile।",fields:{serviceType:"সাধারণ সেবা",availability:"সকাল ৯টা–রাত ৮টা"}},
{id:"demo-2",name:"স্থানীয় ব্যবসা",category:"business",district:"চট্টগ্রাম",upazila:"সাতকানিয়া",area:"সাতকানিয়া",phone:"",verified:false,description:"Directory-এর category-specific profile-এর নমুনা।",fields:{businessType:"খুচরা ব্যবসা",openingHours:"সকাল ৯টা–রাত ৯টা"}}
];