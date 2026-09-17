"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "cn";

/**
 * A styled select built on Base UI rather than a native <select>.
 *
 * The native element renders its option list through the OS, which CSS cannot
 * reach — so on a dark page the popup still came up in system colours and
 * looked pasted on. This renders the list ourselves, so it matches the rest of
 * the site in both themes, while Base UI keeps the keyboard and screen-reader
 * behaviour of a real listbox.
 */
function Select({
  name,
  items,
  placeholder = "Select one",
  defaultValue = null,
  onValueChange,
  id,
  className,
}: {
  name: string;
  items: readonly string[];
  placeholder?: string;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  id?: string;
  className?: string;
}) {
  return (
    <SelectPrimitive.Root
      name={name}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(String(v ?? ""))}
    >
      <SelectPrimitive.Trigger
        id={id}
        className={cn(
          "flex h-11 md:h-10 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 py-1 text-base md:text-sm text-left transition-colors outline-none",
          "hover:border-ring/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "data-[popup-open]:border-ring dark:bg-input/30",
          className
        )}
      >
        <SelectPrimitive.Value
          className="truncate data-[placeholder]:text-muted-foreground"
          placeholder={placeholder}
        />
        <SelectPrimitive.Icon className="shrink-0 text-muted-foreground transition-transform duration-200 data-[popup-open]:rotate-180">
          <ChevronDown className="size-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        {/* Above the fixed navbar (z-index 100). Without this the positioner
            is z-index:auto, so a popup opening near the top of the viewport
            renders underneath the nav pill and its options can't be clicked. */}
        <SelectPrimitive.Positioner
          sideOffset={6}
          alignItemWithTrigger={false}
          className="z-200"
        >
          <SelectPrimitive.Popup
            className={cn(
              "max-h-[min(20rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-xl outline-none",
              "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0"
            )}
          >
            {items.map((item) => (
              <SelectPrimitive.Item
                key={item}
                value={item}
                className={cn(
                  "flex cursor-pointer select-none items-center justify-between gap-2 rounded-md px-3 py-2.5 md:py-2 text-base md:text-sm outline-none transition-colors",
                  "data-[highlighted]:bg-primary/10 data-[selected]:font-medium"
                )}
              >
                <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="shrink-0 text-primary">
                  <Check className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
