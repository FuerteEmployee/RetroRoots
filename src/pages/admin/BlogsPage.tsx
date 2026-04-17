import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", seoTitle: "", metaDescription: "",
    tags: "", author: "", isPublished: false,
  });

  const fetchData = () => {
    apiRequest("/blogs").then(setBlogs).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ title: "", content: "", excerpt: "", seoTitle: "", metaDescription: "", tags: "", author: "", isPublished: false });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (b: any) => {
    setEditing(b);
    setForm({
      title: b.title, content: b.content, excerpt: b.excerpt || "", seoTitle: b.seoTitle || "",
      metaDescription: b.metaDescription || "", tags: b.tags?.join(", ") || "", author: b.author || "", isPublished: b.isPublished,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) { toast({ title: "Error", description: "Title and content required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const body = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
      if (editing) {
        await apiRequest(`/blogs/${editing._id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await apiRequest("/blogs", { method: "POST", body: JSON.stringify(body) });
      }
      toast({ title: "Success", description: editing ? "Blog updated" : "Blog created" });
      resetForm();
      fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await apiRequest(`/blogs/${id}`, { method: "DELETE" });
    toast({ title: "Deleted" });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Blog / News</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Add Post</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "New"} Blog Post</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Content * (HTML/Rich text)</Label>
              <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="mt-1 font-mono text-xs" rows={10} />
            </div>
            <div className="md:col-span-2">
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="mt-1" rows={2} />
            </div>
            <div><Label>SEO Title</Label><Input value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} className="mt-1" /></div>
            <div><Label>Meta Description</Label><Input value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className="mt-1" /></div>
            <div><Label>Tags (comma separated)</Label><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="mt-1" /></div>
            <div><Label>Author</Label><Input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="mt-1" /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} id="published" className="rounded" />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <Button type="submit" disabled={saving}>{saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          blogs.length === 0 ? <div className="p-8 text-center text-muted-foreground">No blog posts yet.</div> : (
            <div className="divide-y divide-border">
              {blogs.map(b => (
                <div key={b._id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-card-foreground">{b.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.author || "No author"} • {new Date(b.publishDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${b.isPublished ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {b.isPublished ? "Published" : "Draft"}
                  </span>
                  <button onClick={() => handleEdit(b)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(b._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default BlogsPage;
