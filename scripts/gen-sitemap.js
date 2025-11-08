import { writeFileSync, readFileSync } from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const SITE_URL = 'https://blog.smsidea.in';

// Static pages with their priorities
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
];

async function generateSitemap() {
  const posts = await glob('src/content/posts/*.md');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${posts.map(post => {
    const fileContent = readFileSync(post, 'utf8');
    const { data } = matter(fileContent);
    // Extract slug from filename (remove date prefix and .md extension)
    const filename = path.basename(post);
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    const lastmod = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
    
    return `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();