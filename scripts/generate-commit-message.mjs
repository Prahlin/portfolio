#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const messageFile = process.argv[2];
const source = process.argv[3] ?? "";
const skippedSources = new Set(["commit", "merge", "message", "squash"]);

if (!messageFile || skippedSources.has(source)) {
  process.exit(0);
}

const existingMessage = existsSync(messageFile)
  ? readFileSync(messageFile, "utf8")
  : "";
const hasUserMessage = existingMessage
  .split(/\r?\n/)
  .some((line) => {
    const trimmed = line.trim();

    return trimmed.length > 0 && !trimmed.startsWith("#");
  });

if (hasUserMessage) {
  process.exit(0);
}

function git(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 12,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function getDiffArgs(args) {
  return ["diff", ...args];
}

function parseNameStatus(output) {
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [rawStatus, ...paths] = line.split("\t");
      const file = paths.at(-1) ?? "";

      return {
        file,
        status: rawStatus.replace(/\d+$/, ""),
      };
    })
    .filter((entry) => entry.file.length > 0);
}

let diffMode = "staged";
let entries = parseNameStatus(git(getDiffArgs(["--cached", "--name-status", "-M"])));

if (entries.length === 0) {
  diffMode = "working tree";
  entries = parseNameStatus(git(getDiffArgs(["--name-status", "-M"])));
}

const diffText =
  diffMode === "staged"
    ? git(getDiffArgs(["--cached", "--unified=0"]))
    : git(getDiffArgs(["--unified=0"]));
const files = entries.map((entry) => entry.file);

const hasFile = (predicate) => files.some(predicate);
const hasDiff = (pattern) => pattern.test(diffText);
const addedFiles = entries
  .filter((entry) => entry.status.startsWith("A"))
  .map((entry) => entry.file);

const touchesLanding = hasFile((file) => file === "app/page.tsx");
const touchesStyles = hasFile((file) => file === "app/globals.css");
const touchesComponents = hasFile(
  (file) =>
    file.startsWith("app/") &&
    file.endsWith(".tsx") &&
    file !== "app/page.tsx" &&
    !file.startsWith("app/projects/"),
);
const touchesProjectPages = hasFile((file) => file.startsWith("app/projects/"));
const touchesAssets = hasFile((file) => file.startsWith("public/"));
const touchesTooling = hasFile(
  (file) =>
    file.startsWith(".githooks/") ||
    file.startsWith(".vscode/") ||
    file.startsWith("scripts/") ||
    file === "package.json",
);
const touchesHero = hasDiff(/\bhero\b|PhonePreview|ProofStats|phone-shell/i);
const touchesCaseStudies = hasDiff(/\bcase[-A-Za-z]*\b|caseStudies|CaseStudy/i);

function fileLabel(file) {
  if (file === "app/page.tsx") return "the landing page";
  if (file === "app/globals.css") return "the shared stylesheet";
  if (file.startsWith("app/projects/")) return "project detail pages";
  if (file.startsWith("public/")) return "public assets";
  if (file.startsWith("scripts/")) return "project scripts";
  if (file.startsWith(".githooks/")) return "Git hooks";
  if (file.startsWith(".vscode/")) return "workspace settings";

  return file;
}

function listLabels(values) {
  const uniqueValues = [...new Set(values)].slice(0, 3);

  if (uniqueValues.length === 0) return "project files";
  if (uniqueValues.length === 1) return fileLabel(uniqueValues[0]);
  if (uniqueValues.length === 2) {
    return `${fileLabel(uniqueValues[0])} and ${fileLabel(uniqueValues[1])}`;
  }

  return `${fileLabel(uniqueValues[0])}, ${fileLabel(uniqueValues[1])}, and ${fileLabel(
    uniqueValues[2],
  )}`;
}

function buildHeader() {
  if (touchesTooling && !touchesLanding && !touchesStyles) {
    return "Added automatic commit message generation";
  }

  if (touchesHero && touchesCaseStudies) {
    return "Refined portfolio hero and case studies";
  }

  if (touchesHero) {
    return "Refined portfolio hero presentation";
  }

  if (touchesCaseStudies) {
    return "Refined portfolio case-study layout";
  }

  if (touchesLanding || touchesStyles) {
    return "Refined portfolio layout and content";
  }

  return "Updated portfolio project files";
}

function pushBullet(bullets, text) {
  const sentence = text.endsWith(".") ? text : `${text}.`;

  if (!bullets.includes(sentence)) {
    bullets.push(sentence);
  }
}

function buildBullets() {
  const bullets = [];

  if (touchesTooling) {
    pushBullet(
      bullets,
      "Added commit tooling that prefills the commit editor from the current diff",
    );
  }

  if (addedFiles.length > 0) {
    pushBullet(bullets, `Added ${listLabels(addedFiles)} for this update`);
  }

  if (touchesLanding) {
    pushBullet(
      bullets,
      "Updated the landing page structure, copy, and project data in app/page.tsx",
    );
  }

  if (touchesHero) {
    pushBullet(bullets, "Refined hero content, proof stats, or device preview behavior");
  }

  if (touchesCaseStudies) {
    pushBullet(bullets, "Refined case-study card layout, title, stat, or image behavior");
  }

  if (touchesStyles) {
    pushBullet(bullets, "Adjusted responsive layout and visual styling in app/globals.css");
  }

  if (touchesComponents) {
    pushBullet(bullets, "Updated reusable React components that support the portfolio UI");
  }

  if (touchesProjectPages) {
    pushBullet(bullets, "Kept project detail pages aligned with the landing-page changes");
  }

  if (touchesAssets) {
    pushBullet(bullets, "Updated public visual assets used by the portfolio experience");
  }

  pushBullet(
    bullets,
    `Summarized ${entries.length || "the"} changed ${entries.length === 1 ? "file" : "files"} from the ${diffMode} diff`,
  );
  pushBullet(bullets, "Preserved the existing project structure while applying the requested changes");
  pushBullet(bullets, "Prepared this message as one header followed by five hyphen bullets");

  [
    "Kept manual, merge, squash, and amend commit messages untouched",
    "Used staged changes first and fell back to working-tree changes when needed",
    "Kept the generated commit message editable before the commit is finalized",
  ].forEach((fallbackBullet) => pushBullet(bullets, fallbackBullet));

  return bullets.slice(0, 5);
}

const header = buildHeader();
const bullets = buildBullets();
const generatedMessage = `${header}\n\n${bullets
  .map((bullet) => `- ${bullet}`)
  .join("\n")}\n`;
const commentRemainder = existingMessage.trimStart().startsWith("#")
  ? `\n${existingMessage.trimStart()}`
  : "";

writeFileSync(messageFile, `${generatedMessage}${commentRemainder}`);
