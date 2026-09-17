---
name: awesome-design-md
description: Match the visual style of a famous brand/website using the local DESIGN.md collection (cloned from VoltAgent/awesome-design-md). Use when the user says "make it look like X" (Linear, Apple, Stripe, Notion, etc.) or wants to borrow a specific brand's design language. Lists available styles and shows how to apply one.
argument-hint: <brand-or-website-name>
---

# Awesome DESIGN.md — match a brand's visual style

This project has a local clone of the curated DESIGN.md collection at
`.claude/awesome-design-md/`. Each entry is a plain-text design-system
document (Google Stitch format) an AI agent can read to generate UI that
matches a real brand's visual language — tokens, type scale, spacing,
components, do's-and-don'ts.

## Available styles

List the full catalog first (`.claude/awesome-design-md/design-md/`).
Current set includes:

ai-airtable-apple-binance-bmw-bmw-m-bugatti-cal-claude-clay-clickhouse-
cohere-coinbase-composio-cursor-dell-1996-elevenlabs-expo-ferrari-figma-
hashicorp-ibm-intercom-lamborghini-linear-mastercard-meta-miro-mistral-
mongodb-nike-notion-nvidia-olympics-openai-others-playstation-posthog-
raycast-renault-replit-revolut-runway-sentry-shopify-snap-spotify-starbucks-
stripe-superhuman-supabase-theverge-tesla-vercel-voltagent-warp-wise-xai-zapier

(run `ls .claude/awesome-design-md/design-md/` for the authoritative list)

## How to apply one

1. Pick the brand whose look the user wants (ask if ambiguous).
2. Read its `DESIGN.md`: `.claude/awesome-design-md/design-md/<brand>/DESIGN.md`.
3. Distill the tokens that matter for this page into the component/section
   you're building — don't blindly copy everything. Respect the target's
   do's/don'ts section.
4. Apply using the site's own theme idioms where they don't conflict (see
   the `ui-ux-polish` skill and `src/index.css` tokens), so brand style
   doesn't break this project's consistency.

## Notes

- These tokens describe "publicly visible CSS values" of each site; they're
  a starting reference for visual consistency, not an exact clone.
- If the user wants a style NOT in the collection, say so and offer to
  fetch a new DESIGN.md from getdesign.md instead of faking it.
- The local clone lives in this repo only (`.claude/awesome-design-md/`),
  not on the user's machine globally.
