import type { Metadata } from "next";

export const siteUrl = "https://roxxhotel.com/";
export const siteName = "ROXX Hotel & Restaurant";

export function pageMetadata({ title, description, path, noIndex = false }: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    title,
    description,
    alternates: { canonical: new URL(path, siteUrl).href },
    robots: { index: !noIndex, follow: true },
    openGraph: {
      title,
      description,
      url: new URL(path, siteUrl).href,
      siteName,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/images/roxx-hero-v2.webp", width: 1536, height: 1024, alt: "An inviting Indian feast in copper bowls" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/images/roxx-hero-v2.webp", alt: "An inviting Indian feast in copper bowls" }],
    },
  };
}

export const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}#restaurant`,
  name: siteName,
  url: siteUrl,
  image: new URL("/images/roxx-hotel.webp", siteUrl).href,
  logo: new URL("/images/roxx-logo.jpg", siteUrl).href,
  telephone: "+919241289990",
  address: {
    "@type": "PostalAddress",
    streetAddress: "NH 139, AIIMS–Naubatpur Road, Motipur",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    postalCode: "801109",
    addressCountry: "IN",
  },
  servesCuisine: ["Indian", "Chinese"],
  menu: `${siteUrl}#full-menu`,
  hasMap: "https://www.google.com/maps?cid=8451218244387467601",
  sameAs: ["https://www.instagram.com/roxx_hotel_and_restaurants/"],
};
