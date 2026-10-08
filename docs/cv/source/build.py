import sys, html
from weasyprint import HTML
L={}
L['en']=dict(
 tag='from the lab to the code', portfolio='My portfolio', contact='Contact', stack='Stack',
 front='Frontend', back='Backend', test='Testing', data='Databases', ms='Microsoft', cms='CMS', tools='Tools & deploy', ai='AI', note='Demos on free hosting: the first load can take 30–50 s.', status='Looking for work · Remote / On-site in Spain',
 langs='Languages', langv=[('Catalan','Native'),('Spanish','Native'),('English','Advanced')],
 edu='Education', cert='Certifications', other='Other', licence='Driving licence (Cat. B)',
 profile='Profile', exp='Experience', proj='Selected projects', str='Strengths',
 profile_t="Junior full-stack developer who moved from the clinical lab to code. At Fundació Esplai I work daily with Angular and Microsoft 365, and I've built 6+ full-stack apps with Angular, FastAPI and React, several with AI. Three years of RIA/EIA assays gave me rigour and a method I now apply to every line of code.",
 jobs=[
  ('Junior Full Stack Developer','Mar 2026 – Present','Fundació Esplai — Talent IT',[
    'Angular data-modelling app for the whole Digital Transformation department: uses Microsoft Graph to send data into Microsoft 365 and automate tasks there, on a custom tenant and with Power Apps.',
    'Rebuilt a full WordPress site with custom plugins (HTML, CSS, PHP), working in a multidisciplinary team with weekly releases on Git/GitHub.']),
  ('Freelance Web Developer','2024 – 2025','Private client',[
    'Designed, built and deployed a responsive website for a private client end to end (HTML, CSS, JS, Vercel).']),
  ('Laboratory Technician','2021 – 2024','Unilabs · Synlab · Reference Laboratory',[
    'Ran RIA/EIA assays under strict protocols with zero margin for error; a methodical approach I now apply to code.']),
  ('Technical Support Agent','Jun 2019 – Jul 2021','Teleperformance',[
    'Inbound and outbound technical support calls and back-office email management.']),
 ],
 projs=[('Plantealo','plantealo-1.onrender.com','Plant-care PWA (team of 3); integrated an AI vision chat (Groq) that identifies plants from a photo.','Angular · FastAPI · PostgreSQL · Groq'),
  ('Real-time messenger','chat-frontend-o57q.onrender.com','WebSocket messaging with an AI assistant and RAG chatbot; fixed an OOM on the 512 MB tier by moving to Qdrant Cloud.','Angular 21 · FastAPI · Qdrant'),
  ('Portfolio v2','carme-portfoli.onrender.com','Angular portfolio with a custom AI assistant (RAG); independent frontend and backend in production.','Angular · FastAPI · SCSS'),
  ('Connect 4','conecta4-frontend.onrender.com','Real-time multiplayer game with an AI opponent (Groq) over WebSockets.','Angular · FastAPI · WebSockets')],
 edus=[('Dual Technical Diploma in Full Stack Development','Fundació Esplai — Talent IT','2026'),('Full-Stack Web Bootcamp','Adalab','2024'),('Big Data & AI','IOE Business School','2026'),('Programming Fundamentals · Java','IT Academy','2026'),('Higher Diploma, Clinical Lab','Escola Ramon i Cajal','2020')],
 strengths=['Attention to detail','Problem-solving','Teamwork','Fast learner','Communication','Organisation'])
