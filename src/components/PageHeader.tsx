import heroImg from "@/assets/hero-1.jpg";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="page-header">
    <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="page-header-overlay" />
    <div className="relative z-10 container mx-auto px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{title}</h1>
      {subtitle && <p className="text-white/80 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  </div>
);

export default PageHeader;
