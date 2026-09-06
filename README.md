# Production Caption Readability Check

SHAR Production is an AI-hybrid video production studio. This MIT-licensed CLI checks subtitle-cue character-per-second reading speed before delivery.

```bash
node cli.mjs example.cues.json 20
```

The input is an array of `{ start, end, text }` cues. Cues above the configurable characters-per-second threshold are reported for editorial review.

Homepage: https://sharprod.com/
