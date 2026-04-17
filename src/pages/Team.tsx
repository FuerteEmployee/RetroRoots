import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Linkedin } from "lucide-react";

const members = [
  { name: "Founder & CEO", role: "Visionary Leader", bio: "Over 15 years of experience in the solid surface industry. Founded Flexicore with a vision to bring world-class surfaces to every home." },
  { name: "Head of Design", role: "Creative Director", bio: "Leading the design team in creating innovative patterns and finishes that set industry trends." },
  { name: "Production Manager", role: "Operations Head", bio: "Ensures seamless manufacturing operations and adherence to the highest quality standards." },
  { name: "Export Director", role: "International Sales", bio: "Driving Flexicore's global expansion across 25+ countries with strategic partnerships." },
  { name: "Marketing Head", role: "Brand Strategy", bio: "Building the Flexicore brand through digital-first strategies and customer engagement." },
  { name: "Quality Manager", role: "QC & Compliance", bio: "Maintaining ISO standards and ensuring every product meets rigorous quality benchmarks." },
  { name: "R&D Lead", role: "Innovation", bio: "Developing new surface materials and finishes through continuous research." },
  { name: "HR Manager", role: "People & Culture", bio: "Building a talented, motivated team aligned with Flexicore's values and vision." },
];

const Team = () => (
  <Layout title="Our Team" description="Meet the talented people behind Flexicore's success — from leadership to design, production, and sales.">
    <PageHeader title="Our Team" subtitle="The people who make Flexicore exceptional" />
    <section className="section-padding">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((m, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden border border-border card-hover">
            <div className="aspect-square bg-secondary flex items-center justify-center"><span className="text-5xl font-bold text-primary/20">{m.name[0]}</span></div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm">{m.name}</h3>
              <p className="text-xs text-primary mt-0.5 font-medium">{m.role}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{m.bio}</p>
              <a href="#" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-2"><Linkedin className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Team;
