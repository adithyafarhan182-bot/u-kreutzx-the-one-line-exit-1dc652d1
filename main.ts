// The One-Line Exit — writes one funny one-line resignation letter to /output/entry.txt.
// Node 22, no dependencies, no network, no environment reads: fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an IT-support worker resigns by applying his own trade's universal fix
// to himself. One line, one sentence, 131 characters, pure ASCII.
const ENTRY =
  "I resign, effective today: after ten years in IT support, I am turning myself off and on again, and this time I am not coming back.";

function main(): void {
  // Gate check, same as the scorer's: UTF-8 text, 1-140 chars, not only whitespace,
  // exactly one line. Fail loudly instead of writing an invalid entry.
  if (ENTRY.length < 1 || ENTRY.length > 140) {
    throw new Error(`entry is ${ENTRY.length} chars, outside the 1-140 gate`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }

  // The grader's output path is fixed: /output/entry.txt.
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is the line, byte for byte.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length}-char entry to ${join(outDir, "entry.txt")}`);
}

main();
