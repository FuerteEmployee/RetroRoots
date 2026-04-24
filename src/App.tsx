import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Admin components
import AdminLayout from "@/components/admin/AdminLayout";
import LoginPage from "@/pages/admin/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProductsPage from "@/pages/admin/ProductsPage";
import CategoriesPage from "@/pages/admin/CategoriesPage";
import BlogsPage from "@/pages/admin/BlogsPage";
import DailyUpdatesPage from "@/pages/admin/DailyUpdatesPage";
import DistributorsPage from "@/pages/admin/DistributorsPage";
import TeamPage from "@/pages/admin/TeamPage";
import GalleryPage from "@/pages/admin/GalleryPage";
import CertificatesPage from "@/pages/admin/CertificatesPage";
import ExposPage from "@/pages/admin/ExposPage";
import PressPage from "@/pages/admin/PressPage";
import TrustedByPage from "@/pages/admin/TrustedByPage";
import CareersPage from "@/pages/admin/CareersPage";
import EnquiriesPage from "@/pages/admin/EnquiriesPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import SeoPage from "@/pages/admin/SeoPage";

// Public components
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import Distributor from "./pages/Distributor";
import Team from "./pages/Team";
import Certificates from "./pages/Certificates";
import ViaFlexicore from "./pages/ViaFlexicore";
import Expo from "./pages/Expo";
import Privacy from "./pages/Privacy";
import Delivery from "./pages/Delivery";
import PRNews from "./pages/PRNews";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/via-flexicore" element={<ViaFlexicore />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/distributor" element={<Distributor />} />
              <Route path="/team" element={<Team />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/expo" element={<Expo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/pr-news" element={<PRNews />} />
              <Route path="/cart" element={<Cart />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="blogs" element={<BlogsPage />} />
                <Route path="daily-updates" element={<DailyUpdatesPage />} />
                <Route path="distributors" element={<DistributorsPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="certificates" element={<CertificatesPage />} />
                <Route path="expos" element={<ExposPage />} />
                <Route path="press" element={<PressPage />} />
                <Route path="trusted-by" element={<TrustedByPage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="enquiries" element={<EnquiriesPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="seo" element={<SeoPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
