const brands = ["Marriott Hotels", "Hilton", "Taj Group", "Oberoi", "ITC Hotels", "Radisson", "Godrej", "L&T", "DLF", "Prestige"];
const media = ["Times of India", "Economic Times", "CNBC", "Business Standard", "India Today"];

const LogoStrip = ({ items, speed = "30s" }: { items: string[]; speed?: string }) => (
  <div className="overflow-hidden">
    <div className="flex whitespace-nowrap" style={{ animation: `marquee ${speed} linear infinite` }}>
      {[...items, ...items].map((name, i) => (
        <div key={i} className="mx-4 flex-shrink-0 px-6 py-3 bg-card border border-border rounded-lg shadow-sm">
          <span className="text-sm font-medium text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

const TrustedBy = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Our Clients</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trusted By <span className="gold-text">Industry Leaders</span></h2>
      </div>
      <LogoStrip items={brands} />
      <div className="mt-6">
        <p className="text-center text-xs text-muted-foreground mb-3 uppercase tracking-wider">As featured in</p>
        <LogoStrip items={media} speed="25s" />
      </div>
    </div>
  </section>
);

export default TrustedBy;
