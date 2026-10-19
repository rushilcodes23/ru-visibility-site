// The site stylesheet is imported here, not in layout.tsx, and this file does
// nothing else.
//
// Next attaches the root layout's CSS to its built-in global-error page too,
// and with inlineCss on (next.config.ts) that meant every page's HTML carried
// the whole 79 KB stylesheet a third time, inside the data for an error page
// nobody sees. Next attaches CSS per file, so importing it from the template
// (which wraps every page and the 404) keeps it off the error page. Measured:
// homepage HTML 413,363 -> 333,701 bytes, every page about 80 KB lighter,
// compressed size unchanged. The page gets the same CSS in the same order: the
// font rules from layout.tsx and this file together are byte for byte the
// stylesheet the layout used to load.
import "./globals.css";

export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
