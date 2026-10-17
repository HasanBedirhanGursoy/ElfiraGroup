/* ELFIRA Group — static website. No backend or automatic submissions. */
(() => {
 'use strict';
 const $ = sel => document.querySelector(sel);
 const $$ = sel => [...document.querySelectorAll(sel)];
 const money = n => new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n);
 const prices={start:3000,business:8000,premium:12000};
 const labels={start:'Start',business:'Business',premium:'Premium'};
 const extras={page:'Ek sayfa',copy:'İçerik metni desteği',language:'İkinci dil altyapısı',blog:'Blog altyapısı'};
 const solutionNames={panel:'Özel Yönetim Paneli',appointment:'Randevu Sistemi',crm:'CRM & Müşteri Takibi',portal:'Müşteri & Üye Portalları',other:'Diğer Özel Yazılım'};
 const kindLabels={website:'Web sitesi',commerce:'E-Ticaret',software:'Özel yazılım',identity:'Marka Kimliği & UI/UX',seo:'Teknik SEO & Görünürlük',care:'Web Bakım & Destek'};
 const kinds={
   commerce:{options:[['store','Online mağaza kurulumu'],['catalog','Ürün kataloğu'],['integration','Ödeme / kargo entegrasyonu'],['other','Diğer e-ticaret ihtiyacı']]},
   identity:{options:[['branding','Logo & marka kimliği'],['uiux','UI/UX & prototip'],['designsystem','Tasarım sistemi'],['other','Diğer tasarım ihtiyacı']]},
   seo:{options:[['audit','Teknik SEO analizi'],['speed','Site hız ve performansı'],['searchconsole','Search Console kurulumu'],['profile','İşletme profili düzenleme']]},
   care:{options:[['care','Care · ₺750 / ay'],['plus','Care Plus · ₺1.500 / ay'],['pro','Care Pro · ₺3.000 / ay']]}
 };
 const carePrices={care:750,plus:1500,pro:3000};
 const getCustomChoice=()=>document.querySelector('input[name="custom-solution"]:checked')?.value||'other';
 const getCustomLabel=(kind,key)=>kinds[kind]?.options.find(a=>a[0]===key)?.[1]||'İhtiyaca göre';
 function renderCustom(kind,option){
   const container=$('#custom-options');if(!container)return;
   container.replaceChildren();
   for(const [value,label] of (kinds[kind]?.options||[])){
     const l=document.createElement('label'),input=document.createElement('input'),sp=document.createElement('span');
     input.type='radio';input.name='custom-solution';input.value=value;
     input.checked=value===(option||(kinds[kind]?.options[0]?.[0]));
     sp.textContent=label;l.append(input,sp);container.append(l);
     input.addEventListener('change',update);
   }
   $('#custom-hint').textContent=kind==='care'?'Tutarlar örnek aylık bedellerdir. Site üzerinden ödeme veya abonelik yapılmaz.':'Kapsam ve entegrasyonlar netleştirildikten sonra özel teklif hazırlanır.';
 }

 const body=document.body;
 const themeBtn=$('#theme-toggle');
 function setTheme(dark){
   body.classList.toggle('dark',dark);
   themeBtn.setAttribute('aria-label',dark?'Açık temaya geç':'Koyu temaya geç');
   themeBtn.innerHTML=`<svg><use href="${dark?'#sun':'#moon'}"/></svg>`;
   $('meta[name="theme-color"]').setAttribute('content',dark?'#0f1014':'#ffffff');
   try{localStorage.setItem('elfira-v5-theme',dark?'dark':'light')}catch(_e){}
 }
 let pref='light';try{pref=localStorage.getItem('elfira-v5-theme')||'light'}catch(_e){}
 setTheme(pref==='dark');
 themeBtn.addEventListener('click',()=>setTheme(!body.classList.contains('dark')));
 const menu=$('#mobile-menu'),menuBtn=$('#menu-toggle');
 function setMenu(open){menu.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');menuBtn.innerHTML=`<svg><use href="${open?'#close-icon':'#menu-icon'}"/></svg>`;}
 menuBtn.addEventListener('click',(event)=>{event.stopPropagation();setMenu(menu.hidden);});
 $$('#mobile-menu a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
 document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!menuBtn.contains(e.target))setMenu(false)});
 function getSelection(){
   const kind=$('input[name="project-kind"]:checked')?.value||'website';
   if(kind==='software')return {kind,solution:$('input[name="software-solution"]:checked')?.value||'panel',total:null,selected:[]};
   if(kind!=='website')return {kind,solution:getCustomChoice(),total:kind==='care'?carePrices[getCustomChoice()]:null,selected:[]};
   const plan=$('input[name="plan"]:checked')?.value||'business';
   const selected=$$('.extra-picker input:checked').map(e=>({name:extras[e.value],price:Number(e.dataset.price)}));
   return {kind,plan,selected,total:prices[plan]+selected.reduce((a,b)=>a+b.price,0)};
 }
 function update(){
   const data=getSelection(),isSoftware=data.kind==='software',isWebsite=data.kind==='website',isCare=data.kind==='care';
   $('#website-config').hidden=!isWebsite;
   $('#software-config').hidden=!isSoftware;
   $('#custom-config').hidden=isWebsite||isSoftware;
   $('#estimate-label').textContent=isCare?'ELFIRA GROUP · ÖRNEK AYLIK BEDEL':isWebsite?'ELFIRA GROUP · TAHMİNİ BÜTÇE':'ELFIRA GROUP · ÖZEL PROJE';
   $('#estimate-total').textContent=isCare?money(data.total)+' / ay':isWebsite?money(data.total):'Özel teklif';
   $('#summary-selection-label').textContent=isWebsite?'Seçilen paket':'Proje türü';
   $('#estimate-plan').textContent=isWebsite?labels[data.plan]:kindLabels[data.kind];
   $('#summary-extras-label').textContent=isWebsite?'Ek hizmetler':'İlgilendiğiniz çözüm';
   $('#estimate-extras').textContent=isWebsite?(data.selected.length?`${data.selected.length} hizmet`:'Seçilmedi'):isSoftware?solutionNames[data.solution]:getCustomLabel(data.kind,data.solution);
   $('#estimate-help').textContent=isCare?'Seçtiğiniz bakım paketi WhatsApp mesajına eklenir. Bu bir abonelik veya ödeme işlemi değildir.':isWebsite?'WhatsApp’ta seçtiğiniz paket ve tahmini bütçe açılır. Mesajı siz gönderirsiniz; fiyatlar kesin teklif değildir.':'Seçtiğiniz hizmet WhatsApp mesajına eklenir. Kapsam görüşülerek fiyat belirlenir; mesajı siz gönderirsiniz.';
 }
 $$('#estimate-form input').forEach(input=>input.addEventListener('change',e=>{
   if(e.target.name==='project-kind'&&kinds[e.target.value])renderCustom(e.target.value);
   update();
 }));
 function chooseKind(kind,solution){
   const radio=$(`input[name="project-kind"][value="${kind}"]`);if(!radio)return;
   radio.checked=true;if(kinds[kind])renderCustom(kind,solution);
   update();
 }
 $$('.choose-kind').forEach(link=>link.addEventListener('click',()=>chooseKind(link.dataset.kind||'website')));
 $$('.choose-care').forEach(link=>link.addEventListener('click',()=>chooseKind('care',link.dataset.care||'care')));
 
 $$('.choose-plan').forEach(link=>link.addEventListener('click',()=>{
   const kind=$('input[name="project-kind"][value="website"]');if(kind)kind.checked=true;
   const radio=$(`input[name="plan"][value="${link.dataset.plan}"]`);
   if(radio)radio.checked=true;update();
 }));
 $$('.choose-solution').forEach(link=>link.addEventListener('click',()=>{
   const kind=$('input[name="project-kind"][value="software"]');if(kind)kind.checked=true;
   const radio=$(`input[name="software-solution"][value="${link.dataset.solution||'panel'}"]`);
   if(radio)radio.checked=true;update();
 }));
 const dialog=$('#brief-dialog');
 function buildBrief(){
  const data=getSelection();
  const header=['ELFIRA GROUP — PROJE ÖZETİ',''];
  let parts=[];
  if(data.kind==='website')parts=[`Proje türü: Web sitesi`,`Seçilen paket: ${labels[data.plan]} (${money(prices[data.plan])})`,'Ek hizmetler:',...(data.selected.length?data.selected.map(x=>`• ${x.name}: ${money(x.price)}`):['• Seçilmedi']),'',`Tahmini toplam: ${money(data.total)}`,'','Alan adı, ücretli barındırma, üçüncü taraf servisler ve vergi koşulları ayrıca değerlendirilir. Bu fiyat ön tahmindir.',''];
  else if(data.kind==='software')parts=[`Proje türü: Özel yazılım`, `İstenen çözüm: ${solutionNames[data.solution]}`, 'Fiyatlandırma: Kapsama göre özel teklif',''];
  else parts=[`Proje türü: ${kindLabels[data.kind]}`,`İstenen çözüm: ${getCustomLabel(data.kind,data.solution)}`,data.kind==='care'?`Örnek aylık bedel: ${money(data.total)} (kesin teklif değil)`:'Fiyatlandırma: Kapsama göre özel teklif',''];
  return [...header,...parts,`İletişim adı: ${$('#customer-name')?.value.trim()||'Belirtilmedi'}`,`İşletme / marka adı: ${$('#brand-name')?.value.trim()||'Belirtilmedi'}`,`Proje hedefi: ${$('#project-note')?.value.trim()||'Belirtilmedi'}`,'','Bu özet cihazınızda oluşturuldu. Başvuru otomatik gönderilmedi.'].join('\n');
 }
 $('#generate-brief').addEventListener('click',()=>{$('#brief-text').value=buildBrief();dialog.showModal()});
 $('#close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 let timeout;
 function toast(message){const x=$('#toast');x.textContent=message;x.classList.add('visible');clearTimeout(timeout);timeout=setTimeout(()=>x.classList.remove('visible'),2800)}
 $('#copy-brief').addEventListener('click',async()=>{const v=$('#brief-text').value;try{await navigator.clipboard.writeText(v);toast('Proje özeti kopyalandı.')}catch(_e){$('#brief-text').select();toast('Metin seçildi. Uzun basarak kopyalayabilirsiniz.')}});
 $('#download-brief').addEventListener('click',()=>{const blob=new Blob(['\uFEFF'+$('#brief-text').value],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='elfira-group-proje-ozeti.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Proje özeti indirildi.')});
 if(kinds[($('input[name="project-kind"]:checked')?.value)])renderCustom($('input[name="project-kind"]:checked').value);
 $('#copyright-year').textContent=String(new Date().getFullYear());
 update();
})();
