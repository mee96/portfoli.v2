<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=a8c4f0&height=180&section=header&text=Carme%20Medina%20%E2%80%94%20Portfolio%20V2&fontColor=1b2e4b&fontSize=32&desc=Mateix%20rigor.%20Un%20altre%20banc%20de%20feina.&descSize=16&descColor=1b2e4b&descAlignY=65&fontAlignY=42" width="100%" alt="Carme Medina — Portfolio V2" />

<br/>

<img src="frontend/public/Cat%20Spinning%20Sticker%20by%20Pusheen.gif" width="64px" alt=""/>
&nbsp;&nbsp;
<img src="frontend/public/Embarrassed%20Video%20Games%20Sticker%20by%20Pusheen.gif" width="64px" alt=""/>
<br/>
[![English](https://img.shields.io/badge/English-5b9bd5?style=flat-square)](README.md)
[![Español](https://img.shields.io/badge/Español-a8c4f0?style=flat-square&logoColor=1b2e4b)](README.es.md)
[![Català](https://img.shields.io/badge/Català-1b2e4b?style=flat-square)](#)

<br/><br/>

![Angular](https://img.shields.io/badge/Angular-22-a8c4f0?style=for-the-badge&logo=angular&logoColor=1b2e4b)
![TypeScript](https://img.shields.io/badge/TypeScript-5b9bd5?style=for-the-badge&logo=typescript&logoColor=ffffff)
![FastAPI](https://img.shields.io/badge/FastAPI-1b2e4b?style=for-the-badge&logo=fastapi&logoColor=ffffff)
![Python](https://img.shields.io/badge/Python-3.11-1b2e4b?style=for-the-badge&logo=python&logoColor=ffffff)
![Groq](https://img.shields.io/badge/Groq-e0a63b?style=for-the-badge&logoColor=1b2e4b)
![Qdrant](https://img.shields.io/badge/Qdrant-b8e8d4?style=for-the-badge&logoColor=1b2e4b)
![WebSockets](https://img.shields.io/badge/WebSockets-5b9bd5?style=for-the-badge&logoColor=ffffff)
![Render](https://img.shields.io/badge/Render-1b2e4b?style=for-the-badge&logo=render&logoColor=ffffff)
![Keep-Alive](https://img.shields.io/badge/Keep--Alive-1b2e4b?style=for-the-badge&logo=githubactions&logoColor=ffffff)

<br/>

[![Demo en directe](https://img.shields.io/badge/🌐_Demo_en_directe-a8c4f0?style=flat-square&logoColor=1b2e4b)](https://carme-portfoli.onrender.com/)
&nbsp;
[![Salut del backend](https://img.shields.io/badge/📡_API_Health-b8e8d4?style=flat-square&logoColor=1b2e4b)](https://bunsen-backend.onrender.com/health)
&nbsp;
[![Issues](https://img.shields.io/badge/🐛_Issues-5b9bd5?style=flat-square&logoColor=ffffff)](https://github.com/mee96/portfoli.v2/issues)

</div>

<br/>

---

## <img src="https://api.iconify.design/ph/question-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Sobre el projecte

**Portfolio V2** és un lloc personal full-stack construït al voltant d'una sola idea: tres anys validant **assajos clínics RIA i EIA** en un laboratori, i després un canvi de carrera cap al desenvolupament de software — però el mètode no ha canviat. *Defineix la mostra, aplica el mètode, llegeix el resultat.*

Aquesta idea guia tota la interfície. Els projectes no es llisten: es **col·loquen en placa**. Una graella de 96 pous (`A1`–`H12`) amb l'aspecte d'una placa EIA real, on cada pou és un projecte lliurat i, en fer-hi clic, s'imprimeix la seva "lectura" (stack, enfocament, resultat). L'experiència està recolzada per **Bunsen**, un assistent de xat amb IA en streaming ("el secretari de Carme") que respon preguntes de les persones visitants sobre la seva feina fent servir un **pipeline RAG** real, basat en un corpus en primera persona — no una FAQ enllaunada.

Construït en solitari, de cap a cap: front en Angular 22, back en FastAPI, un protocol de xat per WebSocket fet des de zero, una capa de cerca vectorial a Qdrant Cloud, correu transaccional amb Resend, i i18n complet en **anglès, castellà i català** — sense cap llibreria d'i18n de tercers, un servei d'unes 30 línies en el seu lloc.

<br/>

---

## <img src="https://api.iconify.design/ph/stack-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Stack tecnològic i arquitectura

| Capa | Tecnologia |
| :--- | :--- |
| <img src="https://api.iconify.design/ph/desktop-tower-fill.svg?color=%235B9BD5&height=18" height="16"> **Frontend** | Angular 22 (standalone, signals, preparat per a zoneless) · TypeScript · SCSS · Vitest |
| <img src="https://api.iconify.design/ph/cpu-fill.svg?color=%231B2E4B&height=18" height="16"> **Backend** | FastAPI · Python 3.11 · Pydantic · Uvicorn |
| <img src="https://api.iconify.design/ph/robot-fill.svg?color=%23E0A63B&height=18" height="16"> **Capa d'IA** | Groq (`openai/gpt-oss-120b`) · chat completions en streaming sobre WebSockets |
| <img src="https://api.iconify.design/ph/magnifying-glass-fill.svg?color=%232FB5AE&height=18" height="16"> **RAG / Base vectorial** | Qdrant Cloud (Cloud Inference) · embeddings `intfloat/multilingual-e5-small` |
| <img src="https://api.iconify.design/ph/envelope-simple-fill.svg?color=%23FF6FA8&height=18" height="16"> **Correu transaccional** | Resend (lliurament del formulari de contacte) |
| <img src="https://api.iconify.design/ph/plugs-connected-fill.svg?color=%235B9BD5&height=18" height="16"> **Comunicació en temps real** | WebSockets natius (`/ws/secretari`), sense Socket.IO |
| <img src="https://api.iconify.design/ph/heart-straight-fill.svg?color=%23FF6FA8&height=18" height="16"> **Disponibilitat** | [`mee96/keep-alive`](https://github.com/mee96/keep-alive) — ping programat per evitar cold starts a Render |
| <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%231B2E4B&height=18" height="16"> **Desplegament** | Render (frontend + backend, tots dos com a web services) |

<br/>

---

## <img src="https://api.iconify.design/ph/image-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Vista prèvia

<div align="center">
<img src="docs/screenshots/overview.png" width="85%" alt="Vista completa del portfolio: hero, Plate map, experiència, skills, training log i contacte"/>

<sub>Vista completa del lloc en directe — hero, la graella de projectes de la Placa (projecte <code>B2</code>/BBT seleccionat), experiència, skills, training log i contacte.</sub>
</div>

<br/>

---

## <img src="https://api.iconify.design/ph/folder-fill.svg?color=%232FB5AE&height=24" height="22"> &nbsp;Estructura del projecte

<pre><code>portfoli.v2/
├── 🐍 backend/
│   ├── app/
│   │   ├── main.py          → App FastAPI, CORS, registre de routers, /health
│   │   ├── contact.py       → POST /contact → enviament de correu amb Resend
│   │   ├── groq_client.py   → Chat completions en streaming via Groq
│   │   ├── rag/
│   │   │   ├── embeddings.py → Prefixos E5 query:/passage: (forat de Cloud Inference)
│   │   │   ├── index.py      → CLI: reindexar corpus/*.md a Qdrant
│   │   │   └── search.py     → Cerca per similitud, llindar de 0.70
│   │   └── ws/
│   │       └── secretari.py  → WS /ws/secretari — el bucle de conversa de Bunsen
│   ├── corpus/                → L'"expedient" de Carme, un tema per fitxer
│   │   ├── 01-profesional.md
│   │   ├── 02-laboratorio.md
│   │   ├── 03-proyectos.md
│   │   ├── 04-tecnico.md
│   │   └── 05-personal.md
│   ├── docs/                  → Prompts de sistema (frontend / backend / secretario)
│   ├── requirements.txt
│   └── .env.example
│
└── 🅰️ frontend/
    ├── public/
    │   ├── cv/                 → CV_Carme_Medina_{EN,ES,CA}.pdf
    │   └── foto.jpg, *.gif      → assets renderitzats a Contacte + footer
    └── src/app/
        ├── core/
        │   ├── data/            → Contingut estàtic: projectes, experiència, skills, formació
        │   ├── models/
        │   └── services/        → TranslationService, WebSocketService
        ├── features/
        │   ├── hero/
        │   ├── plate/            → Graella interactiva de 96 pous + lectura
        │   ├── experience/
        │   ├── skills/
        │   ├── training-log/
        │   ├── secretari/        → Widget de xat de Bunsen (FAB + panell)
        │   └── contact/          → Formulari, descàrrega de CV, xarxes
        └── shared/
            ├── i18n/              → en.json / es.json / ca.json
            └── ui/                → button, chip, header, lang-switcher, log-entry, section-header</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Característiques clau

* <img src="https://api.iconify.design/ph/grid-nine-fill.svg?color=%232FB5AE&height=18" height="16"> **La Placa:** els projectes es representen com a pous d'una placa EIA de 96 (`A1`–`H12`), acolorits segons el tipus (app full-stack / capa d'IA / feina per a client) i llegits amb un estat de selecció guiat per un `computed()` amb signals.
* <img src="https://api.iconify.design/ph/robot-fill.svg?color=%23E0A63B&height=18" height="16"> **Bunsen, el secretari d'IA:** un xat per WebSocket que emet les respostes de Groq token a token, basat en una cerca RAG sobre un corpus personal — amb una salvaguarda explícita al prompt de sistema perquè no repeteixi la seva "broma del cafè" més de dues vegades per conversa.
* <img src="https://api.iconify.design/ph/magnifying-glass-fill.svg?color=%235B9BD5&height=18" height="16"> **RAG de debò, no una taula de cerca:** el corpus en markdown es trosseja per `## heading`, s'incrusta al servidor amb Qdrant Cloud Inference i es filtra amb un llindar de cosinus de 0.70 deliberadament laxa — una xarxa de seguretat per al "sense senyal", no un filtre de precisió (la responsabilitat de no inventar fets recau en el prompt de sistema, no en el cercador).
* <img src="https://api.iconify.design/ph/wifi-high-fill.svg?color=%231B2E4B&height=18" height="16"> **UX honesta davant el cold start:** el pla gratuït de Render fa que el backend trigui uns segons a despertar-se — el widget de xat escala el seu propi missatge d'espera als 3s i 15s en lloc de mostrar un spinner mut.
* <img src="https://api.iconify.design/ph/translate-fill.svg?color=%235B9BD5&height=18" height="16"> **i18n fet a mà:** anglès, castellà i català amb un `TranslationService` d'unes 30 línies (cerca per clau amb notació de punts sobre diccionaris JSON) — sense `@angular/localize`, sense cap runtime d'i18n extern.
* <img src="https://api.iconify.design/ph/file-pdf-fill.svg?color=%23FF6FA8&height=18" height="16"> **Descàrrega de CV segons l'idioma:** l'enllaç del CV és un signal `computed()` que canvia el PDF (`CV_Carme_Medina_{EN|ES|CA}.pdf`) segons l'idioma actiu de la interfície.
* <img src="https://api.iconify.design/ph/envelope-fill.svg?color=%232FB5AE&height=18" height="16"> **Formulari de contacte funcional:** Reactive Forms → FastAPI → Resend, amb reply-to configurat a l'adreça de la persona visitant.
* <img src="https://api.iconify.design/ph/check-square-fill.svg?color=%23B372CF&height=18" height="16"> **Amb tests unitaris:** 17 fitxers spec de Vitest que cobreixen components, serveis i integritat de dades, seguint les bones pràctiques d'Angular 22 (estat només amb signals, sense NgModules, `OnPush` per defecte, control de flux natiu).

<br/>

---

## <img src="https://api.iconify.design/ph/play-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Instal·lació i desenvolupament local

### Backend
<pre><code>cd backend
python -m venv venv
venv\Scripts\activate        # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env         # omple les credencials de sota
uvicorn app.main:app --reload</code></pre>

> Opcional: després d'editar qualsevol fitxer de `corpus/*.md`, reindexa Qdrant amb `python -m app.rag.index`.

> **Cold starts:** en producció el backend corre en el pla gratuït de Render, que atura el servei quan està inactiu. [`mee96/keep-alive`](https://github.com/mee96/keep-alive) és un petit job programat que fa ping a `/health` a intervals per mantenir-lo despert — apunta'l a la teva pròpia URL de `/health` desplegada si en fas un fork i el desplegues pel teu compte; no cal per al desenvolupament local.

### Frontend
<pre><code>cd frontend
npm install
ng serve</code></pre>

> Obre `http://localhost:4200` — l'entorn de desenvolupament apunta a `http://localhost:8000` per a l'API, així que arrenca el backend en paral·lel perquè funcionin el formulari de contacte i el xat de Bunsen.

### Tests
<pre><code>cd frontend
ng test</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/sliders-horizontal-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Variables d'entorn

Crea `backend/.env` (vegeu `backend/.env.example`):

| Variable | Propòsit | Obligatòria |
| :--- | :--- | :---: |
| `GROQ_API_KEY` | Clau de l'API de Groq per a les crides al LLM de Bunsen | ✅ |
| `QDRANT_URL` | URL del clúster de Qdrant Cloud | ✅ |
| `QDRANT_API_KEY` | Clau de l'API de Qdrant Cloud | ✅ |
| `QDRANT_COLLECTION` | Nom de la col·lecció amb els fragments del corpus indexats | ✅ |
| `FRONTEND_ORIGIN` | Origen CORS permès per al frontend desplegat | ✅ |
| `RESEND_API_KEY` | Clau de l'API de Resend per a l'enviament del formulari de contacte | ✅ |

El frontend no té variables d'entorn en temps d'execució — `apiUrl`/`wsUrl` s'intercanvien en temps de compilació entre `environment.ts` i `environment.prod.ts` mitjançant els `fileReplacements` d'Angular.

<br/>

---

## <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Desplegament i disponibilitat

Tots dos serveis estan desplegats a **Render**: el [lloc en directe](https://carme-portfoli.onrender.com/) i l'[API del backend](https://bunsen-backend.onrender.com/health). Actualment no hi ha cap pipeline de CI en aquest repositori (`.github/workflows/` és buit) — els tests s'executen en local amb `ng test`.

El pla gratuït de Render atura els serveis quan estan inactius. Un pinger de keep-alive dedicat (abans una GitHub Action dins d'aquest repo, ara un projecte propi — [`mee96/keep-alive`](https://github.com/mee96/keep-alive)) fa ping periòdicament al backend per reduir els cold starts; el widget de xat també degrada amb elegància mostrant missatges d'espera esglaonats quan sí que passa un cold start.

<br/>

---

## <img src="https://api.iconify.design/ph/warning-fill.svg?color=%23E0A63B&height=24" height="22"> &nbsp;Limitacions conegudes

* **Sense persistència de l'historial de xat:** l'estat de la conversa de Bunsen viu a la memòria durant la vida d'una única connexió WebSocket — recarregar la pàgina comença una conversa nova.
* **Sense autenticació ni límit de peticions** a `/contact` ni a `/ws/secretari` — acceptable per a l'escala d'un lloc personal, no per a un producte públic.
* **Domini d'enviament compartit:** el formulari de contacte envia des de l'adreça de proves de Resend `onboarding@resend.dev`, a l'espera de verificar un domini propi.
* **Sense CI automatitzat:** el linting i els tests (`ng test`) s'executen només en local per ara, no a cada push/PR.
* **Sense fitxer `LICENSE`** encara al repositori.

<br/>

---

<div align="center">

<img src="frontend/public/Cat%20Spinning%20Sticker%20by%20Pusheen.gif" width="60px" alt=""/>

<br/>

<b>Construït en solitari, de cap a peus</b>

<br/><br/>

Desenvolupat per **Carme Medina Canalda**
*Full Stack Developer · Barcelona*

*"Mateix rigor. Un altre banc de feina."*

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-a8c4f0?style=flat-square&logo=linkedin&logoColor=1b2e4b)](https://www.linkedin.com/in/carme-medina-canalda-250457132/)
[![GitHub](https://img.shields.io/badge/GitHub-1b2e4b?style=flat-square&logo=github&logoColor=ffffff)](https://github.com/mee96)
[![Portfolio](https://img.shields.io/badge/Portfolio-5b9bd5?style=flat-square&logoColor=ffffff)](https://carme-portfoli.onrender.com/)

</div>
