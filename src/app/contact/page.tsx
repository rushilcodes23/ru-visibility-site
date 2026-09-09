import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, Send, UserCheck, MessageSquareReply } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WHAT_HAPPENS = [
  {
    icon: Send,
    title: "You submit",
    body: "This opens your own email app with the message ready to send to rushil@ruvisibility.com — nothing is sent automatically, and nothing leaves your device until you hit send yourself.",
  },
  {
    icon: UserCheck,
    title: "Rushil reads it",
    body: "Personally — not a support queue, not a bot. There's no auto-responder loop to sit through.",
  },
  {
    icon: MessageSquareReply,
    title: "You get a real reply",
    body: "A direct answer to what you actually asked, not a templated pitch.",
  },
];

export const metadata = {
  title: "Talk to Us — Get Your Visibility Audit | Ru Visibility",
  description:
    "Questions about SEO, GEO, pricing, or your visibility audit? Reach out directly — real answers, no sales bot.",
};

export default function ContactPage() {
  return (
    <main className="relative flex flex-col items-center w-full pt-28 pb-20 px-4 overflow-hidden">
      {/* Same soft-glow motif as the hero and feature section, so this
          page doesn't feel like a flat, empty form */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(203,213,225,0.4)", filter: "blur(120px)" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(15,23,42,0.06)", filter: "blur(120px)" }}
      />

      <div className="mx-auto w-full max-w-5xl relative">
        <ContactCard
          title="Talk to Us"
          description="Questions about an audit, pricing, or anything else — send us a note and we'll get back to you."
          contactInfo={[
            {
              icon: MailIcon,
              label: "Email",
              value: "rushil@ruvisibility.com",
            },
          ]}
        >
          {/* ponytail: mailto fallback, no backend yet — swap for a real
              API route / email service (with server-side validation and
              rate limiting, see WEBSITE-DATA.md) before launch */}
          <form
            action="mailto:rushil@ruvisibility.com"
            method="post"
            encType="text/plain"
            className="w-full space-y-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="Name" type="text" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="Email" type="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="Phone" type="tel" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="Message" required />
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </ContactCard>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {WHAT_HAPPENS.map((step) => (
            <div key={step.title} className="flex flex-col gap-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
