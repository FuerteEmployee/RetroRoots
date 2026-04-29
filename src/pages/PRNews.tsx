import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { ExternalLink, Calendar } from "lucide-react";

const news = [
  { title: "RetroRoots Featured in Economic Times — 'Rising Stars of Gujarat Manufacturing'", date: "Mar 2026", source: "Economic Times", type: "Press" },
  { title: "RetroRoots Expands Export Operations to 5 New African Markets", date: "Feb 2026", source: "Company News", type: "News" },
  { title: "CEO Interview: Building India's Premium Surface Brand", date: "Jan 2026", source: "Business Standard", type: "Press" },
  { title: "RetroRoots Wins Best Innovation Award at Ceramica India 2025", date: "Mar 2025", source: "Industry Award", type: "Award" },
  { title: "New Manufacturing Line Increases Production Capacity by 40%", date: "Dec 2024", source: "Company News", type: "News" },
  { title: "CNBC Coverage: Rajkot's Manufacturing Revolution", date: "Nov 2024", source: "CNBC India", type: "Press" },
];

const PRNews = () => (
  <Layout title="PR & News" description="Latest press coverage, media mentions, and company news from RetroRoots.">
    <PageHeader title="PR & News" subtitle="Media coverage, press releases, and company updates" />
    <section className="section-padding">
      <div className="container mx-auto space-y-4">
        {news.map(n=>(
          <div key={n.title} className="bg-card p-6 rounded-xl border border-border card-hover flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${n.type==="Press"?"bg-primary/10 text-primary":n.type==="Award"?"bg-sage-light text-sage":"bg-muted text-foreground"}`}>{n.type}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{n.date}</span>
              </div>
              <h3 className="font-semibold text-foreground">{n.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Source: {n.source}</p>
            </div>
            <button className="flex-shrink-0 text-sm text-primary font-medium flex items-center gap-1 hover:underline"><ExternalLink className="w-3.5 h-3.5" /> Read</button>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default PRNews;
