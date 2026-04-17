import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

const DistributorsPage = () => {
  const [distributors, setDistributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    companyName: "", contactPerson: "", email: "", phone: "",
    pinCode: "", area: "", city: "", state: "", country: "India",
    territory: "", status: "pending", isVisibleOnMap: false,
  });

  const fetchData = () => {
    apiRequest("/distributors").then(setDistributors).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ companyName: "", contactPerson: "", email: "", phone: "", pinCode: "", area: "", city: "", state: "", country: "India", territory: "", status: "pending", isVisibleOnMap: false });
    setEditing(null); setShowForm(false);
  };

  const handleEdit = (d: any) => {
    setEditing(d);
    setForm({
      companyName: d.companyName, contactPerson: d.contactPerson, email: d.email, phone: d.phone,
      pinCode: d.pinCode || "", area: d.area || "", city: d.city || "", state: d.state || "",
      country: d.country || "India", territory: d.territory || "", status: d.status, isVisibleOnMap: d.isVisibleOnMap,
    });
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await apiRequest(`/distributors/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
    toast({ title: "Updated", description: `Distributor ${status}` });
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactPerson || !form.email) {
      toast({ title: "Error", description: "Fill required fields", variant: "destructive" }); return;
    }
    setSaving(true);
    try {
      if (editing) {
        await apiRequest(`/distributors/${editing._id}`, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await apiRequest("/distributors", { method: "POST", body: JSON.stringify(form) });
      }
      toast({ title: "Success" });
      resetForm(); fetchData();
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await apiRequest(`/distributors/${id}`, { method: "DELETE" });
    fetchData();
  };

  const statusIcon = (s: string) => {
    if (s === "approved") return <CheckCircle size={14} className="text-success" />;
    if (s === "rejected") return <XCircle size={14} className="text-destructive" />;
    return <Clock size={14} className="text-warning" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Distributors</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus size={16} /> Add Distributor</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-card-foreground">{editing ? "Edit" : "Add"} Distributor</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><Label>Company Name *</Label><Input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} className="mt-1" /></div>
            <div><Label>Contact Person *</Label><Input value={form.contactPerson} onChange={e => setForm({ ...form, contactPerson: e.target.value })} className="mt-1" /></div>
            <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1" /></div>
            <div><Label>Pin Code</Label><Input value={form.pinCode} onChange={e => setForm({ ...form, pinCode: e.target.value })} className="mt-1" /></div>
            <div><Label>Area</Label><Input value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} className="mt-1" /></div>
            <div><Label>City</Label><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="mt-1" /></div>
            <div><Label>State</Label><Input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="mt-1" /></div>
            <div><Label>Country</Label><Input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="mt-1" /></div>
            <div><Label>Territory</Label><Input value={form.territory} onChange={e => setForm({ ...form, territory: e.target.value })} className="mt-1" /></div>
            <div>
              <Label>Status</Label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" checked={form.isVisibleOnMap} onChange={e => setForm({ ...form, isVisibleOnMap: e.target.checked })} id="mapVisible" className="rounded" />
              <Label htmlFor="mapVisible">Show on Map</Label>
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex gap-3 pt-2">
              <Button type="submit" disabled={saving}>{saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : editing ? "Update" : "Add"}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          distributors.length === 0 ? <div className="p-8 text-center text-muted-foreground">No distributors yet.</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Company</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Contact</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Location</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  {distributors.map(d => (
                    <tr key={d._id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-card-foreground">{d.companyName}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{d.contactPerson}<br /><span className="text-xs">{d.email}</span></td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell">{[d.city, d.state, d.country].filter(Boolean).join(", ")}</td>
                      <td className="p-3"><span className="inline-flex items-center gap-1 text-xs capitalize">{statusIcon(d.status)} {d.status}</span></td>
                      <td className="p-3 text-right space-x-1">
                        {d.status === "pending" && (
                          <>
                            <button onClick={() => handleStatusChange(d._id, "approved")} className="p-1.5 text-success hover:text-success/80"><CheckCircle size={16} /></button>
                            <button onClick={() => handleStatusChange(d._id, "rejected")} className="p-1.5 text-destructive hover:text-destructive/80"><XCircle size={16} /></button>
                          </>
                        )}
                        <button onClick={() => handleEdit(d)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(d._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
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

export default DistributorsPage;
