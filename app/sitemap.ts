import type { MetadataRoute } from "next";
import { siteUrl } from "./site-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: new URL("/privacy-policy", siteUrl).href },
  ];
}
