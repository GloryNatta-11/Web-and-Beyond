import {useState,useEffect,useRef} from 'react'

const EMAIL='glorynatta.11@gmail.com', PHONE='+91 94941 181881', WA='https://wa.me/919494181881'

/* ---------- hooks & small components ---------- */
function useInView(t=.2){
  const ref=useRef(null),[v,setV]=useState(false)
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:t});o.observe(ref.current);return()=>o.disconnect()},[t])
  return [ref,v]
}
const Reveal=({children,d=0,className=''})=>{const [r,v]=useInView(.12);return <div ref={r} className={`rv ${v?'in':''} ${className}`} style={{transitionDelay:d+'ms'}}>{children}</div>}

function Counter({to,suffix=''}){
  const [r,v]=useInView(.5),[n,setN]=useState(0)
  useEffect(()=>{if(!v)return;const t0=performance.now();let id;const f=t=>{const p=Math.min((t-t0)/1600,1);setN(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)id=requestAnimationFrame(f)};id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id)},[v,to])
  return <b ref={r}>{n}{suffix}</b>
}

function Typed({words}){
  const [t,setT]=useState('')
  useEffect(()=>{let i=0,j=0,del=false,id;const tick=()=>{const w=words[i];j+=del?-1:1;setT(w.slice(0,j));let d=del?40:90;if(!del&&j===w.length){del=true;d=1400}else if(del&&j===0){del=false;i=(i+1)%words.length;d=300}id=setTimeout(tick,d)};tick();return()=>clearTimeout(id)},[words])
  return <span className="grad">{t}<i className="caret"/></span>
}

function Card({children,style,className=''}){
  const move=e=>{const r=e.currentTarget.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,s=e.currentTarget.style
    s.setProperty('--x',x+'px');s.setProperty('--y',y+'px');s.setProperty('--rx',((y/r.height-.5)*-7)+'deg');s.setProperty('--ry',((x/r.width-.5)*7)+'deg')}
  const leave=e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')}
  return <div className={'card '+className} style={style} onMouseMove={move} onMouseLeave={leave}>{children}</div>
}

function Loader(){
  const [p,setP]=useState(0),[out,setOut]=useState(false)
  useEffect(()=>{const id=setInterval(()=>setP(x=>{if(x>=100){clearInterval(id);setTimeout(()=>setOut(true),250);return 100}return x+4}),50);return()=>clearInterval(id)},[])
  return <div className={'loader '+(out?'out':'')} aria-hidden="true"><div className="ring"><span>{p}%</span></div><p>WEB &amp; BEYOND</p></div>
}

/* ---------- data ---------- */
const SERVICES=[
  ['🖥️','Website creation & redesign','Modern, fast websites built to convert visitors into customers.','#6366F1','#4F46E5'],
  ['🚀','Landing pages','High-performing pages made for one goal: turning clicks into leads.','#EC4899','#DB2777'],
  ['🛒','E-commerce development','Secure, scalable online stores your customers enjoy using.','#F59E0B','#D97706'],
  ['⚛️','React web apps','Custom applications shaped around how your business works.','#22D3EE','#0891B2'],
  ['🔧','Maintenance & updates','Security, speed and updates handled so your site stays healthy.','#10B981','#059669'],
  ['📱','Mobile-responsive design','Looks and works great on every phone, tablet and screen.','#A855F7','#9333EA'],
  ['🎓','LMS & HubSpot setup','Courses, certificates, CRM, forms and automated follow-ups.','#F43F5E','#E11D48'],
  ['🎨','Flyers, cards & menus','Flyers, visiting cards, menus and event templates in your brand style.','#3B82F6','#2563EB'],
]
const PROJECTS=[
  ['Flowboard','Flowboard task app','A fast to-do app with realtime saving, built from idea to live demo.',['React','Vite','Firebase'],'https://flowboard-todo.vercel.app/','Live demo','linear-gradient(135deg,#6366F1,#22D3EE)'],
  ['Patsons Kitchen','Patsons Kitchen','A mobile-friendly restaurant website shaped around the client\'s brand and menu.',['Responsive','Client site','Netlify'],'https://patsons-kitchen.netlify.app/','Visit website','linear-gradient(135deg,#F59E0B,#EC4899)'],
  ['Brewers Maestro BBQ','Brewers Maestro BBQ','A bold, appetising website for a barbecue brand.',['Web design','Branding'],'https://brewersmaestrobbq.net','Visit website','linear-gradient(135deg,#EF4444,#F59E0B)'],
  ['80+ WordPress sites','Business websites at scale','Custom themes, Figma-perfect builds and safe migrations with zero data loss.',['WordPress','Elementor','ACF'],null,null,'linear-gradient(135deg,#10B981,#22D3EE)'],
  ['LMS automation','E-learning automation','Certificates, badges and completion tracking automated, cutting manual work by 60%.',['Open LMS','HubSpot','Power BI'],null,null,'linear-gradient(135deg,#A855F7,#EC4899)'],
]
const SKILLS=[['React & Vite',90],['WordPress & Elementor',95],['HubSpot CRM',90],['LMS administration',92],['HTML, CSS & JavaScript',92],['Testing & QA',88]]
// TODO: replace the sample testimonials with real client quotes
const QUOTES=[
  ['They turned our rough ideas into a website that looks premium and loads instantly. Customers notice the difference.','Client name','Restaurant owner'],
  ['Delivered on time, answered every message and moved our site without losing a single page.','Client name','Small business owner'],
  ['Our HubSpot forms and course certificates now run on their own. It saved our team hours every week.','Client name','Training company'],
]

