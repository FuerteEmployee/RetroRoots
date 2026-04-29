import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ name: "", type: "category", description: "", image: { url: "", publicId: "" } });
  const [uploading, setUploading] = useState(false);

  const fetchData = () => {
    apiRequest("/categories").then(setCategories).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ name: "", type: "category", description: "", image: { url: "", publicId: "" } }); setEditing(null); setShowForm(false); };

  const handleEdit = (c: any) => {
    setEditing(c);
    setForm({ 
      name: c.name, 
      type: c.type, 
      description: c.description || "",
      image: c.image || { url: "", publicId: "" }
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await apiRequest("/upload/image", { method: "POST", body: formData });
      setForm({ ...form, image: res });
      toast({ title: "Image uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { toast({ title: "Error", description: "Name required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      if (editing) await apiRequest(`/categories/${editing._id}`, { method: "PUT", body: JSON.stringify(form) });
      else await apiRequest("/categories", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Success" }); resetForm(); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await apiRequest(`/categories/${id}`, { method: "DELETE" }); fetchData();
  };

  const cats = categories.filter(c => c.type === "category");
  const tags = categories.filter(c => c.type === "industry-tag");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Categories & Tags</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Add</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Add"}</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
            <div>
              <Label>Type</Label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="category">Category</option>
                <option value="industry-tag">Industry Tag</option>
              </select>
            </div>
            <div><Label>Description</Label><Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" /></div>
            <div className="md:col-span-3">
              <Label>Category Image</Label>
              <div className="mt-1 flex items-center gap-4">
                {form.image?.url && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={getImageUrl(form.image)} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setForm({ ...form, image: { url: "", publicId: "" } })}
                      className="absolute top-0 right-0 p-1 bg-destructive text-white rounded-bl-lg"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <div className="flex-1">
                  <Input 
                    type="file" 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  {uploading && <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Uploading...</p>}
                </div>
              </div>
            </div>
            <div className="md:col-span-3 flex gap-3">
              <Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : editing ? "Update" : "Add"}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border"><h2 className="font-semibold text-card-foreground">Categories ({cats.length})</h2></div>
          <div className="divide-y divide-border">
            {cats.map(c => (
              <div key={c._id} className="p-3 flex items-center gap-3">
                {c.image?.url ? (
                  <img src={getImageUrl(c.image)} alt="" className="w-10 h-10 rounded-full object-cover border border-border" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground">No Img</div>
                )}
                <span className="flex-1 text-sm text-card-foreground">{c.name}</span>
                <button onClick={() => handleEdit(c)} className="p-1 text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(c._id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            ))}
            {cats.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No categories</div>}
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border"><h2 className="font-semibold text-card-foreground">Industry Tags ({tags.length})</h2></div>
          <div className="divide-y divide-border">
            {tags.map(t => (
              <div key={t._id} className="p-3 flex items-center gap-3">
                <span className="flex-1 text-sm text-card-foreground">{t.name}</span>
                <button onClick={() => handleEdit(t)} className="p-1 text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(t._id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            ))}
            {tags.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No tags</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
