export default defineEventHandler((event) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://ali-elsayed.vercel.app/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://ali-elsayed.vercel.app/?locale=en"/>
    <xhtml:link rel="alternate" hreflang="tr" href="https://ali-elsayed.vercel.app/?locale=tr"/>
  </url>
</urlset>`;

  event.node.res.setHeader("Content-Type", "application/xml");
  return sitemap;
});
