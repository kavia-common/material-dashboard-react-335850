/**
 * Router basename helper.
 *
 * CRA sets PUBLIC_URL at build-time; react-scripts uses it to prefix asset URLs.
 * When deploying under a subpath (e.g. https://example.com/myapp), setting
 * "homepage" in package.json (or PUBLIC_URL at build) makes PUBLIC_URL be "/myapp".
 *
 * We use that same value as the BrowserRouter basename to make deep links work.
 */

/**
 * PUBLIC_INTERFACE
 * Compute the BrowserRouter basename from CRA's PUBLIC_URL (if present).
 *
 * Contract:
 * - Inputs: none (reads process.env.PUBLIC_URL only)
 * - Output: string basename, either "" (root) or "/subpath" (no trailing slash)
 * - Errors: none (never throws)
 */
export function getRouterBasename() {
  const publicUrl = (process.env.PUBLIC_URL || "").trim();

  // Allow empty/root.
  if (!publicUrl || publicUrl === "/") return "";

  // If someone sets it to a full URL, extract pathname.
  try {
    if (/^https?:\/\//i.test(publicUrl)) {
      const u = new URL(publicUrl);
      return (u.pathname || "").replace(/\/$/, "");
    }
  } catch {
    // Ignore parse errors and fall back to path normalization below.
  }

  // Normalize to leading slash and no trailing slash.
  const withLeadingSlash = publicUrl.startsWith("/") ? publicUrl : `/${publicUrl}`;
  return withLeadingSlash.replace(/\/$/, "");
}
