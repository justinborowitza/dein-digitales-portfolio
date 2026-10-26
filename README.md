# Persönliches Portfolio

Bewerbungsportfolio für digitale Prozesse mit der Power Platform und das gemeinsame Flutter-Softwareprojekt Board Magic, mit serverseitigem Kontaktformular.

## Aufbau

- `dist/index.html` zeigt den persönlichen Einstieg, Projekte, Über mich, Arbeitsweise und Kontakt; danach folgt der kompakte GitHub-Bereich mit Electro Wave. Board Magic und Pforten-App stehen als größere Projektkarten zuerst.
- Jede Projektkarte führt auf eine eigene kurze Fallstudie unter `dist/projects/`.
- `dist/site.css` enthält das responsive Grunddesign, `dist/portfolio.css` die Portfolio-Hierarchie, `dist/case.css` die Fallstudien und `dist/portfolio.js` Mobilnavigation und Bewegungsschalter.
- Board Magic zeigt echte Flutter-Testansichten mit ausdrücklich gekennzeichneten Testdaten unter `dist/assets/projects/board-magic/`. Die übrigen Projektgrafiken sind schematische SVG- oder HTML/CSS-Illustrationen. Die ausführlichen Seiten zu Board Magic und Pforten-App erklären Rolle, Umsetzung und Projektstand; Board Magic verlinkt sechs geprüfte Beiträge.
- Nach Über mich steht „Wie ich arbeite“ mit drei Schritten: verstehen und strukturieren, entwerfen und entwickeln, prüfen und weiterentwickeln. Die senkrechte Linie und die Nummern folgen beim Scrollen der Leseposition; sie zeigen keinen Projektstatus. Die Steuerung liegt in `dist/landing-motion.js`, das Layout in `dist/landing-motion.css`.
- Der Einstieg verwendet die angepasste Figma-Animation mit offiziellen Microsoft-SVGs. Sechs Produktkacheln entfalten sich, kreisen und fließen in der Mitte zur Power Platform zusammen. `dist/platform-motion.css` enthält die Figma-Keyframes, `dist/landing-motion.css` das responsive Layout und `dist/landing-motion.js` Größenanpassung sowie das Pausieren außerhalb des sichtbaren Bereichs.
- Electro Wave liegt als animierte SVG-Komposition hinter zwei vertikal angeordneten Buttons für GitHub und Lebenslauf. Die oberen vier Lichtpfade enden am GitHub-Link, die unteren vier am Lebenslauf-Platzhalter. Dieser bleibt bis zum Einfügen des PDFs deaktiviert und hat keinen Link. Der Bereich ist 460–720px hoch (mobil 360px); die Pfade passen sich an seine Breite und Höhe an. Das Kontaktformular hat einen eigenen ruhigen Abschnitt. Die Originalpfade aus Figma werden über normalisierte SVG-Masken animiert. Beide Animationen respektieren den Bewegungsschalter, reduzierte Bewegung und ausgeblendete Browser-Tabs. Ohne JavaScript bleibt das Ökosystem statisch sichtbar.
- Quellen und Produkt-Icons stehen in `dist/assets/microsoft/SOURCES.md`; die Figma-Referenzen sind in `ASSET-SOURCES.md` dokumentiert. Die Illustration des Ökosystems ersetzt keine belegten Projekt- oder Erfahrungsangaben. Der frühere Würfel und Three.js bleiben als ungenutzte Dateien erhalten.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.
- Header und Footer verwenden das lokale JB-Monogramm. Der Footer verlinkt Navigation, Kontakt, Impressum und Datenschutz auf allen Portfolio- und Projektseiten.
- Mobil öffnet das Burger-Symbol die Navigation und wird zum Schließen-Symbol. Linkauswahl, Escape und der Wechsel zur Desktopansicht schließen das Menü; der zugängliche Name und `aria-expanded` folgen dem Zustand.
- `dist/contact.css` gestaltet Formular, Footer und rechtliche Seiten. `dist/contact.js` prüft die Versandkonfiguration und steuert Sicherheitsprüfung, Versand und Rückmeldungen. `dist/_worker.js` übernimmt den Versand via Resend; auf Cloudflare Pages läuft er im Advanced Mode. Für die Freischaltung siehe `CONTACT-SETUP.md`. Ohne Konfiguration bleibt der Versand deaktiviert und die direkte E-Mail-Adresse verfügbar.
- Geist und Geist Mono werden einschließlich ihrer OFL-Lizenzen lokal unter `dist/assets/fonts` ausgeliefert.

## Cloudflare-Deployment

Cloudflare Workers veröffentlicht mit `npx wrangler deploy` den vorhandenen Ordner `dist`; ein Build-Schritt ist nicht nötig. `wrangler.jsonc` verwendet den Worker `justin-borowitza-portfolio`.

Worker-Adresse: https://justin-borowitza-portfolio.justin-maretic.workers.dev/

Die aktuelle Veröffentlichung läuft als Worker und hat deshalb eine `workers.dev`-Adresse. Eine `pages.dev`-Adresse entsteht erst durch ein separates Cloudflare-Pages-Projekt. Dafür kann dasselbe GitHub-Repository `justinborowitza/dein-digitales-portfolio` mit Produktionsbranch `main`, Framework `None`, leerem Build-Befehl und Ausgabeverzeichnis `dist` verbunden werden. Da `dist/_worker.js` das Kontakt-Backend bereitstellt, muss dieses Pages-Projekt den Advanced Mode verwenden und die nötigen Kontakt-Secrets erhalten.

Für eine lokale Vorschau mit Kontakt-Backend: `npx wrangler dev --local --port 8878`. Der einfache Python-Server zeigt nur statische Inhalte. Serverseitige Tests: `node --test tests/contact-worker.test.mjs`.

## Inhalte

Die Portfolioseite zeigt ausgewählte Arbeiten aus einem anonymisierten Industriepraktikum und Beiträge zum gemeinsamen Flutter-Spiel Board Magic. Proofs of Concept und Prototypen werden als solche bezeichnet. Kennzahlen, vertrauliche Oberflächen und nicht belegte Ergebnisse werden nicht ergänzt. Projektquellen stehen in `PROJECT-CONTENT.md`.
