<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=a8c4f0&height=180&section=header&text=Carme%20Medina%20%E2%80%94%20Portfolio%20V2&fontColor=1b2e4b&fontSize=32&desc=Same%20rigour.%20Different%20bench.&descSize=16&descColor=1b2e4b&descAlignY=65&fontAlignY=42" width="100%" alt="Carme Medina — Portfolio V2" />

<br/><br/>

<img src="frontend/public/Cat%20Spinning%20Sticker%20by%20Pusheen.gif" width="50" align="middle" alt=""/> &nbsp; <a href="README.md"><img src="https://img.shields.io/badge/English-1b2e4b?style=flat-square" alt="English"></a> <a href="README.es.md"><img src="https://img.shields.io/badge/Espa%C3%B1ol-a8c4f0?style=flat-square&logoColor=1b2e4b" alt="Español"></a> <a href="README.ca.md"><img src="https://img.shields.io/badge/Catal%C3%A0-5b9bd5?style=flat-square" alt="Català"></a> &nbsp; <img src="frontend/public/Embarrassed%20Video%20Games%20Sticker%20by%20Pusheen.gif" width="50" align="middle" alt=""/>

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

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-a8c4f0?style=flat-square&logoColor=1b2e4b)](https://carme-portfoli.onrender.com/)
&nbsp;
[![Backend Health](https://img.shields.io/badge/📡_API_Health-b8e8d4?style=flat-square&logoColor=1b2e4b)](https://bunsen-backend.onrender.com/health)
&nbsp;
[![Issues](https://img.shields.io/badge/🐛_Issues-5b9bd5?style=flat-square&logoColor=ffffff)](https://github.com/mee96/portfoli.v2/issues)

</div>

<br/>

---

## <img src="https://api.iconify.design/ph/question-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;About the project

**Portfolio V2** is a full-stack personal site built around a single conceit: three years spent validating **RIA and EIA clinical assays** in a lab, then a career change into software — but the method never changed. *Define the sample, run the method, read the result.*

That idea drives the whole UI. Projects aren't listed — they're **plated**: a 96-well grid (`A1`–`H12`) styled after a real EIA plate, where each well is a shipped project and clicking one prints its "reading" (stack, approach, outcome). The experience is backed by **Bunsen**, a streaming AI chat assistant ("Carme's secretary") that answers visitor questions about her work using a real **RAG pipeline** grounded in a first-person corpus, not a canned FAQ.

Built solo, end to end: Angular 22 front, FastAPI back, a from-scratch WebSocket chat protocol, a vector-search layer on Qdrant Cloud, transactional email via Resend, and full **English / Spanish / Catalan** i18n — no third-party i18n library, a ~30-line service instead.

<br/>

---

## <img src="https://api.iconify.design/ph/stack-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Tech stack & architecture

| Layer | Technology |
| :--- | :--- |
| <img src="https://api.iconify.design/ph/desktop-tower-fill.svg?color=%235B9BD5&height=18" height="16"> **Frontend** | Angular 22 (standalone, signals, zoneless-ready) · TypeScript · SCSS · Vitest |
| <img src="https://api.iconify.design/ph/cpu-fill.svg?color=%231B2E4B&height=18" height="16"> **Backend** | FastAPI · Python 3.11 · Pydantic · Uvicorn |
| <img src="https://api.iconify.design/ph/robot-fill.svg?color=%23E0A63B&height=18" height="16"> **AI layer** | Groq (`openai/gpt-oss-120b`) · streaming chat completions over WebSockets |
| <img src="https://api.iconify.design/ph/magnifying-glass-fill.svg?color=%232FB5AE&height=18" height="16"> **RAG / Vector DB** | Qdrant Cloud (Cloud Inference) · `intfloat/multilingual-e5-small` embeddings |
| <img src="https://api.iconify.design/ph/envelope-simple-fill.svg?color=%23FF6FA8&height=18" height="16"> **Transactional email** | Resend (contact form delivery) |
| <img src="https://api.iconify.design/ph/plugs-connected-fill.svg?color=%235B9BD5&height=18" height="16"> **Real-time comms** | Native WebSockets (`/ws/secretari`), no Socket.IO |
| <img src="https://api.iconify.design/ph/heart-straight-fill.svg?color=%23FF6FA8&height=18" height="16"> **Uptime** | [`mee96/keep-alive`](https://github.com/mee96/keep-alive) — scheduled ping to prevent Render cold starts |
| <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%231B2E4B&height=18" height="16"> **Deploy** | Render (frontend + backend, both web services) |

<br/>

---

## <img src="https://api.iconify.design/ph/image-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Preview

<div align="center">
<img src="docs/screenshots/overview.png" width="90%" alt="Full-page overview of the portfolio: hero, Plate map, experience, skills, training log and contact"/>

<sub><b>Fig. 1</b> — Full interface overview: hero, the Plate project grid (project <code>B2</code>/BBT selected), experience, skills, training log and contact.</sub>
</div>

<br/>

---

## <img src="https://api.iconify.design/ph/folder-fill.svg?color=%232FB5AE&height=24" height="22"> &nbsp;Project structure

<pre><code>portfoli.v2/
├── 🐍 backend/
│   ├── app/
│   │   ├── main.py          → FastAPI app, CORS, router registration, /health
│   │   ├── contact.py       → POST /contact → Resend email delivery
│   │   ├── groq_client.py   → Streaming chat completions via Groq
│   │   ├── rag/
│   │   │   ├── embeddings.py → E5 query:/passage: prefixing (Cloud Inference gap)
│   │   │   ├── index.py      → CLI: reindex corpus/*.md into Qdrant
│   │   │   └── search.py     → Similarity search, 0.70 relevance threshold
│   │   └── ws/
│   │       └── secretari.py  → WS /ws/secretari — Bunsen's conversation loop
│   ├── corpus/                → Carme's own "case file", one topic per file
│   │   ├── 01-profesional.md
│   │   ├── 02-laboratorio.md
│   │   ├── 03-proyectos.md
│   │   ├── 04-tecnico.md
│   │   └── 05-personal.md
│   ├── docs/                  → System prompts (frontend / backend / secretario)
│   ├── requirements.txt
│   └── .env.example
│
└── 🅰️ frontend/
    ├── public/
    │   ├── cv/                 → CV_Carme_Medina_{EN,ES,CA}.pdf
    │   └── foto.jpg, *.gif      → assets rendered in Contact + footer
    └── src/app/
        ├── core/
        │   ├── data/            → Static content: projects, experience, skills, education
        │   ├── models/
        │   └── services/        → TranslationService, WebSocketService
        ├── features/
        │   ├── hero/
        │   ├── plate/            → 96-well interactive project grid + readout
        │   ├── experience/
        │   ├── skills/
        │   ├── training-log/
        │   ├── secretari/        → Bunsen chat widget (FAB + panel)
        │   └── contact/          → Form, CV download, socials
        └── shared/
            ├── i18n/              → en.json / es.json / ca.json
            └── ui/                → button, chip, header, lang-switcher, log-entry, section-header</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Key features

* <img src="https://api.iconify.design/ph/grid-nine-fill.svg?color=%232FB5AE&height=18" height="16"> **The Plate:** projects rendered as wells on a 96-well EIA plate (`A1`–`H12`), colour-coded by kind (full-stack app / AI layer / client work) and read via a signal-driven `computed()` selection state.
* <img src="https://api.iconify.design/ph/robot-fill.svg?color=%23E0A63B&height=18" height="16"> **Bunsen, the AI secretary:** a WebSocket chat that streams Groq completions token-by-token, grounded in a RAG search over a personal corpus — with an explicit system-prompt safeguard so it never mentions its running "coffee joke" more than twice per conversation.
* <img src="https://api.iconify.design/ph/magnifying-glass-fill.svg?color=%235B9BD5&height=18" height="16"> **Real RAG, not a lookup table:** corpus markdown is chunked by `## heading`, embedded server-side by Qdrant Cloud Inference, and filtered with a deliberately loose 0.70 cosine threshold — a safety net for "no signal," not a precision filter (the system prompt, not the retriever, is responsible for not inventing facts).
* <img src="https://api.iconify.design/ph/wifi-high-fill.svg?color=%231B2E4B&height=18" height="16"> **Honest cold-start UX:** Render's free tier means the backend can take a few seconds to wake up — the chat widget escalates its own waiting copy at 3s and 15s instead of showing a silent spinner.
* <img src="https://api.iconify.design/ph/translate-fill.svg?color=%235B9BD5&height=18" height="16"> **Hand-rolled i18n:** English, Spanish and Catalan via a ~30-line `TranslationService` (dot-path key lookup over JSON dictionaries) — no `@angular/localize`, no external i18n runtime.
* <img src="https://api.iconify.design/ph/file-pdf-fill.svg?color=%23FF6FA8&height=18" height="16"> **Language-aware CV download:** the CV link is a `computed()` signal that swaps the PDF (`CV_Carme_Medina_{EN|ES|CA}.pdf`) to match the active UI language.
* <img src="https://api.iconify.design/ph/envelope-fill.svg?color=%232FB5AE&height=18" height="16"> **Working contact form:** Reactive Forms → FastAPI → Resend, with reply-to set to the visitor's own address.
* <img src="https://api.iconify.design/ph/check-square-fill.svg?color=%23B372CF&height=18" height="16"> **Unit-tested:** 17 Vitest spec files covering components, services and data integrity, following Angular 22 best practices (signals-only state, no NgModules, `OnPush` by default, native control flow).

<br/>

---

## <img src="https://api.iconify.design/ph/play-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Installation & local development

### Backend
<pre><code>cd backend
python -m venv venv
venv\Scripts\activate        # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env         # fill in the credentials below
uvicorn app.main:app --reload</code></pre>

> Optional: after editing anything under `corpus/*.md`, reindex Qdrant with `python -m app.rag.index`.

> **Cold starts:** in production the backend runs on Render's free tier, which spins the service down when idle. [`mee96/keep-alive`](https://github.com/mee96/keep-alive) is a small scheduled job that pings `/health` on an interval to keep it warm — point it at your own deployed `/health` URL if you fork this and deploy it yourself; it isn't needed for local development.

### Frontend
<pre><code>cd frontend
npm install
ng serve</code></pre>

> Open `http://localhost:4200` — the dev environment points at `http://localhost:8000` for the API, so run the backend alongside it for the contact form and Bunsen chat to work.

### Tests
<pre><code>cd frontend
ng test</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/sliders-horizontal-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Environment variables

Create `backend/.env` (see `backend/.env.example`):

| Variable | Purpose | Required |
| :--- | :--- | :---: |
| `GROQ_API_KEY` | Groq API key powering Bunsen's LLM calls | ✅ |
| `QDRANT_URL` | Qdrant Cloud cluster URL | ✅ |
| `QDRANT_API_KEY` | Qdrant Cloud API key | ✅ |
| `QDRANT_COLLECTION` | Name of the collection holding indexed corpus chunks | ✅ |
| `FRONTEND_ORIGIN` | Allowed CORS origin for the deployed frontend | ✅ |
| `RESEND_API_KEY` | Resend API key for contact-form delivery | ✅ |

The frontend has no runtime env vars — `apiUrl`/`wsUrl` are compile-time swapped between `environment.ts` and `environment.prod.ts` via Angular's `fileReplacements`.

<br/>

---

## <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Deployment & availability

Both services are deployed on **Render**: the [live site](https://carme-portfoli.onrender.com/) and the [backend API](https://bunsen-backend.onrender.com/health). There's currently no CI pipeline in this repo (`.github/workflows/` is empty) — tests run locally via `ng test`.

Render's free tier spins services down when idle. A dedicated keep-alive pinger (previously an in-repo GitHub Action, now its own project — [`mee96/keep-alive`](https://github.com/mee96/keep-alive)) periodically hits the backend to reduce cold starts; the chat widget also degrades gracefully with staged waiting messages when a cold start does happen.

<br/>

---

## <img src="https://api.iconify.design/ph/warning-fill.svg?color=%23E0A63B&height=24" height="22"> &nbsp;Known limitations

* **No persistence for chat history:** Bunsen's conversation state lives in memory for the lifetime of a single WebSocket connection — refreshing the page starts a new conversation.
* **No authentication or rate limiting** on `/contact` or `/ws/secretari` — acceptable for a personal-site scale, not for a public product.
* **Shared sending domain:** the contact form sends via Resend's `onboarding@resend.dev` testing address pending a verified custom domain.
* **No automated CI:** linting and tests (`ng test`) currently run locally only, not on push/PR.
* **No `LICENSE` file yet** in the repository.

<br/>

---

<div align="center">

<img src="frontend/public/Cat%20Spinning%20Sticker%20by%20Pusheen.gif" width="60px" alt=""/>

<br/>

<b>Built solo, top to bottom</b>

<br/><br/>

Developed by **Carme Medina Canalda**
*Full Stack Developer · Barcelona*

*"Same rigour. Different bench."*

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-a8c4f0?style=flat-square&logo=linkedin&logoColor=1b2e4b)](https://www.linkedin.com/in/carme-medina-canalda-250457132/)
[![GitHub](https://img.shields.io/badge/GitHub-1b2e4b?style=flat-square&logo=github&logoColor=ffffff)](https://github.com/mee96)
[![Portfolio](https://img.shields.io/badge/Portfolio-5b9bd5?style=flat-square&logoColor=ffffff)](https://carme-portfoli.onrender.com/)

</div>
