import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Loader2 } from "lucide-react";
import { getGallery } from "@/lib/api";

const galleryCategories = ["All", "factory", "installation", "event", "entry-to-exit"];

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getGallery()
      .then(data => setImages(data))
      .catch(err => console.error("Failed to fetch gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? images : images.filter(i => i.category === filter);

  const getLabel = (cat: string) => {
    if (cat === "entry-to-exit") return "Process";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <Layout title="Gallery" description="Explore RetroRoots's visual portfolio — factory photos, product installations, events, and the Entry-to-Exit manufacturing journey.">
      <PageHeader title="Gallery" subtitle="A visual journey through our world of surfaces" />
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {galleryCategories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"}`}>
                {getLabel(c)}
              </button>
            ))}
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((img) => (
                <div key={img._id} className="break-inside-avoid rounded-xl overflow-hidden group cursor-pointer relative">
                  <img src={img.image?.url || "/placeholder.svg"} alt={img.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <span className="text-xs text-primary-foreground/80">{getLabel(img.category)}</span>
                      <h4 className="text-sm font-semibold text-primary-foreground">{img.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
