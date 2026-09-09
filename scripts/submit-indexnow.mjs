// Notifies IndexNow (Bing, Yandex — not Google, they don't participate)
// that our pages exist/changed, instead of waiting for organic crawl
// discovery. Re-run this after adding real new pages (new blog posts,
// new locations, etc.) — this is a manual reindex nudge, not something
// that needs to run on every deploy.
//
// Usage: node scripts/submit-indexnow.mjs
const HOST = "ruvisibility.com";
const KEY = "cdd961871414c08ad6530d6d7f60c4c8";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
const sitemapXml = await sitemapRes.text();
const urlList = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

console.log("IndexNow response:", res.status, await res.text());
