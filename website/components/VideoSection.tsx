import { portfolioVideos } from "@/data/portfolio";

export default function VideoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
      {portfolioVideos.map((video) => (
        <div key={video.id} className="rounded-lg overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="aspect-video">
            <iframe
              src={video.embedUrl}
              title={video.title}
              allow="autoplay"
              className="w-full h-full"
              style={{ border: "none" }}
            />
          </div>
          <p className="px-4 py-3 text-sm text-muted font-medium">{video.title}</p>
        </div>
      ))}
    </div>
  );
}
