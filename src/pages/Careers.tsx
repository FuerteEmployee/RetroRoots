import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

const jobs = [
  { title: "Product Designer", location: "Rajkot, Gujarat", type: "Full-time", dept: "Design", desc: "Design innovative solid surface patterns and product collections for domestic and international markets." },
  { title: "Export Sales Manager", location: "Rajkot, Gujarat", type: "Full-time", dept: "Sales", desc: "Drive international sales and build relationships with distributors across Middle East, Africa, and Europe." },
  { title: "Production Supervisor", location: "Factory, Rajkot", type: "Full-time", dept: "Manufacturing", desc: "Oversee daily production operations, quality control, and team management at our manufacturing facility." },
  { title: "Digital Marketing Executive", location: "Rajkot (Hybrid)", type: "Full-time", dept: "Marketing", desc: "Manage social media, SEO, content marketing, and digital campaigns for the Flexicore brand." },
  { title: "Quality Control Engineer", location: "Factory, Rajkot", type: "Full-time", dept: "QC", desc: "Ensure all products meet ISO standards through rigorous testing and inspection processes." },
];

const Careers = () => (
  <Layout title="Careers" description="Join the Flexicore team. Explore career opportunities in manufacturing, design, sales, and marketing at India's leading solid surface manufacturer.">
    <PageHeader title="Careers at Flexicore" subtitle="Build your career with India's leading surface manufacturer" />

    <section className="section-padding">
      <div className="container mx-auto">
        {/* Culture section */}
        <div className="sage-banner rounded-xl p-8 md:p-12 text-primary-foreground text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Work With Us?</h2>
          <p className="max-w-2xl mx-auto opacity-90">At Flexicore, we believe our people are our greatest asset. We offer a dynamic work environment, competitive compensation, and opportunities for growth in a fast-expanding global company.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-3xl mx-auto">
            {["Competitive Salary", "Health Insurance", "Learning Budget", "Global Exposure"].map(b => (
              <div key={b} className="bg-primary-foreground/10 rounded-lg p-3 backdrop-blur">
                <span className="text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map(j => (
            <div key={j.title} className="bg-card p-6 rounded-xl border border-border card-hover">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{j.dept}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{j.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{j.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{j.location}</p>
                  <p className="text-sm text-muted-foreground mt-2">{j.desc}</p>
                </div>
                <button className="flex-shrink-0 px-6 py-2.5 gold-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-sm flex items-center gap-1">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* General application */}
        <div className="bg-muted p-8 rounded-xl mt-10 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Don't see the right role?</h3>
          <p className="text-muted-foreground mb-4">We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.</p>
          <a href="mailto:careers@flexicore.in" className="inline-block px-6 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
            Send Your Resume →
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default Careers;
