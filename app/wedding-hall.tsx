"use client";

import { Icon } from "./icons";

// Hall charge and amenities supplied by the venue owner.
const amenityGroups = [
  {
    title: "Spaces & stay", icon: "bed",
    items: [
      "AC hall for Jaimala, with sofa and chairs for seating.",
      "4 AC rooms with attached washrooms, equipped with premium amenities.",
      "AC hall with a well-decorated flower mandap for Marwa, with chairs and mattresses for seating.",
      "AC VIP hall equipped with sofas for seating.",
      "4,500 sq ft lawn.",
      "VIP seating gazebo equipped with sofas.",
      "Space for Samdhi Milan.",
    ],
  },
  {
    title: "Décor & seating", icon: "spark",
    items: [
      "Flower gate.",
      "Flower passage with decorative props.",
      "Selfie points.",
      "20 VIP sofas.",
      "200 VIP chairs.",
      "200 fibre chairs.",
      "10 round table setups.",
      "Food counter with frill.",
      "Lighting throughout the building and lawn.",
      "Carpeting as per requirements.",
    ],
  },
  {
    title: "Guest facilities", icon: "heart",
    items: [
      "Gents’ common washroom.",
      "Ladies’ common washroom.",
      "Security guards at the gate.",
      "In-house parking for two-wheelers and four-wheelers.",
    ],
  },
];

const weddingWhatsapp = `https://wa.me/919241289990?text=${encodeURIComponent("Hi ROXX, I’d like to enquire about the wedding hall at ₹1,75,000. Please share availability and arrangements for my wedding date.")}`;

export function WeddingHall({ onEnquire }: { onEnquire: () => void }) {
  return <section id="wedding-hall" className="wedding-hall section-space" aria-labelledby="wedding-hall-title">
    <div className="container">
      <div className="wedding-hall-heading"><div><p className="eyebrow"><Icon name="rings" size={19} /> WEDDINGS AT ROXX</p><h2 id="wedding-hall-title">The setting for<br /><em>your forever.</em></h2></div><div className="wedding-hall-price"><span>WEDDING HALL CHARGE</span><strong>₹1,75,000</strong><a href="#booking-terms">Booking & payment terms <Icon name="diagonal" size={14} /></a></div></div>
      <p className="wedding-hall-intro">From Jaimala to Samdhi Milan, bring your people together in spaces made for the occasion.</p>
      <div className="wedding-amenities">{amenityGroups.map((group) => <article key={group.title} aria-label={group.title}><div className="wedding-amenity-heading"><Icon name={group.icon} size={23} /><h3>{group.title}</h3></div><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      <div className="wedding-hall-actions"><p>Tell us your date and your plans.<br />Let’s make it a ROXX celebration.</p><div><button className="button button-dark" onClick={onEnquire}>Plan your wedding <Icon name="arrow" size={18} /></button><a className="text-link" href={weddingWhatsapp} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} /> Enquire on WhatsApp</a></div></div>
    </div>
  </section>;
}
