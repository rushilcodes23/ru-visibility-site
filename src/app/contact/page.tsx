import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4 pt-28">
      <div className="mx-auto w-full max-w-5xl">
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
      </div>
    </main>
  );
}
