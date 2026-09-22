/* Renders content.js into the page, loads photos, runs motion. You should not need to edit this. */
(function(){
  var C = window.CONTENT || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)');
  function get(path){ return path.split('.').reduce(function(o,k){ return o==null?undefined:o[k]; }, C); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function fill(el, val){
    if (val == null) return;
    var s = String(val);
    if (/\[[^\]]+\]/.test(s)) el.innerHTML = esc(s).replace(/\[[^\]]+\]/g, function(m){ return '<span class="ph">'+m+'</span>'; });
    else el.textContent = s;
  }
  // statement.full is assembled from the three statement parts for the hero line
  if (C.statement) C.statement.full = (C.statement.text||'') + (C.statement.highlight||'') + (C.statement.textAfter||'');

  document.querySelectorAll('[data-t]').forEach(function(el){ fill(el, get(el.getAttribute('data-t'))); });
  document.querySelectorAll('[data-cap]').forEach(function(el){ var p=(C.photos||{})[el.getAttribute('data-cap')]; fill(el, p ? p.caption : ''); });

  // headline: one span per word so the words can rise in
  var h1=document.getElementById('h1');
  if(h1 && C.brand){ h1.innerHTML=''; C.brand.tagline.split(' ').forEach(function(w,i,a){ var s=document.createElement('span'); s.className='w'; s.textContent=w+(i<a.length-1?' ':''); h1.appendChild(s); }); }

  // bubbles: a handful of translucent spheres at different depths
  var bb=document.getElementById('bubbles'), bubbles=[];
  if(bb){ var n=narrow.matches?7:14; for(var i=0;i<n;i++){ var b=document.createElement('div'); b.className='bubble'; var size=30+Math.random()*(narrow.matches?90:160); b.style.width=b.style.height=size+'px'; b.style.left=(Math.random()*100)+'%'; b.style.top=(Math.random()*100)+'%'; b.style.setProperty('--dur',(10+Math.random()*12)+'s'); b.style.animationDelay=(-Math.random()*12)+'s'; bb.appendChild(b); bubbles.push({el:b,d:0.05+Math.random()*0.35,f:(Math.random()-.5)*40}); } }

  // marquee
  var mq=document.getElementById('marquee');
  if(mq){ var items=(C.marquee||['something small is coming','resin · hand-cast · limited','more omens to come']); var moon='<svg width="24" height="24" viewBox="0 0 120 120"><defs><linearGradient id="lo-body-m" x1="20%" y1="10%" x2="85%" y2="95%"><stop offset="0" stop-color="#EDE6FF"/><stop offset=".35" stop-color="#B9A3FA"/><stop offset=".75" stop-color="#7A56D6"/><stop offset="1" stop-color="#3E2A7A"/></linearGradient><radialGradient id="lo-spec-m" cx="34%" cy="26%" r="40%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="lo-shade-m" cx="70%" cy="80%" r="60%"><stop offset=".55" stop-color="#1a1030" stop-opacity="0"/><stop offset="1" stop-color="#1a1030" stop-opacity=".55"/></radialGradient><radialGradient id="lo-blush-m" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F3C6FF" stop-opacity=".9"/><stop offset="1" stop-color="#F3C6FF" stop-opacity="0"/></radialGradient><linearGradient id="lo-star-m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#C4B5FD"/></linearGradient><mask id="lo-cres-m"><rect width="120" height="120" fill="#fff"/><circle cx="80" cy="46" r="39" fill="#000"/></mask><filter id="lo-shadow-m" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity=".55"/><feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#A78BFA" flood-opacity=".35"/></filter></defs><g filter="url(#lo-shadow-m)"><g mask="url(#lo-cres-m)"><circle cx="58" cy="60" r="46" fill="url(#lo-body-m)"/><circle cx="58" cy="60" r="46" fill="url(#lo-shade-m)"/><circle cx="58" cy="60" r="46" fill="url(#lo-spec-m)"/><circle cx="58" cy="60" r="45.2" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"/></g><ellipse cx="34" cy="38" rx="9" ry="5" fill="#fff" opacity=".9" transform="rotate(-32 34 38)"/><ellipse cx="27" cy="74" rx="8" ry="5.5" fill="url(#lo-blush-m)"/><path d="M27 58q5 4 10 0" stroke="#1B1230" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M45 66q5 4 10 0" stroke="#1B1230" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M36 80q4 3 8 0" stroke="#1B1230" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M96 14l3.2 8.8 8.8 3.2-8.8 3.2-3.2 8.8-3.2-8.8-8.8-3.2 8.8-3.2z" fill="url(#lo-star-m)"/><circle cx="108" cy="46" r="2.4" fill="#fff" opacity=".85"/></g></svg>'; var html=''; for(var r=0;r<2;r++) items.forEach(function(t){ html+='<span>'+esc(t)+'</span>'+moon; }); mq.innerHTML=html; }

  // specs
  var specs=document.getElementById('specs');
  if(specs && C.drop && C.drop.specs) C.drop.specs.forEach(function(row){ var tr=document.createElement('tr'),a=document.createElement('td'),b=document.createElement('td'); fill(a,row[0]); fill(b,row[1]); tr.appendChild(a); tr.appendChild(b); specs.appendChild(tr); });

  // roster tiles with sign icons
  var signs={
    crescent:'<svg viewBox="0 0 120 120"><defs><linearGradient id="lo-body-t" x1="20%" y1="10%" x2="85%" y2="95%"><stop offset="0" stop-color="#EDE6FF"/><stop offset=".35" stop-color="#B9A3FA"/><stop offset=".75" stop-color="#7A56D6"/><stop offset="1" stop-color="#3E2A7A"/></linearGradient><radialGradient id="lo-spec-t" cx="34%" cy="26%" r="40%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="lo-shade-t" cx="70%" cy="80%" r="60%"><stop offset=".55" stop-color="#1a1030" stop-opacity="0"/><stop offset="1" stop-color="#1a1030" stop-opacity=".55"/></radialGradient><radialGradient id="lo-blush-t" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F3C6FF" stop-opacity=".9"/><stop offset="1" stop-color="#F3C6FF" stop-opacity="0"/></radialGradient><linearGradient id="lo-star-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#C4B5FD"/></linearGradient><mask id="lo-cres-t"><rect width="120" height="120" fill="#fff"/><circle cx="80" cy="46" r="39" fill="#000"/></mask><filter id="lo-shadow-t" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity=".55"/><feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#A78BFA" flood-opacity=".35"/></filter></defs><g filter="url(#lo-shadow-t)"><g mask="url(#lo-cres-t)"><circle cx="58" cy="60" r="46" fill="url(#lo-body-t)"/><circle cx="58" cy="60" r="46" fill="url(#lo-shade-t)"/><circle cx="58" cy="60" r="46" fill="url(#lo-spec-t)"/><circle cx="58" cy="60" r="45.2" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"/></g><ellipse cx="34" cy="38" rx="9" ry="5" fill="#fff" opacity=".9" transform="rotate(-32 34 38)"/><ellipse cx="27" cy="74" rx="8" ry="5.5" fill="url(#lo-blush-t)"/><path d="M27 58q5 4 10 0" stroke="#1B1230" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M45 66q5 4 10 0" stroke="#1B1230" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M36 80q4 3 8 0" stroke="#1B1230" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M96 14l3.2 8.8 8.8 3.2-8.8 3.2-3.2 8.8-3.2-8.8-8.8-3.2 8.8-3.2z" fill="url(#lo-star-t)"/><circle cx="108" cy="46" r="2.4" fill="#fff" opacity=".85"/></g></svg>',
    eye:'<svg viewBox="0 0 120 120" fill="none"><path d="M12 60Q60 14 108 60Q60 106 12 60z" fill="#A78BFA"/><circle cx="60" cy="60" r="20" fill="#050408"/><circle cx="60" cy="60" r="10" fill="#C4B5FD"/><circle cx="68" cy="52" r="4" fill="#F8F0FB"/><path d="M30 40q30-22 60 0" stroke="#C4B5FD" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
    comet:'<svg viewBox="0 0 120 120" fill="none"><circle cx="78" cy="42" r="22" fill="#A78BFA"/><path d="M62 56L14 104" stroke="#C4B5FD" stroke-width="10" stroke-linecap="round"/><path d="M56 40L30 66" stroke="#A78BFA" stroke-width="6" stroke-linecap="round" opacity=".6"/><path d="M70 40q5 4 10 0" stroke="#050408" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M84 40q5 4 10 0" stroke="#050408" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="78" cy="50" r="3" fill="#C4B5FD"/></svg>'
  };
  var roster=document.getElementById('roster');
  if(roster && C.roster && C.roster.items) C.roster.items.forEach(function(it){
    var t=document.createElement('article'); t.className='tile glass'+(it.live?' live':' dim');
    var top=document.createElement('div'); var n=document.createElement('div'); n.className='num'; fill(n,it.num); top.appendChild(n);
    var sg=document.createElement('div'); sg.className='sign'; sg.innerHTML=signs[it.sign]||signs.crescent;
    var bot=document.createElement('div'); var h=document.createElement('h3'); fill(h,it.name); var p=document.createElement('p'); fill(p,it.desc);
    var st=document.createElement('div'); st.className='st'; if(it.live){ var d=document.createElement('span'); d.className='dot'; st.appendChild(d); } var sl=document.createElement('span'); fill(sl,it.status); st.appendChild(sl);
    bot.appendChild(h); bot.appendChild(p); bot.appendChild(st);
    t.appendChild(top); t.appendChild(sg); t.appendChild(bot); roster.appendChild(t);
  });

  // social
  var soc=document.getElementById('social');
  if(soc && C.social) C.social.forEach(function(l){ var a=document.createElement('a'); a.href=l.url; a.textContent=l.label; if(l.url.indexOf('mailto:')!==0){ a.target='_blank'; a.rel='noopener'; } soc.appendChild(a); });

  // photos
  document.querySelectorAll('.plate[data-photo]').forEach(function(plate){
    var p=(C.photos||{})[plate.getAttribute('data-photo')]; if(!p||!p.src) return;
    var img=plate.querySelector('img.photo'); img.onload=function(){ plate.classList.add('has-photo'); }; img.alt=p.caption||''; img.src=p.src;
  });

  // countdown to drop.dateISO (leave placeholder dashes until a real date is set)
  var cd=document.getElementById('count');
  if(cd && C.drop && C.drop.dateISO && !/\[/.test(C.drop.dateISO)){
    var target=new Date(C.drop.dateISO).getTime();
    var cells=cd.querySelectorAll('span');
    function tick(){ var d=Math.max(0,target-Date.now()); var days=Math.floor(d/864e5), hrs=Math.floor(d%864e5/36e5), min=Math.floor(d%36e5/6e4);
      [days,hrs,min].forEach(function(v,i){ cells[i].firstChild.nodeValue=String(v).padStart(2,'0'); }); }
    tick(); setInterval(tick,30000);
  }

  // form
  var form=document.getElementById('join-form');
  if(form && C.join){
    var action=C.join.formAction||'netlify', input=form.querySelector('input[type=email]');
    input.name=C.join.emailFieldName||'email';
    if(action==='netlify'){
      form.setAttribute('data-netlify','true'); form.setAttribute('netlify',''); form.setAttribute('data-netlify-honeypot','website');
      var hf=document.createElement('input'); hf.type='hidden'; hf.name='form-name'; hf.value='waitlist'; form.appendChild(hf);
      form.addEventListener('submit',function(e){
        e.preventDefault();
        if(form.querySelector('input[name=website]').value){ form.querySelector('button').textContent='saved'; return; }
        fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()})
          .then(function(){ form.querySelector('button').textContent='saved'; input.value=''; })
          .catch(function(){ form.querySelector('button').textContent='try again'; });
      });
    } else { form.action=action; form.target='_blank'; }
  }

  /* ---- motion ---- */
  // reveal: sections nudge up into place as they enter
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -10% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  // pinned story: light up the step nearest the middle of the screen
  var steps=Array.prototype.slice.call(document.querySelectorAll('#steps .step'));
  var so=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ steps.forEach(function(s){ s.classList.remove('on'); }); e.target.classList.add('on'); } }); },{rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(function(s){ so.observe(s); }); if(steps[0]) steps[0].classList.add('on');

  // custom cursor
  var cur=document.querySelector('.cursor');
  if(cur && !narrow.matches){
    window.addEventListener('mousemove',function(e){ cur.style.transform='translate('+e.clientX+'px,'+e.clientY+'px) translate(-50%,-50%)'; },{passive:true});
    document.querySelectorAll('a,button,.plate,.tile').forEach(function(el){
      el.addEventListener('mouseenter',function(){ cur.classList.add('on'); cur.querySelector('.lbl').textContent = el.classList.contains('plate') ? 'look' : (el.classList.contains('tile') ? 'soon' : 'open'); });
      el.addEventListener('mouseleave',function(){ cur.classList.remove('on'); });
    });
  }

  if(reduce) return;
  // hero chips drift with the mouse; the arch and story plate move gently with scroll
  var floats=Array.prototype.slice.call(document.querySelectorAll('[data-float]')).map(function(el){ return {el:el,f:parseFloat(el.getAttribute('data-float'))}; });
  var depths=Array.prototype.slice.call(document.querySelectorAll('[data-depth]')).map(function(el){ return {el:el,d:parseFloat(el.getAttribute('data-depth'))}; });
  var mx=0,my=0,ticking=false;
  function render(){
    if(!narrow.matches){
      floats.forEach(function(it){ it.el.style.transform='translate3d('+(mx*it.f).toFixed(1)+'px,'+(my*it.f*.7).toFixed(1)+'px,0)'; });
      var vh=window.innerHeight;
      depths.forEach(function(it){ var r=it.el.getBoundingClientRect(); var c=r.top+r.height/2-vh/2; it.el.style.transform='translate3d(0,'+(-c*it.d).toFixed(1)+'px,0)'; });
    } else { floats.concat(depths).forEach(function(it){ it.el.style.transform=''; }); }
    var sy=window.scrollY||0;
    bubbles.forEach(function(b){ var y=-(sy*b.d)%(window.innerHeight+300); b.el.style.transform='translate3d('+(mx*b.f).toFixed(1)+'px,'+(y+my*b.f*.5).toFixed(1)+'px,0)'; });
    ticking=false;
  }
  function req(){ if(!ticking){ ticking=true; requestAnimationFrame(render); } }
  window.addEventListener('mousemove',function(e){ mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2; req(); },{passive:true});
  window.addEventListener('scroll',req,{passive:true}); window.addEventListener('resize',req); render();
})();
