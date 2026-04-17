import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const blogs = [
  { title: "Top 10 Solid Surface Trends for 2026", date: "Apr 10, 2026", category: "Trends", excerpt: "Discover the latest innovations in solid surface design transforming modern interiors." },
  { title: "How Flexicore Exports to 25+ Countries", date: "Apr 5, 2026", category: "Business", excerpt: "Our journey from Rajkot to global markets — the Flexicore export story." },
  { title: "Best Kitchen Countertop Materials Guide", date: "Mar 28, 2026", category: "Guide", excerpt: "A comprehensive comparison of kitchen surface materials to help you choose the best." },
];

const BlogPreview = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">From Our Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Latest <span className="gold-text">Insights</span></h2>
        </div>
        <Link to="/blog" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map(b => (
          <Link key={b.title} to="/blog" className="bg-card rounded-xl overflow-hidden border border-border card-hover">
            <div className="aspect-video bg-secondary" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar className="w-3.5 h-3.5" /><span>{b.date}</span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{b.category}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 font-medium">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default BlogPreview;
