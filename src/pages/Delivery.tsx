import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const Delivery = () => (
  <Layout title="Delivery Information" description="Flexicore delivery zones, timelines, and logistics information for domestic and international orders.">
    <PageHeader title="Delivery Information" subtitle="Fast, safe delivery across India and worldwide" />
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {icon:Truck,t:"Pan India Delivery",d:"Free shipping on orders across India with trusted logistics partners."},
            {icon:Clock,t:"7-15 Business Days",d:"Standard delivery within 7-15 business days depending on location."},
            {icon:MapPin,t:"International Shipping",d:"Export delivery to 25+ countries via sea and air freight."},
            {icon:Package,t:"Secure Packaging",d:"Multi-layer protective packaging to ensure damage-free delivery."},
          ].map(({icon:Icon,...item})=>(
            <div key={item.t} className="bg-card p-6 rounded-xl border border-border text-center card-hover">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-semibold text-foreground mb-2">{item.t}</h3>
              <p className="text-sm text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-muted p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Delivery Zones & Timelines</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Zone</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Coverage</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Timeline</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Shipping</th>
              </tr></thead>
              <tbody>
                {[
                  {z:"Gujarat",c:"All cities & towns",t:"3-5 days",s:"Free"},
                  {z:"Western India",c:"Maharashtra, Rajasthan, MP",t:"5-7 days",s:"Free"},
                  {z:"Rest of India",c:"All states",t:"7-15 days",s:"Free"},
                  {z:"Middle East",c:"UAE, Saudi, Qatar, Oman, Kuwait",t:"15-25 days",s:"Calculated"},
                  {z:"International",c:"Europe, Americas, Africa, Asia",t:"20-45 days",s:"Calculated"},
                ].map(r=>(
                  <tr key={r.z} className="border-b border-border/50"><td className="py-3 px-4 text-foreground font-medium">{r.z}</td><td className="py-3 px-4 text-muted-foreground">{r.c}</td><td className="py-3 px-4 text-muted-foreground">{r.t}</td><td className="py-3 px-4 text-primary font-medium">{r.s}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Delivery;
