import React, { useEffect, useState } from "react";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Loader2 } from "lucide-react";

const GalleryPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", category: "factory", stepLabel: "" });
  const [filterCat, setFilterCat] = useState("all");

  const fetchData = () => { apiRequest("/gallery?sort={\"displayOrder\":1}").then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) { toast({ title: "Error", description: "Image required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const image = await uploadFile(imageFile);
      await apiRequest("/gallery", { method: "POST", body: JSON.stringify({ ...form, image, displayOrder: items.length }) });
      toast({ title: "Added" });
      setForm({ title: "", category: "factory", stepLabel: "" }); setImageFile(null); setShowForm(false);
      fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/gallery/${id}`, { method: "DELETE" }); fetchData(); };

  const filtered = filterCat === "all" ? items : items.filter(i => i.category === filterCat);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {["all", "factory", "installation", "event", "entry-to-exit"].map(c => (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`px-3 py-1.5 text-xs font-medium capitalize ${filterCat === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
              >{c.replace("-", " ")}</button>
            ))}
          </div>
          <Button onClick={() => setShowForm(true)}><Plus size={16} /> Upload</Button>
        </div>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">Upload Photo</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1" /></div>
            <div>
              <Label>Category</Label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="factory">Factory</option><option value="installation">Installation</option>
                <option value="event">Event</option><option value="entry-to-exit">Entry to Exit</option>
              </select>
            </div>
            <div><Label>Step Label</Label><Input value={form.stepLabel} onChange={e => setForm({ ...form, stepLabel: e.target.value })} className="mt-1" placeholder="For entry-to-exit" /></div>
            <div className="md:col-span-3"><Label>Image *</Label><Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-1" /></div>
            <div className="md:col-span-3 flex gap-3">
              <Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : "Upload"}</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? [...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-card rounded-xl border border-border animate-pulse" />) :
          filtered.length === 0 ? <div className="col-span-full p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">No photos yet.</div> :
          filtered.map(item => (
            <div key={item._id} className="relative group rounded-xl overflow-hidden border border-border bg-card">
              <img src={item.image?.url} className="w-full aspect-square object-cover" alt={item.title || ""} />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end">
                <div className="w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                  <span className="text-xs text-primary-foreground font-medium truncate">{item.title || item.category}</span>
                  <button onClick={() => handleDelete(item._id)} className="p-1 bg-destructive rounded text-destructive-foreground"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GalleryPage;
