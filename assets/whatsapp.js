/* ELFIRA Group — WhatsApp click-to-chat. WhatsApp number: +90 537 488 08 84.
   No server submission. Visitor must press Send inside WhatsApp. */
(() => {
  'use strict';
  const businessNumber='905374880884';
  const packagePrices={start:3000,business:8000,premium:12000};
  const planLabels={start:'Start',business:'Business',premium:'Premium'};
  const extrasLabels={page:'Ek sayfa',copy:'İçerik metni desteği',language:'İkinci dil altyapısı',blog:'Blog altyapısı'};
  const solutionNames={panel:'Özel Yönetim Paneli',appointment:'Randevu Sistemi',crm:'CRM & Müşteri Takibi',portal:'Müşteri & Üye Portalları',other:'Diğer Özel Yazılım'};
  const kindNames={website:'Web sitesi',software:'Özel yazılım',commerce:'E-Ticaret',identity:'Marka Kimliği & UI/UX',seo:'Teknik SEO & Görünürlük',care:'Web Bakım & Destek'};
  const choiceNames={store:'Online mağaza kurulumu',catalog:'Ürün kataloğu',integration:'Ödeme / kargo entegrasyonu',branding:'Logo & marka kimliği',uiux:'UI/UX & prototip',designsystem:'Tasarım sistemi',audit:'Teknik SEO analizi',speed:'Site hız ve performansı',searchconsole:'Search Console kurulumu',profile:'İşletme profili düzenleme',care:'Care',plus:'Care Plus',pro:'Care Pro',other:'Diğer'};
  const monthly={care:750,plus:1500,pro:3000};
  const money=n=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n);
  const val=(selector,max=160)=>(document.querySelector(selector)?.value||'').trim().slice(0,max).replace(/\s+/g,' ');
  function message(kind){
    if(kind!=='estimate')return 'Merhaba ELFIRA Group, web sitesi, e-ticaret, özel yazılım, marka tasarımı veya bakım hizmetleriniz hakkında bilgi almak istiyorum.';
    const kindOfProject=document.querySelector('input[name="project-kind"]:checked')?.value||'website';
    if(kindOfProject==='software'){
      const solution=document.querySelector('input[name="software-solution"]:checked')?.value||'panel';
      const lines=['Merhaba ELFIRA Group, özel yazılım projem için teklif almak istiyorum.','', 'Hizmet: '+(solutionNames[solution]||solutionNames.other),'Fiyat: İhtiyaca göre belirlenecek'];
      const name=val('#customer-name',70),brand=val('#brand-name',100),note=val('#project-note',600);
      if(name)lines.push('İsim: '+name);if(brand)lines.push('Marka / işletme: '+brand);if(note)lines.push('Proje detayı: '+note);
      lines.push('','Kapsamı görüşmek için benimle iletişime geçebilir misiniz?');
      return lines.join('\n');
    }
    if(kindOfProject!=='website'){
      const choice=document.querySelector('input[name="custom-solution"]:checked')?.value||'other';
      const lines=['Merhaba ELFIRA Group, projem için teklif almak istiyorum.','','Hizmet: '+(kindNames[kindOfProject]||kindOfProject),'İhtiyaç: '+(choiceNames[choice]||'Özel kapsam')];
      if(kindOfProject==='care')lines.push('Örnek aylık bedel: '+money(monthly[choice]||750)+' (kesin teklif değil)');
      else lines.push('Fiyat: Proje kapsamına göre belirlenecek');
      const name=val('#customer-name',70),brand=val('#brand-name',100),note=val('#project-note',600);
      if(name)lines.push('İsim: '+name);if(brand)lines.push('Marka / işletme: '+brand);if(note)lines.push('Proje detayı: '+note);
      lines.push('','Müsait olduğunuzda kapsamı konuşabilir miyiz?');return lines.join('\n');
    }
    const p=document.querySelector('input[name="plan"]:checked')?.value||'business';
    const selected=[...document.querySelectorAll('.extra-picker input:checked')];
    const total=packagePrices[p]+selected.reduce((sum,el)=>sum+Number(el.dataset.price||0),0);
    const lines=[
      'Merhaba ELFIRA Group, projem için teklif almak istiyorum.',
      '',
      'Paket: '+(planLabels[p]||'Business'),
      'Ek hizmetler: '+(selected.length?selected.map(el=>extrasLabels[el.value]||el.value).join(', '):'Yok'),
      'Sitedeki tahmini bütçe: '+money(total),
      'Not: Bu tutar bağlayıcı teklif değildir.'
    ];
    const name=val('#customer-name',70),brand=val('#brand-name',100),note=val('#project-note',600);
    if(name)lines.push('İsim: '+name);
    if(brand)lines.push('Marka / işletme: '+brand);
    if(note)lines.push('Proje detayı: '+note);
    lines.push('','Uygun olduğunuzda benimle iletişime geçebilir misiniz?');
    return lines.join('\n');
  }

  const isEn=document.documentElement.lang==='en';
  const englishMoney=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n/49.5141);
  function messageEn(kind){
    if(kind!=='estimate')return 'Hello ELFIRA Group, I would like to discuss your web design, e-commerce, custom software or website maintenance services.';
    const projectKind=document.querySelector('input[name="project-kind"]:checked')?.value||'website';
    const name=val('#customer-name',70),brand=val('#brand-name',100),note=val('#project-note',600);
    const lines=['Hello ELFIRA Group, I would like to request a quote.',''];
    const kindLabelsEn={website:'Website',commerce:'E-Commerce',software:'Custom software',identity:'Brand Identity & UI/UX',seo:'Technical SEO & Visibility',care:'Website care & maintenance'};
    const optionsEn={panel:'Management dashboard',appointment:'Booking system',crm:'CRM & Customer Management',portal:'Customer / Member Portal',other:'Custom project',store:'Online store setup',catalog:'Product catalogue',integration:'Payment / shipping integrations',branding:'Logo & brand identity',uiux:'UI/UX & prototype',designsystem:'Design system',audit:'Technical SEO audit',speed:'Website speed and performance',searchconsole:'Search Console setup',profile:'Business profile optimisation',care:'Care',plus:'Care Plus',pro:'Care Pro'};
    if(projectKind==='website'){
      const plan=document.querySelector('input[name="plan"]:checked')?.value||'business';
      const selected=[...document.querySelectorAll('.extra-picker input:checked')];
      const total=packagePrices[plan]+selected.reduce((sum,e)=>sum+Number(e.dataset.price||0),0);
      const extraLabels={page:'Additional page',copy:'Copywriting support',language:'Additional language setup',blog:'Blog setup'};
      lines.push('Project: Website','Package: '+(planLabels[plan]||'Business'),'Extras: '+(selected.length?selected.map(e=>extraLabels[e.value]||e.value).join(', '):'None'),'Estimated USD budget: '+englishMoney(total));
    } else {
      lines.push('Project: '+(kindLabelsEn[projectKind]||projectKind));
      const solution=projectKind==='software'?(document.querySelector('input[name="software-solution"]:checked')?.value||'panel'):(document.querySelector('input[name="custom-solution"]:checked')?.value||'other');
      lines.push('Service: '+(optionsEn[solution]||'Custom scope'));
      if(projectKind==='care'){
        lines.push('Indicative monthly USD amount: '+englishMoney(monthly[solution]||750));
      }else lines.push('Pricing: Custom quote after scope review');
    }
    if(name)lines.push('Contact name: '+name);
    if(brand)lines.push('Business / brand: '+brand);
    if(note)lines.push('Project details: '+note);
    lines.push('','USD amounts shown are indicative conversions (18 October 2026), not binding quotes. Final currency, fees, taxes and scope are confirmed in writing.','Could we discuss the requirements?');
    return lines.join('\n');
  }

  // Set exact wa.me link just before user-initiated navigation, keeping native browser behavior.
  document.querySelectorAll('.wa-link').forEach(link=>{
    link.addEventListener('click',()=>{
      const kind=link.dataset.waKind||'general';
      link.href='https://wa.me/'+businessNumber+'?text='+encodeURIComponent(isEn?messageEn(kind):message(kind));
    });
  });
})();
