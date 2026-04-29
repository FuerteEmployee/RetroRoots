import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    apiRequest("/blogs")
      .then(setBlogs)
      .catch(() => toast({ title: "Error", description: "Failed to load blogs", variant: "destructive" }))
      .finally(() => setLoading(false));
  };
  
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await apiRequest(`/blogs/${id}`, { method: "DELETE" });
      toast({ title: "Deleted" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Blog / News</h1>
        <Button onClick={() => navigate("/admin/blogs/add")}><Plus size={16} /> Add Post</Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Loading blog posts...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No blog posts yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {blogs.map(b => (
              <div key={b._id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border flex-shrink-0">
                  {b.featuredImage?.url ? (
                    <img src={b.featuredImage.url} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground font-medium">No Image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-card-foreground truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.author || "No author"} • {new Date(b.publishDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${b.isPublished ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {b.isPublished ? "Published" : "Draft"}
                  </span>
                  <div className="flex items-center">
                    <button onClick={() => navigate(`/admin/blogs/edit/${b._id}`)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(b._id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;

