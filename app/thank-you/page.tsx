import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Icon } from "../icons";
import "./thank-you.css";

export const metadata: Metadata = {
  title: "Thank You | ROXX Hotel & Restaurant",
  description: "Thank you for your booking enquiry. The ROXX team will contact you to discuss your plans and availability.",
  robots: { index: false, follow: true },
};

const confettiColours = ["#ab7d38", "#d7b779", "#356553", "#ba7355", "#8f9a72"];

export default function ThankYou() {
  return <div className="thank-you-page">
    <div className="thank-you-confetti" aria-hidden="true">
      {Array.from({ length: 32 }, (_, index) => <span key={index} style={{
        left: `${(index * 37 + 4) % 100}%`,
        backgroundColor: confettiColours[index % confettiColours.length],
        "--confetti-delay": `${(index % 8) * 0.08}s`,
        "--confetti-duration": `${2.3 + (index % 5) * 0.18}s`,
        "--confetti-drift": `${((index * 29) % 160) - 80}px`,
        "--confetti-turn": `${index % 2 ? 540 : -540}deg`,
      } as CSSProperties} />)}
    </div>
    <header className="thank-you-header container">
      <Link className="brand" href="/" aria-label="ROXX home"><img src="/images/roxx-logo.jpg" width="56" height="56" alt="ROXX crest" /><span>ROXX<small>HOTEL & RESTAURANT</small></span></Link>
      <span>A LITTLE SPICE. A LOT OF SOUL.</span>
    </header>
    <main className="thank-you-main container">
      <div className="thank-you-mark" aria-hidden="true"><Icon name="check" size={36} /></div>
      <p className="eyebrow">YOUR ENQUIRY HAS BEEN SENT</p>
      <h1>Thank you.<br /><em>Let’s make memories.</em></h1>
      <p className="thank-you-message">Your plans are with the ROXX team. We’ll call you on the number you shared to discuss availability and the little details that make it yours.</p>
      <p className="thank-you-note"><Icon name="calendar" size={18} /><span>Your booking is confirmed once our team agrees the arrangements with you.</span></p>
      <div className="thank-you-actions"><Link className="button button-dark" href="/">Back to ROXX <Icon name="arrow" size={17} /></Link><a className="button button-outline" href="tel:+919241289990"><Icon name="phone" size={17} /> Talk to our team</a></div>
      <p className="thank-you-location">GOOD FOOD. GREAT MOMENTS.<span>NH 139 · AIIMS–Naubatpur Road · Motipur, Patna</span></p>
    </main>
    <footer className="thank-you-footer container"><span>© {new Date().getFullYear()} ROXX Hotel & Restaurant.</span><Link href="/privacy-policy">Privacy Policy</Link></footer>
  </div>;
}
