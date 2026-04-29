import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const countries = [
  "🇺🇸 USA", "🇬🇧 UK", "🇦🇪 UAE", "🇸🇦 Saudi Arabia", "🇩🇪 Germany",
  "🇫🇷 France", "🇦🇺 Australia", "🇨🇦 Canada", "🇸🇬 Singapore", "🇶🇦 Qatar",
  "🇴🇲 Oman", "🇰🇼 Kuwait", "🇧🇭 Bahrain", "🇰🇪 Kenya", "🇳🇬 Nigeria",
];

const ExportSection = () => (
  <section className="section-padding">
    <div className="container mx-auto text-center">
      <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Global <span className="gold-text">Exports</span></h2>
      <p className="text-muted-foreground mt-3 mb-8 max-w-xl mx-auto">RetroRoots surfaces grace projects in 25+ countries across 5 continents</p>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {countries.map(c => (
          <span key={c} className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:border-primary hover:bg-primary/5 transition-colors cursor-default">{c}</span>
        ))}
      </div>
      <Link to="/contact" className="inline-block mt-8 px-8 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">Export Enquiry →</Link>
    </div>
  </section>
);

export default ExportSection;
