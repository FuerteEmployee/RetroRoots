import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2, Save } from "lucide-react";

const SeoPage = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ pageName: "", title: "", metaDescription: "", keywords: "", canonicalUrl: "", robotsTxt: "" });

  const fetchData = () => { apiRequest("/seo").then(setPages).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ pageName: "", title: "", metaDescription: "", keywords: "", canonicalUrl: "", robotsTxt: "" }); setEditing(null); setShowForm(false); };

  const handleEdit = (p: any) => {
    setEditing(p);
    setForm({ pageName: p.pageName, title: p.title || "", metaDescription: p.metaDescription || "", keywords: p.keywords?.join(", ") || "", canonicalUrl: p.canonicalUrl || "", robotsTxt: p.robotsTxt || "" });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pageName) { toast({ title: "Error", description: "Page name required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const body = { ...form, keywords: form.keywords.split(",").map(k => k.trim()).filter(Boolean) };
      if (editing) await apiRequest(`/seo/${editing._id}`, { method: "PUT", body: JSON.stringify(body) });
      else await apiRequest("/seo", { method: "POST", body: JSON.stringify(body) });
      toast({ title: "Success" }); resetForm(); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/seo/${id}`, { method: "DELETE" }); fetchData(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">SEO Manager</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Add Page SEO</Button>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Add"} SEO Settings</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Page Name *</Label><Input value={form.pageName} onChange={e => setForm({ ...form, pageName: e.target.value })} className="mt-1" placeholder="home, about, products" /></div>
            <div><Label>SEO Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1" /></div>
            <div className="md:col-span-2"><Label>Meta Description</Label><Textarea value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className="mt-1" rows={2} /></div>
            <div><Label>Keywords (comma separated)</Label><Input value={form.keywords} onChange={e => setForm({ ...form, keywords: e.target.value })} className="mt-1" /></div>
            <div><Label>Canonical URL</Label><Input value={form.canonicalUrl} onChange={e => setForm({ ...form, canonicalUrl: e.target.value })} className="mt-1" /></div>
            <div className="md:col-span-2"><Label>robots.txt Content</Label><Textarea value={form.robotsTxt} onChange={e => setForm({ ...form, robotsTxt: e.target.value })} className="mt-1 font-mono text-xs" rows={4} /></div>
            <div className="md:col-span-2 flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : editing ? "Update" : "Add"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
          </form>
        </div>
      )}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          pages.length === 0 ? <div className="p-8 text-center text-muted-foreground">No SEO settings configured yet.</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Page</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Title</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Description</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  {pages.map(p => (
                    <tr key={p._id} className="hover:bg-muted/30">
                      <td className="p-3 font-medium text-card-foreground capitalize">{p.pageName}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell truncate max-w-xs">{p.title || "-"}</td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell truncate max-w-sm">{p.metaDescription || "-"}</td>
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

export default SeoPage;
