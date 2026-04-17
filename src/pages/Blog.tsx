import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Calendar, ArrowRight, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogs } from "@/lib/api";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(data => setPosts(data))
      .catch(err => console.error("Failed to fetch blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout title="Blog" description="Read insights, guides, and industry news from Flexicore's expert team on solid surfaces, tiles, and interior design trends.">
      <PageHeader title="Blog & Insights" subtitle="Expert articles on solid surfaces, tiles, and design trends" />
      <section className="section-padding">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <article key={p._id} className="bg-card rounded-xl overflow-hidden border border-border card-hover">
                  <div className="aspect-video bg-secondary overflow-hidden">
                    <img 
                      src={p.featuredImage?.url || "/placeholder.svg"} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(p.publishDate)}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{p.author || 'Flexicore Team'}</span>
                    </div>
                    <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">{p.tags?.[0] || 'General'}</span>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 font-medium cursor-pointer hover:underline">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No blog posts found yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
