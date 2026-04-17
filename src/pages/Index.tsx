import Layout from "@/components/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import DailyUpdates from "@/components/home/DailyUpdates";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductsSection from "@/components/home/ProductsSection";
import AboutTeaser from "@/components/home/AboutTeaser";
import TeamSection from "@/components/home/TeamSection";
import ExportSection from "@/components/home/ExportSection";
import FactoryGallery from "@/components/home/FactoryGallery";
import TrustedBy from "@/components/home/TrustedBy";
import InstagramGrid from "@/components/home/InstagramGrid";
import BlogPreview from "@/components/home/BlogPreview";

const Index = () => (
  <Layout title="Premium Solid Surface & Tiles Manufacturer | Rajkot" description="Flexicore is India's leading solid surface and tiles manufacturer. Premium surfaces, exported to 25+ countries. Seamless surfaces, timeless elegance.">
    <HeroSlider />
    <DailyUpdates />
    <CategoryShowcase />
    <ProductsSection />
    <AboutTeaser />
    <TeamSection />
    <ExportSection />
    <FactoryGallery />
    <TrustedBy />
    <InstagramGrid />
    <BlogPreview />
  </Layout>
);

export default Index;
