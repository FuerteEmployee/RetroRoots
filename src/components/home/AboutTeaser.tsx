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
        <div className="rounded-2xl overflow-hidden">
          <img src={factoryImg} alt="Flexicore Factory" className="w-full h-80 lg:h-[420px] object-cover" loading="lazy" width={800} height={500} />
        </div>
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">About Flexicore</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Why Choose <span className="gold-text">Flexicore</span>?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For over 15 years, Flexicore has been at the forefront of solid surface and tile manufacturing excellence. Based in Rajkot, Gujarat, we combine traditional craftsmanship with cutting-edge technology.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our commitment to quality, innovation, and customer satisfaction has made us a trusted name across 25+ countries worldwide. Every surface we create is a testament to our passion for perfection.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-primary pl-4">
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="inline-block px-6 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default AboutTeaser;
