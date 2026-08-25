# Therapiezentrum Horvay

Website der Ergotherapie-Praxis Horvay mit Standorten in Aschersleben und Staßfurt —
[therapiezentrum-horvay.de](https://therapiezentrum-horvay.de).

Angular-Single-Page-App, die beim Build komplett zu statischem HTML vorgerendert und
als nginx-Container ausgeliefert wird. Kein Backend, kein State — der einzige
dynamische Teil ist das Kontaktformular, das an einen externen Formulardienst geht.

## Stack

| Bereich | Eingesetzt |
|---|---|
| Framework | Angular 20 (Standalone Components, Signals, Control-Flow-Syntax) |
| UI | PrimeNG 20 / PrimeIcons, eigenes SCSS |
| Rendering | `@angular/ssr` mit `outputMode: static` — alle Routen werden prerendert |
| Auslieferung | nginx (Alpine) im Docker-Container |
| CI/CD | GitHub Actions → Docker Hub |

## Schnellstart

```bash
cd frontend
npm install
npm start
```

Läuft dann auf http://localhost:4200 mit Hot Reload.

| Befehl | Zweck |
|---|---|
| `npm start` | Dev-Server |
| `npm run build` | Produktions-Build nach `dist/frontend/` inkl. Prerendering |
| `npm run watch` | Dev-Build im Watch-Modus |
| `npm test` | Unit-Tests (Karma/Jasmine) |

## Struktur

```
frontend/
├── public/                     # wird 1:1 nach / kopiert
│   ├── images/                 # Bilder, referenziert als images/datei.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── nginx/nginx.conf            # Auslieferungsregeln (Redirects, Caching, 404)
├── src/
│   ├── app/
│   │   ├── app.routes.ts       # alle Routen inkl. Title + Description
│   │   ├── components/layout/  # Header, Navigation, Footer
│   │   ├── pages/              # je eine Komponente pro Seite
│   │   │   └── shared/page-styles.scss   # gemeinsame Seitenstile
│   │   └── services/meta.service.ts      # SEO-Meta-Tags
│   ├── environments/           # Formspark-Konfiguration
│   └── styles.scss             # globale Styles und Farbvariablen
└── Dockerfile
```

## Neue Seite anlegen

Eine Seite besteht aus einer Komponente plus drei Registrierungen — wird eine davon
vergessen, ist die Seite zwar erreichbar, aber nicht auffindbar:

1. Komponente unter `src/app/pages/<name>/` anlegen. Als Vorlage eignet sich eine
   bestehende Seite; das SCSS besteht meist nur aus `@use '../shared/page-styles';`.
2. Route in [`src/app/app.routes.ts`](frontend/src/app/app.routes.ts) eintragen —
   mit `title` und `data.description`, beides landet automatisch in den Meta-Tags.
3. Verlinken in [`layout.html`](frontend/src/app/components/layout/layout.html):
   Desktop-Navigation **und** Mobil-Navigation (zwei getrennte Blöcke), bei
   rechtlichen Seiten stattdessen im Footer.
4. URL in [`public/sitemap.xml`](frontend/public/sitemap.xml) ergänzen.

Die Route mit `path: '**'` muss immer als letzte stehen.

## Stellenangebote pflegen

Die offenen Stellen liegen als Array in
[`stellenangebote.ts`](frontend/src/app/pages/stellenangebote/stellenangebote.ts).
Ein weiteres Angebot ist ein weiteres Objekt im Array — Template und Styles müssen
nicht angefasst werden.

Ist das Array leer, zeigt die Seite automatisch einen Hinweis auf
Initiativbewerbungen statt einer leeren Liste. Eine besetzte Stelle wird also
einfach aus dem Array entfernt.

## Kontaktformular

Der Versand läuft über [Formspark](https://formspark.io); die Form-ID steht in
[`environment.ts`](frontend/src/environments/environment.ts) und ist bewusst nicht
geheim, da sie ohnehin im Netzwerk-Tab sichtbar wäre.

Das Formular validiert clientseitig, verlangt eine Datenschutz-Einwilligung und hat
ein Honeypot-Feld: Füllt ein Bot das versteckte Feld aus, meldet die Seite Erfolg,
sendet aber nichts.

## SEO

- **Meta-Tags** setzt der [`MetaService`](frontend/src/app/services/meta.service.ts)
  bei jeder Navigation aus den Routen-Daten: Title, Description, Open Graph, Twitter
  Cards und Canonical-URL. `data.noindex: true` schließt eine Route aus dem Index aus.
- **Prerendering** erzeugt für jede Route ein echtes `index.html`, sodass Crawler
  fertiges HTML sehen statt einer leeren Shell.
- **nginx** ([`nginx.conf`](frontend/nginx/nginx.conf)) sorgt für genau eine
  kanonische URL pro Seite: `/seite.html` und `/seite/` leiten auf `/seite` um,
  unbekannte Pfade liefern einen echten 404 statt der App-Shell.

Neue Seiten deshalb immer in die `sitemap.xml` eintragen.

## Deployment

Push auf `main` mit Änderungen unter `frontend/**` startet
[`.github/workflows/frontend.yml`](.github/workflows/frontend.yml). Der Workflow baut
das Multi-Stage-`Dockerfile` für `linux/amd64` und `linux/arm64` und pusht es als
`<DOCKERHUB_USERNAME>/therapiezentrum-horvay-frontend:latest` zu Docker Hub.

Der Container lauscht auf Port 4200 und ist für den Betrieb hinter einem
Reverse Proxy konfiguriert (`absolute_redirect off`).

Lokal testen:

```bash
docker build -t horvay-frontend ./frontend
```

```bash
docker run --rm -p 4200:4200 horvay-frontend
```

## Farben

Die Praxisfarbe ist als CSS-Variable in
[`styles.scss`](frontend/src/styles.scss) definiert und sollte nirgends hart
kodiert werden:

```scss
--company-color: #94c11c;
--company-color-dark: #7aa015;
--company-color-light: #b8d85a;
```
