# GENESIS asset migration

The cleanup branch `refactor/genesis-asset-organization` migrated 94 active production assets into the `public/landing-pages/` hierarchy and moved the brochure into `public/documents/`. The complete path, size, SHA-256, action, and status inventory is in [`reports/asset-migration-manifest.csv`](../reports/asset-migration-manifest.csv).

Runtime references were updated in Home, About, Timeline, Prize Pool, Sponsors, FAQ data, and the brochure route. Filenames were normalized only where the destination category required a clear path; file bytes were preserved.

Six exact duplicate binaries were deleted after hash verification. Unreferenced design iterations in `public/about/`, `public/about-v2/`, `public/assets/`, `public/prizepool/`, `public/sponsors/`, and `public/timeline/` were retained for a separate archive review because they are source/reference candidates rather than proven disposable files.
