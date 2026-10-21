# GENESIS project structure

## Application entry points

- `app/page.tsx` owns the landing-page controller and Home section.
- `app/components/` contains the live About, Timeline, Prize Pool, Sponsors, FAQ, sound, and cache-cleanup components.
- `app/data/faqData.ts` contains the four FAQ categories and 13 question records.
- `app/brochure/route.ts` serves the brochure at `/brochure`.
- `app/globals.css` contains the shared section styling and responsive rules.

## Production assets

Active browser assets live under `public/landing-pages/<section>/<category>/`:

- `home/{backgrounds,characters,planets,props,ui}`
- `about/{backgrounds,ui}`
- `timeline/{backgrounds,stages,ui}`
- `prize-pool/{backgrounds,characters,badges,ui}`
- `sponsors/{backgrounds,logos,cards,ui}`
- `faq/{backgrounds,ui}`

The brochure is authoritative at `public/documents/GENESIS_6_BROCHURE_.pdf`.

Reference assets remain in `required files/` and staging exports remain in `components/`; neither is imported by the browser runtime.

## Adding assets

Place new production artwork in the section/category directory that owns it. Reference it with a root-relative URL such as `/landing-pages/home/props/example.webp`; never include `/public/` in a runtime URL.
