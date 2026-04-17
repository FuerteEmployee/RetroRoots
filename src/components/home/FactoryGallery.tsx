import factoryImg from "@/assets/factory.jpg";

const steps = [
  { step: "01", label: "Raw Material", desc: "Premium materials sourced globally" },
  { step: "02", label: "Mixing", desc: "Precision mixing with proprietary formulas" },
  { step: "03", label: "Casting", desc: "State-of-the-art casting technology" },
  { step: "04", label: "Finishing", desc: "Expert hand finishing & polishing" },
  { step: "05", label: "Quality Control", desc: "Rigorous multi-point QC checks" },
  { step: "06", label: "Dispatch", desc: "Secure packaging & global logistics" },
];

const FactoryGallery = () => (
  <section className="section-padding bg-muted">
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Our Process</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Factory Journey — <span className="gold-text">Entry to Exit</span></h2>
      </div>
      <div className="rounded-2xl overflow-hidden mb-10">
        <img src={factoryImg} alt="Flexicore Factory" className="w-full h-48 md:h-72 object-cover" loading="lazy" width={1920} height={400} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {steps.map(s => (
          <div key={s.step} className="bg-card border border-border rounded-xl p-4 text-center card-hover">
            <div className="text-2xl font-bold text-primary mb-2">{s.step}</div>
            <h4 className="font-semibold text-foreground text-sm">{s.label}</h4>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FactoryGallery;
