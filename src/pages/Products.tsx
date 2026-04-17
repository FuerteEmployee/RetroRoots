import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { Eye, Play, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { getProducts } from "@/lib/api";

const categories = ["All", "Solid Surface", "Tiles"];
const industries = ["All", "Kitchen", "Bathroom", "Wall", "Floor", "Commercial", "Hospitality"];

const Products = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState("All");
  const [indFilter, setIndFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts()
      .then(data => setAllProducts(data))
      .catch(err => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = allProducts.filter(p => {
    const categoryName = typeof p.category === 'object' ? p.category?.name : p.category;
    if (catFilter !== "All" && categoryName !== catFilter) return false;
    
    const industry = p.industryTags?.[0] || "All";
    if (indFilter !== "All" && industry !== indFilter) return false;
    
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout title="Products" description="Explore Flexicore's dynamic product catalog of premium solid surfaces and tiles. Filter by category and industry. 3D viewer available.">
      <PageHeader title="Our Products" subtitle="Premium solid surfaces & tiles for every space" />

      <section className="section-padding">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="bg-card p-5 rounded-xl border border-border mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Category:</span>
                {categories.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${catFilter === c ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"}`}>{c}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground mr-2">Industry:</span>
                {industries.map(i => (
                  <button key={i} onClick={() => setIndFilter(i)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${indFilter === i ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"}`}>{i}</button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{filtered.length} products found</p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(p => (
                <div key={p._id} className="bg-card rounded-xl overflow-hidden border border-border card-hover group">
                  <div className="relative aspect-square">
                    <img src={p.images?.[0]?.url || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
                    {p.tag && <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground rounded-full">{p.tag}</span>}
                    <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground cursor-pointer"><Eye className="w-4 h-4" /></span>
                      <span className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground cursor-pointer"><Play className="w-4 h-4" /></span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-primary font-medium">{typeof p.category === 'object' ? p.category?.name : p.category}</span>
                      <span className="text-xs text-muted-foreground">• {p.industryTags?.[0] || 'General'}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                    <button className="mt-2 text-xs text-primary font-medium hover:underline">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
