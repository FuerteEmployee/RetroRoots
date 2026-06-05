import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { API_BASE_URL } from "@/contexts/AuthContext";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", mobileNumber: "", mailId: "", additionalInfo: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(API_BASE_URL + "/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.mailId,
          phone: form.mobileNumber,
          type: "contact",
          message: form.additionalInfo
        })
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", mobileNumber: "", mailId: "", additionalInfo: "" });
      } else {
        setStatus("error");
        setErrorMsg("Failed to submit. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
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
                Reach Us
              </h2>
              {/* <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm">
                Have a question or need help with a custom order? We’re here to help with your luxury furniture journey.
              </p> */}

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-/5 flex items-center justify-center text- shrink-0 transition-colors hover:bg-primary/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Talk To Us</h4>
                    <p className="text-sm text-muted-foreground font-medium">+91 96624 96622</p>
                    {/* <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter mt-1">Mon-Sat: 9AM - 7PM</p> */}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text- shrink-0 transition-colors hover:bg-primary/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                    <p className="text-sm text-muted-foreground font-medium">info@retroroots.co.in</p>
                    {/* <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter mt-1">Expect a reply within 24h</p> */}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text- shrink-0 transition-colors hover:bg-primary/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Visit Us</h4>
                    <p className="text-sm text-muted-foreground font-medium  ">Star Interior Zone Lane, Opp. Speedwell party plot gate,
                      Suvarnabhoomi Chowk, Rajkot 360005</p>
                    {/* <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter mt-1">Bespoke showroom experience</p> */}
                  </div>
                </div>
              </div>


            </div>

            {/* Form Side */}
            <div className="lg:w-2/3">
              <div className="mb-8 p-1">
                {/* <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Drop Us A Line</h3> */}
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Drop Us A Line</h2>
                <p className="text-sm text-bold leading-relaxed">Round-the-clock Service</p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your satisfaction is our priority, and we're always just a message away. Connect with us today and experience truly round-the-clock support.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl opacity-50"></div>

                <div className="relative z-10">
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                          Thank you for reaching out. Our team will get back to you within 24 hours.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="text-xs font-bold uppercase tracking-widest text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile Number</label>
                          <input
                            type="tel"
                            required
                            value={form.mobileNumber}
                            onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                            placeholder="+91 00000 00000"
                          />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mail ID</label>
                          <input
                            type="email"
                            required
                            value={form.mailId}
                            onChange={(e) => setForm({ ...form, mailId: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 mb-10">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Additional Information</label>
                        <textarea
                          rows={4}
                          required
                          value={form.additionalInfo}
                          onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm resize-none"
                          placeholder="How can we help you with your space?"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
                      )}

                      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4 border-t border-border">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full md:w-auto px-12 py-5 gold-gradient text-primary-foreground font-black rounded-lg hover:opacity-90 transition-all hover:translate-x-1 active:scale-95 shadow-xl text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === "loading" ? "Sending..." : <> Submit Query <Send className="w-4 h-4" /> </>}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full border-y border-border relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps?cid=1528143666941413617&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&source=embed&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Retro Roots Showroom Location"
          className="grayscale hover:grayscale-0 transition-all duration-1000 w-full h-full"
        />
      </section>
    </Layout>
  );
};

export default Contact;
