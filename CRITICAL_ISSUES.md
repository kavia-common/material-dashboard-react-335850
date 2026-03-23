# Critical / Blocker Issues Report

This document summarizes the currently detected critical/blocker issues in this repository based on static inspection and minimal build/test tooling output.

Generated: 2026-03-23

## 1) Hardcoded secret + `eval()` in production bundle (CRITICAL)

- **File:** `src/App.js`
- **Issue:**
  - Hardcoded secret:
    - `const DEBUG_API_KEY = "SK-VISION-PROD-99221-X";`
  - Insecure code execution:
    - `eval(data);`
- **Impact:** High security risk. Client-side bundles are public; secrets will be exposed. `eval()` can enable arbitrary code execution if reachable.
- **Status:** Must be removed before production use.

## 2) CI test step fails when no tests exist (BLOCKER in many CI setups)

- **Command:** `CI=true npm test -- --watchAll=false`
- **Observed output:** `No tests found, exiting with code 1`
- **Impact:** Common CI pipelines will fail builds/merges when the test command returns non-zero.
- **Options to resolve:**
  - Add at least one minimal smoke test under `src/**/*.test.js`, or
  - Adjust CI invocation to use `--passWithNoTests` (less preferred because it can hide missing coverage).

## 3) Potential broken deep-link routing when deployed under a subpath (HIGH)

- **Build output note:** "The project was built assuming it is hosted at /."
- **File:** `src/index.js` uses `<BrowserRouter>` without a `basename`.
- **Impact:** If hosted at a subpath, direct navigation to routes (e.g. `/dashboard`) may 404 unless `homepage`/`basename` is configured.

## Build warnings (non-blockers but should be cleaned up)

### A) Source map parse warning (`stylis-plugin-rtl`)
- **Observed:** Source map parse warning for `node_modules/stylis-plugin-rtl/src/stylis-rtl.ts` (ENOENT).
- **Impact:** Noisy build output; worse debugging experience.

### B) Large SVG triggers Babel deoptimization warning
- **Observed:** Babel deoptimisation warning for `src/assets/images/illustrations/pattern-tree.svg` (>500KB).
- **Impact:** Potential build slowdown and larger bundle sizes.
