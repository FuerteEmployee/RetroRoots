import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { Eye, Play, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { getProducts } from "@/lib/api";
import { API_BASE_URL } from "@/contexts/AuthContext";
import { getImageUrl } from "@/lib/utils";

const industries = ["All", "Living Room", "Dining Room", "Bedroom", "Outdoor", "Office"];



const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState(initialCategory);
  const [typeFilter, setTypeFilter] = useState(queryParams.get("type") || "All");
  const [indFilter, setIndFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const type = params.get("type");
    if (cat) setCatFilter(cat);
    else setCatFilter("All");

    if (type) setTypeFilter(type);
    else setTypeFilter("All");
  }, [location.search]);

  useEffect(() => {
    Promise.all([
      getProducts(),
      fetch(`${API_BASE_URL}/categories`).then(res => res.json())
    ]).then(([products, cats]) => {
      setAllProducts(products);
      if (Array.isArray(cats)) {
        const catNames = cats.filter(c => c.type === "category").map(c => c.name);
        setCategories(["All", ...catNames]);
      }
    }).catch(err => console.error("Failed to fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = allProducts.filter(p => {
    // Map categoryId to category for filtering
    const category = p.categoryId || p.category;
    const categoryName = typeof category === 'object' ? category?.name : category;
    const categorySlug = typeof category === 'object' ? category?.slug : category;

    if (catFilter !== "All") {
      const target = catFilter.toLowerCase();
      const nameMatch = categoryName?.toLowerCase() === target;
      const slugMatch = categorySlug?.toLowerCase() === target;
      const idMatch = String(category?._id || category) === catFilter;

      if (!nameMatch && !slugMatch && !idMatch) {
        return false;
      }
    }

    if (typeFilter !== "All") {
      const tags = p.industryTags || [];
      const match = tags.some(t =>
        t.toLowerCase().replace(/ /g, "-") === typeFilter.toLowerCase() ||
        t.toLowerCase() === typeFilter.toLowerCase()
      );
      if (!match) return false;
    }

    const industry = p.industryTags?.[0] || "All";
    if (indFilter !== "All" && industry !== indFilter) return false;

    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout title="Products" description="Explore RetroRoots's dynamic product catalog of premium customized Furniture. Filter by  3D viewer available.">
      <PageHeader title="Our Products" subtitle="Premium Customized Furniture" />

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
              {/* <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground mr-2">Industry:</span>
                {industries.map(i => (
                  <button key={i} onClick={() => setIndFilter(i)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${indFilter === i ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"}`}>{i}</button>
                ))}
              </div> */}
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
                <Link to={`/product/${p._id}`} key={p._id} className="bg-card rounded-xl overflow-hidden border border-border card-hover group cursor-pointer block">
                  <div className="relative aspect-square">
                    <img
                      src={getImageUrl(p.images?.[0] || p.image)}
                      alt={p.name} className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
                    {p.tag && <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground rounded-full">{p.tag}</span>}
                    <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground cursor-pointer shadow-lg hover:scale-110 transition-transform"><Eye className="w-5 h-5" /></span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-primary font-medium">
                        {(typeof p.categoryId === 'object' ? p.categoryId?.name : p.categoryId) || (typeof p.category === 'object' ? p.category?.name : p.category)}
                      </span>
                      {/* <span className="text-xs text-muted-foreground">• {p.industryTags?.[0] || 'General'}</span> */}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">{p.name}</h3>
                    <span className="mt-2 text-xs text-primary font-medium group-hover:underline block">View Details →</span>
                  </div>
                </Link>
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
