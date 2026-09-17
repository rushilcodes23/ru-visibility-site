"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Check } from "lucide-react";
import { sendAuditRequest, type AuditRequestState } from "@/lib/send-audit-request";

const initialState: AuditRequestState = { status: "idle", message: "" };

// Lives here rather than in the action: a "use server" module can only export
// async functions, so a plain array exported from there arrives as a proxy and
// blows up on .map during prerender.
const OTHER = "Something else";
const BUSINESS_TYPES = [
  "Local service business",
  "Clinic or healthcare practice",
  "E-commerce / online store",
  "SaaS or software",
  "Professional services (legal, finance, consulting)",
  "Restaurant, hotel, or hospitality",
  "Trades and home services",
  "Property, real estate or hospitality venue",
  OTHER,
];

export default function AuditRequestForm() {
  const [state, formAction, pending] = useActionState(sendAuditRequest, initialState);
  const [businessType, setBusinessType] = useState("");

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="w-full text-center py-8 flex flex-col items-center gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </span>
        <p className="text-lg font-medium">Request received.</p>
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
    <form action={formAction} className="w-full space-y-4 text-left">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="audit-name">Name</Label>
          <Input id="audit-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="audit-email">Email</Label>
          <Input id="audit-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="audit-website">Website</Label>
        <Input
          id="audit-website"
          name="website"
          type="text"
          inputMode="url"
          placeholder="example.com"
          autoComplete="url"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="audit-business-type">Business type</Label>
        <Select
          id="audit-business-type"
          name="businessType"
          items={BUSINESS_TYPES}
          onValueChange={setBusinessType}
        />
      </div>

      {businessType === OTHER && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="audit-business-other">What kind of business is it?</Label>
          <Input
            id="audit-business-other"
            name="businessTypeOther"
            type="text"
            placeholder="In your own words — e.g. wedding venue, driving school"
            maxLength={120}
            autoFocus
          />
          <p className="text-muted-foreground text-xs">
            A sentence is plenty. It tells us which prompts a real customer
            would actually type.
          </p>
        </div>
      )}

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
        {pending ? "Sending…" : "Get my free visibility check"}
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
        We use your details to run the check and reply to you, nothing else. No
        mailing list, no reselling —{" "}
        <a href="/privacy" className="underline underline-offset-4">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
