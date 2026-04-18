import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { Check, Mail, Sofa, Utensils, Home, Briefcase, Bed, Clock } from "lucide-react";

const stats = [
  { label: "Products Sold", value: "10K+" },
  { label: "Years Service", value: "35" },
  { label: "Outlets Worldwide", value: "450" },
  { label: "Satisfied Customers", value: "1000+" },
];

const categories = [
  { name: "Dining Room", icon: Utensils },
  { name: "Living Room", icon: Sofa },
  { name: "Kitchen", icon: Home },
  { name: "Office", icon: Briefcase },
  { name: "Bed Room", icon: Bed },
  { name: "Waiting Hall", icon: Clock },
];

const About = () => (
  <Layout title="About Us" description="Discover the heritage and craftsmanship of RetroRoots. Timeless furniture for modern living.">
    <div className="bg-white text-foreground">
      <PageHeader title="About RetroRoots" subtitle="Our story of craftsmanship, innovation, and global excellence" />

      {/* Hero Content Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-black leading-tight">
                Timeless Furniture For <br /> Modern Living
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                At Retro Roots, we craft more than furniture — we create experiences. Every sofa, chair, and recliner is designed with the perfect blend of retro charm and contemporary comfort. Our artisans handcraf each piece with precision, passion, and purpose, ensuring you enjoy not just a seat — but a feeling of warmth, luxury, and belonging. From classic mid-century silhouettes to bold modern curves, our furniture adds character to every corner of your home — making comfort look effortlessly elegant.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square md:aspect-video shadow-xl border border-gray-100">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" alt="Luxury Interior" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden aspect-square shadow-xl order-2 md:order-1 border border-gray-100">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200" alt="Craftsmanship" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-xl order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-black leading-tight">
                Crafting Quality Furniture
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
                At Retro Roots, quality isn’t just a promise — it’s a tradition. Every sofa, chair, and recliner is built with care, precision, and passion. We handpick the finest materials, blend them with timeless craftsmanship, and shape them into furniture that lasts for generations. From sturdy frames to plush upholstery, every detail reflects our dedication to excellence.
              </p>
              <ul className="space-y-4">
                {[
                  "At Retro Roots, tradition meets craftsmanship.",
                  "Luxury materials with sustainable sourcing.",
                  "Artisanal finishes that define elegance."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative h-64 flex items-center overflow-hidden">
         <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2000" alt="Background" className="absolute inset-0 w-full h-full object-cover brightness-[0.1]" />
         <div className="absolute inset-0 bg-black/40" />
         <div className="container mx-auto relative z-10 px-4 text-white">
           <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`flex flex-col items-center justify-center p-8 ${i !== stats.length -1 ? "lg:border-r border-white/20" : ""}`}>
                  <span className="text-4xl font-bold mb-2 tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-300 text-center">{stat.label}</span>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* Customized Furniture Section */}
      <section className="py-24 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary text-[10px] uppercase font-bold tracking-[0.4em] mb-4">Diverse Range</p>
            <h2 className="text-4xl md:text-5xl font-serif text-black">Customized Furniture's</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
               <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <p className="text-xs text-gray-400 font-bold tracking-widest">SHOWCASE</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Our Manufacturing Experience</p>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat.name} className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center hover:shadow-md transition-all cursor-pointer group hover:border-primary/20">
                  <cat.icon className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-semibold tracking-wide text-gray-700">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-32 relative overflow-hidden text-center bg-white">
         <div className="container mx-auto relative z-10 px-4 max-w-2xl">
            <p className="text-primary text-[10px] uppercase font-bold tracking-[0.4em] mb-4">Art of Comfort</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-black">Transforming Spaces,<br />Transforming Style</h2>
            
            <form className="relative max-w-md mx-auto mb-6">
              <input 
                type="email" 
                placeholder="Enter your mail id here" 
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 px-8 pr-16 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-full hover:opacity-90 transition-all shadow-lg">
                <Mail className="w-5 h-5" />
              </button>
            </form>
            <p className="text-[10px] text-muted-foreground font-medium">
               Your email is safe with us, we dont spam. <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
            </p>
         </div>
      </section>
    </div>
  </Layout>
);

export default About;
