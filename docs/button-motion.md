# Primary button interaction

Inspected the Livepower reference button in its initial, in-flight and settled hover states. Its pill and label remain stationary. A white arrow leaves the clipped black circle to the right, a second arrow enters from the left, and the circle becomes white with a black incoming arrow.

The shared primary button and enquiry submit button now use two decorative SVG layers. A 400ms ease-out transition moves them horizontally and inverts the circle. Arabic mirrors the icon container so travel follows the left-facing arrow. Keyboard focus exposes the same state; touch avoids sticky hover motion, and reduced-motion removes transition duration. Existing labels, destinations, responsive dimensions and site accent remain unchanged. Black pills use the inverse icon colours.

Browser checks: research/button-qa.cjs checks stable geometry and pill colour, icon exit/entry, absence of rotation, hover reset, keyboard focus across three widths, both languages and both themes, plus the black variant. research/button-reference.cjs records reference observations.
