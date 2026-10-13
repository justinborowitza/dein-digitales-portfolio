# Persönliches Portfolio

Ein statisches Bewerbungsportfolio mit Zielrichtung Power Platform Development. Die gezeigte Erfahrung umfasst Power Apps, Power Automate, SharePoint, Excel und Beiträge zu Board Magic.

## Dateien

- `dist/index.html` enthält Seite, Texte und das Grundlayout.
- `dist/portfolio.css` enthält die Grundstile; `dist/redesign.css` legt das großzügige Layout, die Typografie und die responsive Darstellung fest.
- Der Werkzeugkasten zeigt sechs Kompetenzzeilen mit konkreten Anwendungen, Werkzeugen und Projektlinks. Die Überschrift bleibt auf großen Bildschirmen beim Scrollen stehen.
- `dist/portfolio.js` steuert Werkzeugkasten, Mobilnavigation und den Schalter für die dekorative Bewegung.
- Das JB-Zeichen ist eine eigene SVG-Konstruktion mit gemeinsamem Buchstabenstamm. Es erscheint in Header, Einstieg und Footer; `dist/assets/jb-monogram.svg` enthält die eigenständige Vektordatei. Frühere Illustrationen bleiben als Design-Backup erhalten.
- `dist/favicon.svg` enthält das passende JB-Monogramm.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.

Die Seite enthält vier vom Nutzer beschriebene Fendt-Projekte und das gemeinsame Flutter-Spiel Board Magic. Ausgewählte eigene Beiträge zu Board Magic sind durch gemergte GitHub-PRs verlinkt. Der Fendt-Eintrag beschreibt das Pflichtpraktikum in PKPS – System- und Technologieplanung. Die vier Power-Platform-Icons führen als Überblick durch Produktbereiche; konkrete Fallstudien werden nur dort verlinkt, wo dafür Nutzerangaben vorliegen. Kontaktdaten werden nicht geraten. Quellen und Inhaltsgrenzen stehen in `PROJECT-CONTENT.md`.

## Bedienung

Im Werkzeugkasten füllt sich die vertikale Linie zwischen den sechs Schwerpunkten beim Scrollen. Der aktuelle Punkt leuchtet cyan, passierte Punkte werden violett ausgefüllt. Beim Zurückscrollen nimmt die Füllung wieder ab. Die Linie verbindet die tatsächlichen Mittelpunkte der Marker auch nach Größenänderungen; sie zeigt Lesefortschritt, keinen Kenntnisstand. Das Profil enthält einen persönlichen Einstieg, zwei Blöcke für das laufende THA-Studium im 7. Semester und das Fendt-Pflichtpraktikum sowie einen separaten Abschnitt zum gemeinsamen Board-Magic-Projekt. Zertifikate werden mit konkreten Nachweisen ergänzt. Die fünf Praxisprojekte zeigen kurze Titel und je einen Erklärungssatz. Weitere Informationen und die vier ausgewählten Board-Magic-Beiträge sind aufklappbar. Generierte Konzeptillustrationen bleiben als Design-Backup im Repository. Die Projektdetails und Sprunglinks funktionieren ohne JavaScript. Auf kleinen Bildschirmen ist die Navigation ohne JavaScript vollständig sichtbar; mit JavaScript wird sie über den Menüknopf geöffnet.

## Produkticons

Die unveränderten SVGs in `dist/assets/` stammen aus den offiziellen Microsoft-Sammlungen. Quellen und Verwendungshinweise stehen in `ASSET-SOURCES.md`.

## Projektkarten

Die fünf Projektkarten verwenden kurze Titel und einen Erklärungssatz ohne generierte Titelbilder. Die Pforten-App steht als Power-Platform-Projekt zuerst. Alle Karten haben dieselbe Höhe; zusätzliche Informationen und Board-Magic-Nachweise sind über native Details-Elemente erreichbar. Längere Inhalte scrollen innerhalb des Detailbereichs, ohne das Raster zu verschieben.

Das Portfolio soll Bewerbungen mit Schwerpunkt Power Platform Development ergänzen und zugleich für mögliche Projektanfragen geeignet sein.

## Layout und Figma

Der Einstieg gliedert sich auf großen Bildschirmen in Kurzprofil links, JB-Monogramm in der Mitte und Überschrift rechts. Auf Mobilgeräten folgt die Reihenfolge Überschrift, Zeichen, Kurzprofil. Ein eigener Abschnitt erklärt den Ablauf der Pforten-App als Schema, nicht als behaupteten echten Screenshot.

Die SVG-Linien bewegen sich dezent. Ein Pausenschalter und `prefers-reduced-motion` verhindern erzwungene Bewegung. Die fünf Projektkarten behalten eine einheitliche Höhe von 370 px, auch mit geöffneten Details.

[Bearbeitbarer Figma-Entwurf mit Desktop, Mobilansicht, Farbvariablen und zwei Logo-Richtungen](https://www.figma.com/design/WviBGgkoVVld1LzKq1pxq2)

Verwendet: DM Sans; Hintergrund #08070b, Akzent #8c43ff / #ad72ff, Monogramm #d9c7ff und Cyan #66e8ff als kleines Bewegungsdetail. Gestaltung inspiriert durch großzügige Links-rechts-Kompositionen; keine Vercel-Assets übernommen.
