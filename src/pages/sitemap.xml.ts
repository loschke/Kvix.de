import type { APIRoute } from 'astro';

const pages = [
    "",  // homepage
    "contact",
    "impressum",
    "datenschutz"
];

function generateSitemap(pages: string[]) {
    const baseUrl = 'https://kvix.de';
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
    <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === "" ? "daily" : "monthly"}</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`).join('')}
</urlset>`;
}

export const GET: APIRoute = async () => {
    return new Response(
        generateSitemap(pages),
        {
            status: 200,
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600"
            }
        }
    );
};
