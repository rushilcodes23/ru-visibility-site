"use server";

export type AuditRequestState = {
  status: "idle" | "success" | "error";
  message: string;
  /**
   * Set only when the send itself failed. A visitor who filled in a form and
   * got "try again" just leaves, and the lead is gone with no trace — so on a
   * delivery failure we hand back a mailto with everything they typed already
   * in it, and they can send it in one click instead.
   */
  mailto?: string;
};

function mailtoFallback(fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:rushil@ruvisibility.com?subject=${encodeURIComponent(
    "Audit request via ruvisibility.com"
  )}&body=${encodeURIComponent(body)}`;
}

const TO_EMAIL = "rushil@ruvisibility.com";
const FROM_EMAIL = "Ru Visibility <contact@ruvisibility.com>";

/** Accepts bare domains too — most people type "example.com", not a full URL. */
function normalizeWebsite(raw: string): string | null {
  const trimmed = raw.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  if (!trimmed) return null;
  const host = trimmed.split("/")[0];
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(host)) {
    return null;
  }
  return trimmed;
}

/**
 * Shared by the real success path and the honeypot path, so a bot cannot tell
 * it was caught by comparing the response.
 */
const SENT_MESSAGE =
  "Thanks for reaching out. We'll run the check on your site and send the results to that address, usually within a day. If you'd rather talk it through first, call or text +91 72229 99365.";

/** Same reasoning as the contact form — see MIN_PENDING_MS there. */
const MIN_PENDING_MS = 1000;
const atLeast = <T,>(work: Promise<T>): Promise<T> =>
  Promise.all([work, new Promise((r) => setTimeout(r, MIN_PENDING_MS))]).then(([v]) => v);

export async function sendAuditRequest(
  prevState: AuditRequestState,
  formData: FormData
): Promise<AuditRequestState> {
  return atLeast(deliverAuditRequest(prevState, formData));
}

async function deliverAuditRequest(
  _prevState: AuditRequestState,
  formData: FormData
): Promise<AuditRequestState> {
  // Same honeypot approach as the contact form: pretend it worked rather than
  // telling a bot which field gave it away.
  if (formData.get("company")) {
    return { status: "success", message: SENT_MESSAGE };
  }

  // Capped before use: these go straight into an email body, and nothing here
  // needs to be long.
  const field = (key: string, max: number) =>
    String(formData.get(key) || "").trim().slice(0, max);

  const name = field("name", 100);
  const email = field("email", 200);
  const website = field("website", 200);
  const businessTypeRaw = field("businessType", 100);
  const businessTypeOther = field("businessTypeOther", 120);
  const businessType =
    businessTypeRaw === "Something else" && businessTypeOther
      ? `Something else — ${businessTypeOther}`
      : businessTypeRaw;

  if (!name || !email || !website) {
    return { status: "error", message: "Please fill in your name, email, and website." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  const site = normalizeWebsite(website);
  if (!site) {
    return { status: "error", message: "That website address doesn't look right — something like example.com is fine." };
  }

  const fallback = mailtoFallback({
    Name: name,
    Email: email,
    Website: site,
    "Business type": businessType,
  });
  const undelivered = {
    status: "error" as const,
    message:
      "Our mail service wouldn't accept that just now — nothing you did. Send it as an email instead and it reaches us the same way.",
    mailto: fallback,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — audit request form cannot send email.");
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
        subject: `Audit request: ${site} (${name})`,
        text: `AUDIT REQUEST\n\nName: ${name}\nEmail: ${email}\nWebsite: ${site}\nBusiness type: ${businessType || "(not provided)"}\n\nRun: node audit.mjs https://${site}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend API error (audit request):", res.status, body);
      return undelivered;
    }

    return { status: "success", message: SENT_MESSAGE };
  } catch (err) {
    console.error("Audit request send failed:", err);
    return undelivered;
  }
}
