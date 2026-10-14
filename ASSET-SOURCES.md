# Portfolio-Assets

Das JB-Monogramm ist eine eigens für Justins Portfolio gezeichnete SVG-Datei in `dist/assets/jb-monogram.svg`. Das Favicon verwendet dieselbe Form.

Die Projektgrafiken in Übersicht und Fallstudien sind schematische HTML/CSS-Illustrationen. Sie bilden keine echten Anwendungen, Unternehmensdaten oder Board-Magic-Spieloberflächen ab.
# Interactive cube

The hero uses an original RoundedBoxGeometry scene rendered with Three.js r180 (MIT), vendored locally with its LICENSE. Sources: https://github.com/mrdoob/three.js/tree/r180 and its examples/jsm/geometries/RoundedBoxGeometry.js. The addon import points to the local module.

`dist/assets/hero-cube.png` is an original Imagegen concept render used only as the WebGL/JavaScript fallback. Generated in this chat on 2026-10-13; the interactive scene does not use a raster texture.

## Figma animations integrated on 2026-10-14

- Power Platform source: https://www.figma.com/design/TyxpmzhqSImLVOAZUCuxyh/Power-Platform-Animation?node-id=1-271
- The six source symbols were replaced in the user's Figma file with official Power Apps, Power Automate, Power Pages, Microsoft Fabric, Dataverse and Power BI SVGs. A central Power Platform tile was added for the merged phase. Product labels were added; seven-second tile movement, orbit, light sweeps and easing are retained. The website adapts the source background to the existing dark portfolio and scales the scene uniformly.
- Electro Wave source: https://www.figma.com/design/5Ux4CiSczcV22OqjtwC7SD/Electro-Wave?node-id=1-24
- The Figma center was adapted to “Kontakt”. The website uses a working GitHub link and readable contact text at the center. Original wave geometries and mirrored placements are retained. The two-second path-trim tracks animate masks over the original filled SVGs; this is necessary because CSS stroke dashes do not trim a filled shape. The source glow is preserved as a blurred duplicate. The original downloaded SVGs are stored under `dist/assets/electro-wave/`.
- Microsoft icon provenance and usage notes: `dist/assets/microsoft/SOURCES.md`. Assets are byte-identical official SVGs. Product marks remain upright because orbit and tile rotation cancel each other.
- Hero illustration depicts the requested Microsoft ecosystem. The existing project stack and experience claims remain grounded in the existing content sources; Fabric, Dataverse, Power Pages and Power BI are not silently added as project experience.
- Website finish revised on 2026-10-14: all tiles use dark graphite surfaces, subtle edge highlights and light sweeps, with original logo colors. The longer Power Automate and Microsoft Fabric labels use smaller type. The violet hero headline has a restrained CSS glow; it remains selectable HTML text. These presentation changes are applied in the website stylesheet.

## Simple project SVGs

The five SVG illustrations under `dist/assets/projects/` are original simple vector drawings for this portfolio: check-in form, document, schematic QR pattern, reporting chart and game die. They are illustrative symbols, not application screenshots, scannable QR codes or measured project results.
