import { Link } from "react-router-dom";
import catSofa from "@/assets/category-sofa.jpg";
import catDiningChair from "@/assets/category-dining-chair.png";
import catLounger from "@/assets/category-lounger.png";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";
import { useState, useEffect } from "react";
import { useAuth, API_BASE_URL } from "@/contexts/AuthContext";

const dummyCategories = [
  { name: "Sofa", image: catSofa, slug: "sofa" },
  { name: "Dining Chair", image: catDiningChair, slug: "dining-chair" },
  { name: "Lounger (Diwaan)", image: catLounger, slug: "lounger" },
  { name: "Lounge Chair", image: catLoungeChair, slug: "lounge-chair" },
  { name: "Recliners", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400&h=400", slug: "recliners" },
];

const CategoryShowcase = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(dummyCategories);
        }
      })
      .catch(() => setCategories(dummyCategories));
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="sage-banner rounded-3xl p-10 md:p-12 text-center text-white mb-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <p className="text-xs uppercase font-white  tracking-[0.4em] mb-4 opacity-70">Crafted for every space — explore our</p>
          <h2 className="text-3xl md:text-5xl font-serif">Top Product Categories</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {categories.slice(0, 5).map((cat, idx) => {
            const rawImage = typeof cat.image === 'object' ? cat.image?.url : cat.image;
            const imgUrl = (rawImage?.includes('http') || String(rawImage || '').includes('data:image') || String(rawImage || '').startsWith('/src') || !cat._id) ? rawImage : `${API_BASE_URL.replace('/api', '')}/uploads/${rawImage}`;
            return (
              <Link key={cat.name || idx} to={`/products?category=${cat.slug || cat._id}`} className="flex flex-col items-center gap-4 group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-primary transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <img src={imgUrl} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={200} height={200} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-800 group-active:text-primary transition-colors text-center">{cat.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
