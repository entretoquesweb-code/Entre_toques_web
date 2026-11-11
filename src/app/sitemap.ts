import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: siteConfig.lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/politica-de-privacidade`,
      lastModified: siteConfig.lastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
