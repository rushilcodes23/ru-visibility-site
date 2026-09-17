"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage, type ContactFormState } from "@/lib/send-contact-email";

const initialState: ContactFormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div className="w-full text-center py-8">
        <p className="text-lg font-medium mb-2">Message sent.</p>
        <p className="text-muted-foreground text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="w-full space-y-4">
      {/* Honeypot — hidden from real visitors, catches basic bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>

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

      <Button className="w-full h-11 md:h-8" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}
