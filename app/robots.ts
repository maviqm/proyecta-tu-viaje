import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://proyecta-tu-viaje.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/en/admin",
        "/es/admin",
        "/en/admin/",
        "/es/admin/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}