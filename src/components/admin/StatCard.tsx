import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => (
  <div className={cn("bg-card rounded-xl border border-border p-5 flex items-start gap-4", className)}>
    <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <p className="text-2xl font-bold text-card-foreground mt-1">{value}</p>
      {trend && <p className="text-xs text-success mt-1">{trend}</p>}
    </div>
  </div>
);

export default StatCard;
