import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBar from "@/assets/hero-bar.jpg";
import heroChair from "@/assets/hero-chair.jpg";
import heroSofa from "@/assets/hero-sofa.jpg";

const slides = [
  { 
    image: heroBar, 
    tagline: "Hero Section",
    heading: "Where Classic Design Meets Modern Living.", 
    description: "Every sofa we craft is a story of comfort, craftsmanship, and character. Inspired by the timeless aesthetics of retro décor, we bring back the elegance of the past with the functionality and luxury of today.", 
    cta: "Shop Now", 
    link: "/products" 
  },
  { 
    image: heroChair, 
    tagline: "Smart Solution",
    heading: "Enjoy With Style & Comfort", 
    description: "Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Aliquam ut porttitor leo a diam sollicitudin. Nam at lectus urna duis convallis. At urna condimentum pretium lectus pretium lectus quam mattis pellentesque id nibh tortor id.", 
    cta: "Explore More", 
    link: "/products" 
  },
  { 
    image: heroSofa, 
    tagline: "Create Memories",
    heading: "Embrace The Beauty Of Furniture's", 
    description: "Ut placerat orci nulla pellentesque posuere lorem ipsum dolor. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Faucibus turpis in eu mi pellentesque posuere bibendum neque egestas. Maecenas accumsan lacus vel facilisis volutpat.", 
    cta: "Our Collection", 
    link: "/products" 
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000); return () => clearInterval(t); }, []);

  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <img src={slide.image} alt={slide.heading} className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,30,20,0.65), rgba(30,30,20,0.35))" }} />
        </div>
      ))}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            {slides[current].tagline && (
              <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
                {slides[current].tagline}
              </span>
            )}
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-4">
              {slides[current].heading}
            </h1>
            <p className="text-primary-foreground/90 text-sm md:text-lg mb-8 leading-relaxed max-w-xl">
              {slides[current].description}
            </p>
            <Link to={slides[current].link} className="inline-block px-10 py-4 gold-gradient text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all hover:scale-105 transform duration-300 text-sm tracking-widest uppercase">
              {slides[current].cta} →
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-12" : "bg-primary-foreground/30 hover:bg-primary-foreground/50"}`} />
        ))}
      </div>
      <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"><ChevronLeft className="w-6 h-6" /></button>
      <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"><ChevronRight className="w-6 h-6" /></button>
    </section>
  );
};

export default HeroSlider;