L['es']=dict(L['en'],
 tag='del laboratorio al código', portfolio='Mi portfolio', contact='Contacto', stack='Stack', langs='Idiomas',
 langv=[('Catalán','Nativo'),('Castellano','Nativo'),('Inglés','Avanzado')], data='Bases de datos', ms='Microsoft', cms='CMS', tools='Herramientas y despliegue', ai='IA', note='Demos en alojamiento gratuito: la primera carga puede tardar entre 30 y 50 s.', status='En busca de empleo · Remoto / Presencial en España',
 edu='Formación', cert='Certificaciones', other='Otros', licence='Carné de conducir B',
 profile='Perfil', exp='Experiencia', proj='Proyectos destacados', str='Aptitudes',
 profile_t="Desarrolladora full stack junior que pasó del laboratorio clínico al código. En Fundació Esplai trabajo a diario con Angular y Microsoft 365, y he construido +6 apps full-stack con Angular, FastAPI y React, varias con IA. Tres años de análisis RIA/EIA me dieron rigor y un método que hoy aplico a cada línea de código.",
 jobs=[
  ('Desarrolladora Full Stack Junior','Mar 2026 – Actualidad','Fundació Esplai — Talent IT',[
    'App en Angular de modelado de datos para todo el departamento de Transformación Digital: usa Microsoft Graph para llevar datos a Microsoft 365 y automatizar tareas, sobre un tenant personalizado y con Power Apps.',
    'Rediseño completo de una web en WordPress con plugins propios (HTML, CSS, PHP), en un equipo multidisciplinar con despliegues semanales en Git/GitHub.']),
  ('Desarrolladora Web Freelance','2024 – 2025','Cliente privado',[
    'Diseñé, desarrollé y desplegué de principio a fin una web responsive para un cliente privado (HTML, CSS, JS, Vercel).']),
  ('Técnica de Laboratorio','2021 – 2024','Unilabs · Synlab · Reference Laboratory',[
    'Ejecuté análisis RIA/EIA bajo protocolos estrictos con cero margen de error; un método metódico que hoy aplico al código.']),
  ('Agente de Soporte Técnico','Jun 2019 – Jul 2021','Teleperformance',[
    'Llamadas de soporte técnico entrantes y salientes y gestión de back-office por correo.']),
 ],
 projs=[('Plantealo','plantealo-1.onrender.com','PWA de cuidado de plantas (equipo de 3); integré un chat de IA con visión (Groq) que identifica la planta por foto.','Angular · FastAPI · PostgreSQL · Groq'),
  ('Chat en tiempo real','chat-frontend-o57q.onrender.com','Mensajería WebSocket con asistente IA y chatbot RAG; resolví un OOM en el tier de 512 MB migrando a Qdrant Cloud.','Angular 21 · FastAPI · Qdrant'),
  ('Portfolio v2','carme-portfoli.onrender.com','Portfolio en Angular con asistente IA propio (RAG); frontend y backend independientes en producción.','Angular · FastAPI · SCSS'),
  ('Conecta 4','conecta4-frontend.onrender.com','Juego multijugador en tiempo real con oponente de IA (Groq) sobre WebSockets.','Angular · FastAPI · WebSockets')],
 edus=[('FP Dual · Full Stack Developer','Fundació Esplai — Talent IT','2026'),('Bootcamp Full Stack Web','Adalab','2024'),('Big Data & IA','IOE Business School','2026'),('Fundamentos de Programación · Java','IT Academy','2026'),('CFGS Laboratorio Clínico y Biomédico','Escola Ramon i Cajal','2020')],
 strengths=['Atención al detalle','Resolución de problemas','Trabajo en equipo','Aprendizaje rápido','Comunicación','Organización'])
