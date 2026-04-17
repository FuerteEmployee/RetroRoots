import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2, CalendarDays, MapPin } from "lucide-react";

const ExposPage = () => {
  const [expos, setExpos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", date: "", endDate: "", location: "", description: "", registrationLink: "", isUpcoming: true });

  const fetchData = () => { apiRequest("/expos").then(setExpos).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ name: "", date: "", endDate: "", location: "", description: "", registrationLink: "", isUpcoming: true }); setEditing(null); setShowForm(false); };

  const handleEdit = (e: any) => {
    setEditing(e);
    setForm({ name: e.name, date: e.date?.split("T")[0] || "", endDate: e.endDate?.split("T")[0] || "", location: e.location || "", description: e.description || "", registrationLink: e.registrationLink || "", isUpcoming: e.isUpcoming });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { toast({ title: "Error", description: "Name required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      if (editing) await apiRequest(`/expos/${editing._id}`, { method: "PUT", body: JSON.stringify(form) });
      else await apiRequest("/expos", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Success" }); resetForm(); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/expos/${id}`, { method: "DELETE" }); fetchData(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Expos</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Add Expo</Button>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Add"} Expo</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
            <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="mt-1" /></div>
            <div><Label>Start Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
            <div><Label>End Date</Label><Input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="mt-1" /></div>
            <div className="md:col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} /></div>
            <div><Label>Registration Link</Label><Input value={form.registrationLink} onChange={e => setForm({ ...form, registrationLink: e.target.value })} className="mt-1" /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.isUpcoming} onChange={e => setForm({ ...form, isUpcoming: e.target.checked })} id="upcoming" className="rounded" /><Label htmlFor="upcoming">Upcoming</Label></div>
            <div className="md:col-span-2 flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : editing ? "Update" : "Add"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
          </form>
        </div>
      )}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          expos.length === 0 ? <div className="p-8 text-center text-muted-foreground">No expos yet.</div> :
          expos.map(ex => (
            <div key={ex._id} className="p-4 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-card-foreground">{ex.name}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${ex.isUpcoming ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{ex.isUpcoming ? "Upcoming" : "Past"}</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  {ex.date && <span className="flex items-center gap-1"><CalendarDays size={12} />{new Date(ex.date).toLocaleDateString()}</span>}
                  {ex.location && <span className="flex items-center gap-1"><MapPin size={12} />{ex.location}</span>}
                </div>
              </div>
              <button onClick={() => handleEdit(ex)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(ex._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExposPage;
