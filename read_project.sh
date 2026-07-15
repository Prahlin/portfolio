#!/bin/bash

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_FILE="$PROJECT_DIR/portfolio_PROJECT_SNAPSHOT.txt"

echo "Generating Portfolio project snapshot..."
echo "Project directory: $PROJECT_DIR"
echo "Snapshot: $OUTPUT_FILE"
echo ""

write_header() {
  cat > "$OUTPUT_FILE" <<EOF
Portfolio Next.js PROJECT SNAPSHOT
Generated: $(date)
Project directory: $PROJECT_DIR

IMPORTANT INSTRUCTIONS FOR CHATGPT & CODEX:
1. Read this entire snapshot before giving code edits.
2. Preserve all assets, spacing, alignment, fonts, images, layout, animations, and relative positioning unless specifically asked to change them.
3. Do not remove unrelated code.
4. Do not rewrite large sections unless requested.
5. When giving code changes, include exact line/row numbers whenever possible.
6. Print full scripts when requested.
7. Treat this project structure as the source of truth.
8. If you do not understand something, ask for clarification instead of making assumptions.
9. Warn me, or at least caution me, if I ask for something that would break the project or cause it to not work as intended.
10. For this Portfolio repo/website project, always ask me for the commit message before committing or pushing.


============================================================
PORTFOLIO PROJECT NOTES
============================================================

- Main source branch: main
- Deployment source: GitHub Actions builds main into the hostinger-deploy branch
- Hostinger root directory: public_html
- Main stack represented by the website: React / React Native, Next.js, Tailwind CSS, Node.js, Kotlin
- Public website assets live under public/
- Run this script before starting a Portfolio session to refresh the project snapshot.


============================================================
SNAPSHOT IGNORE POLICY
============================================================

This file is rebuilt from the current Portfolio workspace every time ./read_project.sh runs.
Ignored paths are omitted from the project tree and file dumps unless they appear inside an included text file such as .gitignore or read_project.sh.

The snapshot intentionally ignores generated/cache/runtime/private files:
- .git
- node_modules
- .next
- out
- dist
- build
- .cache
- .turbo
- .npm
- .pnpm-store
- .yarn
- .DS_Store
- next-env.d.ts
- *.tsbuildinfo
- *_PROJECT_SNAPSHOT.txt
- *.zip
- .env and .env*.local

Binary image, PDF, and archive files are inventoried by path, size, and modified time only. Raw binary bytes are not printed.


============================================================
PROJECT FILE TREE
============================================================

EOF
}

print_file() {
  local file="$1"

  if [ -f "$file" ]; then
    {
      echo ""
      echo ""
      echo "============================================================"
      echo "FILE: ${file#$PROJECT_DIR/}"
      echo "============================================================"
      echo ""
      nl -ba "$file"
    } >> "$OUTPUT_FILE"
  fi
}

print_inventory_header() {
  local title="$1"

  {
    echo ""
    echo ""
    echo "============================================================"
    echo "$title"
    echo "============================================================"
    echo ""
  } >> "$OUTPUT_FILE"
}

print_file_inventory_line() {
  local file="$1"
  local size
  local modified

  size="$(stat -f "%z" "$file" 2>/dev/null || stat -c "%s" "$file" 2>/dev/null || echo "unknown")"
  modified="$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$file" 2>/dev/null || stat -c "%y" "$file" 2>/dev/null || echo "unknown")"
  printf '%s | %s bytes | modified %s\n' "${file#$PROJECT_DIR/}" "$size" "$modified" >> "$OUTPUT_FILE"
}

print_dir_inventory() {
  local title="$1"
  local dir="$2"

  print_inventory_header "$title"

  if [ ! -d "$dir" ]; then
    echo "Directory not present: ${dir#$PROJECT_DIR/}" >> "$OUTPUT_FILE"
    return
  fi

  find "$dir" -type f \
    ! -name ".DS_Store" \
    ! -name "*_PROJECT_SNAPSHOT.txt" \
    | sort | while IFS= read -r file; do
    print_file_inventory_line "$file"
  done
}

print_matching_inventory() {
  local title="$1"
  shift

  print_inventory_header "$title"

  find "$PROJECT_DIR" "$@" -type f \
    ! -path "$PROJECT_DIR/.git/*" \
    ! -path "$PROJECT_DIR/node_modules/*" \
    ! -path "$PROJECT_DIR/.next/*" \
    ! -path "$PROJECT_DIR/out/*" \
    ! -name ".DS_Store" \
    ! -name "*_PROJECT_SNAPSHOT.txt" \
    | sort | while IFS= read -r file; do
    print_file_inventory_line "$file"
  done
}

