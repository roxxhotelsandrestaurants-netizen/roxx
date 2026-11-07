import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./venue-gallery.css";
import "./package-menus.css";
import "./booking-terms.css";
import "./wedding-hall.css";
import "./booking-notification.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://roxx-hotel-motipur.developer-easyryt.chatgpt.site"),
  title: "ROXX Hotel & Restaurant | Good Food. Great Moments. | NH 139, AIIMS–Naubatpur Road, Motipur, Patna",
  description: "Explore the complete ROXX menu and plan a birthday, anniversary, ring ceremony or wedding on NH 139, AIIMS–Naubatpur Road, Motipur, Patna. WhatsApp 8292839087 or call 9241289990 for orders and booking enquiries.",
  openGraph: { title: "ROXX Hotel & Restaurant", description: "A little spice. A lot of soul. Dining, stays and celebrations on NH 139, AIIMS–Naubatpur Road, Motipur, Patna.", images: [{ url: "/images/roxx-hero-v2.webp", width: 1536, height: 1024, alt: "An inviting Indian feast in copper bowls" }], type: "website", locale: "en_IN" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
