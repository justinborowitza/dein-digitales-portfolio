# Portfolio-Assets

Das JB-Monogramm ist eine eigens für Justins Portfolio gezeichnete SVG-Datei in `dist/assets/jb-monogram.svg`. Das Favicon verwendet dieselbe Form.

Die Grafiken der Praxisprojekte sind schematische HTML/CSS- oder SVG-Illustrationen. Board Magic zeigt zusätzlich echte Flutter-Testansichten aus dem gemeinsamen Repository; Quelle und Testkontext stehen unten.

Die Pforten-App-Karte verwendet eine eigens gezeichnete HTML/CSS-Skizze einer Eingabemaske mit Sprachwahl sowie SharePoint und Archivierung. Sie ist ausdrücklich als schematische Ansicht gekennzeichnet. Feldanordnung und Layout bilden keine interne Originaloberfläche ab.
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
- On 2026-10-26 the eight Electro Wave paths were grouped into four upper and four lower curves, shifted vertically to terminate at separate GitHub and Lebenslauf buttons. The SVG scales to the section bounds; the original path geometry and trim animations remain in use. The decorative resume-document and mobile-menu icons are local inline SVG/CSS artwork.

## Simple project SVGs

The five SVG illustrations under `dist/assets/projects/` are original simple vector drawings for this portfolio: check-in form, document, schematic QR pattern, reporting chart and game die. They are illustrative symbols, not application screenshots, scannable QR codes or measured project results.

## Board Magic Flutter test captures — 2026-10-26

Copied byte-for-byte from the local joint-project checkout, verified against the GitHub connector at commit `4700ed6ca0de3ebd17aa4cb65f45b6909a0101e4`. These are Golden test captures of actual Flutter UI with fixtures; no public-release, live wallet or sole authorship claim is made. Used with Justin's instruction to present his shared project and visual work.

| Portfolio file | Repository source | Verified Git blob SHA |
| --- | --- | --- |
| `dist/assets/projects/board-magic/home.png` | [Home](https://github.com/leonwwest/ludo_club/blob/4700ed6ca0de3ebd17aa4cb65f45b6909a0101e4/ludo_club/test/ui/widgets/goldens/pen_current_lobby_390x844.png) | `651f268d8aeb0b8f9d6475adcdda627ddd03389d` |
| `dist/assets/projects/board-magic/match.png` | [Match](https://github.com/leonwwest/ludo_club/blob/4700ed6ca0de3ebd17aa4cb65f45b6909a0101e4/ludo_club/test/ui/widgets/goldens/pen_current_active_match_390x844.png) | `c402fa5b44b136112244f876c39f0c4d005e433b` |
| `dist/assets/projects/board-magic/collection.png` | [Collection](https://github.com/leonwwest/ludo_club/blob/4700ed6ca0de3ebd17aa4cb65f45b6909a0101e4/ludo_club/test/ui/widgets/goldens/pen_economy_shop_phone.png) | `82f71f943a64a85e5538392a7ccd6aa1d9fc89b5` |

Captions label them as test views with example data. The PNGs are displayed responsively without pixel editing and can be opened at original size from the case study. The Board Magic die SVG remains as an unused historical illustration.
## GitHub button

White Invertocat SVG from the official [GitHub Brand Toolkit](https://brand.github.com/foundations/logo), downloaded from `https://brand.github.com/GitHub_Logos.zip`, file `GitHub Logos/SVG/GitHub_Invertocat_White.svg`. Saved unchanged as `dist/assets/github-mark-white.svg`, used to link to Justin's GitHub profile.
