import { Eye, Play } from "lucide-react";
import { Link } from "react-router-dom";
import catKitchen from "@/assets/category-kitchen.jpg";
import catBathroom from "@/assets/category-bathroom.jpg";
import catWall from "@/assets/category-wall.jpg";
import catFloor from "@/assets/category-floor.jpg";

const products = [
  { name: "Calacatta Marble Surface", category: "Solid Surface", tag: "Bestseller", image: catKitchen },
  { name: "Nero Marquina", category: "Solid Surface", tag: "New", image: catBathroom },
  { name: "Italian Carrara Tile", category: "Tiles", tag: "Premium", image: catWall },
  { name: "Arctic White", category: "Solid Surface", tag: "", image: catFloor },
];

const ProductsSection = () => (
  <section className="section-padding bg-muted">
    <div className="container mx-auto">
      <div className="warm-banner rounded-xl p-6 md:p-8 text-center text-primary-foreground mb-10">
        <p className="text-sm mb-1 opacity-80">Explore our premium collection</p>
        <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <Link key={p.name} to="/products" className="bg-card rounded-xl overflow-hidden border border-border card-hover group">
            <div className="relative aspect-square">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
              {p.tag && <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground rounded-full">{p.tag}</span>}
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <span className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground"><Eye className="w-4 h-4" /></span>
                <span className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground"><Play className="w-4 h-4" /></span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-primary mb-1 font-medium">{p.category}</p>
              <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/products" className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
          View All Products →
        </Link>
      </div>
    </div>
  </section>
);

export default ProductsSection;
