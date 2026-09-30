import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Apostrophes and quotes in JSX text render correctly; only `>` and
      // `}` can be a real typo. All 24 hits were ordinary copy ("don't").
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
      // Every internal link on the site is a plain <a> (46 of them, no
      // <Link> anywhere): the pages are static, a full load from the CDN is
      // fast, and nothing prefetches in the background on a phone. The rule
      // flagged 5 of the 46 at random; converting those alone would make the
      // site inconsistent.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The Cloudflare build output. Linting it produced 11,000+ "problems"
    // in generated code and buried the real ones.
    ".open-next/**",
  ]),
]);

export default eslintConfig;
