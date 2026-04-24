import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thank you for reaching out! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Contact Info Side */}
          <div className="lg:w-1/3">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Contact Us</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight font-outfit">
              Reach Out <span className="text-bold">To Us</span>
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed font-outfit">
              Have a question or need help with an order? We’re here to help with your furniture journey.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-outfit">Talk To Us</h4>
                  <p className="text-sm text-muted-foreground font-outfit">+91 96624 96622</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-outfit">Email Us</h4>
                  <p className="text-sm text-muted-foreground font-outfit">info@retroroots.co.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-outfit">Visit Us</h4>
                  <p className="text-sm text-muted-foreground font-outfit">Rajkot, Gujarat - India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-muted/30 p-8 rounded-2xl border border-border shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground font-outfit">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-outfit"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground font-outfit">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-outfit"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground font-outfit">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-outfit"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground font-outfit">Subject</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-outfit"
                  >
                    <option value="">Select Inqury Type</option>
                    <option value="customization">Furniture Customization</option>
                    <option value="order">Order Status</option>
                    <option value="distributor">Distributor Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-foreground font-outfit">Tell Us More</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-outfit resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs text-muted-foreground font-medium font-outfit max-w-[280px]">
                  * We offer doorstep delivery and professional installation services across India.
                </p>
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 gold-gradient text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all hover:scale-105 transform duration-300 text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
