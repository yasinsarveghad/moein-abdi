# Athlete award collection

Achievements keeps its hero first, followed by the new trophy and medal collections. Existing results and national-team sections remain intact. The homepage medal collection sits between athlete background and journal sections.

Three trophy cards show the supplied artwork in full; narrow screens use a horizontally swipeable gallery with previous/next controls. The medal component exposes all nine actual images, directional crossfades, wraparound navigation, touch gestures and keyboard arrows/Home/End. Rapid selection uses a revision guard to discard stale image loads. Native modal dialogs enlarge the selected object, trap focus, close with Escape, and restore focus to the opener. Reduced motion removes transitions; English/Arabic and both existing themes are supported.

Original PNGs are preserved under originals/awards. scripts/awards.cjs trims only transparent margins and generates WebP images and thumbnails; no artwork is synthesized or recolored. Item names describe visible objects, without assigning unverified events, years or placings.

Validation: research/awards-qa.cjs covers 20 viewport/language/theme combinations, section order, rapid selection, wraparound, keyboard navigation, modal images/focus and reduced-motion homepage. research/awards-edge-qa.cjs covers failed-image retry, swipe and every medal image.
