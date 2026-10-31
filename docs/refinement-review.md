# Interaction refinement review

- Preserves Livepower reference CTA proportions: header 48px, primary 60px; rechecked reference at 1440/1024/390px.
- Adds same-page language picker with UK/UAE flag vectors, selected state, query/hash preservation, animated entry, outside-click/escape dismissal, and keyboard traversal. Closed options are inert.
- Fixes logical inline padding and independent directional arrow icons in RTL; download/check icons no longer mirror. Text receives its own flexible label.
- Adds cancellable mouse-wheel easing on desktop, preserving wheel distance, touch scrolling, nested scroll areas, zoom modifiers, native keyboard navigation, and reduced-motion preference.
- Replaces repeated abrupt reveals with restrained eased transitions and short child staggering. Adds menu, dialog, tab and achievement transitions.
- Removes fixed-height clipping from mobile inner-page heroes.
- Changes asset caching to revalidation so repeat visitors receive updated interaction code.
- Photograph selection is documented separately. The eight user image originals are not present in the workspace; no new photo integration is claimed.

QA: both languages across 320, 390, 768, 1024 and 1440px. Existing source workflow helper remains unavailable; use the retained stdin-only source synchronization fallback.
