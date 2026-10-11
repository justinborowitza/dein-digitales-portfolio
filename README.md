# Persönliches Portfolio

Ein statisches Portfolio für Power BI, Power Apps, Power Automate und Power Pages.

## Dateien

- `dist/index.html` enthält Seite, Texte und das Grundlayout.
- `dist/portfolio.css` ergänzt Produktlogos, den animierten Werkzeugkasten und das persönliche Profil.
- Der Werkzeugkasten zeigt sechs Kompetenzzeilen mit konkreten Anwendungen, Werkzeugen und Projektlinks. Die Überschrift bleibt auf großen Bildschirmen beim Scrollen stehen.
- `dist/portfolio.js` steuert die Fortschrittslinie und aktiven Punkte im Werkzeugkasten.
- Das Hero-Emblem wird aus CSS aufgebaut: ein reduziertes JB-Monogramm auf einer animierten violetten Planetenoberfläche. Die frühere Illustration `dist/hero-art.png` bleibt im Repository als Design-Backup erhalten.
- `dist/favicon.svg` enthält das passende JB-Planetenzeichen.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.

Die Seite enthält vier vom Nutzer beschriebene Fendt-Projekte und das gemeinsame Flutter-Spiel Board Magic. Ausgewählte eigene Beiträge zu Board Magic sind durch gemergte GitHub-PRs verlinkt. Der Fendt-Eintrag beschreibt das Pflichtpraktikum in PKPS – System- und Technologieplanung. Die vier Power-Platform-Icons führen als Überblick durch Produktbereiche; konkrete Fallstudien werden nur dort verlinkt, wo dafür Nutzerangaben vorliegen. Kontaktdaten werden nicht geraten. Quellen und Inhaltsgrenzen stehen in `PROJECT-CONTENT.md`.

## Bedienung

Im Werkzeugkasten füllt sich die vertikale Linie zwischen den sechs Schwerpunkten beim Scrollen. Der aktuelle Punkt leuchtet cyan, passierte Punkte werden violett ausgefüllt. Beim Zurückscrollen nimmt die Füllung wieder ab. Die Linie verbindet die tatsächlichen Mittelpunkte der Marker auch nach Größenänderungen; sie zeigt Lesefortschritt, keinen Kenntnisstand. Das Profil enthält einen persönlichen Einstieg, zwei Blöcke für das laufende THA-Studium im 7. Semester und das Fendt-Pflichtpraktikum sowie einen separaten Abschnitt zum gemeinsamen Board-Magic-Projekt. Zertifikate werden mit konkreten Nachweisen ergänzt. Die fünf Praxisprojekte zeigen jeweils eine generierte Konzeptillustration, eine Überschrift und direkt sichtbare Erklärungen. Die Bilder sind keine Firmenansichten oder tatsächlichen App-Screenshots. Board Magic verlinkt die vier ausgewählten eigenen Beiträge. Der zusätzliche Power-Platform-Überblick bleibt aufklappbar. Kopf-Navigation und diese Bereiche sind ohne JavaScript bedienbar.

## Produkticons

Die unveränderten SVGs in `dist/assets/` stammen aus den offiziellen Microsoft-Sammlungen. Quellen und Verwendungshinweise stehen in `ASSET-SOURCES.md`.
