const categories=[
  ["🏥","স্বাস্থ্য"],["🏪","ব্যবসা"],["🏫","শিক্ষা"],["🔧","সেবা"],
  ["🚌","পরিবহন"],["⚖️","আইনজীবী"],["🍴","হোটেল ও রেস্টুরেন্ট"],["🚨","জরুরি সেবা"]
];

export default function Home(){
 return <main>
  <header style={{background:"#fff",borderBottom:"1px solid #e5e7eb"}}>
   <div className="container" style={{height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <strong style={{fontSize:20}}>🇧🇩 Local Hub</strong><span>বাংলাদেশ</span>
   </div>
  </header>
  <section style={{background:"linear-gradient(135deg,#0f766e,#155e75)",color:"#fff",padding:"56px 0"}}>
   <div className="container">
    <p style={{margin:0,opacity:.85}}>আপনার এলাকার প্রয়োজনীয় তথ্য</p>
    <h1 style={{fontSize:"clamp(30px,6vw,52px)",margin:"10px 0 20px"}}>সবকিছু খুঁজুন এক জায়গায়</h1>
    <div style={{display:"flex",gap:10,maxWidth:720}}>
      <input aria-label="Search" placeholder="ডাক্তার, দোকান, মিস্ত্রি, রেস্টুরেন্ট..." style={{flex:1,padding:"16px 18px",border:0,borderRadius:12}}/>
      <button style={{border:0,borderRadius:12,padding:"0 22px",background:"#fff",color:"#0f766e",fontWeight:700}}>খুঁজুন</button>
    </div>
   </div>
  </section>
  <section className="container" style={{padding:"32px 0"}}>
   <h2>জনপ্রিয় ক্যাটাগরি</h2>
   <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
    {categories.map(([icon,name])=><div key={name} style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,padding:18,textAlign:"center"}}><div style={{fontSize:28}}>{icon}</div><div style={{marginTop:8,fontWeight:600}}>{name}</div></div>)}
   </div>
  </section>
  <section className="container" style={{paddingBottom:48}}>
   <div style={{background:"#fff",borderRadius:20,padding:24,border:"1px solid #e5e7eb"}}>
    <h2>এখন Foundation তৈরি হচ্ছে</h2>
    <p style={{lineHeight:1.7,color:"#596579"}}>District → Upazila → Union → Area ভিত্তিক directory, verified profile, user contribution, admin approval, QR ID, nearby search এবং PWA architecture এই platform-এর পরবর্তী ধাপে যুক্ত হবে।</p>
   </div>
  </section>
 </main>
}