import { Link } from "react-router-dom";

const ArtOfComfort = () => {
  return (
    <section className="relative py-20 bg-foreground text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('/aboutimg.png')] bg-cover bg-center" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
          Our Brand Philosophy
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Art of <span className="gold-text">Comfort</span>
        </h2>
        <h3 className="text-xl md:text-2xl font-medium mb-10 opacity-90">
          Transforming Spaces, Transforming Style
        </h3>
        
        <div className="max-w-3xl mx-auto space-y-6 text-primary-foreground/80 leading-relaxed text-sm md:text-base">
          <p>
            At Retro Roots, we believe that furniture is not just an object but an extension of your lifestyle. Our designs seamlessly blend the nostalgic charm of vintage aesthetics with the sleek functionality of modern living. Every curves, stitch, and finish is a testament to our commitment to timeless elegance.
          </p>
          <p>
            Each piece is handcrafted by master artisans using only the finest premium materials. From sustainably sourced woods to luxury upholstery fabrics, we ensure that every sofa, chair, and table we create offers unparalleled durability and exceptional comfort. 
          </p>
          <p>
            Our mission is to help you create a sanctuary that reflects your personality. Whether you are looking for a statement piece for your living room or a cozy reading nook, Retro Roots provides bespoke craftsmanship that turns any house into a home.
          </p>
        </div>

        <div className="mt-12">
          <Link to="/about" className="inline-block px-10 py-4 gold-gradient text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all hover:scale-105 transform duration-300 text-sm tracking-widest uppercase">
            Our Story →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtOfComfort;
