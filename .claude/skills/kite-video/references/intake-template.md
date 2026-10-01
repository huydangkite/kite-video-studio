# INTAKE.md template

Copy into `videos/<slug>/INTAKE.md` and fill in. Keep the colleague's own wording in quotes.

```markdown
# <Video name>

- Kind: marketing | feature demo | case study
- Product / platform: <name> — web | iOS | Android
- Viewer & action: <who> → <what they should do>
- Message: "<one sentence>"
- Formats: 16:9 | 1:1 | 9:16 (primary: …)
- Length: <n>s
- Language / voice: vi | en — <gender, tone> | no voice-over
- Music: <mood> | none
- Concept: CONCEPTS.md direction <A|B|C>
- Look: base style `<catalog name>` (+ guests `<name>` for <chapter>) | reference <file/link>
  → style_guide.md · style colours: yes/no · style display face: yes/no
- Voice pace: <N> words/s measured on the chosen voice
- Generation: voice api|manual · music api|manual · sfx api|manual · ai-people api|manual|none
- Requested by: <name>, <date>

## First resources & scan

- Sent at the start: <links, files>
- SCAN.md: <date> — confirmed guesses: <list>; corrected: <list>

## Resources

| Item | Status | File / note |
|---|---|---|
| Public URL | ✅ | https://… (captured to inputs/capture) |
| Screen recording | ⚠️ | inputs/flow.mov — 1080×2340, 48s; notification at 0:12 to crop |
| Logo | ❌ | waiting for design team |

## Approvals

| Gate | Date | Who (name, role) | Their exact words | What they saw (file, version) |
|---|---|---|---|---|
| Brief sheet | | | | |
| G1 Ý tưởng | | | | CONCEPTS.md |
| G2 Kịch bản & giọng | | | | script.md vN, audio/samples/… |
| G3 Animatic | | | | review/animatic.mp4 |
| Resource gate | | producer | all ✅ | PROMPT.md §5 |
| G4 Bản nháp | | | | review/draft-N/draft.mp4 |
| G5 Bản cuối | | | | final/… |

A gate answered with "làm đi, lát review" is *pending*, not passed: note it and show the artefact
again with the next one.

## Decisions & limitations

- <fallbacks accepted, things deliberately left out>

## Revisions

- <date>: <what changed>
```
