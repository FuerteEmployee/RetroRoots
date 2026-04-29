import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import heroImg from "@/assets/hero-1.jpg";

const ViaRetroRoots = () => (
  <Layout title="Via Retro Roots" description="Discover how Retro Roots furniture is made — innovation, technology, and craftsmanship behind every product.">
    <PageHeader title="Via Retro Roots" subtitle="The technology and innovation behind our furniture" />
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Our Process</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">How Our Surfaces Are <span className="gold-text">Made</span></h2>
            <p className="text-muted-foreground mb-4">Every RetroRoots surface begins with carefully selected raw materials sourced from trusted suppliers worldwide. Our proprietary mixing formulas create the perfect blend of durability, aesthetics, and performance.</p>
            <p className="text-muted-foreground mb-4">Using state-of-the-art casting technology, we transform raw materials into seamless surfaces that resist stains, scratches, and heat. Each piece is hand-finished by skilled craftsmen who bring decades of experience.</p>
            <p className="text-muted-foreground">Our multi-point quality control ensures every product that leaves our factory meets international standards — from ISO compliance to CE marking for European markets.</p>
          </div>
          <div className="rounded-2xl overflow-hidden"><img src={heroImg} alt="Manufacturing" className="w-full h-80 object-cover" loading="lazy" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{t:"Innovation",d:"Continuous R&D investment in new materials, finishes, and production techniques.",i:"💡"},{t:"Precision",d:"Computer-controlled manufacturing ensures millimeter-perfect dimensions every time.",i:"🎯"},{t:"Sustainability",d:"Eco-friendly processes with minimal waste and responsible material sourcing.",i:"🌿"}].map(v=>(
            <div key={v.t} className="bg-card p-8 rounded-xl border border-border text-center card-hover">
              <div className="text-4xl mb-4">{v.i}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{v.t}</h3>
              <p className="text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default ViaRetroRoots;
