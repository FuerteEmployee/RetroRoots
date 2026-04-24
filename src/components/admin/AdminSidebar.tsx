import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  FileText,
  RefreshCw,
  Users,
  Image,
  Award,
  MapPin,
  Newspaper,
  CheckCircle,
  Briefcase,
  MessageSquare,
  Settings,
  Search,
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Categories", icon: Layers, path: "/admin/categories" },
  { label: "Blogs", icon: FileText, path: "/admin/blogs" },
  { label: "Daily Updates", icon: RefreshCw, path: "/admin/daily-updates" },
  { label: "Distributors", icon: Users, path: "/admin/distributors" },
  { label: "Team", icon: Users, path: "/admin/team" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Certificates", icon: Award, path: "/admin/certificates" },
  { label: "Expos", icon: MapPin, path: "/admin/expos" },
  { label: "Press", icon: Newspaper, path: "/admin/press" },
  { label: "Trusted By", icon: CheckCircle, path: "/admin/trusted-by" },
  { label: "Careers", icon: Briefcase, path: "/admin/careers" },
  { label: "Enquiries", icon: MessageSquare, path: "/admin/enquiries" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
  { label: "SEO", icon: Search, path: "/admin/seo" },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
    isOpen ? "translate-x-0" : "-translate-x-full"
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <img src="/logo.png" alt="Retro Roots" className="h-12 my-2 object-contain" />

          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-black text-sm">
            Retro Roots Admin
          </span>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-accent text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              end={item.path === "/admin"}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon size={18} className={cn(
                "transition-transform duration-200 group-hover:scale-110",
                "group-[.active]:scale-110"
              )} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border bg-card">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
