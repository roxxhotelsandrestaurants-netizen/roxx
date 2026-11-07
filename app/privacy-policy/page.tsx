import Link from "next/link";
import { Icon } from "../icons";
import { pageMetadata } from "../site-metadata";
import "./privacy-policy.css";

export const metadata = pageMetadata({
  title: "Privacy Policy | ROXX Hotel & Restaurant",
  description: "How ROXX Hotel & Restaurant handles booking enquiries, contact details, email notifications and third-party services.",
  path: "/privacy-policy",
});

const contents = [
  ["information", "Information you share"],
  ["use", "How we use it"],
  ["email", "Booking emails"],
  ["services", "Other services & cookies"],
  ["retention", "Storage & retention"],
  ["choices", "Your choices"],
  ["contact", "Contact ROXX"],
];

export default function PrivacyPolicy() {
  return <div className="privacy-page">
    <a className="sr-only privacy-skip" href="#privacy-content">Skip to privacy policy</a>
    <div className="privacy-topbar">ROXX HOTEL & RESTAURANT · MOTIPUR, PATNA</div>
    <header className="privacy-header container">
      <Link className="brand" href="/" aria-label="ROXX home"><img src="/images/roxx-logo.jpg" width="56" height="56" alt="ROXX crest" /><span>ROXX<small>HOTEL & RESTAURANT</small></span></Link>
      <Link className="text-link" href="/">Back to ROXX <Icon name="arrow" size={17} /></Link>
    </header>
    <main id="privacy-content" className="container">
      <div className="privacy-intro"><p className="eyebrow">A LITTLE CLARITY. A WARMER WELCOME.</p><h1>Your plans.<br /><em>Your privacy.</em></h1><p>Privacy Policy</p><span>Last updated: <time dateTime="2026-11-07">7 November 2026</time></span></div>
      <div className="privacy-layout">
        <nav className="privacy-contents" aria-label="Privacy policy sections"><p>ON THIS PAGE</p>{contents.map(([id, title], index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{title}</a>)}</nav>
        <article className="privacy-copy">
          <p className="privacy-lead">This policy explains how ROXX Hotel & Restaurant handles information on this website and in the booking enquiries you choose to send us.</p>
          <section id="information"><span className="privacy-number">01</span><h2>Information you share</h2><p>Our enquiry form asks for your name, phone number, booking type, preferred date and time, and number of guests. You can also add notes about your plans. Please avoid including payment card details, identity documents or other sensitive personal information in your notes.</p><p>Draft details stay in the open page’s memory while you review them. They are sent to our email service when you select “Send booking enquiry”. We do not save drafts in this website’s cookies or local storage.</p></section>
          <section id="use"><span className="privacy-number">02</span><h2>How we use it</h2><p>We use the details you submit to respond to your enquiry, check availability, discuss your requirements and arrange your visit or event. Sending a booking enquiry does not sign you up for promotional messages.</p><p>Submitting an enquiry does not confirm a reservation. Our team will contact you using the phone number you provide to discuss availability and arrangements.</p></section>
          <section id="email"><span className="privacy-number">03</span><h2>Booking emails</h2><p>We use <a href="https://web3forms.com" target="_blank" rel="noreferrer">Web3Forms</a> to process form submissions and send booking notification emails to the ROXX team. The submitted details pass through that service and our email provider so we can respond. Web3Forms may also process technical information, including your IP address, for delivery and spam prevention.</p><p>Web3Forms states that submission data may be retained for up to three years unless a shorter period is configured or the data is deleted earlier. Its infrastructure may process data in multiple regions. Read the <a href="https://web3forms.com/privacy" target="_blank" rel="noreferrer">Web3Forms Privacy Policy</a> for its current processing and retention practices.</p></section>
          <section id="services"><span className="privacy-number">04</span><h2>Other services & cookies</h2><p>This website includes a Google Maps embed. When the map loads, Google receives information such as your IP address and browser details and may use cookies according to its own settings and <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</p><p>Links to WhatsApp, Instagram and Google Maps take you to those providers. Information you share there is handled under their respective policies. Our hosting and email providers may process technical logs to operate and protect their services.</p><p>The website itself does not add advertising or analytics scripts or store your booking details in browser cookies. You can manage third-party cookies through your browser settings.</p></section>
          <section id="retention"><span className="privacy-number">05</span><h2>Storage & retention</h2><p>Submitted enquiries are handled through Web3Forms and the ROXX team’s email inbox. Email copies and any related booking records may be retained to respond to your enquiry, manage arrangements and meet applicable record-keeping requirements. Contact us to ask about a specific enquiry or request deletion.</p><p>Form submissions use HTTPS in transit. Access to submitted details is intended for the team and service providers handling your enquiry. No internet transmission or email storage system can be guaranteed completely secure.</p></section>
          <section id="choices"><span className="privacy-number">06</span><h2>Your choices</h2><p>You can review and edit your details before sending, leave optional notes blank, or call us instead of using the form. To request access, correction or deletion of information you have submitted, or to withdraw your consent for further handling of an enquiry, contact ROXX using the details below. We may need to verify your identity before acting on a request, and some records may need to be kept where required by law.</p><p>Please have an adult make enquiries on behalf of children and avoid including children’s personal information in the notes.</p></section>
          <section id="contact"><span className="privacy-number">07</span><h2>Contact ROXX</h2><p>For privacy questions or requests, please call our team or visit:</p><address><strong>ROXX Hotel & Restaurant</strong><br />NH 139, AIIMS–Naubatpur Road<br />Motipur, Patna, Bihar 801109<br /><a href="tel:+919241289990">+91 92412 89990</a><br /><a href="tel:+918292839087">+91 82928 39087</a></address><p>We may update this policy as our website or enquiry process changes. The date above identifies the latest revision.</p></section>
        </article>
      </div>
      <div className="privacy-contact"><div><p className="eyebrow">LET’S TALK PLANS</p><h2>Prefer a <em>conversation?</em></h2></div><a className="button button-dark" href="tel:+919241289990"><Icon name="phone" size={18} /> Call our team</a></div>
    </main>
    <footer className="privacy-footer container"><span>© {new Date().getFullYear()} ROXX Hotel & Restaurant.</span><Link href="/#reservations">Plan your visit <Icon name="arrow" size={16} /></Link></footer>
  </div>;
}
