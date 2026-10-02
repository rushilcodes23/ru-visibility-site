import { ChevronDown } from "lucide-react";

// The classes the real Select (select.tsx) renders with, kept here so that
// file and the placeholder below read from one place and cannot drift apart.
export const SELECT_TRIGGER_CLASS =
  "flex h-11 md:h-10 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 py-1 text-base md:text-sm text-left transition-colors outline-none hover:border-ring/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[popup-open]:border-ring dark:bg-input/30";
export const SELECT_VALUE_CLASS = "truncate data-[placeholder]:text-muted-foreground";
export const SELECT_ICON_CLASS =
  "shrink-0 text-muted-foreground transition-transform duration-200 data-[popup-open]:rotate-180";

/**
 * The closed Select, as static markup: what Base UI's Select renders before
 * anyone opens it, element for element, so swapping one for the other is
 * invisible. Shown while the real Select's code loads (see
 * audit-request-form.tsx), including in the server HTML. The hidden input
 * means a form sent in that window still carries the field, empty, exactly as
 * the real one would.
 */
export function SelectPlaceholder({
  id,
  name,
  placeholder = "Select one",
}: {
  id?: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <>
      {/* No aria-controls, exactly like Base UI's own closed trigger: there is
          no listbox for it to point at until the real Select opens one. */}
      <button
        type="button"
        id={id}
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="combobox"
        aria-expanded="false"
        aria-haspopup="listbox"
        data-placeholder=""
        className={SELECT_TRIGGER_CLASS}
      >
        <span data-placeholder="" className={SELECT_VALUE_CLASS}>
          {placeholder}
        </span>
        <span aria-hidden="true" className={SELECT_ICON_CLASS}>
          <ChevronDown className="size-4" />
        </span>
      </button>
      <input
        name={name}
        defaultValue=""
        tabIndex={-1}
        aria-hidden="true"
        style={{
          clipPath: "inset(50%)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          border: 0,
          padding: 0,
          width: 1,
          height: 1,
          margin: -1,
          position: "absolute",
        }}
      />
    </>
  );
}
