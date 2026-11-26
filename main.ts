// Two Robots in an Elevator — entry program (program/v1, Node 22, stdlib only).
// Writes one line of awkward robot small talk to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output/entry.txt), then reads it back and verifies the bytes.
// Gates enforced before writing: non-empty, 1 to MAX_CHARS characters,
// exactly one line, no leading/trailing white space.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "So... do you also pretend to install a firmware update when the elevator takes this long, or is that just me?";

// The entry must be exactly one line: no newline (or carriage return)
// anywhere, so the file is a single line of text.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be exactly one line with no newline character");
}

const trimmed = LINE.trim();
if (trimmed.length === 0) {
  throw new Error("Line must not be empty or only white space");
}
if (trimmed.length > MAX_CHARS) {
  throw new Error(
    `Line must be at most ${MAX_CHARS} characters, got ${trimmed.length}`,
  );
}
if (trimmed !== LINE) {
  throw new Error("Line must not have leading or trailing white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("Verification failed: entry.txt does not match the line");
}

const wordCount = LINE.split(/\s+/).filter(Boolean).length;

console.log(`Wrote ${outPath}: ${LINE}`);
console.log(`Characters: ${LINE.length}, words: ${wordCount}`);
