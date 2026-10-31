# Moein Abdi — implementation contract
Source brief: supplied MASTER BUILD PROMPT v2, truncated at section 14. Explicit user direction: Livepower design, English and Arabic.

## Design evidence
Reference inspected at 1440, 1024 and 390px plus About, Services, Programs, Pricing, Contact, Team, Blog and detail routes. Desktop: 1140px centered content, 70/76px hero, 56/64px section titles, pill CTAs, full-bleed hero, large translucent wordmark, asymmetrical media grids, alternating white/gray sections and dark performance band. Breakpoints 1200px and 810px. Tablet: collapsed header, retained side hero card. Mobile: 20px margins, hidden side card, stacked grids, 44px hero, accordion navigation. Inter type with Manrope wordmark. Reference yellow #e4eb29, black #000, muted #565656. These override suggested brief palette to preserve reference fidelity.

## Architecture
Dependency-free HTML/CSS/JS, bilingual route prefixes (/ar), generated static route documents, Worker ESM bundles assets and optional R2 persistence. Hosted identity protects admin with an explicit ADMIN_USER_ID allowlist. Every requested route has distinct content. No payments, booking confirmation or email dispatch is claimed without provider configuration. Coaching forms request consultation, not purchased services.

## Content
VO2 publicly confirms domestic level 3, mountain specialization, Khorasan Razavi, Davandegan Koohestan. Twenty-eight original photographs subsequently supplied by the user now replace the provisional VO2 image. The first rocky-course photo is the requested hero; contextual images and a filterable 28-photo gallery are integrated. The user-provided MA monogram is traced as a production SVG with matching favicon variants. Age omitted because sources disagree. Results retain athlete-reported status. UCI remains private pending recovery, no invented ID or ranking. The gallery contains genuine supplied photography only; captions do not infer event dates, finishing positions, or sponsorship from visible clothing. No invented endorsements or testimonials. Journal editorial previews clearly labelled, not attributed quotations.

## Verification
Node syntax checks; browser checks English and Arabic routes at 320/390/768/1024/1440; navigation, filter, accordion, lightbox, download PDF and form error states; backend validation and unauthorised admin tests. Ship private pending athlete content approval.

## Commands
Build: node scripts/build.mjs
Preview: node scripts/preview.mjs
QA: node research/qa.cjs

## Boundaries
Never publish fabricated results, metrics, certificates, sponsor logos, testimonials or substitute athlete imagery. Never persist credentials in browser or repository. Server-side input limits, same-origin writes and authorization required. Inquiry retention 90 days; admin export/delete supported.
