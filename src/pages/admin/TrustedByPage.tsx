import React, { useEffect, useState } from "react";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Loader2 } from "lucide-react";

const TrustedByPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", link: "", type: "client" });
  const [filterType, setFilterType] = useState("all");

  const fetchData = () => { apiRequest("/trusted-by?sort={\"displayOrder\":1}").then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile) { toast({ title: "Error", description: "Logo required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const logo = await uploadFile(logoFile);
      await apiRequest("/trusted-by", { method: "POST", body: JSON.stringify({ ...form, logo, displayOrder: items.length }) });
      toast({ title: "Added" }); setForm({ name: "", link: "", type: "client" }); setLogoFile(null); setShowForm(false); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/trusted-by/${id}`, { method: "DELETE" }); fetchData(); };

  const filtered = filterType === "all" ? items : items.filter(i => i.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground">Trusted By</h1>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {["all", "client", "press"].map(t => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 text-xs font-medium capitalize ${filterType === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
              >{t === "all" ? "All" : t === "client" ? "Brands" : "Media"}</button>
            ))}
          </div>
          <Button onClick={() => setShowForm(true)}><Plus size={16} /> Add Logo</Button>
        </div>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">Add Logo</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
            <div><Label>Link</Label><Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="mt-1" /></div>
            <div>
              <Label>Type</Label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="client">Client Brand</option><option value="press">Press/Media</option>
              </select>
            </div>
            <div className="md:col-span-3"><Label>Logo *</Label><Input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="mt-1" /></div>
            <div className="md:col-span-3 flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : "Add"}</Button><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button></div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? [...Array(6)].map((_, i) => <div key={i} className="aspect-video bg-card rounded-xl border border-border animate-pulse" />) :
          filtered.length === 0 ? <div className="col-span-full p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">No logos yet.</div> :
          filtered.map(item => (
            <div key={item._id} className="relative group bg-card rounded-xl border border-border p-3 flex items-center justify-center aspect-video">
              {item.logo?.url && <img src={item.logo.url} className="max-w-full max-h-full object-contain" alt={item.name || ""} />}
              <button onClick={() => handleDelete(item._id)} className="absolute top-1 right-1 p-1 bg-destructive rounded text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrustedByPage;
