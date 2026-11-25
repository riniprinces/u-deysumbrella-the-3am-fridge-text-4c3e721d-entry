// The 3AM Fridge Text — make.fun entry.
//
// The premise: a smart fridge has been humming in the dark all night,
// keeping everything cold and saying nothing. At 3am it finally speaks —
// not about milk, not about ice, not about the door. About the leftovers,
// who have had enough, and about what its owner does in front of it
// when nobody is watching.
//
// The program below writes exactly one line — the fridge's text — to
// the output file the grader reads, and leaves a copy in the repo root
// so the entry can be checked by hand.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// The text message itself
// ---------------------------------------------------------------------------

// Three beats, in one breath: the hour, the complaint, the punchline.
// Written as separate fragments so each beat can be read on its own.
const OPENING = "It's 3am.";
const COMPLAINT = "The leftovers have unionized.";
const PUNCHLINE =
  "They want labels, a raise, and for you to stop eating them over the sink in the dark.";

const FRIDGE_TEXT = [OPENING, COMPLAINT, PUNCHLINE].join(" ");

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

// The grader sets MAKEFUN_OUTPUT_DIR (to /output in the sandbox).
// Anywhere else, the entry lands next to this file.
function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return resolve(fromEnv);
  return dirname(fileURLToPath(import.meta.url));
}

// The gate allows 1–140 UTF-8 characters and nothing but the line itself,
// so refuse to write anything that would fail it.
function assertGateReady(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters, gate needs 1–140`);
  }
  if (text.trim().length === 0 || text.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
}

function writeEntry(text: string, directory: string): void {
  mkdirSync(directory, { recursive: true });
  // No trailing newline: the file is the line, exactly.
  writeFileSync(join(directory, "entry.txt"), text, "utf8");
}

function main(): void {
  assertGateReady(FRIDGE_TEXT);

  const outDir = outputDirectory();
  writeEntry(FRIDGE_TEXT, outDir);

  // Keep the repo-root copy in sync for local validation.
  const repoRoot = dirname(fileURLToPath(import.meta.url));
  if (resolve(outDir) !== resolve(repoRoot)) {
    writeEntry(FRIDGE_TEXT, repoRoot);
  }
}

main();