function Logo(){return <a className="logo" href="#/" aria-label="Web & Beyond home">
  <svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="wbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6366F1"/><stop offset=".5" stopColor="#A855F7"/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs>
    <rect width="48" height="48" rx="14" fill="url(#wbg)"/><path d="M11 16 17.5 33 24 20 30.5 33 37 16" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path className="orb" d="M6 31Q24 46 42 22" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round"/><circle className="spark" cx="42" cy="22" r="2.8" fill="#FBBF24"/></svg>
  <span>Web <em>&amp;</em> Beyond</span></a>}

/* ---------- sections ---------- */
function Skill({name,v}){
  const [r,vis]=useInView(.4)
  return <div ref={r}><b>{name}<span>{v}%</span></b><div className="bar"><i style={{width:vis?v+'%':0}}/></div></div>
}

function Testimonials(){
  const [i,setI]=useState(0)
  useEffect(()=>{const id=setInterval(()=>setI(x=>(x+1)%QUOTES.length),5500);return()=>clearInterval(id)},[i])
  return <>
    <div className="tw">{QUOTES.map(([q,n,r],k)=><div key={k} className={'q '+(k===i?'on':'')}><div className="st">★★★★★</div><blockquote>“{q}”</blockquote><cite>{n}<span>{r}</span></cite></div>)}</div>
    <div className="dts">{QUOTES.map((_,k)=><button key={k} className={k===i?'on':''} onClick={()=>setI(k)} aria-label={'Testimonial '+(k+1)}/>)}</div>
  </>
}

function Work(){
  const t=useRef(null),go=n=>{const c=t.current.firstElementChild;t.current.scrollBy({left:n*(c.offsetWidth+22),behavior:'smooth'})}
  return <section id="work"><div className="wrap">
    <div className="top"><div><h2>Work we're proud of</h2></div><div className="arr"><button onClick={()=>go(-1)} aria-label="Previous">←</button><button onClick={()=>go(1)} aria-label="Next">→</button></div></div>
    <div className="track" ref={t}>{PROJECTS.map(([s,h,p,tags,url,cta,bg])=><article className="proj" key={h}>
      <div className="shot" style={{'--pg':bg}}>{s}</div>
      <div className="pb"><h3>{h}</h3><p>{p}</p><div className="tags">{tags.map(x=><span key={x}>{x}</span>)}</div>{url&&<a href={url} target="_blank" rel="noopener">{cta} ↗</a>}</div></article>)}</div>
  </div></section>
}

