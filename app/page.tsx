"use client";

import { useEffect, useRef, useState } from "react";
import { BookingForm, type Occasion } from "./booking-form";
import { BookingTerms } from "./booking-terms";
import { Icon } from "./icons";
import { MenuCatalog } from "./menu-catalog";
import { SignatureDishes } from "./signature-dishes";
import { VenueGallery } from "./venue-gallery";
import { PackageMenus } from "./package-menus";
import { WeddingHall } from "./wedding-hall";

const mapsUrl = "https://www.google.com/maps?cid=8451218244387467601";
const mapEmbedUrl = "https://maps.google.com/maps?cid=8451218244387467601&z=16&output=embed";
const whatsappUrl = "https://wa.me/919241289990?text=Hi%20ROXX%2C%20I%27d%20like%20to%20enquire%20about%20an%20order%20or%20booking.";
const instagramUrl = "https://www.instagram.com/roxx_hotel_and_restaurants/";
const eventCards = [
  { number: "01", icon: "cake", title: "Birthday", text: "Another year. Another reason to bring everyone together." },
  { number: "02", icon: "heart", title: "Anniversary", text: "Celebrate your story over food made for sharing." },
  { number: "03", icon: "rings", title: "Ring ceremony", text: "Celebrate your promise with the people you love." },
  { number: "04", icon: "rings", title: "Wedding", text: "The beginning of forever deserves a memorable gathering." },
] as const;

function Brand() {
  return <a className="brand" href="#" aria-label="ROXX home"><img src="/images/roxx-logo.jpg" width="56" height="56" alt="ROXX crest" /><span>ROXX<small>HOTEL & RESTAURANT</small></span></a>;
}

