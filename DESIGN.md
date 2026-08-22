# Design

Edison Law’s site is an evidence desk: paper and midnight fields, one signal colour for action and nodes, and a persistent rail that behaves like a case file rather than a marketing chrome.

## World

- **Surfaces:** White for reading, Paper (`#F1F6F4`) for the opening field, Midnight (`#0A2028`) for the named-solicitor band. Hairline rules in Line (`#CBDAD6`).
- **Signal:** `#008D7A` / Signal Deep `#006F63` for nodes, labels and the primary action. Copper is reserved for focus and form errors.
- **Type:** Newsreader for display and headings. Manrope for navigation, body and interface. IBM Plex Mono only for real metadata (SRA number, email, insight type/date).
- **Motion:** 160–240ms, already-visible content, no looping decoration. `prefers-reduced-motion` is honoured in tokens.

## Layout

- Below 1280px: compact header. From 1280px: 248px evidence rail, current item marked by type weight and a node (never colour alone).
- Homepage sequence is the brand-book order: specialist descriptor and master line, three practice pillars, Trace–Analyse–Act, solicitor, featured note, London capability, discreet contact, regulatory footer.
- Interior pages are editorial: breadcrumb, one heading, a short lead, then rules and prose. Service pages follow problem → scope → approach → questions → related note → contact.

## Chrome

- Skip link, drawer with focus trap, search dialog, labelled form fields with local error text.
- SRA number 510498 is in the rail, the footer badge (linked to the SRA record), and JSON-LD.
- Development mode (`site.config.js` → `mode: "development"`) shows a preview banner and `noindex`.
