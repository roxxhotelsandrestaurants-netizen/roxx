import { pageMetadata, restaurantStructuredData } from "./site-metadata";
import "./globals.css";
import "./editorial.css";
import "./venue-gallery.css";
import "./package-menus.css";
import "./booking-terms.css";
import "./wedding-hall.css";
import "./booking-notification.css";
export const metadata = pageMetadata({
  title: "ROXX Hotel & Restaurant | Motipur, Patna",
  description: "Visit ROXX Hotel & Restaurant in Motipur, Patna, on NH 139. Explore Indian and Chinese dishes, book a table, or plan your next celebration.",
  path: "/",
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantStructuredData).replace(/</g, "\\u003c") }} />{children}</body></html>;
}
