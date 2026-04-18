import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Phone, ChevronDown } from "lucide-react";

import navSolidSurface from "@/assets/nav-solid-surface.jpg";
import navWallTiles from "@/assets/nav-wall-tiles.jpg";
import navFloorTiles from "@/assets/nav-floor-tiles.jpg";
import navKitchen from "@/assets/nav-kitchen.jpg";
import navBathroom from "@/assets/nav-bathroom.jpg";
import navCommercial from "@/assets/nav-commercial.jpg";
import navHospitality from "@/assets/nav-hospitality.jpg";

const categories = [
  {
    label: "Solid Surface",
    image: navSolidSurface,
    slug: "solid-surface",
    children: [
      { heading: "By Type", items: ["Acrylic Solid Surface", "Modified Acrylic", "Polyester Solid Surface", "Engineered Stone"] },
      { heading: "By Finish", items: ["Matte Finish", "Glossy Finish", "Textured Finish", "Veined Pattern"] },
      { heading: "By Color", items: ["Pure White", "Ivory & Cream", "Grey Tones", "Dark Shades", "Custom Colors"] },
    ],
  },
  {
    label: "Wall Tiles",
    image: navWallTiles,
    slug: "wall-tiles",
    children: [
      { heading: "By Size", items: ["300x600mm", "300x450mm", "200x300mm", "Large Format"] },
      { heading: "By Style", items: ["Glossy Tiles", "Matt Tiles", "Digital Tiles", "Subway Tiles", "Mosaic Tiles"] },
      { heading: "By Space", items: ["Bathroom Walls", "Kitchen Backsplash", "Living Room", "Outdoor Walls"] },
    ],
  },
  {
    label: "Floor Tiles",
    image: navFloorTiles,
    slug: "floor-tiles",
    children: [
      { heading: "By Size", items: ["600x600mm", "800x800mm", "600x1200mm", "1200x1200mm"] },
      { heading: "By Type", items: ["Vitrified Tiles", "Porcelain Tiles", "Ceramic Tiles", "Double Charge"] },
      { heading: "By Look", items: ["Marble Look", "Wood Look", "Stone Look", "Concrete Look"] },
    ],
  },
  {
    label: "Kitchen",
    image: navKitchen,
    slug: "kitchen",
    children: [
      { heading: "Countertops", items: ["Kitchen Countertops", "Island Tops", "Breakfast Bars", "Backsplash Panels"] },
      { heading: "Kitchen Tiles", items: ["Backsplash Tiles", "Floor Tiles", "Anti-Skid Tiles"] },
      { heading: "Accessories", items: ["Sinks & Basins", "Edge Profiles", "Joint Adhesives"] },
    ],
  },
  {
    label: "Bathroom",
    image: navBathroom,
    slug: "bathroom",
    children: [
      { heading: "Vanity Tops", items: ["Single Basin Vanity", "Double Basin Vanity", "Wall-Mounted Vanity"] },
      { heading: "Bathroom Tiles", items: ["Wall Tiles", "Floor Tiles", "Shower Tiles", "Anti-Skid Tiles"] },
      { heading: "Accessories", items: ["Shower Panels", "Bathtub Surrounds", "Shelving"] },
    ],
  },
  {
    label: "Commercial",
    image: navCommercial,
    slug: "commercial",
    children: [
      { heading: "Applications", items: ["Reception Desks", "Conference Tables", "Wall Cladding", "Nurse Stations"] },
      { heading: "Industries", items: ["Offices & Corporate", "Healthcare", "Retail & Showrooms", "Education"] },
    ],
  },
  {
    label: "Hospitality",
    image: navHospitality,
    slug: "hospitality",
    children: [
      { heading: "Applications", items: ["Hotel Reception", "Restaurant Tables", "Bar Counters", "Bathroom Vanities"] },
      { heading: "Industries", items: ["Hotels & Resorts", "Restaurants & Cafes", "Spas & Wellness", "Banquet Halls"] },
    ],
  },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Via Flexicore", path: "/via-flexicore" },
  { label: "Products", path: "/products" },
  { label: "Blog", path: "/blog" },
  { label: "Gallery", path: "/gallery" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHoveredCategory(null);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-foreground text-primary-foreground text-xs py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 96624 96622</span>
            <span className="hidden sm:inline">info@retroroots.co.in</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Shipping Pan India</span>
            <span className="hidden sm:inline">ISO Certified</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - sticky */}
      <nav className={`sticky top-0 z-50 bg-card transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        {/* Row 1: Logo + Search + CTA */}
        <div className={`container mx-auto flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[50px]" : "h-[60px]"} px-4 lg:px-8`}>
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Retro Roots" 
              className={`transition-all duration-300 object-contain ${scrolled ? "h-10" : "h-14"}`} 
            />
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`w-full pl-10 pr-4 bg-muted rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 ${scrolled ? "py-1.5" : "py-2.5"}`}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link to="/distributor" className={`hidden lg:inline-flex px-5 font-semibold gold-gradient text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-300 ${scrolled ? "py-1.5 text-xs" : "py-2.5 text-sm"}`}>
              Become a Distributor
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              {[
                { label: "About", path: "/about" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 font-medium transition-all duration-300 rounded-md ${
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-primary"
                  } ${scrolled ? "py-1 text-[11px]" : "py-2 text-xs"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button className="lg:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Row 2: Category bar with circular images - desktop only */}
        <div className={`hidden lg:block border-t border-border bg-card transition-all duration-300 ${scrolled ? "py-1.5" : "py-3"}`}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`flex items-center justify-center gap-2 xl:gap-4 transition-all duration-300`}>
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => setHoveredCategory(cat.label)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className={`flex flex-col items-center px-2 group transition-all duration-300 ${scrolled ? "gap-0" : "gap-1.5"}`}
                  >
                    <div className={`rounded-full overflow-hidden transition-all duration-500 ease-in-out ${
                      scrolled 
                        ? "w-0 h-0 opacity-0 mb-0 scale-0 border-0" 
                        : "w-16 h-16 xl:w-[72px] xl:h-[72px] mb-1.5 opacity-100 scale-100 border-2"
                    } ${
                      hoveredCategory === cat.label
                        ? "border-primary"
                        : "border-border group-hover:border-primary/60"
                    }`}>
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={72}
                        height={72}
                      />
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight transition-all duration-300 ${
                      scrolled ? "text-[11px] uppercase tracking-wider" : "text-xs"
                    } ${
                      hoveredCategory === cat.label ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}>
                      {cat.label}
                    </span>
                    {/* Active underline */}
                    <div className={`h-[2px] w-full rounded-full transition-all duration-300 ${
                      hoveredCategory === cat.label ? "bg-primary" : "bg-transparent"
                    }`} />
                  </Link>
                </div>
              ))}
              {/* Extra nav links */}
              <div className={`border-l border-border transition-all duration-300 ${scrolled ? "pl-2 ml-1" : "pl-4 ml-2"} flex items-center gap-1`}>
                <Link to="/certificates" className={`px-2 py-1 font-medium text-muted-foreground hover:text-primary transition-all duration-300 ${scrolled ? "text-[10px]" : "text-xs"}`}>Certificates</Link>
                <Link to="/expo" className={`px-2 py-1 font-medium text-muted-foreground hover:text-primary transition-all duration-300 ${scrolled ? "text-[10px]" : "text-xs"}`}>Expo</Link>
                <Link to="/gallery" className={`px-2 py-1 font-medium text-muted-foreground hover:text-primary transition-all duration-300 ${scrolled ? "text-[10px]" : "text-xs"}`}>Gallery</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu dropdown - desktop */}
        {hoveredCategory && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-card border-t border-border shadow-xl z-50"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="container mx-auto px-8 py-6">
              {categories
                .filter((c) => c.label === hoveredCategory)
                .map((cat) => (
                  <div key={cat.label} className="flex gap-12">
                    {cat.children.map((group) => (
                      <div key={group.heading}>
                        <h4 className="text-sm font-bold text-foreground mb-3">{group.heading}</h4>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Link
                                to={`/products?category=${cat.slug}&type=${item.toLowerCase().replace(/ /g, "-")}`}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg text-sm border border-border" />
              </div>
              {/* Category grid - mobile */}
              <div className="grid grid-cols-4 gap-3 mb-4 pb-4 border-b border-border">
                {categories.map((cat) => (
                  <Link key={cat.label} to={`/products?category=${cat.slug}`} className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border">
                      <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" loading="lazy" width={56} height={56} />
                    </div>
                    <span className="text-[10px] font-medium text-center text-foreground leading-tight">{cat.label}</span>
                  </Link>
                ))}
              </div>
              {navLinks.map((link) => (
                <Link key={link.label} to={link.path} className={`block px-4 py-3 text-sm font-medium rounded-md ${location.pathname === link.path ? "text-primary bg-muted" : "text-foreground hover:text-primary"}`}>
                  {link.label}
                </Link>
              ))}
              <Link to="/distributor" className="block mx-4 mt-3 px-4 py-3 text-sm font-semibold gold-gradient text-primary-foreground rounded-lg text-center">
                Become a Distributor
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
