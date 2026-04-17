import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  { name: "Founder & CEO", role: "Visionary Leader", quote: "Building surfaces that inspire spaces worldwide." },
  { name: "Head of Design", role: "Creative Director" },
  { name: "Production Manager", role: "Operations Head" },
  { name: "Export Director", role: "International Sales" },
];

const TeamSection = () => (
  <section className="section-padding bg-muted">
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Our People</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet Our <span className="gold-text">Leadership</span></h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {team.map((m, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden border border-border card-hover">
            <div className="aspect-square bg-secondary flex items-center justify-center">
              <span className="text-5xl font-bold text-primary/20">{m.name[0]}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm">{m.name}</h3>
              <p className="text-xs text-primary mt-0.5">{m.role}</p>
              {m.quote && <p className="text-xs text-muted-foreground mt-2 italic">"{m.quote}"</p>}
              <a href="#" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-2 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/team" className="text-sm text-primary font-medium hover:underline">View Full Team →</Link>
      </div>
    </div>
  </section>
);

export default TeamSection;
