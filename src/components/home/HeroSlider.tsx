import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg1 from "@/assets/hero-1.jpg";
import heroImg2 from "@/assets/hero-2.jpg";

const slides = [
  { image: heroImg1, heading: "Seamless Surfaces.", subheading: "Timeless Elegance", cta: "Explore Products", link: "/products" },
  { image: heroImg2, heading: "Crafted in Rajkot.", subheading: "Exported Worldwide", cta: "Get In Touch", link: "/contact" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <img src={slide.image} alt={slide.heading} className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,30,20,0.55), rgba(30,30,20,0.25))" }} />
        </div>
      ))}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground">
              {slides[current].heading}<br />
              <span className="text-primary">{slides[current].subheading}</span>
            </h1>
            <Link to={slides[current].link} className="inline-block mt-6 px-8 py-3.5 gold-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm tracking-wide">
              {slides[current].cta} →
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-primary-foreground/40"}`} />
        ))}
      </div>
      <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/30 backdrop-blur flex items-center justify-center text-primary-foreground hover:bg-card/50 transition"><ChevronLeft className="w-5 h-5" /></button>
      <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/30 backdrop-blur flex items-center justify-center text-primary-foreground hover:bg-card/50 transition"><ChevronRight className="w-5 h-5" /></button>
    </section>
  );
};

export default HeroSlider;
