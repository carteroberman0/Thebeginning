import type { OptionCategory, OptionValue, Selections } from "@configurator/shared";
import { CATEGORY_META, OPTION_CATEGORIES } from "@configurator/shared";
import { Swatch } from "./Swatch";

/**
 * The car-configurator options panel: one section per axis, each with prev/next
 * arrows and tappable swatches. No typing, no prompt knowledge required.
 */
export function OptionPanel({
  options,
  selections,
  onSelect,
}: {
  options: Record<OptionCategory, OptionValue[]>;
  selections: Selections;
  onSelect: (category: OptionCategory, value: string) => void;
}) {
  const categories = OPTION_CATEGORIES.filter((c) => (options[c]?.length ?? 0) > 0).sort(
    (a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order,
  );

  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => {
        const values = options[category];
        const currentValue = selections[category];
        const currentIndex = Math.max(
          0,
          values.findIndex((v) => v.value === currentValue),
        );
        const current = values[currentIndex];

        const step = (dir: number) => {
          const next = (currentIndex + dir + values.length) % values.length;
          onSelect(category, values[next].value);
        };

        return (
          <section key={category}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{CATEGORY_META[category].label}</h3>
                <p className="text-xs text-slate-500">{CATEGORY_META[category].help}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={`Previous ${CATEGORY_META[category].label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-400 active:scale-95"
                >
                  ‹
                </button>
                <span className="min-w-24 text-center text-sm font-medium text-slate-700">
                  {current?.label}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={`Next ${CATEGORY_META[category].label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-400 active:scale-95"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {values.map((option) => (
                <Swatch
                  key={option.id}
                  option={option}
                  selected={option.value === current?.value}
                  onClick={() => onSelect(category, option.value)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