L['ca']=dict(L['en'],
 tag='del laboratori al codi', portfolio='El meu portfolio', contact='Contacte', stack='Stack', langs='Idiomes',
 langv=[('Català','Natiu'),('Castellà','Natiu'),('Anglès','Avançat')], data='Bases de dades', ms='Microsoft', cms='CMS', tools='Eines i desplegament', ai='IA', note='Demos en allotjament gratuït: la primera càrrega pot trigar entre 30 i 50 s.', status='Buscant feina · Remot / Presencial a Espanya',
 edu='Formació', cert='Certificacions', other='Altres', licence='Carnet de conduir B',
 profile='Perfil', exp='Experiència', proj='Projectes destacats', str='Aptituds',
 profile_t="Desenvolupadora full stack júnior que va passar del laboratori clínic al codi. A Fundació Esplai treballo cada dia amb Angular i Microsoft 365, i he construït +6 apps full-stack amb Angular, FastAPI i React, diverses amb IA. Tres anys d'anàlisis RIA/EIA em van donar rigor i un mètode que ara aplico a cada línia de codi.",
 jobs=[
  ('Desenvolupadora Full Stack Júnior','Mar 2026 – Actualitat','Fundació Esplai — Talent IT',[
    "App en Angular de modelatge de dades per a tot el departament de Transformació Digital: fa servir Microsoft Graph per portar dades a Microsoft 365 i automatitzar tasques, sobre un tenant personalitzat i amb Power Apps.",
    "Redisseny complet d'una web en WordPress amb plugins propis (HTML, CSS, PHP), en un equip multidisciplinari amb desplegaments setmanals a Git/GitHub."]),
  ('Desenvolupadora Web Freelance','2024 – 2025','Client privat',[
    "Vaig dissenyar, desenvolupar i desplegar de principi a fi una web responsive per a un client privat (HTML, CSS, JS, Vercel)."]),
  ('Tècnica de Laboratori','2021 – 2024','Unilabs · Synlab · Reference Laboratory',[
    "Vaig executar anàlisis RIA/EIA sota protocols estrictes amb zero marge d'error; un mètode metòdic que ara aplico al codi."]),
  ('Agent de Suport Tècnic','Jun 2019 – Jul 2021','Teleperformance',[
    'Trucades de suport tècnic entrants i sortints i gestió de back-office per correu.']),
 ],
 projs=[('Plantealo','plantealo-1.onrender.com',"PWA de cura de plantes (equip de 3); vaig integrar un xat d'IA amb visió (Groq) que identifica la planta per foto.",'Angular · FastAPI · PostgreSQL · Groq'),
  ('Missatger a temps real','chat-frontend-o57q.onrender.com',"Missatgeria WebSocket amb assistent IA i chatbot RAG; vaig resoldre un OOM al tier de 512 MB migrant a Qdrant Cloud.",'Angular 21 · FastAPI · Qdrant'),
  ('Portfolio v2','carme-portfoli.onrender.com',"Portfolio en Angular amb assistent IA propi (RAG); frontend i backend independents en producció.",'Angular · FastAPI · SCSS'),
  ('Connecta 4','conecta4-frontend.onrender.com',"Joc multijugador a temps real amb rival d'IA (Groq) sobre WebSockets.",'Angular · FastAPI · WebSockets')],
 edus=[('FP Dual · Full Stack Developer','Fundació Esplai — Talent IT','2026'),('Bootcamp Full Stack Web','Adalab','2024'),('Big Data i IA','IOE Business School','2026'),('Fonaments de Programació · Java','IT Academy','2026'),('CFGS Laboratori Clínic i Biomèdic','Escola Ramon i Cajal','2020')],
 strengths=['Atenció al detall','Resolució de problemes',"Treball en equip",'Aprenentatge ràpid','Comunicació','Organització'])
STACK=[('front',['Angular','React','Next.js','TypeScript','JavaScript','HTML · CSS','SCSS','Ionic']),
 ('back',['Python','FastAPI','Node.js','WebSockets','Java']),
 ('cms',['WordPress','PHP','Elementor']),
 ('data',['MySQL','PostgreSQL','Firebase','Supabase','Aiven']),
 ('ms',['Microsoft Graph','Power Apps','Microsoft 365','Azure AI']),
 ('ai',['Claude','Groq · LLMs','RAG · Qdrant']),
 ('tools',['Git · GitHub','Render','Vercel','Figma','Scrum','Vitest'])]

