/* LOADER */
window.addEventListener('load',()=>setTimeout(()=>{ document.getElementById('loader').classList.add('hidden'); drawAll(); },1600));

/* CURSOR */
const cur=document.getElementById('cursor'),fol=document.getElementById('cursorFollower');
let mX=0,mY=0,fX=0,fY=0;
document.addEventListener('mousemove',e=>{ mX=e.clientX;mY=e.clientY;cur.style.left=mX+'px';cur.style.top=mY+'px'; });
(function loop(){ fX+=(mX-fX)*.12;fY+=(mY-fY)*.12;fol.style.left=fX+'px';fol.style.top=fY+'px';requestAnimationFrame(loop); })();
document.querySelectorAll('a,button,.benefit-card,.review-card,.gallery-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cur.style.width='20px';cur.style.height='20px';fol.style.width='60px';fol.style.height='60px';fol.style.borderColor='#111'; });
  el.addEventListener('mouseleave',()=>{ cur.style.width='10px';cur.style.height='10px';fol.style.width='36px';fol.style.height='36px';fol.style.borderColor='var(--gray-400)'; });
});

/* NAV */
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>50));

/* MOBILE MENU */
function toggleMobile(){ const m=document.getElementById('mobileMenu'),h=document.getElementById('hamburger'); m.classList.toggle('open');h.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''; }
function closeMobile(){ document.getElementById('mobileMenu').classList.remove('open');document.getElementById('hamburger').classList.remove('open');document.body.style.overflow=''; }

/* REVEAL */
const obs=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting)e.target.classList.add('visible'); }),{threshold:.12});
document.querySelectorAll('.reveal,.step').forEach(el=>obs.observe(el));

/* FAQ */
function toggleFaq(btn){ const item=btn.closest('.faq-item'),answer=item.querySelector('.faq-answer'),isOpen=item.classList.contains('open'); document.querySelectorAll('.faq-item.open').forEach(i=>{ i.classList.remove('open');i.querySelector('.faq-answer').style.maxHeight=null; }); if(!isOpen){ item.classList.add('open');answer.style.maxHeight=answer.scrollHeight+'px'; } }

/* PARTICLES */
const pc=document.getElementById('particles');
for(let i=0;i<16;i++){ const p=document.createElement('div');p.classList.add('particle');p.style.left=Math.random()*100+'vw';p.style.width=p.style.height=(Math.random()*4+2)+'px';p.style.animationDuration=(Math.random()*12+10)+'s';p.style.animationDelay=(Math.random()*10)+'s';p.style.opacity=Math.random()*.35+.08;pc.appendChild(p); }

/* COUNTER */
function animCount(el,target){ let s=0;const step=target/55;const t=setInterval(()=>{ s+=step;if(s>=target){el.textContent=target;clearInterval(t);return;}el.textContent=Math.floor(s); },22); }
new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.querySelectorAll('.stat-num').forEach(el=>{ const n=parseInt(el.textContent);if(!isNaN(n))animCount(el,n); }); } }),{threshold:.3}).observe(document.querySelector('.about-stats'));

