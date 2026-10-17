/* ELFIRA — Showcase is a presentation of existing work and one fictional concept. */
(() => {
 'use strict';
 const slides=[...document.querySelectorAll('.showcase-slide')];
 if(!slides.length)return;
 const descriptors=[
  {type:'KONSEPT ÇALIŞMASI / ATELIER',title:'Dijitalde ilk izlenim, özenle tasarlanır.'},
  {type:'WEB GELİŞTİRME / EKİNCİLER',title:'Kurumsal kimliğe yakışan dijital sunum.'}
 ];
 let index=0;
 function show(n){
  index=(n+slides.length)%slides.length;
  slides.forEach((el,i)=>{el.hidden=i!==index;el.setAttribute('aria-hidden',String(i!==index));});
  document.querySelector('#showcase-type').textContent=descriptors[index].type;
  document.querySelector('#showcase-title').textContent=descriptors[index].title;
  document.querySelector('#showcase-counter').innerHTML=`0${index+1} <i>/ 0${slides.length}</i>`;
 }
 document.querySelector('#showcase-prev')?.addEventListener('click',()=>show(index-1));
 document.querySelector('#showcase-next')?.addEventListener('click',()=>show(index+1));
 document.querySelector('#preview-ekinciler')?.addEventListener('click',()=>{
  show(1);
  const destination=document.querySelector('.showcase-shell');
  destination?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
});
 show(0);
})();
