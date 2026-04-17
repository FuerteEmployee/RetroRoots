import React, { useEffect, useState } from "react";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Loader2 } from "lucide-react";

const CertificatesPage = () => {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", issuingBody: "", date: "", enableDownload: true });

  const fetchData = () => { apiRequest("/certificates").then(setCerts).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !imageFile) { toast({ title: "Error", description: "Title and image required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const image = await uploadFile(imageFile);
      await apiRequest("/certificates", { method: "POST", body: JSON.stringify({ ...form, image }) });
      toast({ title: "Added" }); setForm({ title: "", issuingBody: "", date: "", enableDownload: true }); setImageFile(null); setShowForm(false); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/certificates/${id}`, { method: "DELETE" }); fetchData(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Certificates</h1>
        <Button onClick={() => setShowForm(true)}><Plus size={16} /> Add Certificate</Button>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">Add Certificate</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1" /></div>
            <div><Label>Issuing Body</Label><Input value={form.issuingBody} onChange={e => setForm({ ...form, issuingBody: e.target.value })} className="mt-1" /></div>
            <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
            <div><Label>Image *</Label><Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-1" /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.enableDownload} onChange={e => setForm({ ...form, enableDownload: e.target.checked })} id="dl" className="rounded" /><Label htmlFor="dl">Enable Download</Label></div>
            <div className="md:col-span-2 flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : "Add"}</Button><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button></div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="bg-card rounded-xl border border-border h-48 animate-pulse" />) :
          certs.length === 0 ? <div className="col-span-full p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">No certificates yet.</div> :
          certs.map(c => (
            <div key={c._id} className="bg-card rounded-xl border border-border overflow-hidden">
              {c.image?.url && <img src={c.image.url} className="w-full h-40 object-cover" alt="" />}
              <div className="p-4">
                <p className="font-medium text-card-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.issuingBody} {c.date && `• ${new Date(c.date).toLocaleDateString()}`}</p>
                <div className="flex gap-2 mt-3"><button onClick={() => handleDelete(c._id)} className="text-xs text-destructive hover:underline">Delete</button></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CertificatesPage;
