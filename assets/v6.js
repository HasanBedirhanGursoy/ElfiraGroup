/* ELFIRA — Showcase is a presentation of existing work and one fictional concept. */
(() => {
 'use strict';
 const slides=[...document.querySelectorAll('.showcase-slide')];
 if(!slides.length)return;
 const descriptors=[
  {type:'WEB GELİŞTİRME / EKİNCİLER',title:'Kurumsal kimliğe yakışan dijital sunum.',browserLabel:'ELFIRA / EKİNCİLER'},
  {type:'KONSEPT ÇALIŞMASI / ATELIER',title:'Dijitalde ilk izlenim, özenle tasarlanır.',browserLabel:'ELFIRA / TASARIM KONSEPTİ'}
 ];
 if(document.documentElement.lang==='en'){
   descriptors[0]={type:'WEB DEVELOPMENT / EKİNCİLER',title:'A digital presentation that reflects the brand.',browserLabel:'ELFIRA / EKİNCİLER'};
   descriptors[1]={type:'DESIGN CONCEPT / ATELIER',title:'A thoughtfully designed first impression online.',browserLabel:'ELFIRA / DESIGN CONCEPT'};
 }
 let index=0;
 function show(n){
  index=(n+slides.length)%slides.length;
  slides.forEach((el,i)=>{el.hidden=i!==index;el.setAttribute('aria-hidden',String(i!==index));});
  document.querySelector('#showcase-type').textContent=descriptors[index].type;
  document.querySelector('#showcase-title').textContent=descriptors[index].title;
  const addressLabel=document.querySelector('.browser-address-label');
  if(addressLabel)addressLabel.textContent=descriptors[index].browserLabel;
  document.querySelector('#showcase-counter').innerHTML=`0${index+1} <i>/ 0${slides.length}</i>`;
 }
 document.querySelector('#showcase-prev')?.addEventListener('click',()=>show(index-1));
 document.querySelector('#showcase-next')?.addEventListener('click',()=>show(index+1));
 document.querySelector('#preview-ekinciler')?.addEventListener('click',()=>{
  show(0);
  const destination=document.querySelector('.showcase-shell');
  destination?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
});
 show(0);
})();
