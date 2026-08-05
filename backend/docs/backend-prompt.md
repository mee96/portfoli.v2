# Backend del secretari — especificació completa

## Arquitectura
FastAPI independent dins `backend/`, mateix patró que ja tens al Chat
(WebSockets + Groq + Qdrant + fastembed), reaprofitant coneixement,
no codi copiat literalment.

## Prompt per a Claude Code

```
Crea el backend del secretari d'IA del portfolio dins backend/.

ESTRUCTURA
backend/
├── app/
│   ├── main.py              # FastAPI app, CORS, endpoint /health
│   ├── rag/
│   │   ├── embeddings.py    # fastembed amb model multilingüe
│   │   ├── search.py        # cerca a Qdrant amb umbral de similitud
│   │   └── index.py         # script per (re)indexar el corpus/
│   ├── ws/
│   │   └── secretari.py     # endpoint WebSocket /ws/secretari
│   └── groq_client.py       # crida a Groq amb streaming
├── corpus/                  # els 5 .md (ja te'ls passo jo per separat)
├── requirements.txt
└── .env.example

MODEL D'EMBEDDINGS
fastembed amb intfloat/multilingual-e5-small. Recorda que els models
e5 esperen els prefixos "query: " i "passage: " davant del text —
"query: " per a la pregunta de l'usuari, "passage: " per a cada
fragment indexat. Sense això la cerca dona resultats dolents encara
que el model sigui correcte.

INDEXAT (app/rag/index.py)
Script standalone (python -m app.rag.index) que:
1. Esborra la col·lecció existent a Qdrant Cloud (si hi és)
2. Llegeix tots els .md de corpus/, els parteix per capçalera "##"
   (cada secció és un chunk autocontingut, sense solapament)
3. Genera l'embedding de cada chunk amb el prefix "passage: "
4. Els puja a Qdrant amb el text original com a payload
Es re-executa manualment cada cop que es toca el corpus — no cal que
sigui automàtic ni disparat per l'API.

CERCA (app/rag/search.py)
Funció search(query: str, top_k: int = 5, threshold: float = 0.5)
que genera l'embedding de la pregunta amb "query: ", cerca a Qdrant,
i retorna només els resultats per sobre del threshold. Si cap
resultat el supera, retorna una llista buida — NO cridis mai Groq
amb context buit, això és el que evita que el secretari s'inventi
coses quan no sap la resposta.

ENDPOINT WEBSOCKET (app/ws/secretari.py)
/ws/secretari — cada connexió manté el seu propi historial de
conversa en memòria (una llista de missatges) mentre duri la
connexió; es perd en tancar-se, no cal persistir-lo enlloc.

Per cada missatge rebut:
1. Cerca a Qdrant amb la pregunta (search())
2. Munta el prompt de sistema (el tens al fitxer secretari-prompt.md
   que ja tinc escrit) + els fragments recuperats + l'historial de la
   conversa + el missatge nou
3. Crida Groq amb streaming (model "llama-3.3-70b-versatile"),
   enviant cada tros de resposta pel WebSocket a mesura que arriba
   (no esperis la resposta completa)
4. Un cop acabada, afegeix el torn a l'historial en memòria d'aquesta
   connexió

No calen límits de peticions ni rate-limiting per ara.

ENDPOINT /health
GET /health que simplement retorna {"status": "ok"}. Existeix només
perquè el frontend el cridi en silenci al carregar la pàgina i
"escalfi" el backend abans que l'usuari obri el xat (Render fa cold
start si el servei ha estat inactiu).

CORS
Permet el domini del frontend desplegat a Render (deixa'l com a
variable d'entorn FRONTEND_ORIGIN, no hardcoded).

.env.example
GROQ_API_KEY=
QDRANT_URL=
QDRANT_API_KEY=
FRONTEND_ORIGIN=

Confirma que el backend arrenca en local (uvicorn app.main:app
--reload), que l'script d'indexat corre sense error contra una
col·lecció de prova, i explica què has fet abans de fer commit.
```

## Notes per a tu (Carme), no per a Claude Code

- **Omple els `[CARME: ...]`** del corpus abans d'indexar-lo de veritat — sobretot "què busques laboralment" i "projecte favorit", que són les preguntes més probables.
- **Variables d'entorn a Render**: quan despleguis, `GROQ_API_KEY` i `QDRANT_API_KEY` van al panell de Render, mai al repositori.
- **Reindexar**: cada cop que canviïs un `.md` del corpus, torna a córrer `python -m app.rag.index` — no és automàtic.
