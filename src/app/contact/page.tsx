import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, Lock, UserCheck, MessageSquareReply } from "lucide-react";
import ContactForm from "@/components/contact-form";

const WHAT_HAPPENS = [
  {
    icon: Lock,
    title: "Sent securely",
    body: "Your message goes straight to us over an encrypted connection — no email client, no forwarding, nothing stored anywhere you can't see.",
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
  alternates: { canonical: "/contact" },
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
        style={{ background: "color-mix(in srgb, var(--muted-foreground) 25%, transparent)", filter: "blur(120px)" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "color-mix(in srgb, var(--foreground) 6%, transparent)", filter: "blur(120px)" }}
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
              href: "mailto:rushil@ruvisibility.com",
            },
            {
              icon: PhoneIcon,
              label: "Call",
              value: "+91 72229 99365",
              href: "tel:+917222999365",
            },
          ]}
        >
          <ContactForm />
        </ContactCard>

        <h2 className="text-2xl tracking-tight mt-12">What happens next</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
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
