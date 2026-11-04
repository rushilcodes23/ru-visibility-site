"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HeardFromField } from "@/components/ui/heard-from-field";
import { Check } from "lucide-react";
import { sendContactMessage, type ContactFormState } from "@/lib/send-contact-email";

const initialState: ContactFormState = { status: "idle", message: "" };

// A dropped connection or a stale deploy makes the action call itself throw.
// Without this the page would crash to a blank error screen and lose the form.
async function sendSafely(prev: ContactFormState, fd: FormData): Promise<ContactFormState> {
  try {
    return await sendContactMessage(prev, fd);
  } catch {
    const get = (k: string) => String(fd.get(k) || "");
    return {
      status: "error",
      message: "We couldn't reach the server. Check your connection and try again, or send it as an email instead.",
      mailto: `mailto:rushil@ruvisibility.com?subject=${encodeURIComponent("Message via ruvisibility.com")}&body=${encodeURIComponent(
        `Name: ${get("name")}\nEmail: ${get("email")}\nPhone: ${get("phone")}\n\n${get("message")}`
      )}`,
      fields: { name: get("name"), email: get("email"), phone: get("phone"), message: get("message") },
    };
  }
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendSafely, initialState);
  const f = state.fields ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="w-full text-center py-8 flex flex-col items-center gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </span>
        <p className="text-lg font-medium">Message sent.</p>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          {state.message}
        </p>
        <a
          href="tel:+917222999365"
          className="text-sm font-medium underline underline-offset-4 min-h-11 inline-flex items-center"
        >
          Call or text instead
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="w-full space-y-4">
      {/* Honeypot — hidden from real visitors, catches basic bots */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="new-password"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" required defaultValue={f.name} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required defaultValue={f.email} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">
          Phone <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={f.phone} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required defaultValue={f.message} />
      </div>
      <HeardFromField id="contact-heard-from" />

      {state.status === "error" && (
        <div role="alert" className="flex flex-col gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3">
          <p className="text-destructive text-sm">{state.message}</p>
          {state.mailto && (
            <a
              href={state.mailto}
              className="text-sm font-medium underline underline-offset-4 text-foreground w-fit min-h-11 inline-flex items-center"
            >
              Open it as an email instead →
            </a>
          )}
        </div>
      )}

      <Button
        className="w-full h-11 md:h-10 relative overflow-hidden"
        type="submit"
        disabled={pending}
      >
        {pending ? "Sending…" : "Send message"}
        {pending && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-primary-foreground/25"
          >
            <span className="send-progress block h-full w-full bg-primary-foreground/90" />
          </span>
        )}
      </Button>

      <p className="text-muted-foreground text-xs leading-relaxed">
        We use your details to reply to you, nothing else. No mailing list, no
        reselling —{" "}
        <a href="/privacy" className="underline underline-offset-4">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
