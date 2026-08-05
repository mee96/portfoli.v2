# Frontend del secretari — botó flotant + panell

Fes-ho quan el backend ja estigui desplegat i funcionant (o en local
apuntant a localhost:8000), ja que necessites la URL del WebSocket.

```
Crea SecretariComponent dins features/secretari/, un botó flotant
fix a la cantonada inferior dreta, visible a totes les seccions.

BOTÓ
Cercle fix (position: fixed, bottom/right ~24px), fons $ink, icona
(xat o poiata, tu decideixes), z-index alt perquè quedi per sobre de
tot. En clicar, obre/tanca el panell.

ESTIL DEL PANELL — consola de lectura

Contenidor: fons $ink, border-radius $radius, sense vora (el fons
fosc ja el separa prou de la pàgina).

Capçalera: padding 11px 14px, border-bottom 1px solid #3A3450
(un lila fosc, afegeix-lo com a token nou $ink-line a _variables.scss).
Conté "bunsen@carme:~$" en $font-mono, 0.6rem, letter-spacing .08em,
color $indigo, i un botó de tancar a la dreta en $ink-35.

Cos dels missatges: $font-mono, però a 0.8rem (NO més petit — el mono
sobre fons fosc necessita mida per llegir-se en paràgrafs llargs),
line-height 1.7, padding 14px.
- Missatges de Bunsen: color #E7E3F2, precedits d'un "›" en $cyan
- Missatges de l'usuari: color $eosin, precedits d'un "›" en $ink-35
- Separació entre torns: 10px

Cursor: mentre Bunsen escriu en streaming, un bloc de 6x13px en
$indigo al final del text, amb animació de parpelleig (opacity 1→0,
1s, steps(1), infinite). Desapareix quan acaba la resposta.
Respecta prefers-reduced-motion: sense parpelleig, cursor fix.

Input: border-top 1px solid $ink-line, $font-mono 0.8rem, fons
transparent, color $paper, cursor "_" com a placeholder, sense vora
pròpia ni border-radius — que sembli part de la consola.

Botó flotant: cercle fix a baix a la dreta, fons $ink, icona en
$indigo. Al hover, fons $indigo amb icona $paper.

PRE-ESCALFAMENT
En carregar l'app (a app.ts o un servei arrencat des d'allà), fes
una crida silenciosa GET {backendUrl}/health, ignorant la resposta
i qualsevol error — només per despertar el backend de Render abans
que l'usuari obri el xat.

CONNEXIÓ I STREAMING
Un WebSocketService (core/services/) que connecta a
{backendWsUrl}/ws/secretari només quan s'obre el panell per primer
cop (no a l'arrencada de l'app). Rep els trossos de text en
streaming i els va afegint al missatge en curs del secretari,
signal per signal (usa un signal amb l'últim missatge parcial).

MISSATGE DE COLD START
Si passen més de 3 segons sense resposta des que s'envia una
pregunta, mostra un missatge temporal (substituint els punts
suspensius d'"escrivint...") amb la clau i18n secretari.coldstart:
en: "Gone to grab a coffee — the server takes a few seconds to wake up."
es: "He ido a por un café — el servidor tarda unos segundos en despertarse."
ca: "He anat a buscar un cafè — el servidor triga uns segons a despertar-se."

Si passen 15 segons més sense resposta, un segon missatge,
secretari.coldstart2:
en: "Almost there." / es: "Ya vuelvo, ya vuelvo." / ca: "Ja torno, ja torno."

Aquests missatges es treuen en rebre la primera resposta real.

Estils amb els tokens habituals (@use '../../shared/variables'),
coherents amb la resta del disseny (paper, ink, $font-mono per a
metadades, $font-body per als missatges).

Confirma amb ng build i ng test, explica què has fet abans de fer
commit.
```
