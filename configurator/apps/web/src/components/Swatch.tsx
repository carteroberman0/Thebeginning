import type { OptionValue } from "@configurator/shared";

/** A single tappable option chip: color dot + label, with a selected ring. */
export function Swatch({
  option,
  selected,
  onClick,
}: {
  option: OptionValue;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition active:scale-95 ${
        selected
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
      }`}
    >
      <span
        className="h-4 w-4 shrink-0 rounded-full border border-black/10"
        style={{ backgroundColor: option.swatchHex ?? "#cbd5e1" }}
      />
      {option.label}
    </button>
  );
}