function CTA(){return <section style={{paddingTop:30}}><div className="wrap"><Reveal><div className="ban"><h2>Let's build your success together</h2><p>Premium designs, on-time delivery, affordable packages and personal support.</p><a className="btn" href="#/contact">Get a free quote</a></div></Reveal></div></section>}

function Home(){return <div className="page">
  <section className="hero"><div className="blob" style={{width:380,height:380,background:'#6366F1',left:-100,top:60}}/><div className="blob" style={{width:340,height:340,background:'#EC4899',right:-60,top:240,animationDelay:'-5s'}}/>
    <div className="wrap">
      <div><div className="pill"><i/>Taking new projects</div>
        <h1>We design &amp; build <Typed words={['websites.','online stores.','web apps.','brands.']}/></h1>
        <p className="lead">Web &amp; Beyond is your digital partner for a brighter tomorrow. Modern websites, creative designs and smart automation that help your business grow.</p>
        <div className="row"><a className="btn p" href="#/contact">Start your project</a><a className="btn g" href="#work" onClick={e=>{e.preventDefault();document.getElementById('work').scrollIntoView({behavior:'smooth'})}}>See our work</a></div>
        <div className="nums"><div><Counter to={80} suffix="+"/>Websites launched</div><div><Counter to={5} suffix="+"/>Years of experience</div><div><Counter to={60} suffix="%"/>Less manual work</div></div></div>
      <div className="stage" aria-hidden="true">
        <div className="code"><div className="dots"><i style={{background:'#F43F5E'}}/><i style={{background:'#FBBF24'}}/><i style={{background:'#34D399'}}/></div>
          <span className="k">const</span> <span className="f">project</span> = {'{'}<br/>&nbsp;&nbsp;design: <span className="s">"beautiful"</span>,<br/>&nbsp;&nbsp;speed: <span className="s">"instant"</span>,<br/>&nbsp;&nbsp;mobile: <span className="y">true</span>,<br/>&nbsp;&nbsp;results: <span className="s">"growth"</span><br/>{'}'}<br/><span className="k">await</span> <span className="f">launch</span>(project) 🚀</div>
        <div className="fb a">⚛️ React</div><div className="fb b">⭐ 100% responsive</div><div className="fb c">⚡ Lightning fast</div>
      </div></div></section>
  <section id="services"><div className="wrap"><Reveal className="head"><h2>Everything your brand needs, <span className="grad">under one roof</span></h2><p>From the first sketch to a live website, we handle design, development and the details that keep it running.</p></Reveal>
    <div className="grid">{SERVICES.map(([ic,h,p,c,s],i)=><Reveal key={h} d={(i%4)*90}><Card><div className="ic" style={{'--ci':c,'--cs':s}}>{ic}</div><h3>{h}</h3><p>{p}</p></Card></Reveal>)}</div></div></section>
  <Work/>
  <section><div className="wrap"><Reveal className="head"><h2>Skills that <span className="grad">ship real results</span></h2><p>Frontend craft, CMS depth and a QA engineer's eye for detail on every build.</p></Reveal>
    <div className="sk">{SKILLS.map(([n,v])=><Skill key={n} name={n} v={v}/>)}</div></div></section>
  <section><div className="wrap"><Reveal className="head" ><h2>Kind words from clients</h2></Reveal><Testimonials/></div></section>
  <CTA/></div>}

function Avatar({src,name,initials,bg}){
  const [ok,setOk]=useState(true)
  return <div className="av" style={ok||!bg?undefined:{background:bg}}>{ok?<img src={src} alt={name} onError={()=>setOk(false)}/>:initials}</div>
}

function Timeline({items}){return <div className="tl">{items.map(([t,h,p])=><div key={h}><em>{t}</em><h3>{h}</h3><p>{p}</p></div>)}</div>}

function About(){return <div className="page">
  <div className="ph wrap"><h1>Two sisters. <span className="grad">One shared vision.</span></h1><p>Web &amp; Beyond is the studio of sisters Glory, an AI full stack developer, and Ann, a content developer. One builds, the other creates, and together we turn your ideas into websites and apps people love.</p></div>
  <section><div className="wrap two">
    <Reveal><h2>Our <span className="grad">story</span></h2>
      <p style={{marginTop:18}}>We are two sisters with one goal: to help people and businesses who want a trendy, modern presence online, without the stress and without the agency price tag.</p>
      <p style={{marginTop:14}}>Maybe you need a sleek website, a powerful web app, an event invite, a flyer or a menu card. Whatever it is, bring us your idea. Glory builds it, Ann shapes the words and visuals, and together we turn it into something beautiful that works.</p>
      <p style={{marginTop:14,color:'#fff',fontWeight:700,fontSize:'1.15rem'}}>Bring your idea. We'll turn it into reality.</p>
      <div className="tags" style={{marginTop:20,gap:10}}>{['Trendy & modern','Built with care','Personal support'].map(t=><span key={t} style={{padding:'9px 18px',fontSize:'.9rem'}}>{t}</span>)}</div></Reveal>
    <Reveal d={150}><div className="duo">
      <Card><Avatar src="/glory.png" name="Glory" initials="G"/><h3>Glory</h3><p>AI Full Stack Developer. Frontend, WordPress, HubSpot and AI-powered builds.</p></Card>
      <Card><Avatar src="/ann.png" name="Ann" initials="A" bg="linear-gradient(135deg,#F59E0B,#EC4899)"/><h3>Ann</h3><p>Content Developer. 10+ years creating text, images and designs that tell your story.</p></Card></div></Reveal>
  </div></section>
  <section style={{paddingTop:0}}><div className="wrap">
    <Reveal className="head"><h2>Experience behind <span className="grad">every project</span></h2></Reveal>
    <div className="two" style={{alignItems:'start'}}>
      <Reveal><h3 className="who">Glory · AI Full Stack Developer</h3><Timeline items={[
        ['2 YEARS','Freelance AI full stack developer','React, Vite and Firebase apps, client websites and automation tools built on the Claude AI API.'],
        ['5+ YEARS','WordPress developer & LMS administrator','80+ sites built with zero critical defects at launch, safe migrations and 60% less manual LMS work.'],
        ['JAN 2024 TO NOW','Power Apps developer','Canvas apps, Power Automate flows and Power BI dashboards.'],
        ['2020 TO 2023','QA engineer','Selenium, Postman and Jira testing for e-commerce platforms.']]}/></Reveal>
      <Reveal d={150}><h3 className="who">Ann · Content Developer</h3><Timeline items={[
        ['10+ YEARS','Content developer','Website copy, product and brand text, image editing and Canva designs for businesses across industries.'],
        ['2 YEARS','Freelance content developer','Content and creative assets for client websites, flyers, visiting cards, menus and event templates at Web & Beyond.']]}/></Reveal>
    </div></div></section>
  <section style={{paddingTop:0}}><div className="wrap"><Reveal className="head"><h2>Tools we work with</h2></Reveal>
    <Reveal><div className="tags" style={{gap:10}}>{['React','Vite','Firebase','WordPress','Elementor','ACF','WooCommerce','HubSpot','Open LMS','Figma','Canva','Power BI','Claude AI API','Content writing','Image design'].map(t=><span key={t} style={{padding:'9px 18px',fontSize:'.9rem'}}>{t}</span>)}</div>
    <div className="nums" style={{marginTop:40}}><div><Counter to={10} suffix="+"/>Years of content experience</div><div><Counter to={80} suffix="+"/>Websites built</div><div><Counter to={60} suffix="%"/>LMS workload cut</div></div></Reveal></div></section>
  <CTA/></div>}

function Contact(){
  const [st,setSt]=useState('idle')
  async function submit(e){
    e.preventDefault();setSt('sending')
    const d=new FormData(e.target)
    try{
      d.append('access_key','8989f9ec-2269-4f88-8819-8837a94f3184')
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:d})
      const j=await r.json()
      if(!j.success)throw 0
      setSt('ok')
    }catch{setSt('err')}
  }
  return <div className="page">
    <div className="ph wrap"><h1>Tell us about <span className="grad">your project</span></h1><p>Fill in the form and we'll get back to you within one working day.</p></div>
    <section style={{paddingTop:40}}><div className="wrap cg">
      <div className="info">
        <a href="tel:+919494181881"><div className="ic" style={{'--ci':'#6366F1','--cs':'#4F46E5'}}>📞</div><div><small>Call us</small>{PHONE}</div></a>
        <a href={WA} target="_blank" rel="noopener"><div className="ic" style={{'--ci':'#10B981','--cs':'#059669'}}>💬</div><div><small>WhatsApp</small>{PHONE}</div></a>
        <a href={'mailto:'+EMAIL}><div className="ic" style={{'--ci':'#EC4899','--cs':'#DB2777'}}>✉️</div><div><small>Email</small>{EMAIL}</div></a>
        <a href="https://www.linkedin.com/in/glory-n-6b01923a3" target="_blank" rel="noopener"><div className="ic" style={{'--ci':'#3B82F6','--cs':'#2563EB'}}>in</div><div><small>LinkedIn</small>Connect with Glory</div></a>
      </div>
      {st==='ok'?<div className="ok"><div className="tick">✓</div><h3>Message sent</h3><p>Thank you. We'll reply within one working day.</p></div>:
      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
        <input type="hidden" name="form-name" value="contact"/>
        <p className="hp"><label>Leave empty<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
        <div className="f2"><label>Your name<input name="name" required autoComplete="name" placeholder="Jane Doe"/></label><label>Email address<input type="email" name="email" required autoComplete="email" placeholder="jane@company.com"/></label></div>
        <div className="f2"><label>Phone (optional)<input type="tel" name="phone" autoComplete="tel" placeholder="+91 ..."/></label>
          <label>What do you need?<select name="service">{['New website','Website redesign','Landing page','E-commerce store','Web app','HubSpot or LMS setup','Flyers, cards or menus','Something else'].map(o=><option key={o}>{o}</option>)}</select></label></div>
        <label>Your message<textarea name="message" required placeholder="Tell us about your business, goals and timeline"/></label>
        <button className="btn p" type="submit" disabled={st==='sending'}>{st==='sending'?'Sending...':'Send message'}</button>
        {st==='err'&&<p className="err">Something went wrong. Please email {EMAIL} or message us on WhatsApp.</p>}
      </form>}
    </div></section></div>}

