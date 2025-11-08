import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string;
  category?: string;
};

const DEFAULT_IMAGE = "https://blog.smsidea.in/images/og-blog.png";
const SITE_NAME = "AI Agency Blog";
const SITE_URL = "https://blog.smsidea.in/";
const DEFAULT_AUTHOR = "Ankit - AI Agency";

export function useSEO({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  keywords,
  category,
}: SEOProps) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords || "AI development, DevOps services, artificial intelligence, machine learning, automation, cloud infrastructure, digital transformation" },
      { name: "author", content: author || DEFAULT_AUTHOR },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image || DEFAULT_IMAGE },
      { property: "og:url", content: url || SITE_URL },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image || DEFAULT_IMAGE },
      { name: "twitter:site", content: "@aiagency" },
      { name: "twitter:creator", content: "@aiagency" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
    ];

    // Add article-specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        metaTags.push({ property: "article:published_time", content: publishedTime });
      }
      if (modifiedTime) {
        metaTags.push({ property: "article:modified_time", content: modifiedTime });
      }
      if (author) {
        metaTags.push({ property: "article:author", content: author });
      }
      if (category) {
        metaTags.push({ property: "article:section", content: category });
      }
    }

    metaTags.forEach(({ name, property, content }) => {
      let tag: HTMLMetaElement | null = null;
      if (name) {
        tag = document.querySelector(`meta[name="${name}"]`);
      } else if (property) {
        tag = document.querySelector(`meta[property="${property}"]`);
      }
      if (!tag) {
        tag = document.createElement("meta");
        if (name) tag.setAttribute("name", name);
        if (property) tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Add structured data for articles
    if (type === 'article') {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image || DEFAULT_IMAGE,
        "author": {
          "@type": "Organization",
          "name": author || DEFAULT_AUTHOR
        },
        "publisher": {
          "@type": "Organization",
          "name": "AI Agency",
          "logo": {
            "@type": "ImageObject",
            "url": "https://blog.smsidea.in/images/logo.svg"
          }
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url || SITE_URL
        }
      };

      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup: (optional, not removing tags)
    // return () => { ... }
  }, [title, description, image, url, type, author, publishedTime, modifiedTime, keywords, category]);
}