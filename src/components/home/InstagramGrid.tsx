import { useEffect } from "react";
import { Instagram } from "lucide-react";

const instagramLinks = [
  "https://www.instagram.com/p/DYzKap3jzmJ/",
  "https://www.instagram.com/p/DYo8CVhjRoU/",
  "https://www.instagram.com/reel/DYmLr2ojrw4/",
  "https://www.instagram.com/p/DYhSwz4Fnyi/",
  "https://www.instagram.com/p/DYevcGCDzIo/",
  "https://www.instagram.com/p/DYRCSDNnZrt/"
];

const InstagramGrid = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // If script is already loaded, process the new embeds
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="section-padding bg-muted">
      <style>{`
        .instagram-embed-container {
          overflow: hidden !important;
          border-radius: 0.75rem;
          background: white;
        }
        .instagram-embed-container iframe.instagram-media {
          min-width: 100% !important;
          max-width: 100% !important;
          width: 100% !important;
          margin: 0 0 -150px 0 !important; /* CSS hack to hide bottom bar */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Instagram className="w-8 h-8 text-black" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Follow Us on Instagram</h2>
        </div>
        
        {/* Single row scrollable container so widgets maintain native width and don't break */}
        <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar">
          {instagramLinks.map((link, idx) => (
            <div key={idx} className="flex-none w-[326px] instagram-embed-container overflow-hidden rounded-xl border border-gray-200 bg-white snap-start">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={link}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  margin: 0,
                  width: '326px',
                  maxWidth: '326px',
                  padding: 0
                }}
              ></blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;