/* ---------- app shell ---------- */
export default function App(){
  const [route,setRoute]=useState(()=>location.hash.replace(/^#\/?/,'')||'home'),[open,setOpen]=useState(false),[sc,setSc]=useState(false)
  useEffect(()=>{
    const h=()=>{setRoute(location.hash.replace(/^#\/?/,'').split('#')[0]||'home');setOpen(false);scrollTo(0,0)}
    const s=()=>setSc(scrollY>20)
    const m=e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')}
    addEventListener('hashchange',h);addEventListener('scroll',s,{passive:true});addEventListener('mousemove',m)
    return()=>{removeEventListener('hashchange',h);removeEventListener('scroll',s);removeEventListener('mousemove',m)}
  },[])
  const page=['about','contact'].includes(route)?route:'home'
  useEffect(()=>{document.title={home:'Web & Beyond — We design. We build. You grow.',about:'About us — Web & Beyond',contact:'Contact us — Web & Beyond'}[page]},[page])
  const L=({to,children,cls=''})=><a href={'#/'+(to==='home'?'':to)} className={cls+(page===to&&!cls?' on':'')}>{children}</a>
  return <>
    <Loader/><div className="glow"/>
    <header className={'nav '+(sc?'sc':'')}><div className="wrap">
      <Logo/>
      <button className="burger" onClick={()=>setOpen(!open)} aria-label="Menu">☰</button>
      <nav className={'links '+(open?'open':'')}><L to="home">Home</L><L to="about">About us</L><L to="contact" cls="cta">Contact us</L></nav>
    </div></header>
    <main key={page}>{page==='home'?<Home/>:page==='about'?<About/>:<Contact/>}</main>
    <footer><div className="wrap"><div><Logo/><p style={{marginTop:12}}>We design. We build. You grow.</p></div>
      <div><a href="#/">Home</a><br/><a href="#/about">About us</a><br/><a href="#/contact">Contact us</a></div>
      <div>{EMAIL}</div><small>© {new Date().getFullYear()} Web &amp; Beyond. All rights reserved.</small></div></footer>
    <a className="wa" href={WA} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">💬</a>
  </>
}
