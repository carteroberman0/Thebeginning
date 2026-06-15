/**
 * The property render. The base image sits at the bottom and each selected
 * option's pre-generated layer is stacked on top, absolutely positioned to the
 * same frame. Swapping a layer's src is instant — no network call per tap —
 * which is the whole point of pre-generating variants.
 */
export function ConfiguratorViewer({
  baseImageUrl,
  layerUrls,
}: {
  baseImageUrl: string | null;
  layerUrls: string[];
}) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200">
      {baseImageUrl && (
        <img src={baseImageUrl} alt="Property" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {layerUrls.map((url) => (
        <img
          key={url}
          src={url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
    </div>
  );
}
