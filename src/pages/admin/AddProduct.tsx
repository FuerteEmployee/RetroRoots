import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, X, Plus } from "lucide-react";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", sku: "", category: "", industryTags: "",
    description: "", aiMetaDescription: "", videoUrl: "", priceRange: "", 
    sizes: "", seats: "", colors: "", isVisible: true,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string; label?: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await apiRequest("/categories");
        setCategories(cats);
        
        if (id) {
          const p = await apiRequest(`/products/${id}`);
          setForm({
            name: p.name, sku: p.sku || "", category: p.category?._id || p.category || "",
            industryTags: p.industryTags?.join(", ") || "", description: p.description || "",
            aiMetaDescription: p.aiMetaDescription || "", videoUrl: p.videoUrl || "",
            priceRange: p.priceRange || "", 
            sizes: p.sizes?.join(", ") || "",
            seats: p.seats?.join(", ") || "",
            colors: p.colors?.join(", ") || "",
            isVisible: p.isVisible,
          });
          setExistingImages(p.images || []);
        }
      } catch (err) {
        toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast({ title: "Error", description: "Product name is required", variant: "destructive" });
      return;
    }
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
        sizes: form.sizes.split(",").map(t => t.trim()).filter(Boolean),
        seats: form.seats.split(",").map(t => t.trim()).filter(Boolean),
        colors: form.colors.split(",").map(t => t.trim()).filter(Boolean),
        images,
        category: form.category || undefined,
      };

      if (id) {
        await apiRequest(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) });
        toast({ title: "Updated", description: "Product updated successfully" });
      } else {
        await apiRequest("/products", { method: "POST", body: JSON.stringify(body) });
        toast({ title: "Created", description: "Product created successfully" });
      }
      navigate("/admin/products");
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
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/products")}><ArrowLeft size={16} /></Button>
        <h1 className="text-2xl font-bold text-foreground">{id ? "Edit" : "Add"} Product</h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={4} />
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
          <div>
            <Label>Sizes (comma separated)</Label>
            <Input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} className="mt-1" placeholder="200*200, 200*400" />
          </div>
          <div>
            <Label>Seating Capacity (comma separated)</Label>
            <Input value={form.seats} onChange={e => setForm({ ...form, seats: e.target.value })} className="mt-1" placeholder="1 Seater, 2 Seater, 3 Seater, L Shape, Recliner" />
          </div>
          <div>
            <Label>Colors (comma separated)</Label>
            <Input value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })} className="mt-1" placeholder="Beige, Grey, Black & White, Cream / Brown" />
          </div>
          <div className="md:col-span-2">
            <Label>Images</Label>
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-3 my-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative w-32 group">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-border">
                      <img src={img.url} className="w-full h-full object-cover" alt="" />
                      <button type="button" onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))} className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                    </div>
                    <Input 
                      placeholder="Label (e.g. Black)" 
                      value={img.label || ""} 
                      onChange={e => {
                        const newImages = [...existingImages];
                        newImages[i].label = e.target.value;
                        setExistingImages(newImages);
                      }}
                      className="mt-1 h-7 text-[10px] px-2"
                    />
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

          <div className="md:col-span-2 flex gap-3 pt-6 border-t border-border">
            <Button type="submit" disabled={saving} className="min-w-[140px]">
              {saving ? <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</> : id ? "Update Product" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
