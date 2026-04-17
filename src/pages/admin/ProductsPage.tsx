import React, { useEffect, useState } from "react";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: any;
  industryTags: string[];
  description: string;
  aiMetaDescription: string;
  images: { url: string; publicId: string }[];
  modelFile: { url: string; publicId: string } | null;
  videoUrl: string;
  specPdf: { url: string; publicId: string } | null;
  priceRange: string;
  isVisible: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", sku: "", category: "", industryTags: "",
    description: "", aiMetaDescription: "", videoUrl: "", priceRange: "", isVisible: true,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string }[]>([]);

  const fetchData = () => {
    Promise.all([apiRequest("/products"), apiRequest("/categories")])
      .then(([p, c]) => { setProducts(p); setCategories(c); })
      .catch(() => toast({ title: "Error", description: "Failed to load data", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ name: "", sku: "", category: "", industryTags: "", description: "", aiMetaDescription: "", videoUrl: "", priceRange: "", isVisible: true });
    setImageFiles([]);
    setExistingImages([]);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, sku: p.sku || "", category: p.category?._id || p.category || "",
      industryTags: p.industryTags?.join(", ") || "", description: p.description || "",
      aiMetaDescription: p.aiMetaDescription || "", videoUrl: p.videoUrl || "",
      priceRange: p.priceRange || "", isVisible: p.isVisible,
    });
    setExistingImages(p.images || []);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { toast({ title: "Error", description: "Product name is required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      let images = [...existingImages];
      for (const file of imageFiles) {
        const uploaded = await uploadFile(file);
        images.push(uploaded);
      }
      const body = {
        ...form,
        industryTags: form.industryTags.split(",").map(t => t.trim()).filter(Boolean),
        images,
        category: form.category || undefined,
      };
      if (editing) {
        await apiRequest(`/products/${editing._id}`, { method: "PUT", body: JSON.stringify(body) });
        toast({ title: "Updated", description: "Product updated successfully" });
      } else {
        await apiRequest("/products", { method: "POST", body: JSON.stringify(body) });
        toast({ title: "Created", description: "Product created successfully" });
      }
      resetForm();
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiRequest(`/products/${id}`, { method: "DELETE" });
      toast({ title: "Deleted", description: "Product deleted" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Add"} Product</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>SKU</Label>
              <Input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Category</Label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Select Category</option>
                {categories.filter(c => c.type === "category").map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Industry Tags (comma separated)</Label>
              <Input value={form.industryTags} onChange={e => setForm({ ...form, industryTags: e.target.value })} className="mt-1" placeholder="Kitchen, Hospital, Hotel" />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} />
            </div>
            <div className="md:col-span-2">
              <Label>AI Meta Description</Label>
              <Textarea value={form.aiMetaDescription} onChange={e => setForm({ ...form, aiMetaDescription: e.target.value })} className="mt-1" rows={2} />
            </div>
            <div>
              <Label>Video URL</Label>
              <Input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Price Range</Label>
              <Input value={form.priceRange} onChange={e => setForm({ ...form, priceRange: e.target.value })} className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Images</Label>
              {existingImages.length > 0 && (
                <div className="flex flex-wrap gap-2 my-2">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                      <img src={img.url} className="w-full h-full object-cover" alt="" />
                      <button type="button" onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
              <Input type="file" accept="image/*" multiple onChange={e => setImageFiles(Array.from(e.target.files || []))} className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.isVisible} onChange={e => setForm({ ...form, isVisible: e.target.checked })} id="visible" className="rounded" />
              <Label htmlFor="visible">Visible on website</Label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <Button type="submit" disabled={saving}>
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : editing ? "Update Product" : "Add Product"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No products yet. Add your first product.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Image</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">SKU</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      {p.images?.[0] ? (
                        <img src={p.images[0].url} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">No img</div>
                      )}
                    </td>
                    <td className="p-3 font-medium text-card-foreground">{p.name}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{p.sku || "-"}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{p.category?.name || "-"}</td>
                    <td className="p-3">
                      {p.isVisible ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success"><Eye size={12} /> Visible</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"><EyeOff size={12} /> Hidden</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => handleEdit(p)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
