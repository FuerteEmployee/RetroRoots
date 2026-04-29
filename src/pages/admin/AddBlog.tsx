import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", seoTitle: "", metaDescription: "",
    tags: "", author: "", isPublished: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<any>(null);

  useEffect(() => {
    if (id) {
      apiRequest(`/blogs/${id}`)
        .then(b => {
          setForm({
            title: b.title, content: b.content, excerpt: b.excerpt || "", seoTitle: b.seoTitle || "",
            metaDescription: b.metaDescription || "", tags: b.tags?.join(", ") || "", author: b.author || "", isPublished: b.isPublished,
          });
          setExistingImage(b.featuredImage || { url: b.image });
        })
        .catch(() => toast({ title: "Error", description: "Failed to load blog", variant: "destructive" }))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast({ title: "Error", description: "Title and content required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      let featuredImage = existingImage;
      if (imageFile) {
        featuredImage = await uploadFile(imageFile);
      }

      const body = { 
        ...form, 
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        featuredImage,
        image: featuredImage?.url
      };

      if (id) {
        await apiRequest(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await apiRequest("/blogs", { method: "POST", body: JSON.stringify(body) });
      }
      toast({ title: "Success", description: id ? "Blog updated" : "Blog created" });
      navigate("/admin/blogs");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/blogs")}><ArrowLeft size={16} /></Button>
        <h1 className="text-2xl font-bold text-foreground">{id ? "Edit" : "New"} Blog Post</h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label>Title *</Label>
            <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1" />
          </div>

          <div className="md:col-span-2">
            <Label>Featured Image</Label>
            <div className="mt-2 space-y-4">
              {existingImage && !imageFile && (
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden border border-border">
                  <img src={existingImage.url} className="w-full h-full object-cover" alt="" />
                  <button type="button" onClick={() => setExistingImage(null)} className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1"><X size={12} /></button>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="max-w-xs" />
                {imageFile && <p className="text-xs text-muted-foreground">{imageFile.name}</p>}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Label>Content * (HTML/Rich text)</Label>
            <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="mt-1 font-mono text-xs" rows={12} />
          </div>

          <div className="md:col-span-2">
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="mt-1" rows={3} />
          </div>

          <div><Label>SEO Title</Label><Input value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} className="mt-1" /></div>
          <div><Label>Meta Description</Label><Input value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className="mt-1" /></div>
          <div><Label>Tags (comma separated)</Label><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="mt-1" /></div>
          <div><Label>Author</Label><Input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="mt-1" /></div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} id="published" className="rounded" />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4 border-t border-border">
            <Button type="submit" disabled={saving} className="min-w-[120px]">
              {saving ? <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</> : id ? "Update Post" : "Create Post"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/blogs")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
