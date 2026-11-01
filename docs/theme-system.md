# Light and dark appearance

Reference: https://themetogglepro.framer.website/ — inspected live light/dark switch. The compact rounded track and sliding sun/moon are adapted to the existing chartreuse identity.

- `theme-init.js` runs as a self-hosted, parser-blocking head script before styles. Stored preference wins; otherwise system colour scheme is used. No inline-script CSP exception is needed.
- `theme.js` owns accessible switch state, localized action titles, cross-page localStorage preference, system changes before an explicit selection, and cross-tab synchronization.
- `theme.css` defines typed, interpolating semantic colour tokens and surface/form/menu/label overrides. Actual photographs, brand colour, dark campaign sections and footer retain their intended treatment.
- A standalone header control uses the site's green field with animated sun/moon. Mobile spacing is explicitly tested from 320px upward. No desktop navigation labels may wrap.
- Reduced-motion preferences disable the switch and colour transitions; native button Space/Enter support remains.

Local preference is cosmetic and contains no authentication data. Initial appearance is applied on every route and in both languages before first paint. No changes to enquiry storage, administration authorization or visitor access settings.
