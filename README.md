# Persönliches Portfolio

Ein statisches Portfolio für Power BI, Power Apps, Power Automate und Power Pages.

## Dateien

- `dist/index.html` enthält Seite, Texte und das Grundlayout.
- `dist/portfolio.css` ergänzt Produktlogos, den animierten Werkzeugkasten und das persönliche Profil.
- Der Werkzeugkasten zeigt sechs Kompetenzzeilen mit konkreten Anwendungen, Werkzeugen und Projektlinks. Die Überschrift bleibt auf großen Bildschirmen beim Scrollen stehen.
- `dist/portfolio.js` steuert die Fortschrittslinie und aktiven Punkte im Werkzeugkasten.
- `dist/hero-art.png` enthält das vorhandene violett-silberne 3D-Emblem.
- `dist/favicon.svg` enthält das passende JB-Planetenzeichen.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.

Die Seite enthält vier vom Nutzer beschriebene Fendt-Projekte und das gemeinsame Flutter-Spiel Board Magic. Ausgewählte eigene Beiträge zu Board Magic sind durch gemergte GitHub-PRs verlinkt. Der Fendt-Eintrag beschreibt das Pflichtpraktikum in PKPS – System- und Technologieplanung. Noch fehlende Angaben bleiben ausdrücklich offen. Die offiziellen Produkticons kennzeichnen die jeweiligen Microsoft-Technologien. Weitere Power-Platform-Projektplätze sind aufklappbar; Power BI und Power Pages bleiben vorläufige Plätze. Kontaktlinks, Unterlagen und weitere Stationen werden ergänzt, sobald die Inhalte vorliegen. Quellen und Inhaltsgrenzen stehen in `PROJECT-CONTENT.md`.

## Bedienung

Im Werkzeugkasten füllt sich die vertikale Linie zwischen den sechs Schwerpunkten beim Scrollen. Der aktuelle Punkt leuchtet cyan, passierte Punkte werden violett ausgefüllt. Beim Zurückscrollen nimmt die Füllung wieder ab. Die Linie verbindet die tatsächlichen Mittelpunkte der Marker auch nach Größenänderungen; sie zeigt Lesefortschritt, keinen Kenntnisstand. Das Profil enthält einen persönlichen Einstieg, zwei Blöcke für das laufende THA-Studium im 7. Semester und das Fendt-Pflichtpraktikum sowie einen separaten Abschnitt zum gemeinsamen Board-Magic-Projekt. Zertifikate werden mit konkreten Nachweisen ergänzt. Die fünf Praxisprojekte zeigen jeweils eine generierte Konzeptillustration, eine Überschrift und direkt sichtbare Erklärungen. Die Bilder sind keine Firmenansichten oder tatsächlichen App-Screenshots. Board Magic verlinkt die vier ausgewählten eigenen Beiträge. Der zusätzliche Power-Platform-Überblick bleibt aufklappbar. Kopf-Navigation und diese Bereiche sind ohne JavaScript bedienbar.

## Produkticons

Die unveränderten SVGs in `dist/assets/` stammen aus den offiziellen Microsoft-Sammlungen. Quellen und Verwendungshinweise stehen in `ASSET-SOURCES.md`.
