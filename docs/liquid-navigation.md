# Contextual liquid navigation

Source component: https://github.com/yasinsarveghad/yasin, concept-02/design.js and design.css. Imported with the owner's instruction. The horizontal liquidSlots geometry, 620ms optical-lens interpolation, layered glass-edge material, and critically damped More-sheet integration (omega 21) are retained and scoped to the athlete website. Only this site's repository is modified.

The dock remains horizontal on every viewport and presents Home, Racing, Awards, Coaching and More with athlete-specific SVG icons. More lists the remaining nine public destinations, preserves localized paths, indicates the current page, and supports native modal focus containment, Escape, outside click and drag-to-dismiss. Hover and keyboard focus preview the lens without changing aria-current.

Visibility is based on measured header/footer positions, not a fixed document percentage. It appears once the header is 128px above the viewport and the footer is more than 160px below it. Separate 72px/96px exit thresholds avoid boundary flicker. Hidden navigation is inert and removed from the accessibility tree. The upper mobile menu and focused form fields suppress the dock. Appearance uses an eased opacity/offset/scale transition, with reduced-motion and contrast fallbacks and safe-area spacing.

New visitors start with light appearance even when their operating system prefers dark. Explicit manual choices remain stored across pages/tabs; clearing the stored choice returns to light. No operating-system listener overrides that default.

QA: research/liquid-nav-qa.cjs covers five viewport sizes in both languages: fresh light default, saved dark choice, top/middle/footer visibility, overflow, lens bounds, label fit, keyboard arrows, More destinations, Escape and focus restoration. Additional checks cover sheet drag, page links, reduced motion, and repeated visibility transitions.
