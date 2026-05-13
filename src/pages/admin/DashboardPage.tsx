import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import StatCard from "@/components/admin/StatCard";
import { Package, FileText, MessageSquare, Users, AlertCircle } from "lucide-react";

interface DashboardData {
  products: number;
  blogs: number;
  enquiries: number;
  unreadEnquiries: number;
  distributors: number;
  pendingDistributors: number;
  recentEnquiries: any[];
  lowStockCount: number;
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/dashboard")
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5 h-24 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Products" value={data?.products || 0} icon={<Package size={20} />} />
        <StatCard title="Blog Posts" value={data?.blogs || 0} icon={<FileText size={20} />} />
        <StatCard title="Enquiries" value={data?.enquiries || 0} icon={<MessageSquare size={20} />} trend={`${data?.unreadEnquiries || 0} unread`} />
        <StatCard title="Distributors" value={data?.distributors || 0} icon={<Users size={20} />} trend={`${data?.pendingDistributors || 0} pending`} />
        <StatCard title="Low Stock" value={data?.lowStockCount || 0} icon={<AlertCircle size={20} />} trend="Action required" color="text-amber-600" />
      </div>

      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">Recent Enquiries</h2>
        </div>
        <div className="divide-y divide-border">
          {data?.recentEnquiries?.length ? (
            data.recentEnquiries.map((enq: any) => (
              <div key={enq._id} className="p-4 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${enq.isRead ? "bg-muted-foreground" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{enq.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{enq.message}</p>
                </div>
                <span className="text-xs text-muted-foreground">{enq.type}</span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <AlertCircle className="mx-auto mb-2 text-muted-foreground/50" size={32} />
              <p className="text-sm">No enquiries yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