def esc(s): return html.escape(s)
ICON={
 'pin':'<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
 'mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 'globe':'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 'gh':'<path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.2a4.8 4.8 0 0 0-1.3-3.3 4.5 4.5 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.5 4.5 0 0 0-.1 3.3A4.8 4.8 0 0 0 4 9.7c0 4.8 3 5.9 5.8 6.2a3 3 0 0 0-.8 2.3V21"/>',
 'in':'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5m0 2a2.5 2.5 0 0 1 5 0v3"/>',
}
def ic(n): return f'<svg viewBox="0 0 24 24" fill="none" stroke="#6d4bd8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{ICON[n]}</svg>'
def page(lang):
    d=L[lang]
    CL=[('pin','Barcelona',None),('mail','dev.mee96@gmail.com','mailto:dev.mee96@gmail.com'),('globe','carme-portfoli.onrender.com','https://carme-portfoli.onrender.com'),('gh','github.com/mee96','https://github.com/mee96'),('in','carme-medina-canalda','https://www.linkedin.com/in/carme-medina-canalda-250457132/')]
    contact=''.join(f'<li>{ic(i)}'+(f'<a href="{h}">{esc(t)}</a>' if h else f'<span>{esc(t)}</span>')+'</li>' for i,t,h in CL)
    stack=''.join(f'<h4>{esc(d[k])}</h4><div class="chips">'+''.join(f'<span>{esc(x)}</span>' for x in v)+'</div>' for k,v in STACK)
    langs=''.join(f'<div class="lr"><span>{esc(a)}</span><b>{esc(b)}</b></div>' for a,b in d['langv'])
    edus=''.join(f'<div class="ed"><b>{esc(a)}</b><i>{esc(b)} · <u>{esc(c)}</u></i></div>' for a,b,c in d['edus'])
    jobs=''.join(f'<div class="job"><div class="jh"><span class="dt">{esc(dt)}</span><h3>{esc(t)}</h3></div><div class="org">{esc(o)}</div><ul>'+''.join(f'<li>{esc(b)}</li>' for b in bl)+'</ul></div>' for t,dt,o,bl in d['jobs'])
    GH={'plantealo-1.onrender.com':'https://github.com/AlmaQm/Plantealo','chat-frontend-o57q.onrender.com':'https://github.com/mee96/Chat','carme-portfoli.onrender.com':'https://github.com/mee96/portfoli.v2','conecta4-frontend.onrender.com':'https://github.com/mee96/juego-conecta-4'}
    projs=''.join(f'<div class="pj"><div class="jh"><a class="url" href="https://{esc(u)}">{esc(u)}</a><h3>{esc(n)}</h3></div><p>{esc(t)}</p><div class="st"><a class="gh" href="{GH[u]}">GitHub</a>{esc(s)}</div></div>' for n,u,t,s in d['projs'])
    strs=''.join(f'<span>{esc(x)}</span>' for x in d['strengths'])
    return f'''<!doctype html><html lang="{lang}"><meta charset="utf-8"><style>
@font-face{{font-family:Brico;font-weight:600;src:url(bricolage-grotesque-latin-600-normal.woff2)}}
@font-face{{font-family:Brico;font-weight:800;src:url(bricolage-grotesque-latin-800-normal.woff2)}}
@font-face{{font-family:Public;font-weight:400;src:url(public-sans-latin-400-normal.woff2)}}
@font-face{{font-family:Public;font-weight:600;src:url(public-sans-latin-600-normal.woff2)}}
@font-face{{font-family:Mono;font-weight:400;src:url(martian-mono-latin-400-normal.woff2)}}
@font-face{{font-family:Mono;font-weight:500;src:url(martian-mono-latin-500-normal.woff2)}}
@page{{size:A4;margin:0}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:Public,sans-serif;font-size:8.6pt;color:#1b1726;line-height:1.38}}
.side{{position:absolute;left:0;top:0;bottom:0;width:69mm;background:#eeebfd;padding:9mm 6.5mm 6mm}}
.main{{position:absolute;left:69mm;right:0;top:0;padding:12mm 9mm 8mm 8mm}}
.photo{{width:21mm;height:21mm;border-radius:50%;border:1.2mm solid #e0539a;margin:0 auto 5mm;display:block;object-fit:cover}}
h2{{font-family:Mono;font-weight:500;font-size:6.6pt;letter-spacing:.22em;text-transform:uppercase;color:#6d4bd8;margin:4.2mm 0 1.6mm}}
.side h2:first-of-type{{margin-top:0}}
ul{{list-style:none;margin:0;padding:0}}
.contact li{{margin:1.1mm 0;font-size:8.2pt;white-space:nowrap}}
.contact svg{{display:inline-block;vertical-align:middle;width:3.3mm;height:3.3mm;margin-right:2mm;position:relative;top:-.2mm}}
h4{{font-weight:600;font-size:7.6pt;margin:2mm 0 .9mm}}
.chips{{display:flex;flex-wrap:wrap;gap:.9mm}}
.chips span,.str span{{border:.2mm solid #cfc9e8;background:#fff;border-radius:6mm;padding:.35mm 2.1mm;font-size:6.9pt}}
.oth{{display:flex;align-items:center;gap:3mm;margin-top:4mm}} .oth h2{{margin:0}}
.lr{{display:flex;justify-content:space-between;margin:.8mm 0}}
.ed{{margin:1.8mm 0}} .ed b{{display:block;font-weight:600;font-size:8pt;line-height:1.25}}
.ed i{{font-style:normal;color:#6b6580;font-size:7.4pt}} .ed u{{text-decoration:none;color:#6d4bd8;font-weight:600}}
.name{{font-family:Brico;font-weight:800;font-size:27pt;line-height:1.05;letter-spacing:-.02em;margin:0}}
.role{{font-family:Brico;font-weight:600;font-size:13.5pt;color:#6d4bd8;margin:1.2mm 0 1.6mm}}
.tag{{font-family:Mono;font-size:7pt;color:#8a849c;letter-spacing:.02em}}
.rule{{height:.9mm;margin:3mm 0 3.4mm;border-radius:1mm;background:linear-gradient(90deg,#8b5cf6,#ec5aa0 60%,#35d6d0)}}
.btn{{display:inline-block;background:linear-gradient(90deg,#7c5ce6,#e0539a);color:#fff;border-radius:6mm;padding:1.4mm 5mm;font-weight:600;font-size:8pt;text-decoration:none}}
.pill{{display:inline-block;border:.2mm solid #cfc9e8;border-radius:6mm;padding:1.3mm 4mm;font-family:Mono;font-size:6.8pt;color:#1b1726}}
.pill i{{display:inline-block;width:1.8mm;height:1.8mm;border-radius:50%;background:#35d6d0;margin-right:2mm}}
.main h2{{margin:5mm 0 1.8mm}}
.jh:after{{content:'';display:block;clear:both}} .jh .dt,.jh .url{{float:right;margin-top:.8mm}}
.job{{margin-bottom:3.2mm}} h3{{font-family:Brico;font-weight:600;font-size:10.4pt;margin:0}}
.dt{{font-family:Mono;font-size:6.9pt;color:#8a849c;white-space:nowrap}}
.org{{color:#6d4bd8;font-weight:600;font-size:8.6pt;margin:.4mm 0 1mm}}
.job li{{padding-left:3.2mm;position:relative;margin:.6mm 0}}
.job li:before{{content:"•";position:absolute;left:0;color:#1b1726}}
.pj{{border-left:.7mm solid #cfc9f0;padding-left:3mm;margin-bottom:2.8mm}}
.pj h3{{font-size:9.6pt}} .pj p{{margin:.4mm 0}} .contact a{{color:inherit;text-decoration:none}}
.url{{text-decoration:none;font-family:Mono;font-size:6.6pt;color:#e0539a}}
.st{{font-family:Mono;font-size:6.8pt;color:#6b6580}} .st:after{{content:'';display:block;clear:both}}
.gh{{float:right;color:#e0539a;text-decoration:none}}
.note{{margin:-.6mm 0 2.2mm;font-family:Mono;font-size:6.6pt;color:#8a849c}}
.str{{display:flex;flex-wrap:wrap;gap:1.4mm}}
</style><body>
<div class="side"><img class="photo" src="photo-000.jpg">
<h2>{esc(d['contact'])}</h2><ul class="contact">{contact}</ul>
<h2>{esc(d['stack'])}</h2>{stack}
<h2>{esc(d['langs'])}</h2>{langs}
<h2>{esc(d['edu'])}</h2>{edus}
<h2>{esc(d['cert'])}</h2><div class="ed"><b>Microsoft Certified: Azure AI Fundamentals</b><i>Microsoft</i></div>
<div class="oth"><h2>{esc(d['other'])}</h2><div class="chips"><span>{esc(d['licence'])}</span></div></div></div>
<div class="main"><p class="name">Carme Medina Canalda</p><p class="role">Full Stack Developer</p>
<div class="tag">Angular · FastAPI · React &nbsp;—&nbsp; {esc(d['tag'])}</div><div class="rule"></div>
<span class="pill"><i></i>{esc(d['status'])}</span>
<h2>{esc(d['profile'])}</h2><p style="margin:0">{esc(d['profile_t'])}</p>
<h2>{esc(d['exp'])}</h2>{jobs}
<h2>{esc(d['proj'])}</h2><p class="note">{esc(d['note'])}</p>{projs}
<h2>{esc(d['str'])}</h2><div class="str">{strs}</div></div></body></html>'''
for lang in ('en','es','ca'):
    open(f'cv_{lang}.html','w',encoding='utf-8').write(page(lang))
    HTML(f'cv_{lang}.html',base_url='.').write_pdf(f'out_{lang}.pdf')
    print(lang,'ok')
