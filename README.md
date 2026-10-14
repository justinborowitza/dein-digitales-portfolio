# Persönliches Portfolio

Statisches Bewerbungsportfolio mit Schwerpunkt Power Platform Development.

## Aufbau

- `dist/index.html` zeigt Kurzprofil, gleich große Projektkarten, Werkzeugkasten, Studium, Praxiserfahrung und Kontakt.
- Jede Projektkarte führt auf eine eigene kurze Fallstudie unter `dist/projects/`.
- `dist/site.css` enthält das responsive Design, `dist/case.css` die Fallstudien und `dist/portfolio.js` Mobilnavigation und Bewegungsschalter.
- Die Projektkarten verwenden einfache lokale SVG-Illustrationen unter `dist/assets/projects/`; die Fallstudien verwenden schematische HTML/CSS-Grafiken. Keine Grafik zeigt echte Anwendungsscreenshots.
- Vor den Projekten steht „Wie ich arbeite“ mit fünf iterativen Schritten. Die senkrechte Linie und die Nummern folgen beim Scrollen der Leseposition; sie zeigen keinen Projektstatus. Die Steuerung liegt in `dist/landing-motion.js`, das Layout in `dist/landing-motion.css`.
- Der Einstieg verwendet die angepasste Figma-Animation mit offiziellen Microsoft-SVGs. Sechs Produktkacheln entfalten sich, kreisen und fließen in der Mitte zur Power Platform zusammen. `dist/platform-motion.css` enthält die Figma-Keyframes, `dist/landing-motion.css` das responsive Layout und `dist/landing-motion.js` Größenanpassung sowie das Pausieren außerhalb des sichtbaren Bereichs.
- Electro Wave liegt als animierte SVG-Komposition hinter dem Kontaktbereich. Die Originalpfade aus Figma werden über normalisierte SVG-Masken animiert. Beide Animationen respektieren den Bewegungsschalter, reduzierte Bewegung und ausgeblendete Browser-Tabs. Ohne JavaScript bleibt das Ökosystem statisch sichtbar.
- Quellen und Produkt-Icons stehen in `dist/assets/microsoft/SOURCES.md`; die Figma-Referenzen sind in `ASSET-SOURCES.md` dokumentiert. Die Illustration des Ökosystems ersetzt keine belegten Projekt- oder Erfahrungsangaben. Der frühere Würfel und Three.js bleiben als ungenutzte Dateien erhalten.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.

## Cloudflare-Deployment

Cloudflare Workers veröffentlicht mit `npx wrangler deploy` den vorhandenen Ordner `dist`; ein Build-Schritt ist nicht nötig. `wrangler.jsonc` verwendet den bestehenden Worker `uniqbit-consulting-simulation`, damit dessen Dev-Adresse das Portfolio ausliefert.

Worker-Adresse: https://uniqbit-consulting-simulation.justin-maretic.workers.dev/

Für Cloudflare Pages: GitHub-Repository `justinborowitza/dein-digitales-portfolio`, Produktionsbranch `main`, Framework `None`, kein Build-Befehl, Ausgabeverzeichnis `dist` und Root-Verzeichnis `/`. Pushes auf `main` veröffentlichen die Website automatisch.

## Inhalte

Die Portfolioseite zeigt ausgewählte Arbeiten aus einem anonymisierten Industriepraktikum und Beiträge zum gemeinsamen Flutter-Spiel Board Magic. Proofs of Concept und Prototypen werden als solche bezeichnet. Kennzahlen, vertrauliche Oberflächen und nicht belegte Ergebnisse werden nicht ergänzt. Projektquellen stehen in `PROJECT-CONTENT.md`.
