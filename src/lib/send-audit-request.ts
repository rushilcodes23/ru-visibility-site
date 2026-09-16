"use server";

export type AuditRequestState = {
  status: "idle" | "success" | "error";
  message: string;
};

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

export async function sendAuditRequest(
  _prevState: AuditRequestState,
  formData: FormData
): Promise<AuditRequestState> {
  // Same honeypot approach as the contact form: pretend it worked rather than
  // telling a bot which field gave it away.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  // Capped before use: these go straight into an email body, and nothing here
  // needs to be long.
  const field = (key: string, max: number) =>
    String(formData.get(key) || "").trim().slice(0, max);

  const name = field("name", 100);
  const email = field("email", 200);
  const website = field("website", 200);
  const businessType = field("businessType", 100);

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — audit request form cannot send email.");
    return {
      status: "error",
      message: "Sorry, something's misconfigured on our end. Please email rushil@ruvisibility.com directly for now.",
    };
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
      return { status: "error", message: "Something went wrong sending that. Please try again or email us directly." };
    }

    return {
      status: "success",
      message: "We'll run the check and send your results to that address, usually within a day.",
    };
  } catch (err) {
    console.error("Audit request send failed:", err);
    return { status: "error", message: "Something went wrong sending that. Please try again or email us directly." };
  }
}
