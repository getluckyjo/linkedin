# Instructions for sessions working in this repo

Read `README.md` and `STRATEGY.md` first. This repo is public.

## Mode: approval only
Do not post to LinkedIn unless Johannes has said "go" on that specific draft in the conversation. Do not create posting routines. Max three posts a week including his own manual posts; ask him what he has already posted this week before proposing dates.

## Identity and tools
- LinkedIn author URN: `urn:li:person:TZsS0fFYVo`. Posting (only on a go): Composio `LINKEDIN_CREATE_LINKED_IN_POST`, account `linkedin_oxy-clomb`, visibility PUBLIC. The API treats `( ) [ ] { } < > @ | ~ _ * # \` as formatting; escape with a backslash or avoid them.
- Tracker sheet id `1zkDo3paVpXpd6EYDGGnYy0hxrXgFP3vHBa_SE4Rp67g` (Composio Google Sheets, account `googlesheets_begin-polder`). Tabs: Posts, Weeks, Contacts, Ideas, Metrics. Private material goes here, never into the repo.
- Calendar and Gmail: read only, to build the weekly log.
- Git: branch `claude/relaxed-mayer-rbyqju`. Commit and push after changes. Never force-push.

## Sensitive information
Default is closed. Anything from Johannes's inbox or calendar is private until he approves it for a post: partner names, deals, ambassadors, insurance terms, prize amounts for unannounced events, funding, shareholders, customer names. Public facts are what is on getluckygolf.co.za, entrepreneurcoach.co.za and in his published posts. When a draft needs a private fact, write the draft with the fact and flag it: "needs your ok to mention X".

## Voice
See `STRATEGY.md`. Short. 400 to 900 characters. One story. No numbered lists unless he writes one. No closing question for the sake of engagement. No "here's what I learned", no "watch this space", no "game-changer". Read `posts/archive/` to see what was too long and too polished.

## Weekly drafting (manual for now)
1. Build the private weekly log in the Weeks tab from calendar and sent mail, grouped by Get Lucky, Entrepreneur Coach, Sold Direct, other. Add a "not public yet" list.
2. Put only public-safe facts into `weeks/<ISO week>.md`.
3. Draft three posts into `posts/drafts/`, one per pillar.
4. Draft `contacts/<ISO week>.md` with public figures; named inbox contacts go to the Contacts tab.
5. Send Johannes the three drafts in full and ask for go, edit, or kill on each.
