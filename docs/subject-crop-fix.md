# Subject-preserving card crops

User screenshots at a medium-width single-column layout showed clipped helmets in the Experience, Partnerships and National Team cards. Percentage-only focal positions did not survive changes from portrait columns to wide cards.

Each supplied photo now has an authored normalized head/helmet rectangle. A ResizeObserver adjusts object-position only when the cover crop would clip that rectangle; lazy image loads and font completion are handled. Original photo pixels are untouched. Caption area and a visual margin are reserved. Medium/small card aspect ratios provide more vertical room without forcing grid overflow.

Regression checks cover the three reported cards in English and Arabic at 320/390/660/768/1024/1440px, including geometric checks against the subject rectangle and screenshots at 660px.

Favicon: existing MA mark retained, centered slightly larger on its dark tile, with new ma-icon.svg / ma-icon-32.png / ma-icon-192.png URLs and matching touch icon. Legacy favicon.ico remains available. New filenames avoid reuse of earlier cached icons.
