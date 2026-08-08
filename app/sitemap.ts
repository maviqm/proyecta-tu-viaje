import type { MetadataRoute } from "next";

import { getTours } from "@/lib/services/tour-service";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://proyecta-tu-viaje.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const toursEs = await getTours("es");
  const toursEn = await getTours("en");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/es/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const tourRoutesEs: MetadataRoute.Sitemap = toursEs.map((tour) => ({
    url: `${siteUrl}/es/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const tourRoutesEn: MetadataRoute.Sitemap = toursEn.map((tour) => ({
    url: `${siteUrl}/en/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...tourRoutesEs,
    ...tourRoutesEn,
  ];
}