/* VIDEO */
function playVideo(){
  // Replace 'YOUR_YOUTUBE_VIDEO_ID' with actual ID, e.g. 'dQw4w9WgXcQ'
  const videoId = 'KYHFIkzdE_0';
  const embed=document.getElementById('videoEmbed');
  embed.src=`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  embed.style.display='block';
  document.getElementById('videoPlaceholder').style.display='none';
}

/* CANVAS HELPERS */
function rr(ctx,x,y,w,h,r){
  if(typeof r==='number')r={tl:r,tr:r,br:r,bl:r};
  ctx.beginPath();ctx.moveTo(x+r.tl,y);ctx.lineTo(x+w-r.tr,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r.tr);ctx.lineTo(x+w,y+h-r.br);ctx.quadraticCurveTo(x+w,y+h,x+w-r.br,y+h);ctx.lineTo(x+r.bl,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r.bl);ctx.lineTo(x,y+r.tl);ctx.quadraticCurveTo(x,y,x+r.tl,y);ctx.closePath();
}

function drawAll(){ drawG1();drawG2();drawG3();drawG4();drawVideoBg(); }

function drawG1(){
  const c=document.getElementById('gallery1');if(!c)return;
  const W=c.offsetWidth||300,H=c.offsetHeight||380;c.width=W;c.height=H;
  const ctx=c.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#f4f3f1');bg.addColorStop(1,'#e6e4e0');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  // Sofa
  const sx=W*.08,sy=H*.38,sw=W*.84,sh=H*.36;
  ctx.fillStyle='#ccc9c4';rr(ctx,sx,sy-sh*.62,sw,sh*.66,14);ctx.fill();
  ctx.fillStyle='#d8d5d0';rr(ctx,sx,sy,sw,sh*.42,8);ctx.fill();
  const cw=sw*.44;
  ctx.fillStyle='#e2deda';rr(ctx,sx+4,sy-sh*.58,cw,sh*.58,11);ctx.fill();rr(ctx,sx+sw-cw-4,sy-sh*.58,cw,sh*.58,11);ctx.fill();
  // Foam
  ctx.fillStyle='rgba(255,255,255,.65)';for(let i=0;i<22;i++){const bx=sx+Math.random()*sw,by=sy-sh*.28+Math.random()*sh*.5,br=Math.random()*8+3;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fill();}
  // Arms
  ctx.fillStyle='#c4c0bb';rr(ctx,sx,sy-sh*.3,sw*.12,sh*.7,8);ctx.fill();rr(ctx,sx+sw-sw*.12,sy-sh*.3,sw*.12,sh*.7,8);ctx.fill();
  // Legs
  ctx.fillStyle='#b0aca6';[[sx+16,sy+sh*.4],[sx+sw-26,sy+sh*.4]].forEach(([lx,ly])=>ctx.fillRect(lx,ly,10,H*.1));
}

function drawG2(){
  const c=document.getElementById('gallery2');if(!c)return;
  const W=c.offsetWidth||300,H=c.offsetHeight||380;c.width=W;c.height=H;
  const ctx=c.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#eeecea');bg.addColorStop(1,'#e0dedb');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.translate(W/2,H/2+15);
  const rw=W*.76,rh=H*.42;
  // Top face
  ctx.fillStyle='#edeae7';ctx.beginPath();ctx.moveTo(-rw*.5,-rh*.5);ctx.lineTo(rw*.5,-rh*.5);ctx.lineTo(rw*.46,rh*.08);ctx.lineTo(-rw*.46,rh*.08);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(180,175,170,.35)';ctx.lineWidth=1;ctx.stroke();
  // Quilting
  ctx.strokeStyle='rgba(200,196,192,.55)';ctx.lineWidth=.8;
  for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*rw*.2,-rh*.5);ctx.lineTo(i*rw*.2+rw*.04,rh*.08);ctx.stroke();}
  for(let j=-1;j<=1;j++){const ly=j*rh*.25;ctx.beginPath();ctx.moveTo(-rw*.5,ly);ctx.lineTo(rw*.5,ly);ctx.stroke();}
  // Foam
  ctx.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<18;i++){const bx=(Math.random()-.5)*rw*.9,by=(Math.random()-.5)*rh*.5,br=Math.random()*9+3;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fill();}
  // Side
  ctx.fillStyle='#d5d2cd';ctx.beginPath();ctx.moveTo(-rw*.46,rh*.08);ctx.lineTo(rw*.46,rh*.08);ctx.lineTo(rw*.46,rh*.28);ctx.lineTo(-rw*.46,rh*.28);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(160,155,150,.3)';ctx.lineWidth=.8;ctx.stroke();
  ctx.restore();
}

function drawG3(){
  const c=document.getElementById('gallery3');if(!c)return;
  const W=c.offsetWidth||300,H=c.offsetHeight||380;c.width=W;c.height=H;
  const ctx=c.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#f2f0ed');bg.addColorStop(1,'#e4e2de');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.translate(W/2,H/2+8);
  const rw=W*.72,rh=H*.52;
  ctx.save();ctx.scale(1,.16);const sgr=ctx.createRadialGradient(0,0,20,0,0,rw/2);sgr.addColorStop(0,'rgba(0,0,0,.18)');sgr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sgr;ctx.beginPath();ctx.ellipse(0,rh*6+22,rw/2,rw/2,0,0,Math.PI*2);ctx.fill();ctx.restore();
  const rug=ctx.createLinearGradient(-rw/2,0,rw/2,0);rug.addColorStop(0,'#c8c4be');rug.addColorStop(.3,'#d2cec8');rug.addColorStop(.7,'#ccc8c2');rug.addColorStop(1,'#c4c0ba');ctx.fillStyle=rug;rr(ctx,-rw/2,-rh/2,rw,rh,6);ctx.fill();
  ctx.strokeStyle='rgba(180,175,168,.38)';ctx.lineWidth=1;for(let i=0;i<4;i++){const ins=i*8;rr(ctx,-rw/2+ins,-rh/2+ins,rw-ins*2,rh-ins*2,4);ctx.stroke();}
  ctx.fillStyle='rgba(255,255,255,.72)';for(let i=0;i<24;i++){const bx=(Math.random()-.5)*rw*.88,by=(Math.random()-.5)*rh*.88,br=Math.random()*7+2;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}

function drawG4(){
  const c=document.getElementById('gallery4');if(!c)return;
  const W=c.offsetWidth||300,H=c.offsetHeight||380;c.width=W;c.height=H;
  const ctx=c.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#f8f7f5');bg.addColorStop(1,'#e8e6e3');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.translate(W/2,H/2+10);
  // Shoe shape (simplified)
  const sw=W*.6,sh=H*.24;
  ctx.fillStyle='#ffffff';
  ctx.beginPath();
  ctx.moveTo(-sw*.5,sh*.2);
  ctx.quadraticCurveTo(-sw*.5,-sh*.8,0,-sh*.7);
  ctx.quadraticCurveTo(sw*.5,-sh*.6,sw*.5,sh*.2);
  ctx.lineTo(sw*.5,sh*.4);
  ctx.lineTo(-sw*.5,sh*.4);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.1)';ctx.lineWidth=1;ctx.stroke();
  // Sole
  ctx.fillStyle='#f0f0f0';
  rr(ctx,-sw*.52,sh*.4,sw*1.04,sh*.3,4);
  ctx.fill();
  // Laces
  ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=1.5;
  for(let i=0;i<4;i++){ ctx.beginPath();ctx.moveTo(-sw*.2, -sh*.4+i*8);ctx.lineTo(sw*.1, -sh*.3+i*8);ctx.stroke(); }
  // Foam
  ctx.fillStyle='rgba(255,255,255,.8)';
  for(let i=0;i<15;i++){const bx=(Math.random()-.5)*sw,by=(Math.random()-.5)*sh,br=Math.random()*6+2;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}

function drawVideoBg(){
  const c=document.getElementById('videoCanvas');if(!c)return;
  const wrap=document.getElementById('videoWrapper');
  const W=wrap.offsetWidth||880,H=Math.round(W*9/16);
  c.width=W;c.height=H;c.style.width='100%';c.style.height='100%';
  const ctx=c.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#0c0c0c');bg.addColorStop(1,'#181818');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  [{x:.15*W,y:.3*H,r:130,a:.06},{x:.8*W,y:.7*H,r:170,a:.08},{x:.5*W,y:.5*H,r:210,a:.04},{x:.3*W,y:.8*H,r:85,a:.05},{x:.75*W,y:.2*H,r:95,a:.07}].forEach(l=>{ const g=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r);g.addColorStop(0,`rgba(200,196,190,${l.a})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H); });
  ctx.strokeStyle='rgba(255,255,255,.03)';ctx.lineWidth=1;
  for(let x=0;x<W;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(W/2,H/2,Math.min(W,H)*.18,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(W/2,H/2,Math.min(W,H)*.13,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(W/2,H/2,Math.min(W,H)*.07,.5,Math.PI*1.5);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.1)';ctx.font='500 10px DM Sans,sans-serif';ctx.textAlign='left';ctx.fillText('CLEAN · Vídeo Institucional',22,H-18);
  ctx.textAlign='right';ctx.fillText('Mousse Limpa a Seco',W-22,H-18);
}

let rTimer;window.addEventListener('resize',()=>{ clearTimeout(rTimer);rTimer=setTimeout(drawAll,180); });
