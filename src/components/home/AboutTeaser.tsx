import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import factoryImg from "@/assets/factory.jpg";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 25, suffix: "+", label: "Countries" },
  { value: 1000, suffix: "+", label: "Projects Completed" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0; const step = target / 120;
        const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <div ref={ref}><span className="text-3xl md:text-4xl font-bold text-primary">{count}{suffix}</span></div>;
};

const AboutTeaser = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src="/aboutimg.png" alt="Retro Roots Craftsmanship" className="w-full h-80 lg:h-[450px] object-cover" loading="lazy" width={800} height={500} />
        </div>
        <div>
          <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">About Retro Roots</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="font-bold">Retro Roots</span>?
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 italic">
            At Retro Roots, every sofa is more than just furniture — it’s a story of comfort, craftsmanship, and character.
          </p>

          <div className="space-y-4 mb-10">
            {[
              "Premium quality materials",
              "Handcrafted precision",
              "Custom designs & colors"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full gold-gradient flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-base font-medium text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          <Link to="/about" className="inline-block px-10 py-4 gold-gradient text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all hover:scale-105 transform duration-300 text-sm uppercase tracking-widest">
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default AboutTeaser;
