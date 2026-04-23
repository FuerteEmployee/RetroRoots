import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/contexts/AuthContext";

const dummyBlogs = [
  {
    id: "modest-living-space",
    title: "The Modest Living Space Furnishings Ideas",
    date: "May 24, 2024",
    category: "Design",
    excerpt: "Creating a beautiful and functional living space doesn’t always require a large area or a huge budget.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600"
  },
  {
    id: "reading-area-space",
    title: "Tips For Designing Reading Area Space Smartly",
    date: "May 24, 2024",
    category: "Productivity",
    excerpt: "A dedicated reading space can transform your daily routine into a peaceful and enjoyable experience.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800&h=600"
  },
  {
    id: "furnish-home-affordably",
    title: "Easy Way To Furnish Your Home Affordably",
    date: "May 24, 2024",
    category: "Budget",
    excerpt: "Furnishing your home beautifully doesn’t have to be expensive. achieve a stylish look without overspending.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800&h=600"
  },
];

const BlogPreview = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data.slice(0, 3));
        } else {
          setBlogs(dummyBlogs);
        }
      })
      .catch(() => setBlogs(dummyBlogs));
  }, []);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">From Our Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Latest <span className="font-bold">Insights</span></h2>
          </div>
          <Link to="/blog" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((b, idx) => {
            const rawImage = b.image || b.coverImage;
            const imgUrl = (String(rawImage || '').includes('http') || String(rawImage || '').includes('data:image') || String(rawImage || '').startsWith('/src') || (!b._id)) ?
              rawImage :
              `${API_BASE_URL.replace('/api', '')}/uploads/blogs/${rawImage}`;

            return (
              <div key={b.title || idx} className="bg-card rounded-xl overflow-hidden border border-border card-hover flex flex-col">
                <Link to={`/blog/${b.slug || b._id || b.id}`} className="block aspect-video bg-secondary overflow-hidden">
                  <img src={imgUrl} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" /><span>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : b.date}</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{b.category?.name || b.category}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${b.slug || b._id || b.id}`}>{b.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{b.excerpt || b.metaDescription || "Read effectively structured thoughts tailored for our users"}</p>
                  <Link to={`/blog/${b.slug || b._id || b.id}`} className="inline-flex items-center gap-1 text-sm text-primary mt-auto font-medium hover:underline">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
