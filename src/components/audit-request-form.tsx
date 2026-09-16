"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendAuditRequest, type AuditRequestState } from "@/lib/send-audit-request";

const initialState: AuditRequestState = { status: "idle", message: "" };

// Lives here rather than in the action: a "use server" module can only export
// async functions, so a plain array exported from there arrives as a proxy and
// blows up on .map during prerender.
const BUSINESS_TYPES = [
  "Local service business",
  "Clinic or healthcare practice",
  "E-commerce / online store",
  "SaaS or software",
  "Professional services (legal, finance, consulting)",
  "Restaurant, hotel, or hospitality",
  "Something else",
];

// Matches the Input primitive's classes — a native select rather than a
// popover component, so it uses the OS picker on mobile.
const SELECT_CLASS =
  "h-11 md:h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

export default function AuditRequestForm() {
  const [state, formAction, pending] = useActionState(sendAuditRequest, initialState);

  if (state.status === "success") {
    return (
      <div className="w-full text-center py-8" role="status">
        <p className="text-lg font-medium mb-2">Request received.</p>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">{state.message}</p>
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
        <select id="audit-business-type" name="businessType" className={SELECT_CLASS} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {state.status === "error" && (
        <p className="text-destructive text-sm" role="alert">
          {state.message}
        </p>
      )}

      <Button className="w-full h-11 md:h-10" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Get my free visibility check"}
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
