import Layout from "@/components/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import DailyUpdates from "@/components/home/DailyUpdates";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import InstagramGrid from "@/components/home/InstagramGrid";
import FAQSection from "@/components/home/FAQSection";
import BlogPreview from "@/components/home/BlogPreview";

// Legacy components (kept as per user request to not remove anything)
import ProductsSection from "@/components/home/ProductsSection";
import NewBanners from "@/components/home/NewBanners";
import AboutTeaser from "@/components/home/AboutTeaser";

const Index = () => (
  <Layout title="Retro Roots | Luxurious Handcrafted Furniture" description="Discover our luxurious haven collection. Premium handcrafted furniture blending vintage charm with modern comfort. Custom designs available.">
    <HeroSlider />
    <DailyUpdates />
    <CategoryShowcase />
    
    {/* Middle Sections */}
    <ProductsSection />
    <NewBanners />
    <AboutTeaser />
    
    {/* Final Flow */}
    <InstagramGrid />
    <FAQSection />
    <BlogPreview />
  </Layout>
);

export default Index;
