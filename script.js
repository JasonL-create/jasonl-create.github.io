const comments = {
"Clear communication":[
 {meta:"Current Tenant · Maintenance",text:"They answered the same day and explained what would happen next."},
 {meta:"Property Owner · Owner Services",text:"I usually know about problems before they become expensive."},
 {meta:"Former Tenant · Move Out",text:"I did not agree with every charge, but the explanation was detailed and clear."}
],
"Professional staff":[
 {meta:"Current Tenant · Leasing",text:"The staff was organized, respectful, and prepared."},
 {meta:"Vendor · Maintenance",text:"The office provides clear work orders and follows up professionally."}
],
"Easy leasing process":[
 {meta:"Current Tenant · Leasing",text:"The application and move-in instructions were simple to complete."},
 {meta:"Former Tenant · Leasing",text:"Everything was online and I knew exactly what was needed."}
],
"Repair timing":[
 {meta:"Current Tenant · Maintenance",text:"The office responded quickly, but the vendor rescheduled twice."},
 {meta:"Current Tenant · Maintenance",text:"A part had to be ordered. The delay was frustrating, although they kept me informed."},
 {meta:"Former Tenant · Living There",text:"A non-emergency repair took longer than expected but was eventually fixed correctly."}
],
"Deposit questions":[
 {meta:"Former Tenant · Move Out",text:"I questioned the cleaning charge, but they provided photos and invoices."},
 {meta:"Former Tenant · Move Out",text:"The accounting was detailed, but the cleaning standard could have been explained sooner."},
 {meta:"Former Tenant · Move Out",text:"I was upset at first, but most of the charge made sense after reviewing the photos."}
],
"Vendor scheduling":[
 {meta:"Current Tenant · Maintenance",text:"Management responded quickly, but the vendor gave a large arrival window."},
 {meta:"Vendor · Maintenance",text:"Access coordination sometimes takes extra calls when the tenant is unavailable."}
]
};

document.querySelectorAll(".tab").forEach(tab=>{
 tab.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active");
  document.getElementById(tab.dataset.panel).classList.add("active");
 });
});

document.querySelectorAll(".learn").forEach(btn=>{
 btn.addEventListener("click",()=>{
  const details=document.getElementById(btn.dataset.profile);
  const open=details.classList.toggle("open");
  btn.textContent=open?"Show Less":"Learn More";
 });
});

const modal=document.getElementById("modal");
document.querySelectorAll(".read-link").forEach(link=>{
 link.addEventListener("click",()=>{
  const topic=link.dataset.topic;
  const list=comments[topic]||[];
  document.getElementById("modalTitle").textContent=topic;
  document.getElementById("modalSub").textContent=`${list.length} representative comment${list.length===1?"":"s"}`;
  document.getElementById("modalBody").innerHTML=list.map(x=>`<div class="comment"><div class="comment-meta">${x.meta}</div><div class="comment-text">“${x.text}”</div></div>`).join("");
  modal.classList.add("open");
 });
});
document.getElementById("close").onclick=()=>modal.classList.remove("open");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});

const steps=[...document.querySelectorAll(".step")];
const answers={};
let current=0;
const back=document.getElementById("back");
const next=document.getElementById("next");
function render(){
 steps.forEach((s,i)=>s.classList.toggle("active",i===current));
 document.getElementById("stepText").textContent=current<8?`Step ${current+1} of 8`:"Optional comment";
 document.getElementById("bar").style.width=`${Math.min((Math.min(current+1,8)/8)*100,100)}%`;
 back.disabled=current===0;
 const key=steps[current].dataset.key;
 next.textContent=current===8?"Submit Review":"Continue";
 next.disabled=current===8?false:answers[key]==null;
}
document.querySelectorAll(".choice,.rate").forEach(btn=>{
 btn.addEventListener("click",()=>{
  const step=btn.closest(".step");
  step.querySelectorAll(".choice,.rate").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");
  answers[step.dataset.key]=btn.dataset.value;
  next.disabled=false;
 });
});
back.onclick=()=>{if(current>0){current--;render()}};
next.onclick=()=>{
 if(current<8){current++;render()}
 else{
  answers.comment=document.getElementById("comment").value.trim();
  const saved=JSON.parse(localStorage.getItem("pmExperienceReviews")||"[]");
  saved.push({...answers,createdAt:new Date().toISOString()});
  localStorage.setItem("pmExperienceReviews",JSON.stringify(saved));
  document.getElementById("flow").style.display="none";
  document.getElementById("success").style.display="block";
 }
};
document.getElementById("showProfile").onclick=()=>{
 document.querySelector('[data-panel="profile"]').click();
};
render();
