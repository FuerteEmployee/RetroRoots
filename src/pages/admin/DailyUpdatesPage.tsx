import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Loader2, GripVertical } from "lucide-react";

const DailyUpdatesPage = () => {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ text: "", link: "", isActive: true });

  const fetchData = () => {
    apiRequest("/daily-updates?sort={\"displayOrder\":1}").then(setUpdates).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text) { toast({ title: "Error", description: "Text is required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      await apiRequest("/daily-updates", { method: "POST", body: JSON.stringify({ ...form, displayOrder: updates.length }) });
      toast({ title: "Added" });
      setForm({ text: "", link: "", isActive: true });
      setShowForm(false);
      fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this update?")) return;
    await apiRequest(`/daily-updates/${id}`, { method: "DELETE" });
    fetchData();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await apiRequest(`/daily-updates/${id}`, { method: "PUT", body: JSON.stringify({ isActive: !isActive }) });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Updates</h1>
          <p className="text-sm text-muted-foreground mt-1">Homepage scrolling ticker items</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus size={16} /> Add Update</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">New Update</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Text *</Label><Input value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className="mt-1" placeholder="New product launch coming soon!" /></div>
            <div><Label>Link (optional)</Label><Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="mt-1" placeholder="https://..." /></div>
            <div className="flex gap-3">
              <Button type="submit" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : "Add"}</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          updates.length === 0 ? <div className="p-8 text-center text-muted-foreground">No updates yet.</div> : (
            <div className="divide-y divide-border">
              {updates.map(u => (
                <div key={u._id} className="p-4 flex items-center gap-3">
                  <GripVertical size={16} className="text-muted-foreground/40 cursor-grab" />
                  <div className="flex-1">
                    <p className={`text-sm ${u.isActive ? "text-card-foreground" : "text-muted-foreground line-through"}`}>{u.text}</p>
                    {u.link && <p className="text-xs text-primary mt-0.5">{u.link}</p>}
                  </div>
                  <button
                    onClick={() => toggleActive(u._id, u.isActive)}
                    className={`text-xs px-2 py-1 rounded-full ${u.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}
                  >
                    {u.isActive ? "Active" : "Inactive"}
                  </button>
                  <button onClick={() => handleDelete(u._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default DailyUpdatesPage;
