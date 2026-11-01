# Athlete award collection

Achievements retains its hero, then the trophy and medal collections, followed by all previous content. The homepage medal collection remains between athlete background and journal sections.

Trophies use a three-position carousel: the central card is full size and sharp; two smaller side cards are lightly blurred. Clicking a card, using navigation, swiping, or keyboard arrows/Home/End selects the central object. The medal selector uses nine large gray numbers, without thumbnails or a view button. Medal images blend with a directional offset and subtle blur over one second. Revision guards discard stale loads during rapid selection. Error states retain the previous image and offer retry.

Each visible collection advances after six seconds. Autoplay pauses while hovered, keyboard-focused, offscreen, or in a hidden browser tab. A minimal pause/play control preserves explicit user preference. Reduced-motion disables autoplay and transitions. Automatic changes do not generate live-region announcements. Both existing themes and English/Arabic are supported.

Original PNGs remain in originals/awards. scripts/awards.cjs only trims transparent margins and creates WebP delivery assets. Artwork and award claims are not synthesized.

Validation: research/awards-qa.cjs checks 20 viewport/language/theme combinations, section placement, selectors, rapid switching, navigation, card depth, and reduced-motion homepage. research/awards-autoplay-qa.cjs covers timer advancement, wraparound, hover/offscreen pause and explicit pause/resume in English and Arabic. research/awards-edge-qa.cjs checks image failure/retry, swipe and all nine medal images.
