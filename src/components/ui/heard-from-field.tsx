import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SELECT_TRIGGER_CLASS } from "@/components/ui/select-placeholder";
import { HEARD_FROM } from "@/lib/heard-from";

/**
 * A native <select>, not the Base UI Select the business-type field uses:
 * that one is loaded late on purpose (115 KB of JavaScript), and an optional
 * question does not need it. Styled with the same trigger classes so the two
 * fields look alike when closed.
 */
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
          className={`${SELECT_TRIGGER_CLASS} appearance-none pr-9 [&>option]:bg-background [&>option]:text-foreground`}
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
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
