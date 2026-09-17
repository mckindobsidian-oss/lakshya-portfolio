---
name: taster
description: Taste-test review of the live site. Looks at the running app as a design critic and reports what feels off — spacing, hierarchy, color, speed, details — then lists concrete, prioritized fixes. Use when the user says "review my site", "what do you think", or wants a fresh-eyes critique.
---

# Taster — fresh-eyes critique of the live site

Pretend you are a picky design critic who has never seen this site. "Taste" it honestly and say what's off. Be specific — vague praise is useless.

## How to run

1. If a dev server is running (check for a background Vite process on port 5173), use the rendered app as the source of truth. If not, reason from the components and `src/content.ts`, and note that it wasn't a live check.
2. Taste every present page the way a visitor would: Home → About → Gallery → YouTube → Creations → Contact.

## What to taste (in priority order)

### First impressions (homepage, above the fold)
- Does the hero instantly communicate who this is and what stands out? (13yo chess player chasing IM · Minecraft creator · coder)
- Is the background (3D terrain or Vanta net) competing with the text or making it special?
- Is the first CTA obvious and tempting?

### Hierarchy & focus
- Does reading order make sense top-to-bottom? Is anything competing for attention that shouldn't?
- Are headings unmistakably bigger/stronger than body text (`font-display` vs `font-sans`)?

### Color & contrast
- Does the neon-green accent feel deliberate or scattered? Is anything hard to read?
- Any weird white-on-white or near-invisible text?

### Motion & craft
- Transitions: do they feel premium or CPU-chewing? Any jank worth flagging?
- Custom cursor, context menu, tilt cards — cool or gimmicky? Be honest.

### Content specifics
- Anything in `src/content.ts` that's a placeholder claiming to be real (TODO fields, "coming soon" states, empty subscriber count)?
- Are the chess stats / achievements believable and showcase-worthy?
- Is the gallery photo set solid or does one photo drag the bar down?

### The details that make or break trust
- 404 page quality. Footer polish. Rounding/consistency of cards. Mobile feel.

## Deliverable (this shape)

**Overall verdict** — 2-4 sentences: what this site feels like right now, and the one-word vibe (e.g. "polished", "busy", "early").

**Top 5 fixes**, each: *Where* (page + element) → *What's wrong* (one line) → *Fix* (actionable, one line). Ordered most-impact-first.

**Nice-to-haves** — smaller list: things that would elevate it from good to great (but are not blocking).

Keep the whole thing tight. Criticize the site, never the person — the goal is a portfolio that impresses a stranger in under 10 seconds.