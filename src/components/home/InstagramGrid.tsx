import { Instagram } from "lucide-react";
import catKitchen from "@/assets/category-kitchen.jpg";
import catBathroom from "@/assets/category-bathroom.jpg";
import catWall from "@/assets/category-wall.jpg";
import catFloor from "@/assets/category-floor.jpg";
import catCommercial from "@/assets/category-commercial.jpg";
import catHospitality from "@/assets/category-hospitality.jpg";

const posts = [
  { id: 0, image: catKitchen }, { id: 1, image: catBathroom }, { id: 2, image: catWall },
  { id: 3, image: catFloor }, { id: 4, image: catCommercial }, { id: 5, image: catHospitality },
];

const InstagramGrid = () => (
  <section className="section-padding bg-muted">
    <div className="container mx-auto">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Instagram className="w-6 h-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Follow Us on <span className="font-bold">Instagram</span></h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {posts.map(p => (
          <a key={p.id} href="https://www.instagram.com/flexicore.in/" target="_blank" rel="noopener noreferrer" className="group relative aspect-square rounded-lg overflow-hidden">
            <img src={p.image} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={300} height={300} />
            <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="w-7 h-7 text-primary-foreground" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default InstagramGrid;
