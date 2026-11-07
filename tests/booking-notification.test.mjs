import assert from "node:assert/strict";
import { test } from "node:test";
import { bookingToday, bookingValidationError, sendBookingNotification } from "../app/booking-notification.ts";

const booking = {
  occasion: "Table reservation", name: " Test Guest ", phone: "+91 99999 00000",
  date: "2099-11-08", time: "19:30", guests: "4", notes: "Window seat, please.",
};

test("sends the reviewed booking without claiming checkbox consent", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => Response.json({ success: true }));
  await sendBookingNotification(booking, " public-form-id ", false);
  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, options] = fetchMock.mock.calls[0].arguments;
  assert.equal(url, "https://api.web3forms.com/submit");
  assert.equal(options.method, "POST");
  assert.equal(options.credentials, "omit");
  assert.ok(options.signal instanceof AbortSignal);
  const payload = JSON.parse(options.body);
  assert.equal(payload.access_key, "public-form-id");
  assert.equal(payload.name, "Test Guest");
  assert.equal(payload.phone, booking.phone);
  assert.equal(payload.occasion, "Table reservation");
  assert.match(payload.preferred_date, /8 November 2099/);
  assert.match(payload.preferred_time, /7:30 pm \(India Standard Time\)/i);
  assert.equal(payload.guests, "4");
  assert.equal(payload.message, booking.notes);
  assert.equal(Object.hasOwn(payload, "privacy_consent"), false);
  assert.equal(payload.botcheck, false);
});

test("missing configuration and the honeypot never send a request", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected request"); });
  await assert.rejects(sendBookingNotification(booking, "", false), /temporarily unavailable/);
  await assert.rejects(sendBookingNotification(booking, "form-id", true), /couldn’t send/);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("rejects invalid contact details, impossible dates and invalid guest counts before sending", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected request"); });
  for (const invalid of [
    { name: " " }, { phone: "123" }, { phone: "bad9999900000" },
    { date: "2000-01-01" }, { date: "2099-02-31" }, { date: "invalid" },
    { time: "25:00" }, { guests: "0" }, { guests: "1.5" },
    { occasion: "Unknown" }, { notes: "a".repeat(1001) },
  ]) {
    const details = { ...booking, ...invalid };
    assert.notEqual(bookingValidationError(details), "", JSON.stringify(invalid));
    await assert.rejects(sendBookingNotification(details, "form-id", false));
  }
  assert.equal(fetchMock.mock.callCount(), 0);
  assert.equal(bookingValidationError({ ...booking, date: bookingToday() }), "");
});

test("requires both an HTTP success and an explicit service success", async (t) => {
  const replies = [
    Response.json({ success: false }), Response.json({ success: "true" }),
    Response.json({}), Response.json(null), Response.json({ success: true }, { status: 429 }),
    Response.json({ success: false }, { status: 500 }),
  ];
  t.mock.method(globalThis, "fetch", async () => replies.shift());
  for (let index = 0; index < 6; index++) {
    await assert.rejects(sendBookingNotification(booking, "form-id", false), /couldn’t send/);
  }
});

test("network errors, timeouts and malformed responses explain delivery uncertainty", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new TypeError("Network unavailable"); });
  await assert.rejects(sendBookingNotification(booking, "form-id", false), /couldn’t verify/);
  fetchMock.mock.mockImplementation(async () => { throw new DOMException("Timed out", "TimeoutError"); });
  await assert.rejects(sendBookingNotification(booking, "form-id", false), /before trying again/);
  fetchMock.mock.mockImplementation(async () => new Response("not json"));
  await assert.rejects(sendBookingNotification(booking, "form-id", false), /couldn’t verify/);
});
