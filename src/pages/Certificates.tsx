import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Download } from "lucide-react";

const certs = [
  { name: "ISO 9001:2025", desc: "Quality Management System certification ensuring consistent product quality.", year: "2025" },
  { name: "ISO 14001:2015", desc: "Environmental Management System for sustainable manufacturing practices.", year: "2023" },
  { name: "CE Marking", desc: "European conformity marking for product safety and quality.", year: "2022" },
  { name: "BIS Certification", desc: "Bureau of Indian Standards certification for domestic compliance.", year: "2021" },
  { name: "Green Building Cert", desc: "Certification for eco-friendly and sustainable building materials.", year: "2024" },
  { name: "SASO", desc: "Saudi Standards certification for Middle East export compliance.", year: "2023" },
];

const Certificates = () => (
  <Layout title="Certificates" description="View RetroRoots's quality certifications — ISO 9001, CE, BIS, and more. Proof of our commitment to excellence.">
    <PageHeader title="Certificates" subtitle="Our commitment to quality, verified and certified" />
    <section className="section-padding">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map(c => (
          <div key={c.name} className="bg-card p-6 rounded-xl border border-border card-hover text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><span className="text-2xl">🏅</span></div>
            <h3 className="font-semibold text-foreground">{c.name}</h3>
            <p className="text-xs text-primary font-medium mt-1">Issued {c.year}</p>
            <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
            <button className="mt-4 text-sm text-primary font-medium flex items-center gap-1 mx-auto hover:underline"><Download className="w-3.5 h-3.5" /> Download</button>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Certificates;
