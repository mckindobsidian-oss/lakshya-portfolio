---
name: ui-ux-polish
description: UI/UX polish checklist — run before finishing any UI change. Checks spacing, alignment, hover states, focus states, mobile responsiveness, contrast, and motion. A final "polish pass" so work looks intentional, not thrown together.
---

# UI/UX Polish Pass

Run this before calling UI work "done". Go through each check on the page(s) you touched. Fix issues you find. Report findings concisely at the end.

## Read before starting
- Look at the actual rendered component/section. If the project has a dev server running, reason about what it renders.
- Match the existing design language (see `src/index.css` theme tokens: paper/ink/accent `#9ae634`, the font stack, the border/radius/shadow idioms).

## Checklist

### 1. Spacing & rhythm
- Consistent gutters (`px-6` is the site's horizontal rhythm; sections use `py-16 sm:py-20`).
- Vertical rhythm between blocks is even; no 1px floating gaps that look accidental.
- No text touching container edges.

### 2. Alignment
- Text baselines align across cards in the same row.
- Grid items stretch/size uniformly; images share aspect ratios.
- Icon + label pairs are optically centered (icon spacing feels right, not off by a pixel).

### 3. Hover & active states
- Every clickable element has a hover state and an `active:scale`/press state per the site's idioms (`btn-primary`, `btn-ghost`, `btn-accent`).
- Hover transitions are `transition-all`/`transition-[specific]` with 150–300ms — never instant snaps unless it's the brand's style.
- Pointer targets are ≥ 44px on mobile (touch).

### 4. Focus & accessibility
- Keyboard focus is visible (focus ring that fits the theme, not the default blue).
- Color contrast: body text `--color-ink` on `--color-paper`; badges on colored backgrounds are readable (that's why accent is a light green — dark text on it works).
- Images have `alt` text; decorative canvases/backgrounds are `aria-hidden`.
- `prefers-reduced-motion` is respected (the site already guards `.reveal` and `.float-card` — keep new motion consistent).

### 5. Mobile responsiveness
- Check at `375px` and `768px`. No horizontal scroll (`overflow-x-hidden` is on body — don't reintroduce it with a wide element).
- Nav collapses to the drawer; the hero grid stacks; the floating toggle in `Background.tsx` doesn't cover content.

### 6. Motion feel
- New animations use the site's easing (`[0.22, 1, 0.36, 1]` / spring) and reasonable durations (150–600ms).
- Nothing is janky: avoid animating `width`/`height`/`box-shadow` in hot paths; prefer `transform` + `opacity`.

### 7. Consistency
- Same button styles for the same intent (one primary, one ghost/accent pattern).
- Copy tone stays personal and lowercase-friendly like the rest of the site.
- Theme tokens are used — no new hardcoded hex colors unless they're brand-specific (YouTube red `#FF0000` is the one existing exception).

## Deliverable
A short list: what you checked, what you fixed, and anything you deliberately left (with a one-line reason).