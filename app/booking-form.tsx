"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./icons";

export const occasions = ["Birthday", "Anniversary", "Ring ceremony", "Wedding"] as const;
export type Occasion = (typeof occasions)[number];

export function BookingForm({ occasion, onOccasionChange }: { occasion: Occasion; onOccasionChange: (value: Occasion) => void }) {
  const [details, setDetails] = useState({ name: "", phone: "", date: "", time: "19:00", guests: "2", notes: "" });
  const [today, setToday] = useState("");
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const date = new Date();
    setToday(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
  }, []);
  useEffect(() => {
    if (!ready || !summary.current) return;
    summary.current.focus({ preventScroll: true });
    summary.current.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [ready]);
  useEffect(() => { setReady(false); setCopyStatus(""); }, [occasion]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const phoneInput = event.currentTarget.elements.namedItem("phone") as HTMLInputElement;
    const digits = details.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      phoneInput.setCustomValidity("Please enter a valid phone number with 10 to 13 digits.");
      phoneInput.reportValidity();
      return;
    }
    if (details.date < today) return;
    setDetails((previous) => ({ ...previous, name: previous.name.trim() }));
    setReady(true);
  }
  const dateLabel = details.date ? new Date(`${details.date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
  const timeLabel = details.time ? new Date(`2000-01-01T${details.time}`).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) : "";
  async function copyEnquiry() {
    const text = `ROXX booking enquiry\nOccasion: ${occasion}\nName: ${details.name}\nPhone: ${details.phone}\nDate: ${dateLabel}\nTime: ${timeLabel}\nGuests: ${details.guests}${details.notes ? `\nNotes: ${details.notes}` : ""}\nPlease confirm availability and arrangements.`;
    try { await navigator.clipboard.writeText(text); setCopyStatus("Enquiry copied. You can share these details with our team."); }
    catch { setCopyStatus("Copy is unavailable in this browser. Your details are shown above."); }
  }

  return <div className="booking-panel" id="booking-form">
    <div className="booking-panel-top"><span><Icon name="calendar" size={20} /> YOUR PLANS START HERE</span><small>01 / PLAN YOUR VISIT</small></div>
    {!ready ? <form onSubmit={submit}>
      <div className="booking-form-heading"><h3>Make it a <em>ROXX occasion.</em></h3><p>A birthday, anniversary, ring ceremony, or wedding.<br />Tell us what you’re planning.</p></div>
      <label className="occasion-field">I’m planning<select value={occasion} onChange={(event) => onOccasionChange(event.target.value as Occasion)}>{occasions.map((item) => <option key={item}>{item}</option>)}</select></label>
      <div className="form-grid"><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required pattern=".*\S.*" maxLength={80} value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} /></label><label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your contact number" required maxLength={18} title="Enter a valid phone number with 10 to 13 digits." value={details.phone} onChange={(event) => { event.target.setCustomValidity(""); setDetails({ ...details, phone: event.target.value }); }} onBlur={(event) => { const digits = event.target.value.replace(/\D/g, ""); event.target.setCustomValidity(digits.length >= 10 && digits.length <= 13 ? "" : "Please enter a valid phone number with 10 to 13 digits."); }} /></label><label>Preferred date<input name="date" type="date" required min={today} value={details.date} onChange={(event) => setDetails({ ...details, date: event.target.value })} /></label><label>Preferred time<input name="time" type="time" required value={details.time} onChange={(event) => setDetails({ ...details, time: event.target.value })} /></label><label>Number of guests<input name="guests" type="number" min="1" required step="1" value={details.guests} onChange={(event) => setDetails({ ...details, guests: event.target.value })} /></label><div className="form-helper"><Icon name="heart" size={20} /><span>Small plans.<br />Big memories.</span></div></div>
      <label>A little more about your plans <span className="optional">(optional)</span><textarea name="notes" rows={3} maxLength={1000} placeholder="Food preferences, birthday setup, wedding plans, or anything you’d like us to know…" value={details.notes} onChange={(event) => setDetails({ ...details, notes: event.target.value })} /></label>
      <button type="submit" className="button button-dark booking-submit">Review booking enquiry <Icon name="arrow" size={18} /></button><p className="form-fineprint">Your details stay in this browser. Call our team after reviewing to confirm availability and arrangements.</p>
    </form> : <div ref={summary} className="booking-summary" tabIndex={-1}><span className="summary-icon"><Icon name="check" size={26} /></span><p className="eyebrow">READY TO TALK PLANS?</p><h3>Your occasion,<br /><em>at a glance.</em></h3><table><caption className="sr-only">Your booking enquiry details</caption><tbody>{[["Occasion", occasion], ["Name", details.name], ["Phone", details.phone], ["Date", dateLabel], ["Time", timeLabel], ["Guests", details.guests]].map(([key, value]) => <tr key={key}><th scope="row">{key}</th><td>{value}</td></tr>)}</tbody></table>{details.notes && <p className="summary-notes"><strong>Your notes</strong>{details.notes}</p>}<p className="summary-instruction">Your booking is not confirmed yet. Call our team with these details to confirm your plans.</p><a className="button button-gold" href="tel:+919241289990"><Icon name="phone" size={17} /> Call 92412 89990</a><a className="secondary-call" href="tel:+918292839087">Or call +91 82928 39087</a><div className="summary-actions"><button className="text-link" onClick={() => { setReady(false); setCopyStatus(""); }}>Edit details</button><button className="text-link" onClick={copyEnquiry}><Icon name="copy" size={15} /> Copy enquiry</button></div><p className="copy-status" role="status">{copyStatus}</p></div>}
    <a className="booking-terms-link" href="#booking-terms">View event booking terms <Icon name="arrow" size={16} /></a>
  </div>;
}
