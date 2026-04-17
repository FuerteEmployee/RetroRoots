import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Download, Mail, MailOpen, Trash2 } from "lucide-react";

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "contact" | "product">("all");

  const fetchData = () => {
    apiRequest("/enquiries").then(setEnquiries).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const markRead = async (id: string) => {
    await apiRequest(`/enquiries/${id}`, { method: "PUT", body: JSON.stringify({ isRead: true }) });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await apiRequest(`/enquiries/${id}`, { method: "DELETE" });
    fetchData();
  };

  const exportCSV = async () => {
    try {
      const blob = await apiRequest("/enquiries/export/csv");
      const url = URL.createObjectURL(blob as Blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "enquiries.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Exported", description: "CSV downloaded" });
    } catch {
      toast({ title: "Error", description: "Export failed", variant: "destructive" });
    }
  };

  const filtered = filter === "all" ? enquiries : enquiries.filter(e => e.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground">Enquiries</h1>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["all", "contact", "product"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
              >{f}</button>
            ))}
          </div>
          <Button variant="outline" onClick={exportCSV}><Download size={16} /> Export CSV</Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> :
          filtered.length === 0 ? <div className="p-8 text-center text-muted-foreground">No enquiries found.</div> : (
            <div className="divide-y divide-border">
              {filtered.map(enq => (
                <div key={enq._id} className={`p-4 flex items-start gap-3 ${!enq.isRead ? "bg-primary/5" : ""}`}>
                  <div className="mt-1">
                    {enq.isRead ? <MailOpen size={16} className="text-muted-foreground" /> : <Mail size={16} className="text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-card-foreground">{enq.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${enq.type === "product" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>{enq.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{enq.email} {enq.phone && `• ${enq.phone}`}</p>
                    {enq.productName && <p className="text-xs text-primary mt-0.5">Product: {enq.productName}</p>}
                    <p className="text-sm text-muted-foreground mt-1">{enq.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{new Date(enq.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1">
                    {!enq.isRead && (
                      <button onClick={() => markRead(enq._id)} className="p-1.5 text-muted-foreground hover:text-primary" title="Mark as read"><MailOpen size={16} /></button>
                    )}
                    <button onClick={() => handleDelete(enq._id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default EnquiriesPage;
