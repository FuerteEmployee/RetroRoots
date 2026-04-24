import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { API_BASE_URL } from "@/contexts/AuthContext";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE_URL + "/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: "feedback",
          message: `Subject: ${form.subject}\n\n${form.message}`
        })
      });
      if (res.ok) {
        alert("Thank you for reaching out! We will get back to you soon.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Please check your connection.");
    }
  };

  return (
    <Layout title="Contact Us" description="Get in touch with Retro Roots for enquiries, partnerships, or styling advice. Premium handcrafted furniture support.">
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out for any enquiry." />
      
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
            {/* Contact Info Side */}
            <div className="lg:w-1/3">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Contact Us</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Reach Out <span className="gold-text">To Us</span>
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm">
                Have a question or need help with a custom order? We’re here to help with your luxury furniture journey.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors hover:bg-primary/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Talk To Us</h4>
                    <p className="text-sm text-muted-foreground font-medium">+91 96624 96622</p>
                    <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter mt-1">Mon-Sat: 9AM - 7PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors hover:bg-primary/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                    <p className="text-sm text-muted-foreground font-medium">info@retroroots.co.in</p>
                    <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter mt-1">Expect a reply within 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors hover:bg-primary/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Visit Us</h4>
                    <p className="text-sm text-muted-foreground font-medium underline underline-offset-4">Rajkot, Gujarat - India</p>
                    <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter mt-1">Bespoke showroom experience</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                 <a href="https://wa.me/919662496622" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline">
                    <MessageCircle className="w-5 h-5" /> Quick Chat on WhatsApp
                 </a>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium text-sm"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject</label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium text-sm appearance-none"
                      >
                        <option value="">Select Inquiry Type</option>
                        <option value="customization">Furniture Customization</option>
                        <option value="order">Order Status</option>
                        <option value="distributor">Distributor Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3 mb-10">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tell Us More</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium text-sm resize-none"
                      placeholder="How can we help you with your space?"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4 border-t border-border">
                    <p className="text-[10px] text-muted-foreground leading-relaxed max-w-[240px] italic">
                      Note: Our experts will contact you within 24 business hours to discuss your requirements.
                    </p>
                    <button
                      type="submit"
                      className="w-full md:w-auto px-12 py-5 gold-gradient text-primary-foreground font-black rounded-lg hover:opacity-90 transition-all hover:translate-x-1 active:scale-95 shadow-xl text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3"
                    >
                      Send Message <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-muted flex items-center justify-center border-y border-border grayscale hover:grayscale-0 transition-all duration-1000">
          <p className="text-muted-foreground font-bold tracking-widest uppercase">Location Map Integration</p>
      </section>
    </Layout>
  );
};

export default Contact;
