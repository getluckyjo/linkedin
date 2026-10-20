# The weekly schedule

Three posts a week, every comment answered, nothing published without Johannes's go, and every post built from his own words. Times are SAST. The routines run inside the Claude session that set them up, so they have his email, calendar, sheet and LinkedIn access.

| When | Who | What |
|---|---|---|
| Saturday 09:07 | Routine "Saturday voice prompts" | Reads the week's calendar and sent mail, picks three postable moments, emails Johannes three questions. He answers in his own words: rough bullets or a voice note transcript. |
| Sunday 16:47 | Routine "Sunday drafts" | Builds three posts from his answers (cut, never add), checks every number against `research/facts.md`, builds the carousel PDF, writes the private week log to the sheet, the contacts list, and emails him the digest. If he did not answer Saturday, drafts are marked "written without your words, please rewrite in yours". |
| Sunday 17:30 | Johannes, 15 min | Replies `go <id>`, `kill <id>` or edits. Or types `go` in the Status column of the Posts tab. Calendar reminder set. |
| Mon, Wed, Fri 07:00 | Routine "morning post package" | Emails him the approved post exactly as it should be pasted, with the carousel PDF or photo note attached. Skips if nothing is approved, if a post went out in the last 36 hours, or if three have gone out this week (his own manual posts count). |
| Mon, Wed, Fri 07:05 to 07:50 | Johannes, 45 min | Pastes the post, then answers every comment. The first 90 minutes decide the reach. Calendar block set. |
| Mon to Sat 08:40 and 13:40 | Routine "drafted replies to new comments" | Reads LinkedIn's comment notification emails (they land in leroux.johannes@gmail.com), drafts one reply per comment in his voice, emails him the list to paste. Never posts. |
| Mon to Fri 12:30 | Johannes, 15 min | Five real comments on posts by people in this week's `contacts/` list. Calendar block set. |

## Why Johannes pastes instead of the routine posting
He asked to sign off every post for now, and the automated posting routine was blocked by the platform's safety check anyway. Posting through the API from this session is still possible when he says "go" here in the conversation. Switching the morning routine to post directly is a one-line change once he wants it.

## Approval in one line
`go <id>` by email reply, `go` in the Status column of the Posts tab, or "go" here in the conversation. Edits in the reply are applied before the package is sent.

## Switches (Sheet1 tab of the sheet)
- `max_posts_per_week`: 3.
- `min_hours_between_posts`: 36.
- `approval_required`: yes.
- `auto_reply_to_comments`: no. The reply routine ignores this for now by design; it drafts only.

## What the API cannot do, so Johannes does it
- Upload a PDF carousel from a personal profile (the morning email carries it ready to post).
- Send connection requests (the weekly contacts list comes with a note to paste).
- Read comments (the routine relies on LinkedIn's notification emails; keep "comments on your posts" email notifications switched on in LinkedIn settings for leroux.johannes@gmail.com).

## Routines
Created 20 October 2026. Change or pause them by asking in any session: "pause the Sunday drafts", "move the voice prompts to Friday".
