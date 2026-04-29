import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/contexts/AuthContext";
import { getImageUrl } from "@/lib/utils";



const BlogPreview = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">From Our Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold">Latest <span className="font-bold">Insights</span></h2>
          </div>
          <Link to="/blog" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((b, idx) => {
            const imgObj = b.featuredImage || b.image || b.coverImage;
            const imgUrl = getImageUrl(imgObj);

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
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:opacity-80 transition-opacity">
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
