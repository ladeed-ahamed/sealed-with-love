import { wedding } from "@/lib/wedding-data";

export function DrawnGallery() {
  if (!wedding.galleryImages || wedding.galleryImages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full justify-center">
      {wedding.galleryImages.map((img, idx) => (
        <div key={idx} className={`drawn-card overflow-hidden bg-white ${idx === 1 ? 'md:-translate-y-4 md:rotate-2' : idx === 0 ? 'md:rotate-[-3deg]' : 'md:rotate-[1deg]'}`}>
          {/* Polaroid style padding */}
          <div className="p-2 pb-8 bg-white">
            <div className={`w-full ${img.aspectRatio} relative overflow-hidden border-2 border-ink`}>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] saturate-[0.8]"
              />
            </div>
          </div>
          {/* Faux tape piece */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 h-6 bg-white opacity-80 border border-ink/20 shadow-sm rotate-[-2deg]" />
        </div>
      ))}
    </div>
  );
}