export default function Home() {
  const [mobileNav, setMobileNav] = useState(false);
  const [occasion, setOccasion] = useState<Occasion>("Birthday");
  const originalMenu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function onScroll() {
      if (frame || reduced.matches) return;
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--parallax", `${Math.min(window.scrollY * 0.13, 85)}px`);
        frame = 0;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  function planVisit(value: Occasion) {
    setOccasion(value); setMobileNav(false);
    document.getElementById(window.innerWidth <= 650 ? "booking-form" : "reservations")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="topbar"><div className="container"><a href={mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin" size={13} /> NH 139 · AIIMS–NAUBATPUR ROAD · MOTIPUR, PATNA</a><span>A little escape. A lot of flavour.</span><div className="topbar-phones"><a href="tel:+919241289990"><Icon name="phone" size={13} /> +91 92412 89990</a><a href="tel:+918292839087"><Icon name="phone" size={13} /> +91 82928 39087</a></div></div></div>
    <header className="header"><div className="container navigation"><Brand /><nav className={mobileNav ? "nav-links open" : "nav-links"} aria-label="Main navigation"><a href="#our-story" onClick={() => setMobileNav(false)}>Our story</a><a href="#full-menu" onClick={() => setMobileNav(false)}>Our menu</a><a href="#celebrations" onClick={() => setMobileNav(false)}>Celebrations</a><a href="#visit" onClick={() => setMobileNav(false)}>Find us</a></nav><button className="button button-dark nav-booking" onClick={() => planVisit(occasion)}><Icon name="calendar" size={16} /> Book an event</button><button className="mobile-toggle" aria-label={mobileNav ? "Close navigation" : "Open navigation"} aria-expanded={mobileNav} onClick={() => setMobileNav(!mobileNav)}><Icon name={mobileNav ? "close" : "menu"} size={24} /></button></div></header>
    <main id="main">
      <section className="hero">
        <div className="hero-scene"><img src="/images/roxx-hero-v2.webp" alt="A sumptuous Indian feast with copper bowls of butter chicken, biryani, and fresh garlic naan" width="1536" height="1024" fetchPriority="high" /></div><div className="hero-wash" />
        <div className="container hero-inner"><div className="hero-copy"><p className="eyebrow"><span /> WELCOME TO THE ROXX TABLE</p><p className="hero-script">Tradition on a plate.</p><h1>A little spice.<br />A lot of <em>soul.</em></h1><p className="hero-description">Rich Indian flavours. Your favourite Chinese bites.<br />And all the warmth of coming home.<br />Discover ROXX Hotel & Restaurant on NH 139,<br />AIIMS–Naubatpur Road, Motipur, Patna.</p><div className="hero-actions"><a href="#full-menu" className="button button-dark">Explore the full menu <Icon name="utensils" size={17} /></a><button className="button button-outline" onClick={() => planVisit(occasion)}>Plan your occasion <Icon name="arrow" size={17} /></button></div><div className="hero-location"><Icon name="pin" size={18} /><span>YOUR NEXT FAVOURITE PLACE<small>NH 139, AIIMS–Naubatpur Road, Motipur, Patna</small></span></div></div><div className="hero-stamp"><span>FROM OUR KITCHEN</span><Icon name="utensils" size={25} /><strong>Made with<br /><em>heart.</em></strong><span>TO YOUR TABLE</span></div><div className="hero-image-label"><span /> INDIAN SOUL. ROXX SPIRIT.</div></div>
      </section>
      <div className="container benefits-wrap"><div className="benefits">{[{ icon: "leaf", title: "Fresh flavours", text: "Good ingredients. Beautifully brought together." }, { icon: "utensils", title: "A menu for every mood", text: "Indian classics to Chinese favourites." }, { icon: "heart", title: "Come as family", text: "Warm hospitality, from hello to goodbye." }, { icon: "spark", title: "Make a memory", text: "Dine, celebrate, and stay a little longer." }].map((item) => <div key={item.title}><Icon name={item.icon} size={32} /><span><strong>{item.title}</strong><small>{item.text}</small></span></div>)}</div></div>

      <section id="our-story" className="story section-space"><div className="container story-grid"><div className="story-copy" data-reveal><p className="eyebrow"><Icon name="spark" size={16} /> A PLACE TO COME TOGETHER</p><h2>Good food.<br />Even better <em>company.</em></h2><p>One more piece of naan. A conversation that goes on a little longer. An evening you’ll want to do all over again.</p><p>At ROXX, we bring your people together over comforting Indian classics and bold Chinese favourites, right here on NH 139, AIIMS–Naubatpur Road, Motipur, Patna.</p><a href="#full-menu" className="text-link">Find something you’ll love <Icon name="arrow" size={17} /></a></div><div className="story-picture" data-reveal><img src="/images/roxx-hotel.webp" alt="The supplied ROXX Hotel and Restaurant exterior, glowing in evening light" width="1100" height="1326" loading="lazy" /><span>NH 139 · AIIMS–NAUBATPUR ROAD · MOTIPUR, PATNA</span></div><div className="story-quote" data-reveal><div className="ornament"><Icon name="spark" size={42} /></div><span>AT THE HEART<br />OF EVERY GOOD TIME</span><p>A full table.<br />A happy heart.<br /><em>That’s ROXX.</em></p><div className="quote-rule">✦</div><a href={instagramUrl} target="_blank" rel="noreferrer"><Icon name="instagram" size={18} /> A taste of life at ROXX</a></div></div></section>

      <VenueGallery />

      <SignatureDishes />

      <section className="dining-banner"><div className="dining-banner-photo" /><div className="container dining-banner-content" data-reveal><p className="eyebrow light"><span /> FAMILIAR FLAVOURS. UNFORGETTABLE MOMENTS.</p><h2>The table’s set.<br />All that’s missing <em>is you.</em></h2><p>For the comfort-food days, the family-feast days,<br />and the “let’s go somewhere special” days.</p><div><button className="button button-gold" onClick={() => planVisit(occasion)}>Make it a ROXX evening <Icon name="arrow" size={18} /></button><a href="tel:+919241289990" className="banner-phone"><Icon name="phone" size={19} /><span>ORDERS & BOOKINGS<strong>+91 92412 89990</strong></span></a></div></div><span className="banner-wordmark" aria-hidden="true">ROXX</span></section>

      <MenuCatalog onOriginalMenu={() => originalMenu.current?.showModal()} />

      <PackageMenus />

      <section id="celebrations" className="celebrations-section"><div className="celebration-photo"><img src="/images/roxx-celebrations.webp" alt="Celebration styling inspiration with candlelit tables, flowers, and warm fairy lights" width="1536" height="1024" loading="lazy" /><span>THE CELEBRATION EDIT · STYLING INSPIRATION</span></div><div className="celebration-overlay" /><div className="container celebration-heading" data-reveal><p className="eyebrow light"><Icon name="spark" size={18} /> YOUR MOMENTS DESERVE MORE</p><h2>Some days call for<br /><em>something special.</em></h2><p>Birthdays, anniversaries, ring ceremonies, and weddings.<br />Tell us your plans. Let’s talk about making them memorable.</p><button className="button button-gold" onClick={() => planVisit("Birthday")}>Plan your celebration <Icon name="arrow" size={18} /></button></div></section>
      <div className="event-cards container">{eventCards.map((event) => <button key={event.title} className="event-card" onClick={() => planVisit(event.title)}><div><Icon name={event.icon} size={30} /><span>{event.number}</span></div><h3>{event.title}</h3><p>{event.text}</p><span className="event-card-link">Let’s make plans <Icon name="diagonal" size={17} /></span></button>)}</div>

      <WeddingHall onEnquire={() => planVisit("Wedding")} />

      <section id="reservations" className="reservations-section section-space"><div className="container reservations-grid"><div className="reservations-copy" data-reveal><p className="eyebrow"><Icon name="calendar" size={18} /> DINE. CELEBRATE. MAKE MEMORIES.</p><h2>Your people.<br />Your occasion.<br /><em>Our warm welcome.</em></h2><p>A birthday full of laughter. An anniversary to remember.<br />The start of a beautiful new chapter.</p><p>Pick your occasion and share a few details. Our team will help you with availability, dining, and celebration arrangements.</p><div className="reservation-options">{eventCards.map((event) => <button key={event.title} className={occasion === event.title ? "selected" : ""} onClick={() => setOccasion(event.title)}><Icon name={event.icon} size={22} /><span>{event.title}</span><Icon name="diagonal" size={16} /></button>)}</div><div className="reservations-call"><Icon name="phone" size={23} /><div><span>LOVE TO TALK PLANS?</span><a href="tel:+919241289990">+91 92412 89990</a><a href="tel:+918292839087">+91 82928 39087</a></div></div></div><BookingForm occasion={occasion} onOccasionChange={setOccasion} /></div></section>

      <BookingTerms />

      <section id="visit" className="visit-section"><div className="container visit-grid"><div className="visit-copy"><p className="eyebrow"><Icon name="pin" size={17} /> A LITTLE CLOSER TO GOOD TIMES</p><h2>Meet you <em>at ROXX.</em></h2><p>NH 139, AIIMS–Naubatpur Road<br />Motipur, Patna, Bihar 801109</p><a href={mapsUrl} target="_blank" rel="noreferrer" className="button button-dark">Get directions <Icon name="diagonal" size={17} /></a><a className="visit-instagram" href={instagramUrl} target="_blank" rel="noreferrer"><Icon name="instagram" size={24} /><span>Follow the flavour.<small>@roxx_hotel_and_restaurants</small></span><Icon name="diagonal" size={17} /></a></div><div className="location-map"><iframe title="ROXX Hotel and Restaurant location on Google Maps" src={mapEmbedUrl} width="800" height="370" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /><a className="map-open-link" href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Icon name="diagonal" size={15} /></a></div></div></section>
    </main>
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with ROXX on WhatsApp" title="Chat with ROXX on WhatsApp"><span>Chat with ROXX</span><Icon name="whatsapp" size={32} /></a>
    <footer className="footer"><div className="container footer-main"><div><Brand /><p>Indian soul. ROXX spirit.<br />Good times on NH 139.<br />AIIMS–Naubatpur Road, Motipur, Patna.</p></div><div><h3>Find your way</h3><a href="#our-story">Our story</a><a href="#full-menu">Full menu</a><a href="#celebrations">Celebrations</a><a href="#reservations">Reservations</a></div><div><h3>Come say hello</h3><a href={mapsUrl} target="_blank" rel="noreferrer">NH 139, AIIMS–Naubatpur Road<br />Motipur, Patna, Bihar</a><a href="tel:+919241289990">+91 92412 89990</a><a href="tel:+918292839087">+91 82928 39087</a></div><div className="footer-note"><Icon name="spark" size={29} /><p>Good food tastes<br /><em>better together.</em></p><a href={instagramUrl} aria-label="ROXX on Instagram" target="_blank" rel="noreferrer"><Icon name="instagram" size={20} /></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} ROXX Hotel & Restaurant. All rights reserved.</span><span>MADE FOR THE MOMENTS THAT MATTER.</span><a href="#">Back to top ↑</a></div></footer>
    <dialog ref={originalMenu} className="original-menu-dialog" aria-labelledby="original-menu-title" onClick={(event) => { if (event.target === event.currentTarget) originalMenu.current?.close(); }}><div className="original-menu-header"><div><p className="eyebrow">FROM THE ROXX TABLE</p><h2 id="original-menu-title">The original <em>menu.</em></h2></div><button className="close-button" aria-label="Close original menu" onClick={() => originalMenu.current?.close()}><Icon name="close" size={24} /></button></div><div className="printed-menu">{[1,2,3,4,5].map((page) => <a key={page} href={`/menu/page-${page}.webp`} target="_blank" rel="noreferrer"><img src={`/menu/page-${page}.webp`} alt={`Original ROXX menu page ${page}`} width="750" height="1020" loading="lazy" /><span>Open page {page} <Icon name="diagonal" size={16} /></span></a>)}</div></dialog>
  </>;
}
