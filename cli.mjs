#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function checkCues(cues, maxCps = 20) {
  if (!Array.isArray(cues)) return { errors: ['cues must be an array'], results: [] };
  const errors = [];
  const results = cues.map((cue, index) => {
    const seconds = Number(cue.end) - Number(cue.start);
    const text = typeof cue.text === 'string' ? cue.text.trim() : '';
    if (!text || !Number.isFinite(seconds) || seconds <= 0) { errors.push(`cue ${index + 1} has invalid text or timing`); return { index, valid: false }; }
    const cps = Number((text.length / seconds).toFixed(2));
    const valid = cps <= maxCps;
    if (!valid) errors.push(`cue ${index + 1} is ${cps} cps, above ${maxCps}`);
    return { index, cps, valid };
  });
  return { errors, results };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const path = process.argv[2];
  if (!path) { console.error('Usage: production-caption-readability-check <cues.json> [max-cps]'); process.exit(2); }
  const input = JSON.parse(readFileSync(path, 'utf8'));
  const outcome = checkCues(input, Number(process.argv[3] || 20));
  if (outcome.errors.length) { console.error(`FAIL\n- ${outcome.errors.join('\n- ')}`); process.exit(1); }
  console.log(`PASS: ${outcome.results.length} cues meet reading-speed threshold`);
}
