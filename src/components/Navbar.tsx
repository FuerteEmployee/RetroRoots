import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, Search, Phone, ChevronDown,
  Heart, ShoppingBasket, MoreHorizontal,
  Truck, Calendar, MapPin, AppWindow,
  Package, HelpCircle, User, ShoppingBag
} from "lucide-react";

import catSofa from "@/assets/category-sofa.jpg";
import catDiningChair from "@/assets/category-dining-chair.png";
import catLounger from "@/assets/category-lounger.png";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";

const categories = [
  {
    label: "Sofa",
    image: catSofa,
    slug: "sofa",
    children: [
      { heading: "By Seating", items: ["1 Seater", "2 Seater", "3 Seater", "L-Shape Sofa", "Sofa cum Bed"] },
      { heading: "By Material", items: ["Fabric Sofa", "Leatherette Sofa", "Velvet Sofa", "Bovine Leather"] },
      { heading: "By Style", items: ["Modern", "Chesterfield", "Sectional", "Tufted", "Minimalist"] },
    ],
  },
  {
    label: "Dining Chair",
    image: catDiningChair,
    slug: "dining-chair",
    children: [
      { heading: "By Design", items: ["Modern", "Traditional", "Scandinavian", "Industrial", "Rustic"] },
      { heading: "By Material", items: ["Solid Wood", "Metal Frame", "Upholstered", "Plastic/Molded"] },
      { heading: "By Type", items: ["Armchairs", "Side Chairs", "Parsons Chairs", "Ladder Back"] },
    ],
  },
  {
    label: "Lounger (Diwaan)",
    image: catLounger,
    slug: "lounger",
    children: [
      { heading: "By Type", items: ["Single Lounger", "Double Lounger", "Daybed", "Traditional Diwaan"] },
      { heading: "By Style", items: ["Contemporary", "Traditional", "Royal Ivory", "Classic Teak"] },
    ],
  },
  {
    label: "Lounge Chair",
    image: catLoungeChair,
    slug: "lounge-chair",
    children: [
      { heading: "By Function", items: ["Reading Chair", "Accent Chair", "Bedroom Chair", "Fireside Chair"] },
      { heading: "By Style", items: ["Wingback", "Club Chair", "Barrel Chair", "Slipper Chair"] },
    ],
  },
  {
    label: "Recliners",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "recliners",
    children: [
      { heading: "By Mechanism", items: ["Manual Recliner", "Power Recliner", "Motorized Recliner", "Push-back"] },
      { heading: "By Features", items: ["Rocking Recliner", "Swivel Recliner", "Massaging Recliner", "Lift Chair"] },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   const onScroll = () => setScrolled(window.scrollY > 40);
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);
  useEffect(() => {
    let lastScrollY = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // 👇 sirf tab update kare jab value actually change ho
      if (currentScrollY > 5 && !scrolled) {
        setScrolled(true);
      } else if (currentScrollY <= 5 && scrolled) {
        setScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  useEffect(() => {
    setMobileOpen(false);
    setHoveredCategory(null);
    setShowMoreMenu(false);
  }, [location]);

  return (
    <>
      {/* Auth Modal (Sign up or Sign in) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
            <div className="p-8 pt-12 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Sign up or Sign in</h2>
              <p className="text-gray-500 text-sm md:text-base mb-10 leading-relaxed font-normal">
                Enjoy the convenience of a single account across all participating brands
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 ml-1">Mobile Number</label>
                  <div className="flex border border-slate-200 rounded-xl focus-within:border-primary transition-all overflow-hidden group">
                    <span className="px-5 py-4 bg-gray-50 border-r border-slate-200 text-gray-600 font-semibold">+91</span>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="flex-1 px-5 py-4 outline-none text-gray-900 font-normal placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-normal leading-relaxed">
                  By creating your account you agree to our <span className="text-primary font-semibold cursor-pointer hover:underline">Terms and Conditions</span>
                </p>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button className="w-full md:w-auto px-12 py-4 gold-gradient text-primary-foreground font-bold rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar - Black Strip */}
      <div className="bg-black text-white text-[10px] sm:text-xs py-2 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-4 md:gap-8">
            <span className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 cursor-pointer">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" /> Free Shipping
            </span>
            <span className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 cursor-pointer">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> EMI Options
            </span>
          </div>
          <div className="flex items-center gap-5 sm:gap-6">
            <span className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 cursor-pointer">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> Delivering To
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 cursor-pointer border-l border-white/20 pl-5">
              Download Our Apps
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 cursor-pointer border-l border-white/20 pl-5">
              Track Furniture Order
            </span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 cursor-pointer border-l border-white/20 pl-5 uppercase font-bold tracking-wider">
              Help
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar - sticky */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        {/* Main Row: Logo + Search + Sign In + Favorites + Basket + More */}
        <div className={`container mx-auto flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[50px]" : "h-[75px]"} px-4 lg:px-8`}>
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="Retro Roots"
              className={`transition-all duration-300 object-contain ${scrolled ? "h-10" : "h-16"}`}
            />
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`w-full pl-12 pr-4 bg-gray-50 rounded text-sm border border-transparent focus:bg-white focus:border-primary transition-all duration-300 ${scrolled ? "py-1.5" : "py-3"}`}
              />
            </div>
          </div>

          {/* Action Buttons: Sign In, Favorite, Basket, More */}
          <div className="flex items-center gap-1 sm:gap-6">
            {/* Login Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className={`hidden lg:flex items-center justify-center px-6 whitespace-nowrap gold-gradient text-primary-foreground font-bold uppercase tracking-widest rounded transition-all shadow hover:opacity-90 active:scale-95 ${scrolled ? "py-2 text-[9px]" : "py-3.5 text-[11px]"}`}
            >
              Sign Up / Sign In
            </button>

            {/* Favorite - Triggers Auth */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex flex-col items-center gap-1 group transition-all duration-300 outline-none"
            >
              <Heart className={`text-muted-foreground group-hover:text-red-500 transition-colors ${scrolled ? "w-4 h-4" : "w-6 h-6"}`} />
              <span className={`font-bold transition-all duration-300 ${scrolled ? "hidden" : "text-[10px]"} uppercase text-muted-foreground group-hover:text-foreground tracking-tighter`}>Favorite</span>
            </button>

            {/* Basket - Link to new page */}
            <Link
              to="/cart"
              className="flex flex-col items-center gap-1 group transition-all duration-300 outline-none"
            >
              <ShoppingBasket className={`text-muted-foreground group-:text-primary transition-colors ${scrolled ? "w-4 h-4" : "w-6 h-6"}`} />
              <span className={`font-bold transition-all duration-300 ${scrolled ? "hidden" : "text-[10px]"} uppercase text-muted-foreground group-hover:text-foreground tracking-tighter`}>Basket</span>
            </Link>

            {/* More - Hover to show categories */}
            <div
              className="relative group cursor-pointer flex flex-col items-center gap-1"
              onMouseEnter={() => setShowMoreMenu(true)}
              onMouseLeave={() => setShowMoreMenu(null)}
            >
              <MoreHorizontal className={`text-muted-foreground group-:text-primary transition-all ${scrolled ? "w-4 h-4" : "w-6 h-6"}`} />
              <span className={`font-bold transition-all duration-300 ${scrolled ? "hidden" : "text-[10px]"} uppercase text-muted-foreground group-hover:text-foreground tracking-tighter`}>More</span>

              {/* More Menu Popover */}
              {showMoreMenu && (
                <div className="absolute top-[100%] right-0 pt-4 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[280px]">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-50">All Categories</h4>
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.label}
                          to={`/products?category=${cat.slug}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group/item"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 group-/item:border-primary">
                            <img src={cat.image} className="w-full h-full object-cover" alt="" />
                          </div>
                          <span className="text-sm font-bold text-gray-700 group-hover/item:text-gray-900">{cat.label}</span>
                        </Link>
                      ))}
                      <div className="pt-4 border-t border-gray-50 mt-2">
                        <Link to="/products" className="text-xs font-bold text-primary uppercase tracking-widest hover:pl-2 transition-all block">View All Collections</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="lg:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Row 2: Category bar with circular images - desktop only */}
        <div className={`hidden lg:block border-t border-border bg-white transition-all duration-300 ${scrolled ? "py-1.5" : "py-3"}`}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`flex items-center justify-center gap-2 xl:gap-8 transition-all duration-300`}>

              {/* SALE ITEM */}
              <div className="relative group">
                <Link to="/products?on_sale=true" className={`flex flex-col items-center ${scrolled ? "gap-0 px-2" : "gap-1.5"}`}>
                  <div className={`rounded-full overflow-hidden transition-all duration-500 ease-in-out border-2 border-red-500 flex items-center justify-center bg-red-600 text-white text-center p-1 ${scrolled ? "w-0 h-0 opacity-0 mb-0 scale-0 border-0" : "w-16 h-16 xl:w-[72px] xl:h-[72px] mb-1.5 opacity-100 scale-100 shadow-lg shadow-red-200"
                    }`}>
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] uppercase font-bold leading-tight">Clearance</span>
                      <span className="text-[14px] font-black leading-none italic uppercase">Sale</span>
                      <span className="text-[8px] font-bold leading-none">40-80%</span>
                    </div>
                  </div>
                  <span className={`font-bold transition-all duration-300 ${scrolled ? "text-[11px] text-red-600 uppercase tracking-widest" : "text-[11px] uppercase text-red-600 tracking-tighter"}`}>
                    Sale
                  </span>
                </Link>
              </div>

              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => setHoveredCategory(cat.label)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className={`flex flex-col items-center group transition-all duration-300 ${scrolled ? "gap-0 px-2" : "gap-1.5"}`}
                  >
                    <div className={`rounded-full overflow-hidden transition-all duration-500 ease-in-out border-2 ${scrolled
                      ? "w-0 h-0 opacity-0 mb-0 scale-0 border-0"
                      : "w-16 h-16 xl:w-[72px] xl:h-[72px] mb-1.5 opacity-100 scale-100 border-border group-hover:border-primary/60"
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
                    <span className={`font-bold text-center leading-tight transition-all duration-300 ${scrolled ? "text-[11px] uppercase tracking-widest" : "text-[11px] uppercase tracking-tighter"
                      } ${hoveredCategory === cat.label ? "text-black" : "text-foreground group-hover:text-black"
                      }`}>
                      {cat.label}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mega menu dropdown - desktop */}
        {hoveredCategory && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-white border-t border-border shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="container mx-auto px-8 py-10">
              {categories
                .filter((c) => c.label === hoveredCategory)
                .map((cat) => (
                  <div key={cat.label} className="grid grid-cols-4 gap-12">
                    {cat.children.map((group) => (
                      <div key={group.heading}>
                        <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">{group.heading}</h4>
                        <ul className="space-y-3">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Link
                                to={`/products?category=${cat.slug}&type=${item.toLowerCase().replace(/ /g, "-")}`}
                                className="text-sm text-muted-foreground hover:text-black hover:pl-2 transition-all block"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg h-48 border border-gray-100">
                      <img src={cat.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Promo" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border shadow-lg max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
                <Link to="/products?on_sale=true" className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-16 rounded-full flex items-end justify-center bg-red-600 text-white border-2 border-red-500 shadow-md">
                    <span className="text-[10px] font-black italic uppercase">Sale</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 uppercase">Sale</span>
                </Link>
                {categories.map((cat) => (
                  <Link key={cat.label} to={`/products?category=${cat.slug}`} className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border shadow-sm">
                      <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" loading="lazy" width={64} height={64} />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-foreground leading-tight tracking-tighter">{cat.label}</span>
                  </Link>
                ))}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-4 mb-4 gold-gradient text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl text-center justify-center"
                >
                  <User className="w-4 h-4" /> Sign Up / Sign In
                </button>
                {[
                  { label: "Favorite", action: () => setAuthModalOpen(true), icon: Heart },
                  { label: "Basket", action: () => (window.location.href = "/cart"), icon: ShoppingBasket },
                  { label: "More", action: () => setShowMoreMenu(!showMoreMenu), icon: MoreHorizontal },
                ].map(item => (
                  <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-muted rounded-lg text-left">
                    <item.icon className="w-5 h-5 text-muted-foreground" /> {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
