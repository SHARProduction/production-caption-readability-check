import test from 'node:test';
import assert from 'node:assert/strict';
import { checkCues } from './cli.mjs';

test('accepts readable cues', () => assert.equal(checkCues([{start:0,end:2,text:'Short cue'}]).errors.length, 0));
test('flags a fast cue', () => assert.match(checkCues([{start:0,end:1,text:'This caption intentionally contains too many characters for one second'}]).errors[0], /above 20/));
