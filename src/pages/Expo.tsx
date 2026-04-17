import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const expos = [
  { name: "Ceramica India 2026", location: "Gandhinagar, Gujarat", date: "May 15-18, 2026", status: "Upcoming", booth: "Booth A12", desc: "India's largest ceramics & surfaces trade exhibition." },
  { name: "AceTech Mumbai 2026", location: "BEC Mumbai", date: "Oct 8-11, 2026", status: "Upcoming", booth: "Hall 3, C22", desc: "Architecture, construction & engineering technology expo." },
  { name: "Big 5 Dubai 2025", location: "Dubai World Trade Centre", date: "Nov 20-23, 2025", status: "Past", booth: "Hall 7, D15", desc: "Middle East's largest construction event." },
  { name: "Ceramica India 2025", location: "Gandhinagar, Gujarat", date: "Mar 10-13, 2025", status: "Past", booth: "Booth B8", desc: "Showcased our new marble finish collection." },
];

const Expo = () => (
  <Layout title="Expo & Events" description="See Flexicore at trade shows and expos worldwide. View upcoming events and past exhibition highlights.">
    <PageHeader title="Expo & Events" subtitle="Meet us at the world's leading trade exhibitions" />
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {expos.filter(e=>e.status==="Upcoming").map(e=>(
            <div key={e.name} className="bg-card p-6 rounded-xl border-2 border-primary card-hover">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Upcoming</span>
              <h3 className="text-lg font-semibold text-foreground mt-3">{e.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{e.date}</p>
              <p className="text-sm text-primary font-medium mt-1">{e.booth}</p>
              <p className="text-sm text-muted-foreground mt-2">{e.desc}</p>
              <button className="mt-4 px-5 py-2 gold-gradient text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90">Register Interest →</button>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expos.filter(e=>e.status==="Past").map(e=>(
            <div key={e.name} className="bg-card p-6 rounded-xl border border-border">
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">Past</span>
              <h3 className="text-lg font-semibold text-foreground mt-3">{e.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location} • {e.date}</p>
              <p className="text-sm text-muted-foreground mt-2">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Expo;
