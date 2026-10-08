# Persönliches Portfolio

Ein statisches Portfolio für Power BI, Power Apps, Power Automate und Power Pages.

## Dateien

- `dist/index.html` enthält Seite, Texte und das Grundlayout.
- `dist/portfolio.css` ergänzt Produktlogos, Technologiegruppen und den animierten Werdegang.
- `dist/portfolio.js` steuert die Fortschrittslinie und aktiven Punkte im Werdegang.
- `dist/hero-art.png` enthält das vorhandene violett-silberne 3D-Emblem.
- `dist/favicon.svg` enthält das passende JB-Planetenzeichen.
- `.openai/hosting.json` legt den statischen Veröffentlichungsordner fest.

Die Projektkarten, Technologiegruppen und der Erfahrungsbereich sind zunächst als Gerüst angelegt. Die offiziellen Produkticons kennzeichnen die jeweiligen Microsoft-Technologien. Kenntnisstände und Ergebnisse werden nicht als vorhanden behauptet. Die konkreten Projektgeschichten, Stationen, Kontaktlinks und der Lebenslauf werden ergänzt, sobald die Inhalte vorliegen.

## Bedienung

Im Werdegang füllt sich die vertikale Linie zwischen Berufserfahrung, Ausbildung und Zertifikaten beim Scrollen. Der aktuelle Punkt leuchtet cyan, passierte Punkte werden violett ausgefüllt. Beim Zurückscrollen nimmt die Füllung wieder ab. Die Linie verbindet die tatsächlichen Mittelpunkte der Marker auch nach Größenänderungen. Projektkarten enthalten aufklappbare Bereiche für Ausgangslage, eigenen Beitrag und Ergebnis. Kopf-Navigation und Projektbereiche bleiben ohne JavaScript über Links und native Details-Elemente bedienbar.

## Produkticons

Die unveränderten SVGs in `dist/assets/` stammen aus den offiziellen Microsoft-Sammlungen. Quellen und Verwendungshinweise stehen in `ASSET-SOURCES.md`.
