import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { HEARD_FROM } from "@/lib/heard-from";

/**
 * A native <select>, not the Base UI Select the business-type field uses:
 * that one is loaded late on purpose (115 KB of JavaScript), and an optional
 * question does not need it. Same box as the text inputs (ui/input.tsx): the
 * first version borrowed the Select trigger's classes and stood 40px tall
 * among 32px inputs on the contact form.
 */
const FIELD_CLASS =
  "h-11 md:h-8 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent py-1 pl-2.5 pr-8 text-base md:text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 [&>option]:bg-background [&>option]:text-foreground";
export function HeardFromField({ id }: { id: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        How did you hear about us?
        <span className="text-muted-foreground font-normal">(optional)</span>
      </Label>
      <div className="relative">
        <select
          id={id}
          name="heardFrom"
          defaultValue=""
          className={FIELD_CLASS}
        >
          <option value="">Choose one</option>
          {HEARD_FROM.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
