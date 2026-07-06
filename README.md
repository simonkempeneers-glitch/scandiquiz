# 🇳🇴🇸🇪🇩🇰 Quiz Scandinavie — live webquiz voor Netlify

Een volledig werkende, live multiplayer-quiz: deelnemers doen mee via één link op hun telefoon, jij bestuurt als quizmaster het tempo via een apart dashboard. 56 vragen verdeeld over 4 rondes (Norvège, Suède, Danemark, Bonus Scandinavie). De volledige interface (deelnemers + quizmaster) is in het Frans.

## Hoe het werkt

- **Deelnemerslink** (`/`): naam invullen → wachtruimte → live vragen → antwoord onthullen met scoreverdeling en "bon à savoir" → tussenstand per ronde → eindstand.
- **Quizmaster-bord** (`/host.html`): wachtwoord-beveiligd. Start de quiz, onthul antwoorden, ga naar de volgende vraag/ronde, zie wie al geantwoord heeft, verwijder deelnemers, reset de quiz.
- Scoring is snelheidsgebaseerd: 1000 punten bij een supersnel juist antwoord, geleidelijk dalend naar een bodem van 500 punten (fout antwoord = 0 punten). Jij bepaalt zelf wanneer een vraag "open" staat en wanneer je hem onthult — er loopt geen harde countdown.
- Alle quizstatus (deelnemers, scores, huidige vraag) wordt gedeeld via **Netlify Blobs**, dus dit werkt zodra je site op Netlify draait. Er is geen aparte database nodig.

## Eén keer instellen

### 1. Deploy naar Netlify

Optie A — via de Netlify CLI (aanbevolen):

```bash
npm install -g netlify-cli
cd scandinavie-quiz
npm install
netlify deploy          # eerst een preview-deploy
netlify deploy --prod   # daarna live zetten
```

Volg de prompts om een nieuwe site aan te maken (of een bestaande te koppelen).

Optie B — via GitHub: zet deze map in een repo en koppel die repo in de Netlify-dashboard ("Add new site → Import an existing project"). Netlify herkent `netlify.toml` automatisch (publish = `public`, functions = `netlify/functions`).

### 2. Stel je eigen quizmaster-wachtwoord in

Standaard staat het wachtwoord op `scandi2026` — verander dit voor je gaat spelen:

1. Ga in Netlify naar **Site configuration → Environment variables**.
2. Voeg een variabele toe: `HOST_PASSWORD` = jouw eigen wachtwoord.
3. Trigger een nieuwe deploy (of "Clear cache and deploy site") zodat de functions de nieuwe waarde meekrijgen.

### 3. Netlify Blobs

Netlify Blobs is standaard actief voor elke Netlify-site, je hoeft niets te configureren — de functions krijgen automatisch toegang zodra ze op Netlify draaien.

## Tijdens het spelen

1. Open zelf `https://<jouw-site>.netlify.app/host.html`, log in met je wachtwoord.
2. Deel `https://<jouw-site>.netlify.app/` (of de QR-code op het dashboard) met de deelnemers.
3. Wacht tot iedereen zich heeft ingeschreven, klik **"Start de quiz"**.
4. Per vraag: klik **"Antwoord onthullen"** zodra iedereen (of genoeg mensen) geantwoord heeft, klik daarna **"Volgende vraag"**.
5. Na de laatste vraag van een ronde zie je automatisch de tussenstand; klik **"Volgende ronde"** om door te gaan.
6. Na de bonusronde eindigt de quiz automatisch met de eindstand en confetti bij de deelnemers.

Wil je met dezelfde groep nog een keer spelen? Klik op het eindscherm **"Nieuwe ronde spelen"** — dat behoudt de deelnemerslijst maar zet scores en de ronde terug op start.

## Lokaal testen (optioneel)

```bash
npm install -g netlify-cli
cd scandinavie-quiz
npm install
netlify dev
```

Dit start de site + functions lokaal (meestal op `http://localhost:8888`) met Netlify Blobs die automatisch lokaal worden gesimuleerd.

## Vragen aanpassen

Alle 56 vragen (incl. juiste antwoord en "bon à savoir"-weetje) staan in `netlify/functions/_lib/quizdata.js`. Dit bestand wordt nooit rechtstreeks naar deelnemers gestuurd, dus antwoorden kunnen niet vooraf worden afgekeken via de browser-devtools.

## Projectstructuur

```
scandinavie-quiz/
├── netlify.toml                     # routing: /api/* → functions, publish = public
├── package.json
├── public/
│   ├── index.html                   # deelnemerspagina (deel deze link)
│   ├── host.html                    # quizmaster-dashboard (niet delen)
│   ├── css/style.css                # aurora/Scandinavisch thema
│   └── js/{shared,app,host}.js
└── netlify/functions/
    ├── _lib/{store,quizdata,helpers}.js
    ├── join.js         # deelnemer inschrijven
    ├── state.js         # publieke live status (voor deelnemers)
    ├── answer.js         # antwoord indienen + score berekenen
    ├── host-state.js      # volledige status voor quizmaster (wachtwoord vereist)
    └── host-action.js     # start/reveal/next/reset/kick (wachtwoord vereist)
```
