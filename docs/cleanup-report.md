# GENESIS cleanup report

## Completed

- Created branch `refactor/genesis-asset-organization`.
- Audited source imports, runtime asset URLs, package configuration, brochure behavior, and cache cleanup.
- Migrated 94 active assets and updated all live references.
- Removed four proven-unreferenced components: `Navbar.tsx`, `MenuDrawer.tsx`, `RegistrationModal.tsx`, and `BrochureModal.tsx`.
- Removed six exact duplicate assets after SHA-256 comparison.
- Changed `/brochure` to read the authoritative PDF without writing during a GET request.
- Scoped `ClientCleanup` service-worker and CacheStorage cleanup to localhost, matching its documented intent.
- Fixed the pre-existing Timeline ref mutation lint error.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with 47 warnings and no errors; warnings are existing `<img>` guidance and unused props/imports.
- `npm run build`: passed; `/` is static and `/brochure` is dynamic.
- Runtime smoke test: `/`, `/brochure`, one migrated WebP, and one migrated SVG returned HTTP 200. `/brochure` returned `application/pdf`.

## Retained review candidates

- Legacy artwork folders and source exports remain because they include uncertain historical/reference material.
- `gsap` has no repository import and `localtunnel` has no script/config reference, but neither was uninstalled during this migration; confirm team workflow before removing.
- `@tailwindcss/turbopack` is used by `next.config.ts` and must remain.
- The live hero still uses Brawl Stars/tournament wording while FAQ content describes a 24-hour student game jam. This conflict was not rewritten; confirm the authoritative event content before changing it.