append_git_context() {
  {
    echo ""
    echo ""
    echo "============================================================"
    echo "GIT CONTEXT"
    echo "============================================================"
    echo ""
    echo "Current branch:"
    git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || true
    echo ""
    echo "Status:"
    git -C "$PROJECT_DIR" status --short --branch 2>/dev/null || true
    echo ""
    echo "Recent commits:"
    git -C "$PROJECT_DIR" log --oneline --decorate -10 2>/dev/null || true
    echo ""
    echo "Remotes:"
    git -C "$PROJECT_DIR" remote -v 2>/dev/null || true
  } >> "$OUTPUT_FILE"
}

write_snapshot() {
  write_header

  find "$PROJECT_DIR" \
    -path "$PROJECT_DIR/.git" -prune -o \
    -path "$PROJECT_DIR/node_modules" -prune -o \
    -path "$PROJECT_DIR/.next" -prune -o \
    -path "$PROJECT_DIR/out" -prune -o \
    -path "$PROJECT_DIR/dist" -prune -o \
    -path "$PROJECT_DIR/build" -prune -o \
    -path "$PROJECT_DIR/.cache" -prune -o \
    -path "$PROJECT_DIR/.turbo" -prune -o \
    -path "$PROJECT_DIR/.npm" -prune -o \
    -path "$PROJECT_DIR/.pnpm-store" -prune -o \
    -path "$PROJECT_DIR/.yarn" -prune -o \
    -name ".DS_Store" -prune -o \
    -name "next-env.d.ts" -prune -o \
    -name "*.tsbuildinfo" -prune -o \
    -name "*_PROJECT_SNAPSHOT.txt" -prune -o \
    -name "*.zip" -prune -o \
    -name ".env" -prune -o \
    -name ".env*.local" -prune -o \
    -print | sort >> "$OUTPUT_FILE"

  cat >> "$OUTPUT_FILE" <<EOF


============================================================
FILE CONTENTS - APP SOURCE
============================================================

EOF

  for file in \
    "$PROJECT_DIR/app/layout.tsx" \
    "$PROJECT_DIR/app/page.tsx" \
    "$PROJECT_DIR/app/ProjectCarouselButton.tsx" \
    "$PROJECT_DIR/app/globals.css"
  do
    print_file "$file"
  done

  cat >> "$OUTPUT_FILE" <<EOF


============================================================
FILE CONTENTS - ROOT / TOOLING / DEPLOYMENT
============================================================

EOF

  for file in \
    "$PROJECT_DIR/.gitignore" \
    "$PROJECT_DIR/README.md" \
    "$PROJECT_DIR/DEPLOYMENT.md" \
    "$PROJECT_DIR/package.json" \
    "$PROJECT_DIR/package-lock.json" \
    "$PROJECT_DIR/next.config.ts" \
    "$PROJECT_DIR/postcss.config.mjs" \
    "$PROJECT_DIR/tsconfig.json" \
    "$PROJECT_DIR/.github/workflows/hostinger-static-export.yml" \
    "$PROJECT_DIR/public/favicon.svg" \
    "$PROJECT_DIR/read_project.sh"
  do
    print_file "$file"
  done

  append_git_context

  print_dir_inventory "BINARY / IMAGE ASSET INVENTORY - PUBLIC IMAGES" "$PROJECT_DIR/public/images"
  print_matching_inventory "PDF WORKLOG INVENTORY" \( -name "portfolio_worklog_*.pdf" \)
  print_matching_inventory "DEPLOYMENT ARCHIVE INVENTORY" \( -name "*.zip" \)

  cat >> "$OUTPUT_FILE" <<EOF


============================================================
NOT INCLUDED IN SNAPSHOT
============================================================

The Portfolio snapshot intentionally excludes generated/cache/runtime/private paths:
- .git
- node_modules
- .next
- out
- dist
- build
- .cache
- .turbo
- .npm
- .pnpm-store
- .yarn
- .DS_Store
- next-env.d.ts
- *.tsbuildinfo
- *_PROJECT_SNAPSHOT.txt
- *.zip
- .env and .env*.local

The snapshot lists public images, PDF worklogs, and deployment archives by path, size, and modified time, but does not print raw PNG/JPG/PDF/ZIP bytes.

EOF
}

write_snapshot

echo "Done."
echo ""
echo "Snapshot created here:"
echo "$OUTPUT_FILE"
echo ""
echo "Open it with:"
echo "open \"$OUTPUT_FILE\""
