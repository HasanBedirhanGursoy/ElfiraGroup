/* ELFIRA Group V10 — dock scroll state and active section highlighting. */
(() => {
  'use strict';
  const header=document.querySelector('.site-header');
  if(!header) return;
  const links=[...header.querySelectorAll('.nav-desktop a[href^="#"]')];
  const sections=links.map(link=>({link,section:document.getElementById(link.hash.slice(1))})).filter(x=>x.section);
  let pending=false;
  function update(){
    pending=false;
    header.classList.toggle('is-condensed',window.scrollY>48);
    const cutoff=window.scrollY+Math.min(235,window.innerHeight*.37);
    let active=null;
    for(const item of sections){if(item.section.getBoundingClientRect().top+window.scrollY<=cutoff)active=item.link;}
    if(window.scrollY<100)active=null;
    for(const {link} of sections){
      const selected=link===active;
      link.classList.toggle('is-active',selected);
      if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    }
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('hashchange',schedule);
  document.querySelectorAll('a[href="#top"]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }));
  update();
})();