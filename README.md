# Moein Abdi — athlete website
English and Arabic, based on the requested Livepower reference. Dependency-free client and Worker runtime. Source brief and reference observations are documented in SPEC.md.

- Build: `node scripts/build.mjs`
- Local preview: `node scripts/preview.mjs` (http://localhost:3000)
- API verification: `node tests/api.mjs`
- Browser QA: `node research/qa.cjs` (environment Playwright required)
- Generate PDFs: `python scripts/documents.py` (ReportLab)

Hosted runtime: provision R2 binding `BUCKET`. Set `ADMIN_EMAIL` or `ADMIN_USER_ID` in Sites runtime settings; authorization uses trusted hosting identity headers. Local preview intentionally does not create administrative identity. Contact and coaching forms persist enquiries, not paid bookings. No email or payment provider is configured.

The supplied prompt ends midway through section 14. No original athlete action photographs were attached. The provisional portrait comes from the public VO2 profile and needs final usage approval. Other imagery is abstract vector landscape art and does not depict another athlete. Results remain athlete-reported. No UCI ID, active ranking, race dates, performance numbers, sponsor logos, or client testimonials are fabricated. English spelling and final biography await approval.

R2 records: private credentials, private draft race/camp/performance records, and enquiries. Expired enquiries are removed by retention cleanup; no browser storage is used for enquiries. Admin can export and delete enquiries and create or delete draft records. Publication of verified content remains an editorial action, separate from private data entry.

This runtime lacks the Sites plugin's local workflow helper. `scripts/sync-source.mjs` performs the documented Git source push with credentials in hidden stdin and subprocess environment only. Deployment packages are built from the committed Worker output with `.openai/hosting.json` at archive root.
