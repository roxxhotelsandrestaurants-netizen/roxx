import { Icon } from "./icons";

// Venue-provided policies, transcribed from the supplied booking information image.
const policyGroups = [
  {
    title: "Important highlights",
    items: [
      "Genset fuel cost extra [100 litres (fixed)].",
      "Please bring your own locks for the room for security purposes.",
      "A refundable security deposit of ₹5,000 is mandatory at the time of booking.",
    ],
  },
  {
    title: "Payment terms",
    items: [
      "Extra charges will be applicable for additional requirements.",
      "40% advance payment is mandatory for confirmation of booking.",
      "The balance payment must be cleared one month before the event date.",
      "GST is applicable as per government policy.",
      "Anything needed as extras must be informed earlier, and payment for that particular item should be made on the same day.",
    ],
  },
  {
    title: "Terms & conditions",
    items: [
      "Once a booking is made, it cannot be cancelled, and the amount will not be refunded.",
      "If any loss or harm is caused to the premises or property, the party will be responsible and must bear all loss or damage.",
      "Burning of crackers is not allowed inside the premises.",
      "As per government norms, Bihar is a fully dry state, so no alcohol is allowed inside the premises.",
      "The banquet will not be responsible for the loss/theft of valuable items.",
    ],
  },
];

export function BookingTerms() {
  return <section id="booking-terms" className="booking-terms section-space" aria-labelledby="booking-terms-title">
    <div className="container">
      <div className="section-heading booking-terms-heading"><div><p className="eyebrow"><Icon name="calendar" size={17} /> EVENT BOOKING INFORMATION</p><h2 id="booking-terms-title">Before your<br /><em>celebration.</em></h2></div><p>Booking highlights, payment terms<br />and venue policies from the ROXX team.</p></div>
      <div className="booking-terms-grid">{policyGroups.map((group, index) => <article key={group.title} aria-labelledby={`booking-policy-${index}`}><div className="booking-terms-group-heading"><span>0{index + 1}</span><h3 id={`booking-policy-${index}`}>{group.title}</h3></div><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      <details className="booking-terms-original"><summary>View original booking information <Icon name="diagonal" size={16} /></summary><a href="/documents/roxx-booking-terms.jpeg" target="_blank" rel="noreferrer"><img src="/documents/roxx-booking-terms.jpeg" alt="Original ROXX booking information: important highlights, payment terms, and terms and conditions" width="1080" height="1448" loading="lazy" /><span>Open full-size image <Icon name="diagonal" size={14} /></span></a></details>
    </div>
  </section>;
}
