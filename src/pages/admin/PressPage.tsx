import React, { useEffect, useState } from "react";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Loader2, ExternalLink } from "lucide-react";

const PressPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [form, setForm] = useState({ headline: "", date: "", articleUrl: "" });

  const fetchData = () => { apiRequest("/press").then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.headline) { toast({ title: "Error", description: "Headline required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      let mediaLogo;
      if (logoFile) mediaLogo = await uploadFile(logoFile);
      await apiRequest("/press", { method: "POST", body: JSON.stringify({ ...form, mediaLogo }) });
      toast({ title: "Added" }); setForm({ headline: "", date: "", articleUrl: "" }); setLogoFile(null); setShowForm(false); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/press/${id}`, { method: "DELETE" }); fetchData(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">PR & News</h1>
        <Button onClick={() => setShowForm(true)}><Plus size={16} /> Add Coverage</Button>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">Add Press Coverage</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><Label>Headline *</Label><Input value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} className="mt-1" /></div>
            <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
            <div><Label>Article URL</Label><Input value={form.articleUrl} onChange={e => setForm({ ...form, articleUrl: e.target.value })} className="mt-1" /></div>
            <div><Label>Media Logo</Label><Input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="mt-1" /></div>
            <div className="md:col-span-2 flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : "Add"}</Button><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button></div>
          </form>
        </div>
      )}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          items.length === 0 ? <div className="p-8 text-center text-muted-foreground">No press coverage yet.</div> :
          items.map(p => (
            <div key={p._id} className="p-4 flex items-center gap-4">
              {p.mediaLogo?.url && <img src={p.mediaLogo.url} className="w-12 h-12 rounded-lg object-contain bg-muted p-1" alt="" />}
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{p.headline}</p>
                <p className="text-xs text-muted-foreground">{p.date && new Date(p.date).toLocaleDateString()}</p>
              </div>
              {p.articleUrl && <a href={p.articleUrl} target="_blank" rel="noreferrer" className="p-1.5 text-primary hover:text-primary/80"><ExternalLink size={16} /></a>}
              <button onClick={() => handleDelete(p._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PressPage;
