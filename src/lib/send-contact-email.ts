"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /**
   * Set only when the send itself failed, never on a validation error. A
   * visitor who gets "try again" just leaves and the message is gone, so a
   * delivery failure hands back a mailto with what they already typed.
   */
  mailto?: string;
};

const TO_EMAIL = "rushil@ruvisibility.com";
// ruvisibility.com is verified in Resend (DKIM + SPF confirmed 2026-09-12),
// so the contact form sends from our own domain instead of Resend's shared
// onboarding address.
const FROM_EMAIL = "Ru Visibility <contact@ruvisibility.com>";

/**
 * Resend usually answers in a few hundred milliseconds, which is fast enough
 * that the submit button flickered and the visitor could not tell whether
 * anything had happened. Holding the pending state to a floor lets the
 * progress bar actually complete, so the send reads as finished rather than
 * skipped. Only ever delays a send that already succeeded or failed — it
 * never delays the network call itself.
 */
/**
 * Shared by the real success path and the honeypot path. A bot that got a
 * different message from a real visitor could tell it had been caught, which
 * is the one thing the honeypot must not reveal.
 */
const SENT_MESSAGE =
  "Thanks for reaching out. Your message is with Rushil and you'll get a real reply, usually within a day. If anything's urgent or you'd rather just talk it through, call or text +91 72229 99365.";

const MIN_PENDING_MS = 1000;
const atLeast = <T,>(work: Promise<T>): Promise<T> =>
  Promise.all([work, new Promise((r) => setTimeout(r, MIN_PENDING_MS))]).then(([v]) => v);

export async function sendContactMessage(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  return atLeast(deliverContactMessage(prevState, formData));
}

async function deliverContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot — a hidden field real visitors never fill in. Bots that
  // auto-fill every field will trip this; we just pretend it worked so we
  // don't tip them off, and skip actually sending.
  if (formData.get("company")) {
    return { status: "success", message: SENT_MESSAGE };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  const undelivered: ContactFormState = {
    status: "error",
    message:
      "Our mail service wouldn't accept that just now — nothing you did. Send it as an email instead and it reaches us the same way.",
    mailto: `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      `Message from ${name} via ruvisibility.com`
    )}&body=${encodeURIComponent(
      `Name: ${name}
Email: ${email}
Phone: ${phone || "(not provided)"}

${message}`
    )}`,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured yet — fail loudly in a way that's obvious to fix,
    // rather than silently pretending to succeed.
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return undelivered;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New message from ${name} via ruvisibility.com`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "(not provided)"}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend API error:", res.status, body);
      return undelivered;
    }

    return { status: "success", message: SENT_MESSAGE };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return undelivered;
  }
}
