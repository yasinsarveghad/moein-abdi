# Moein Abdi — athlete website
English and Arabic, based on the requested Livepower reference. Dependency-free client and Worker runtime. Source brief and reference observations are documented in SPEC.md.

- Build: `node scripts/build.mjs`
- Local preview: `node scripts/preview.mjs` (http://localhost:3000)
- API verification: `node tests/api.mjs`
- Browser QA: `node research/qa.cjs` (environment Playwright required)
- Generate PDFs: `python scripts/documents.py` (ReportLab)

Hosted runtime: provision R2 binding `BUCKET`. Set `ADMIN_EMAIL` or `ADMIN_USER_ID` in Sites runtime settings; authorization uses trusted hosting identity headers. Local preview intentionally does not create administrative identity. Contact and coaching forms persist enquiries, not paid bookings. No email or payment provider is configured.

The supplied prompt ends midway through section 14. Twenty-eight original athlete photographs were supplied in two ZIP archives and are preserved unchanged in `originals/`. Responsive WebP variants use the genuine photographs without generative alteration. The home hero uses the specifically requested rocky-course photograph. Gallery labels do not infer dates or finishing positions. The MA monogram is represented as a clean SVG traced from the supplied silhouette, with matching SVG/PNG favicons and Apple touch icon. Results remain athlete-reported; no UCI ID, active ranking, race dates, physiological metrics, sponsors, or testimonials are fabricated.

R2 records: private credentials, private draft race/camp/performance records, and enquiries. Expired enquiries are removed by retention cleanup; no browser storage is used for enquiries. Admin can export and delete enquiries and create or delete draft records. Publication of verified content remains an editorial action, separate from private data entry.

This runtime lacks the Sites plugin's local workflow helper. `scripts/sync-source.mjs` performs the documented Git source push with credentials in hidden stdin and subprocess environment only. Deployment packages are built from the committed Worker output with `.openai/hosting.json` at archive root.
