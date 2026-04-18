import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { staticPosts } from "@/data/blogData";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check static posts first
    const staticPost = staticPosts.find(p => p._id === id);
    if (staticPost) {
      setPost(staticPost);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    apiRequest(`/blogs/${id}`)
      .then(data => setPost(data))
      .catch(err => console.error("Failed to fetch blog detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout title="Loading Blog...">
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Post Not Found">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={post.title} description={post.excerpt}>
      <PageHeader title={post.title} subtitle="Expert insights on design and living" />
      
      <article className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-xl">
            <img 
              src={post.featuredImage?.url || post.image || "/placeholder.svg"} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(post.publishDate)}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author || 'Retro Roots Team'}</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">{post.tags?.[0] || 'General'}</span>
          </div>
          
          <div 
            className="prose prose-lg max-w-none text-foreground/80 leading-relaxed font-outfit"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
