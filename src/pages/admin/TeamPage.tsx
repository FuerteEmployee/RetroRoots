import React, { useEffect, useState } from "react";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

const TeamPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", designation: "", bio: "", linkedinUrl: "", displayOrder: 0, isFounder: false });

  const fetchData = () => { apiRequest("/team?sort={\"displayOrder\":1}").then(setMembers).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ name: "", designation: "", bio: "", linkedinUrl: "", displayOrder: 0, isFounder: false }); setEditing(null); setShowForm(false); setPhotoFile(null); };

  const handleEdit = (m: any) => {
    setEditing(m);
    setForm({ name: m.name, designation: m.designation, bio: m.bio || "", linkedinUrl: m.linkedinUrl || "", displayOrder: m.displayOrder || 0, isFounder: m.isFounder });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.designation) { toast({ title: "Error", description: "Name and designation required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      let photo = editing?.photo;
      if (photoFile) photo = await uploadFile(photoFile);
      const body = { ...form, photo };
      if (editing) await apiRequest(`/team/${editing._id}`, { method: "PUT", body: JSON.stringify(body) });
      else await apiRequest("/team", { method: "POST", body: JSON.stringify(body) });
      toast({ title: "Success" }); resetForm(); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/team/${id}`, { method: "DELETE" }); fetchData(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Team & Founder</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Add Member</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Add"} Member</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
            <div><Label>Designation *</Label><Input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="mt-1" /></div>
            <div className="md:col-span-2"><Label>Bio</Label><Textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="mt-1" rows={3} /></div>
            <div><Label>LinkedIn URL</Label><Input value={form.linkedinUrl} onChange={e => setForm({ ...form, linkedinUrl: e.target.value })} className="mt-1" /></div>
            <div><Label>Display Order</Label><Input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: Number(e.target.value) })} className="mt-1" /></div>
            <div><Label>Photo</Label><Input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} className="mt-1" /></div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" checked={form.isFounder} onChange={e => setForm({ ...form, isFounder: e.target.checked })} id="founder" className="rounded" />
              <Label htmlFor="founder">Founder</Label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : editing ? "Update" : "Add"}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="bg-card rounded-xl border border-border h-48 animate-pulse" />) :
          members.length === 0 ? <div className="col-span-full p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">No team members yet.</div> :
          members.map(m => (
            <div key={m._id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start gap-4">
                {m.photo?.url ? <img src={m.photo.url} className="w-16 h-16 rounded-xl object-cover" alt="" /> :
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">{m.name.charAt(0)}</div>}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.designation}</p>
                  {m.isFounder && <span className="text-xs px-1.5 py-0.5 rounded bg-warning/10 text-warning mt-1 inline-block">Founder</span>}
                </div>
              </div>
              {m.bio && <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{m.bio}</p>}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button onClick={() => handleEdit(m)} className="text-xs text-primary hover:underline">Edit</button>
                <button onClick={() => handleDelete(m._id)} className="text-xs text-destructive hover:underline">Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamPage;
