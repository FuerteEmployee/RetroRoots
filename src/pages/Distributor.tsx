import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = ["Exclusive territory rights", "Marketing & branding support", "Training & technical assistance", "Competitive margins", "Priority stock allocation", "Dedicated relationship manager"];

const Distributor = () => (
  <Layout title="Become a Distributor" description="Partner with Flexicore as an authorized distributor. Apply now for exclusive territory rights and comprehensive support.">
    <PageHeader title="Become a Distributor" subtitle="Partner with India's leading solid surface manufacturer" />
    <section className="section-padding">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Why Partner With <span className="gold-text">Flexicore</span>?</h2>
          <p className="text-muted-foreground mb-6">Join our growing network of distributors across India and international markets. We provide comprehensive support to help you succeed.</p>
          <div className="space-y-3 mb-8">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm">{b}</span></div>
            ))}
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h4 className="font-semibold text-foreground mb-2">Eligibility</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum 3 years experience in building materials</li>
              <li>• Showroom / warehouse facility in target area</li>
              <li>• Strong local market knowledge & dealer network</li>
              <li>• Financial capability for initial stock investment</li>
            </ul>
          </div>
        </div>
        <div className="bg-card p-8 rounded-xl border border-border">
          <h3 className="text-xl font-bold text-foreground mb-6">Application Form</h3>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {[{l:"Full Name",t:"text",p:"Your full name"},{l:"Company Name",t:"text",p:"Your company"},{l:"Email",t:"email",p:"email@company.com"},{l:"Phone",t:"tel",p:"+91 XXXXX XXXXX"},{l:"City / Area",t:"text",p:"Your city & area"},{l:"Pin Code",t:"text",p:"Pin code"}].map(f => (
              <div key={f.l}><label className="block text-sm font-medium text-foreground mb-1">{f.l} *</label><input type={f.t} placeholder={f.p} className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" required /></div>
            ))}
            <div><label className="block text-sm font-medium text-foreground mb-1">Years of Experience</label>
              <select className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm"><option>1-3 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option></select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Message</label><textarea rows={3} className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm resize-none" placeholder="Tell us about your business..." /></div>
            <button type="submit" className="w-full py-3 gold-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2">Submit Application <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    </section>
  </Layout>
);

export default Distributor;
