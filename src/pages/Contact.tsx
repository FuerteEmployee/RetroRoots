import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => (
  <Layout title="Contact Us" description="Get in touch with Flexicore for enquiries, partnerships, or support. Located in Rajkot, Gujarat, India.">
    <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out for any enquiry." />
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input type="email" className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <select className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>General Enquiry</option>
                  <option>Product Enquiry</option>
                  <option>Export Enquiry</option>
                  <option>Distributor Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                <textarea rows={4} className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Your message..." required />
              </div>
              <button type="submit" className="w-full py-3 gold-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">Send Message →</button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">Whether you're looking for product information, partnership opportunities, or just want to say hello — we're here to help.</p>
            </div>
            {[
              { icon: MapPin, title: "Visit Us", lines: ["Plot No. 123, Industrial Area", "Rajkot, Gujarat 360002", "India"] },
              { icon: Phone, title: "Call Us", lines: ["+91 96624 96622", "+91 281 XXX XXXX"] },
              { icon: Mail, title: "Email Us", lines: ["flexicore@yahoo.com", "exports@flexicore.in"] },
              { icon: Clock, title: "Working Hours", lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"] },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-5 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  {item.lines.map((l, i) => <p key={i} className="text-sm text-muted-foreground">{l}</p>)}
                </div>
              </div>
            ))}

            <a href="https://wa.me/919662496622" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-sage text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-border h-64 bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Google Maps will be embedded here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
