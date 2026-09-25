#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
OUT="$ROOT/.agent-runs/20260612-123650-benchmark-stage-b/gates/stage-b"
PORT="${PORT:-4173}"
CHROME="${CHROME:-Google Chrome}"

cd "$ROOT"
python3 -m http.server "$PORT" >/tmp/mishima-stage-b-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" >/dev/null 2>&1 || true' EXIT
sleep 1

chrome_headless() {
  local path="$1"
  local size="$2"
  local file="$3"
  open -na "$CHROME" --args \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --screenshot="$OUT/$file" \
    --window-size="$size" \
    "http://127.0.0.1:$PORT$path"
}

chrome_headless "/" "1280,2400" "desktop-root.png"
chrome_headless "/" "390,2400" "mobile-root.png"
chrome_headless "/reports/waterfall-agents/" "1280,2400" "desktop-reports-waterfall-agents.png"
chrome_headless "/reports/waterfall-agents/" "390,2400" "mobile-reports-waterfall-agents.png"
chrome_headless "/agent-readiness/" "1280,2400" "desktop-agent-readiness.png"
chrome_headless "/agent-readiness/" "390,2400" "mobile-agent-readiness.png"

