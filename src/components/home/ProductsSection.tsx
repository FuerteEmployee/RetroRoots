import { Eye, Play } from "lucide-react";
import { Link } from "react-router-dom";
import catSofa from "@/assets/category-sofa.jpg";
import catDiningChair from "@/assets/category-dining-chair.png";
import catLounger from "@/assets/category-lounger.png";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";
import { useState, useEffect } from "react";
import { useAuth, API_BASE_URL } from "@/contexts/AuthContext";

const dummyProducts = [
  { name: "Royal Velvet Sofa", categoryName: "Sofa", tag: "Bestseller", image: catSofa },
  { name: "Nordic Dining Chair", categoryName: "Dining Chair", tag: "New", image: catDiningChair },
  { name: "Traditional Diwaan Set", categoryName: "Lounger (Diwaan)", tag: "Premium", image: catLounger },
  { name: "Modern Accent Chair", categoryName: "Lounge Chair", tag: "Classic", image: catLoungeChair },
];

const ProductsSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 4));
        } else {
          setProducts(dummyProducts);
        }
      })
      .catch(() => setProducts(dummyProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center text-white mb-10 min-h-[140px] flex flex-col items-center justify-center relative overflow-hidden">
          <p className="text-white/80 text-xs md:text-sm mb-2 uppercase tracking-widest font-medium">Explore our premium collection</p>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Featured Products</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, idx) => {
            const imgUrl = p.images?.[0]?.url || (p.image ? (typeof p.image === 'string' && (p.image.includes('http') || p.image.startsWith('/src') || p.image.startsWith('data:')) ? p.image : `${API_BASE_URL.replace('/api', '')}/uploads/products/${p.image}`) : p.image);
            const categoryName = p.categoryId?.name || p.categoryName;
            return (
              <Link key={p._id || idx} to="/products" className="bg-card rounded-xl overflow-hidden border border-border card-hover group">
                <div className="relative aspect-square">
                  <img src={imgUrl} alt={p.name} className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
                  {p.tag && <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground rounded-full">{p.tag}</span>}
                  <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground"><Eye className="w-4 h-4" /></span>
                    <span className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground"><Play className="w-4 h-4" /></span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary mb-1 font-medium">{categoryName}</p>
                  <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-8">
          <Link to="/products" className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
