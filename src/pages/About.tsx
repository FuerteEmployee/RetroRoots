import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import factoryImg from "@/assets/factory.jpg";
import heroImg from "@/assets/hero-1.jpg";

const milestones = [
  { year: "2010", title: "Founded in Rajkot", desc: "Started as a small manufacturing unit with a vision to redefine surface design." },
  { year: "2013", title: "First Export Order", desc: "Shipped our first international order to the UAE market." },
  { year: "2016", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification for quality management." },
  { year: "2019", title: "Factory Expansion", desc: "Expanded manufacturing capacity with state-of-the-art machinery." },
  { year: "2022", title: "25+ Countries", desc: "Reached milestone of exporting to 25+ countries across 5 continents." },
  { year: "2026", title: "Digital Transformation", desc: "Launched new digital platform with 3D product viewer and AI-optimised catalog." },
];

const values = [
  { title: "Quality First", desc: "Every product passes rigorous multi-point quality control before dispatch.", icon: "🏆" },
  { title: "Innovation", desc: "Continuously investing in R&D to bring cutting-edge surface solutions.", icon: "💡" },
  { title: "Sustainability", desc: "Eco-friendly manufacturing processes and responsible sourcing of raw materials.", icon: "🌿" },
  { title: "Customer Focus", desc: "Dedicated support from design consultation to after-sales service.", icon: "🤝" },
];

const About = () => (
  <Layout title="About Us" description="Learn about Flexicore's journey, vision, and commitment to manufacturing premium solid surfaces and tiles in Rajkot, Gujarat.">
    <PageHeader title="About Flexicore" subtitle="Our story of craftsmanship, innovation, and global excellence" />

    {/* Brand Story */}
    <section className="section-padding">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">From Rajkot to the <span className="gold-text">World</span></h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Flexicore is a Rajkot-based solid surface and tiles manufacturer with an established brand presence across India and international markets. Founded with a passion for creating seamless, elegant surfaces, we've grown into one of India's most trusted names in the industry.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our state-of-the-art manufacturing facility combines traditional craftsmanship with cutting-edge technology, enabling us to deliver surfaces that meet the highest international standards. From raw material sourcing to final dispatch, every step is meticulously quality-controlled.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, Flexicore products grace homes, hotels, hospitals, and commercial spaces across 25+ countries — a testament to our unwavering commitment to excellence.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src={factoryImg} alt="Flexicore Manufacturing Facility" className="w-full h-80 lg:h-[400px] object-cover" loading="lazy" width={800} height={400} />
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-xl border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">🎯 Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            To be the #1 digitally visible and most trusted solid surface & tile brand in India and key export markets, setting benchmarks in design innovation, quality, and customer experience.
          </p>
        </div>
        <div className="bg-card p-8 rounded-xl border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">🚀 Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To enable distributor acquisition across pin code, area, and country levels, drive international export enquiries through AI-optimised product pages, and provide a self-managed platform that empowers our team and partners.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Why Flexicore</p>
          <h2 className="text-3xl font-bold text-foreground">Our Core <span className="gold-text">Values</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(v => (
            <div key={v.title} className="bg-card p-6 rounded-xl border border-border card-hover text-center">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h4 className="font-semibold text-foreground mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">Our <span className="gold-text">Journey</span></h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {milestones.map((m, i) => (
            <div key={m.year} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{m.year}</div>
              <div className="bg-card p-5 rounded-xl border border-border flex-1">
                <h4 className="font-semibold text-foreground">{m.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Manufacturing Process */}
    <section className="section-padding">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Manufacturing <span className="gold-text">Excellence</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our Entry-to-Exit manufacturing journey ensures every surface meets the highest quality standards — from raw material inspection to final dispatch.
        </p>
        <div className="rounded-2xl overflow-hidden">
          <img src={heroImg} alt="Manufacturing Process" className="w-full h-64 md:h-96 object-cover" loading="lazy" width={1200} height={400} />
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
