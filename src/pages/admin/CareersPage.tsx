import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2, Briefcase } from "lucide-react";

const CareersPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", department: "", location: "", description: "", closingDate: "", isActive: true });

  const fetchData = () => { apiRequest("/careers").then(setJobs).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ title: "", department: "", location: "", description: "", closingDate: "", isActive: true }); setEditing(null); setShowForm(false); };

  const handleEdit = (j: any) => {
    setEditing(j);
    setForm({ title: j.title, department: j.department || "", location: j.location || "", description: j.description || "", closingDate: j.closingDate?.split("T")[0] || "", isActive: j.isActive });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { toast({ title: "Error", description: "Title required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      if (editing) await apiRequest(`/careers/${editing._id}`, { method: "PUT", body: JSON.stringify(form) });
      else await apiRequest("/careers", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Success" }); resetForm(); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; await apiRequest(`/careers/${id}`, { method: "DELETE" }); fetchData(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Careers</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Post Job</Button>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Post"} Job</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1" /></div>
            <div><Label>Department</Label><Input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="mt-1" /></div>
            <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="mt-1" /></div>
            <div><Label>Closing Date</Label><Input type="date" value={form.closingDate} onChange={e => setForm({ ...form, closingDate: e.target.value })} className="mt-1" /></div>
            <div className="md:col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={4} /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} id="active" className="rounded" /><Label htmlFor="active">Active</Label></div>
            <div className="md:col-span-2 flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : editing ? "Update" : "Post"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
          </form>
        </div>
      )}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          jobs.length === 0 ? <div className="p-8 text-center text-muted-foreground">No job postings yet.</div> :
          jobs.map(j => (
            <div key={j._id} className="p-4 flex items-start gap-3">
              <Briefcase size={18} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-card-foreground">{j.title}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${j.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{j.isActive ? "Active" : "Closed"}</span>
                </div>
                <p className="text-xs text-muted-foreground">{[j.department, j.location].filter(Boolean).join(" • ")}</p>
                {j.applications?.length > 0 && <p className="text-xs text-primary mt-1">{j.applications.length} application(s)</p>}
              </div>
              <button onClick={() => handleEdit(j)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(j._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CareersPage;
