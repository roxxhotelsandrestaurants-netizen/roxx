export const occasions = ["Table reservation", "Birthday", "Anniversary", "Ring ceremony", "Wedding"] as const;
export type Occasion = (typeof occasions)[number];

export type BookingDetails = {
  occasion: Occasion;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

export function bookingToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
}

export function bookingDateLabel(date: string) {
  return new Date(`${date}T12:00:00+05:30`).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric",
  });
}

export function bookingTimeLabel(time: string) {
  return new Date(`2000-01-01T${time}+05:30`).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit",
  });
}

export function bookingValidationError(booking: BookingDetails) {
  if (!occasions.includes(booking.occasion)) return "Please choose a booking type.";
  if (!booking.name.trim() || booking.name.trim().length > 80) return "Please enter your name (up to 80 characters).";
  const digits = booking.phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(booking.phone) || digits.length < 10 || digits.length > 13) return "Please enter a valid phone number with 10 to 13 digits.";
  const date = new Date(`${booking.date}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== booking.date || booking.date < bookingToday()) return "Please choose today or a future date.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(booking.time)) return "Please choose a valid time.";
  if (!/^\d+$/.test(booking.guests) || !Number.isSafeInteger(Number(booking.guests)) || Number(booking.guests) < 1) return "Please enter a whole number of guests, starting from 1.";
  if (booking.notes.length > 1000) return "Please keep your notes within 1,000 characters.";
  return "";
}

export async function sendBookingNotification(booking: BookingDetails, accessKey: string, botcheck: boolean) {
  const validationError = bookingValidationError(booking);
  if (validationError) throw new Error(validationError);
  if (!accessKey.trim()) throw new Error("Online enquiries are temporarily unavailable. Please call +91 92412 89990 to share your plans.");
  if (botcheck) throw new Error("We couldn’t send this enquiry. Please call +91 92412 89990 for help.");

  let response: Response;
  let result: { success?: boolean };
  try {
    response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "omit",
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        access_key: accessKey.trim(),
        subject: `ROXX booking enquiry — ${booking.occasion}`,
        from_name: "ROXX website bookings",
        name: booking.name.trim(),
        phone: booking.phone.trim(),
        occasion: booking.occasion,
        preferred_date: bookingDateLabel(booking.date),
        preferred_time: `${bookingTimeLabel(booking.time)} (India Standard Time)`,
        guests: booking.guests,
        message: booking.notes.trim() || "No additional notes.",
        botcheck: false,
      }),
    });
    result = await response.json();
  } catch {
    throw new Error("We couldn’t verify that your enquiry was sent. Please call +91 92412 89990 before trying again.");
  }
  if (!response.ok || result?.success !== true) {
    throw new Error("We couldn’t send your enquiry. Please try again later or call +91 92412 89990.");
  }
}
