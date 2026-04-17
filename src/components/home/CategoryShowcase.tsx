import { Link } from "react-router-dom";
import catKitchen from "@/assets/category-kitchen.jpg";
import catBathroom from "@/assets/category-bathroom.jpg";
import catWall from "@/assets/category-wall.jpg";
import catFloor from "@/assets/category-floor.jpg";
import catCommercial from "@/assets/category-commercial.jpg";
import catHospitality from "@/assets/category-hospitality.jpg";

const categories = [
  { name: "Kitchen Surfaces", image: catKitchen, slug: "kitchen" },
  { name: "Bathroom", image: catBathroom, slug: "bathroom" },
  { name: "Wall Tiles", image: catWall, slug: "wall-tiles" },
  { name: "Floor Tiles", image: catFloor, slug: "floor-tiles" },
  { name: "Commercial", image: catCommercial, slug: "commercial" },
  { name: "Hospitality", image: catHospitality, slug: "hospitality" },
];

const CategoryShowcase = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="sage-banner rounded-xl p-6 md:p-8 text-center text-primary-foreground mb-10">
        <p className="text-sm mb-1 opacity-80">Crafted for every space — explore our</p>
        <h2 className="text-2xl md:text-3xl font-bold">Top Product Categories</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <Link key={cat.name} to={`/products?category=${cat.slug}`} className="flex flex-col items-center gap-3 group">
            <div className="circle-category w-32 h-32 md:w-40 md:h-40">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" width={200} height={200} />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryShowcase;
