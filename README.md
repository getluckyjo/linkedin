# Johannes on LinkedIn: the engine

One repo that runs Johannes Le Roux's LinkedIn presence toward 100,000 followers.

**Owner:** Johannes Le Roux (linkedin.com/in/johannesleroux)
**Tracker sheet (private):** https://docs.google.com/spreadsheets/d/1zkDo3paVpXpd6EYDGGnYy0hxrXgFP3vHBa_SE4Rp67g
**Working branch:** `claude/relaxed-mayer-rbyqju`

## How it works right now: approval mode

Nothing is posted automatically. The flow is:

1. Drafts land in `posts/drafts/` and are sent to Johannes.
2. Johannes replies "go", edits, or kills each one.
3. Only after a "go" does a draft get posted, then moved to `posts/published/` with its LinkedIn URN.

Maximum three posts a week, counting anything Johannes posts himself. Never two on one day.

Automation (a Sunday drafting routine, a Mon/Wed/Fri posting routine) is written up in `CLAUDE.md` but switched off until Johannes is happy with the voice.

## Layout

```
posts/drafts/       waiting for Johannes's go
posts/published/    posted, with LinkedIn URN and date
posts/archive/      earlier versions, kept for learning what not to do
weeks/              public-safe log per week; the private log lives in the sheet
contacts/           weekly "ten people to connect with", public figures only
research/ideas.md   business ideas and models worth a post
STRATEGY.md         the 100k plan: pillars, voice, cadence, budget
CLAUDE.md           instructions for any session working in here
```

## Post file format

```
---
id: 2026-10-16-cant-code
pillar: build-in-public | ideas-and-models | offers-and-lessons
status: draft | approved | published | killed
---
Post text. First line is the hook. Short: 400 to 900 characters.
```

## Hard rules

- This repo is **public**. No private names, deal terms, quotes, investor or shareholder material, customer details. That lives in the sheet only.
- Nothing about a partner, deal, ambassador or number that Johannes has not approved for sharing.
- Written in Johannes's voice. Short, direct, no AI sheen.
