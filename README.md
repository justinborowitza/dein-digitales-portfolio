# Persönliches Portfolio

Statisches Bewerbungsportfolio mit Schwerpunkt Power Platform Development.

## Aufbau

- `dist/index.html` zeigt Kurzprofil, gleich große Projektkarten, Werkzeugkasten, Studium, Praxiserfahrung und Kontakt.
- Jede Projektkarte führt auf eine eigene kurze Fallstudie unter `dist/projects/`.
- `dist/site.css` enthält das responsive Design, `dist/case.css` die Fallstudien und `dist/portfolio.js` Mobilnavigation und Bewegungsschalter.
- Projektgrafiken sind schematische HTML/CSS-Illustrationen, keine echten Anwendungsscreenshots.
- Der Einstieg zeigt ein echtes, lokal geladenes 3D-Modell: `dist/cube.js` steuert den abgerundeten Graphitwürfel, `dist/cube.css` die Darstellung. Ziehen dreht ihn, Pfeiltasten bedienen ihn ohne Maus; Escape setzt ihn zurück. Automatische Bewegung respektiert den Pausenschalter und reduzierte Bewegung. Ohne WebGL oder JavaScript bleibt ein statisches Bild sichtbar.
- Three.js r180 und RoundedBoxGeometry liegen mit MIT-Lizenz unter `dist/vendor/three/`. Das JB bleibt als Kennzeichnung im Header und Footer erhalten.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.

## Cloudflare-Deployment

Cloudflare Workers veröffentlicht mit `npx wrangler deploy` den vorhandenen Ordner `dist`; ein Build-Schritt ist nicht nötig. `wrangler.jsonc` verwendet den bestehenden Worker `uniqbit-consulting-simulation`, damit dessen Dev-Adresse das Portfolio ausliefert.

Worker-Adresse: https://uniqbit-consulting-simulation.justin-maretic.workers.dev/

Für Cloudflare Pages: GitHub-Repository `justinborowitza/dein-digitales-portfolio`, Produktionsbranch `main`, Framework `None`, kein Build-Befehl, Ausgabeverzeichnis `dist` und Root-Verzeichnis `/`. Pushes auf `main` veröffentlichen die Website automatisch.

## Inhalte

Die Portfolioseite zeigt ausgewählte Arbeiten aus einem anonymisierten Industriepraktikum und Beiträge zum gemeinsamen Flutter-Spiel Board Magic. Proofs of Concept und Prototypen werden als solche bezeichnet. Kennzahlen, vertrauliche Oberflächen und nicht belegte Ergebnisse werden nicht ergänzt. Projektquellen stehen in `PROJECT-CONTENT.md`.
