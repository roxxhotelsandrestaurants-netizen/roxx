"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./icons";
import { bookingDateLabel, bookingTimeLabel, bookingToday, bookingValidationError, occasions, sendBookingNotification, type BookingDetails, type Occasion } from "./booking-notification";

export { occasions, type Occasion } from "./booking-notification";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || "";
const emptyDetails = { name: "", phone: "", date: "", time: "19:00", guests: "2", notes: "" };

export function BookingForm({ occasion, onOccasionChange }: { occasion: Occasion; onOccasionChange: (value: Occasion) => void }) {
  const router = useRouter();
  const [details, setDetails] = useState(emptyDetails);
  const [today, setToday] = useState("");
  const [review, setReview] = useState<BookingDetails | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const inFlight = useRef(false);
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => { setToday(bookingToday()); }, []);
  useEffect(() => {
    if (!review || !summary.current) return;
    summary.current.focus({ preventScroll: true });
    summary.current.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [review]);
  useEffect(() => {
    if (inFlight.current) return;
    setReview(null);
    setStatus("idle");
    setError("");
    setCopyStatus("");
  }, [occasion]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const booking = { ...details, name: details.name.trim(), phone: details.phone.trim(), occasion };
    const validationError = bookingValidationError(booking);
    setError(validationError);
    if (validationError) return;
    setDetails((previous) => ({ ...previous, name: booking.name, phone: booking.phone }));
    setStatus("idle");
    setReview(booking);
  }

  async function sendEnquiry() {
    if (!review || inFlight.current || status === "sent") return;
    inFlight.current = true;
    setStatus("sending");
    setError("");
    try {
      await sendBookingNotification(review, accessKey, botcheck);
      setStatus("sent");
      router.push("/thank-you");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn’t send your enquiry. Please call our team.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  async function copyEnquiry() {
    if (!review) return;
    const text = `ROXX booking enquiry\nOccasion: ${review.occasion}\nName: ${review.name}\nPhone: ${review.phone}\nDate: ${bookingDateLabel(review.date)}\nTime: ${bookingTimeLabel(review.time)} (IST)\nGuests: ${review.guests}${review.notes ? `\nNotes: ${review.notes}` : ""}\nPlease confirm availability and arrangements.`;
    try { await navigator.clipboard.writeText(text); setCopyStatus("Enquiry copied. You can share these details with our team."); }
    catch { setCopyStatus("Copy is unavailable in this browser. Your details are shown above."); }
  }

  function editDetails() {
    setReview(null);
    setError("");
    setStatus("idle");
    setCopyStatus("");
  }

  const sent = status === "sent";
  const sending = status === "sending";

  return <div className="booking-panel" id="booking-form">
    <div className="booking-panel-top"><span><Icon name="calendar" size={20} /> YOUR PLANS START HERE</span><small>01 / PLAN YOUR VISIT</small></div>
    {!review ? <form onSubmit={submit}>
      <div className="booking-form-heading"><h3>Make it a <em>ROXX occasion.</em></h3><p>A table for two or a celebration with everyone.<br />Tell us what you’re planning.</p></div>
      <label className="occasion-field">I’m planning<select name="occasion" value={occasion} onChange={(event) => onOccasionChange(event.target.value as Occasion)}>{occasions.map((item) => <option key={item}>{item}</option>)}</select></label>
      <div className="form-grid">
        <label>Your name<input name="name" autoComplete="name" placeholder="Full name" required pattern=".*\S.*" maxLength={80} value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} /></label>
        <label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your contact number" required maxLength={18} value={details.phone} onChange={(event) => setDetails({ ...details, phone: event.target.value })} /></label>
        <label>Preferred date<input name="date" type="date" required min={today} value={details.date} onChange={(event) => setDetails({ ...details, date: event.target.value })} /></label>
        <label>Preferred time (IST)<input name="time" type="time" required value={details.time} onChange={(event) => setDetails({ ...details, time: event.target.value })} /></label>
        <label>Number of guests<input name="guests" type="number" min="1" required step="1" value={details.guests} onChange={(event) => setDetails({ ...details, guests: event.target.value })} /></label>
        <div className="form-helper"><Icon name="heart" size={20} /><span>Small plans.<br />Big memories.</span></div>
      </div>
      <label>A little more about your plans <span className="optional">(optional)</span><textarea name="notes" rows={3} maxLength={1000} placeholder="Food preferences, birthday setup, wedding plans, or anything you’d like us to know…" value={details.notes} onChange={(event) => setDetails({ ...details, notes: event.target.value })} /></label>
      <input type="checkbox" name="botcheck" className="booking-honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off" checked={botcheck} onChange={(event) => setBotcheck(event.target.checked)} />
      {error && <p className="booking-error" role="alert">{error}</p>}
      <button type="submit" className="button button-dark booking-submit">Review booking enquiry <Icon name="arrow" size={18} /></button>
      <p className="form-fineprint">Review your details, then send your enquiry to our team. A reservation is confirmed only after our team contacts you.</p>
    </form> : <div ref={summary} className="booking-summary" tabIndex={-1} aria-busy={sending}>
      <span className="summary-icon"><Icon name={sent ? "check" : "calendar"} size={26} /></span>
      <p className="eyebrow">{sent ? "THANK YOU FOR CHOOSING ROXX" : "ONE MORE STEP"}</p>
      <h3>{sent ? <>Your enquiry<br /><em>is on its way.</em></> : <>Your occasion,<br /><em>at a glance.</em></>}</h3>
      <table><caption className="sr-only">Your booking enquiry details</caption><tbody>{[["Occasion", review.occasion], ["Name", review.name], ["Phone", review.phone], ["Date", bookingDateLabel(review.date)], ["Time", `${bookingTimeLabel(review.time)} (IST)`], ["Guests", review.guests]].map(([key, value]) => <tr key={key}><th scope="row">{key}</th><td>{value}</td></tr>)}</tbody></table>
      {review.notes && <p className="summary-notes"><strong>Your notes</strong>{review.notes}</p>}
      <p className="summary-instruction" role="status">{sent ? "Your enquiry has been sent to the ROXX team. We’ll contact you on the phone number provided to discuss availability. Your booking is not confirmed yet." : "Please check your details, then send your enquiry. Our team will call you to discuss availability and confirm your plans."}</p>
      {!sent && <><button type="button" className="button button-dark booking-send" onClick={sendEnquiry} disabled={sending}>{sending ? "Sending enquiry…" : "Send booking enquiry"}<Icon name="arrow" size={18} /></button><p className="form-fineprint">Your details will be sent securely through Web3Forms to our team’s inbox.</p></>}
      {error && <p className="booking-error" role="alert">{error}</p>}
      <a className="button button-gold booking-call" href="tel:+919241289990"><Icon name="phone" size={17} /> Call 92412 89990</a>
      <a className="secondary-call" href="tel:+918292839087">Or call +91 82928 39087</a>
      <div className="summary-actions"><button type="button" className="text-link" disabled={sending || sent} onClick={editDetails}>Edit details</button><button type="button" className="text-link" onClick={copyEnquiry}><Icon name="copy" size={15} /> Copy enquiry</button></div>
      <p className="copy-status" role="status">{copyStatus}</p>
    </div>}
    <a className="booking-terms-link" href="#booking-terms">View event booking terms <Icon name="arrow" size={16} /></a>
  </div>;
}
