import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import catSofa from "@/assets/category-sofa.jpg";
import catDiningChair from "@/assets/category-dining-chair.png";
import catLounger from "@/assets/category-lounger.png";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";
import heroBar from "@/assets/hero-bar.jpg";
import showcase from "@/assets/products-showcase.jpg";

const categories = [
  { name: "Sofa", image: catSofa },
  { name: "Dining Chair", image: catDiningChair },
  { name: "Lounger (Diwaan)", image: catLounger },
  { name: "Lounger Chair", image: catLoungeChair },
  { name: "Recliners", image: heroBar },
];

const NewBanners = () => {
  return (
    <div className="bg-white">
      {/* 1. Top Categories Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] mb-10">
            <div className="relative z-10">
              <p className="text-white/80 text-xs md:text-sm mb-2 uppercase tracking-widest font-medium">Thoughtful touches for every corner—explore our</p>
              <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight">Top Furniture Categories</h2>
            </div>
          </div>

          <div className="relative group">
            <div className="flex overflow-x-auto pb-3 gap-4 no-scrollbar snap-x">
              {categories.map((cat) => (
                <div key={cat.name} className="flex-shrink-0 w-40 snap-start">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-2 shadow-sm hover:shadow-md transition-shadow">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <h3 className="text-center font-bold text-gray-800 text-xs tracking-wide">{cat.name}</h3>
                </div>
              ))}
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-20 hidden md:block group-hover:block transition-all hover:scale-110">
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. 2x2 grid promotions */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#D4B785] p-6 md:p-10 text-center rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white font-bold text-5xl break-all">SALE SALE SALE</div>
              <div className="relative z-10">
                <h3 className="text-white text-lg md:text-xl font-bold mb-3">Furniture clearance</h3>
                <p className="text-white text-3xl md:text-5xl font-black mb-6">40% - 80% off</p>
                <Link to="/products" className="inline-block bg-white text-[#D4B785] px-10 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-lg text-xs">Shop Now</Link>
              </div>
            </div>
            <div className="bg-[#8E9F8A] p-6 md:p-10 text-center rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white font-bold text-5xl break-all">SALE SALE SALE</div>
              <div className="relative z-10">
                <h3 className="text-white text-lg md:text-xl font-bold mb-3">Up to 70% off</h3>
                <p className="text-white text-3xl md:text-5xl font-black mb-6 leading-tight">on Home & Decor</p>
                <Link to="/products" className="inline-block bg-white text-[#8E9F8A] px-10 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-lg text-xs">Shop Now</Link>
              </div>
            </div>
            <div className="bg-[#8E9F8A] p-6 md:p-10 text-center rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white font-bold text-5xl break-all">SALE SALE SALE</div>
              <div className="relative z-10">
                <h3 className="text-white text-lg md:text-xl font-bold mb-3">Everything under</h3>
                <p className="text-white text-4xl md:text-6xl font-black mb-6 tracking-tighter">₹499</p>
                <Link to="/products" className="inline-block bg-white text-[#8E9F8A] px-10 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-lg text-xs">Shop Now</Link>
              </div>
            </div>
            <div className="bg-[#D4B785] p-6 md:p-10 text-center rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white font-bold text-5xl break-all">SALE SALE SALE</div>
              <div className="relative z-10">
                <p className="text-white text-2xl md:text-4xl font-bold mb-2 uppercase">Extra 20% off*</p>
                <p className="text-white/80 text-base mb-6 uppercase tracking-widest">online exclusive</p>
                <div className="bg-white text-[#D4B785] py-2.5 px-10 rounded-full inline-block font-bold uppercase tracking-widest shadow-lg text-xs">
                  Code: FUR20
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Luxury Banner Segment */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-2xl overflow-hidden h-[220px] md:h-[320px] mb-4">
            <img src={showcase} alt="Lifestyle" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center px-8">
              <div className="max-w-sm text-white">
                <h2 className="text-3xl md:text-4xl font-serif italic mb-4 leading-tight">Bring home comfort that never fades.</h2>
                <Link to="/products" className="bg-white text-black px-10 py-3 font-bold rounded-md hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs shadow-xl">Shop Now</Link>
              </div>
            </div>
          </div>
          <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] mb-10">
            <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight">New arrivals: in stock & ready to ship</h2>
          </div>
        </div>
      </section>

      {/* 4. Featured Styles Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group">
              <div className="aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                <img src={catSofa} alt="Modern Living" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-center font-bold text-base text-gray-800 uppercase tracking-widest">Modern Living</p>
            </div>
            <div className="group">
              <div className="aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                <img src={catDiningChair} alt="Elite Dining" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-center font-bold text-base text-gray-800 uppercase tracking-widest">Elite Dining</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-36 md:h-48 group">
            <img src={heroBar} alt="Custom Furniture" className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 flex items-center justify-end px-8">
              <div className="bg-white/95 p-4 md:p-6 text-center rounded-sm shadow-xl max-w-[250px] border-t-4 border-primary transform group-hover:-translate-y-1 transition-transform">
                <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] mb-1 font-bold">Bespoke Design</p>
                <h3 className="text-xl font-serif mb-4 text-gray-900 leading-tight">Mastercrafted Induction collection for your dream home</h3>
                <Link to="/contact" className="inline-block border-2 border-black px-6 py-1.5 font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest text-[10px]">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bestsellers Segment */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] mb-10">
            <div className="absolute left-0 top-0 h-full w-16 bg-white/10 -skew-x-[45deg] animate-pulse"></div>
            <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight relative z-10">Retro Roots Bestsellers</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Sofa Sets", price: "9,999", img: catSofa },
              { name: "Dining Sets", price: "7,999", img: catDiningChair },
              { name: "Loungers", price: "8,499", img: catLounger },
              { name: "Armchairs", price: "4,999", img: catLoungeChair }
            ].map((item) => (
              <div key={item.name} className="text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-3 shadow-sm border-2 border-white transition-all group-hover:-rotate-1">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs mb-0.5">{item.name}</h3>
                <p className="text-primary font-black text-[10px] uppercase tracking-widest">From ₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] mt-10 shadow-lg group">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-white/20"></div>
            <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight opacity-100 group-hover:scale-105 transition-transform leading-none py-2">Explore All Collections</h2>
          </div>
        </div>
      </section>

      {/* 6. Categories Selection Grid (6 items) */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { name: "2 & 3 Seater Sofas", img: catSofa },
              { name: "King Beds", img: catLounger },
              { name: "Dining Chairs", img: catDiningChair },
              { name: "Study & Work", img: catLoungeChair },
              { name: "Centre Tables", img: showcase },
              { name: "Shoe Racks", img: heroBar }
            ].map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-sm overflow-hidden mb-2 bg-muted border border-gray-50">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-center text-sm font-medium text-gray-700">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Furniture Deals Banner */}
      <section className="py-4 overflow-hidden">
        <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] mb-10">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 whitespace-nowrap text-white font-black text-6xl space-x-12">
            <span>Deals Deals Deals Deals Deals Deals Deals</span>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight">Furniture Deals</h2>
          </div>
        </div>
      </section>

      {/* 8. Space Refresh Sections */}
      <section className="py-10 space-y-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Refresh Space */}
          <div className="flex flex-col lg:flex-row items-stretch bg-[#F4F1ED] rounded-lg overflow-hidden min-h-[220px]">
            <div className="lg:w-1/2 relative h-[180px] lg:h-auto">
              <img src={catSofa} alt="Refresh" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 flex items-center justify-center p-6">
              <div className="border border-gray-300 p-4 md:p-5 text-center w-full h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
                <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] mb-1">Let's</p>
                <h3 className="text-base md:text-lg font-serif mb-0.5 text-gray-900 leading-tight uppercase tracking-tight">REFRESH THE SPACE</h3>
                <p className="text-gray-500 text-[12px] mb-3">you come home to</p>
                <Link to="/products" className="inline-block border border-black px-5 py-1.5 rounded-full hover:bg-black hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl">
          {/* Wake Up to */}
          <div className="flex flex-col lg:flex-row-reverse items-stretch bg-[#F4F1ED] rounded-lg overflow-hidden min-h-[220px]">
            <div className="lg:w-1/2 relative h-[180px] lg:h-auto">
              <img src={catLounger} alt="Wake Up" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 flex items-center justify-center p-6">
              <div className="border border-gray-300 p-4 md:p-5 text-center w-full h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
                <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] mb-1">It's time to</p>
                <h3 className="text-base md:text-lg font-serif mb-0.5 text-gray-900 uppercase tracking-tight">WAKE UP TO</h3>
                <p className="text-gray-500 text-[12px] mb-3">something new</p>
                <Link to="/products" className="inline-block border border-black px-5 py-1.5 rounded-full hover:bg-black hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Sunlit Meals & New Launches */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-stretch bg-[#F4F1ED] rounded-lg overflow-hidden min-h-[220px] mb-8 group">
            <div className="lg:w-1/2 relative h-[180px] lg:h-auto overflow-hidden">
              <img src={catDiningChair} alt="Sunlit Meals" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="lg:w-1/2 flex items-center justify-center p-6">
              <div className="border border-gray-300 p-4 md:p-5 text-center w-full h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">How about some</p>
                <h3 className="text-base md:text-lg font-serif mb-0.5 text-gray-900 uppercase leading-tight tracking-tight">SUNLIT MEALS?</h3>
                <p className="text-gray-500 text-[12px] mb-3">Elegance in every bite</p>
                <Link to="/products" className="inline-block border border-black px-5 py-1.5 rounded-full hover:bg-black hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest">Shop Now</Link>
              </div>
            </div>
          </div>

          <div className="bg-[#000000] rounded-xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] mb-10 shadow-lg transform hover:scale-[1.005] transition-transform">
            <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight py-1">Furniture New Launches</h2>
          </div>
        </div>
      </section>

      {/* 10. Final Pricing Grid (6 items) */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {[
              { name: "Single Recliner", price: "15,999", img: heroBar },
              { name: "TV Media Units", price: "5,999", img: showcase },
              { name: "Bedside Tables", price: "1,999", img: catLoungeChair },
              { name: "Single Beds", price: "7,999", img: catLounger },
              { name: "Crockery Units", price: "5,999", img: heroBar },
              { name: "Bar Furniture", price: "3,999", img: heroBar }
            ].map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="aspect-square rounded-sm overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="text-center">
                  <h3 className="text-xs text-gray-600 mb-0.5">{item.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">From ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Luxury Collections Grid (3 items) */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Regal Luxe", img: catSofa },
              { name: "Altius", img: catDiningChair },
              { name: "Silvano", img: catLounger }
            ].map((item) => (
              <div key={item.name} className="text-center group cursor-pointer">
                <div className="aspect-square rounded-sm overflow-hidden mb-3 bg-muted border border-gray-50">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-base font-medium text-gray-700">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Rewards Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-[#000000] text-white rounded-sm overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 relative">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 relative z-10 w-full text-center md:text-left">
              <div className="flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Retro Roots</p>
                <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase">UPTO</p>
                  <p className="text-3xl md:text-4xl font-black text-white">50,000</p>
                </div>
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold uppercase tracking-widest leading-none">REWARD POINTS ANNUALLY*</p>
                <p className="text-[8px] opacity-40 tracking-widest mt-1 uppercase">*Verified Members Only</p>
              </div>
              <div className="flex-grow flex justify-end">
                <button className="border border-white px-8 py-2 font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Brands In Spotlight */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Brands In Spotlight</h2>
          <div className="w-12 h-1 bg-primary/30 mx-auto mb-10 rounded-full"></div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Luxe Home", discount: "85%", img: catSofa },
              { name: "Prestige", discount: "10%", img: catDiningChair },
              { name: "Royal", discount: "15%", img: catLounger },
              { name: "Velvet", discount: "75%", img: catLoungeChair },
              { name: "Craft", discount: "60%", img: heroBar },
              { name: "Handmade", discount: "65%", img: showcase },
              { name: "Classic", discount: "70%", img: heroBar },
              { name: "Heritage", discount: "65%", img: catSofa },
            ].map((brand) => (
              <div key={brand.name} className="group cursor-pointer relative overflow-hidden">
                <div className="aspect-square mb-2 bg-muted overflow-hidden relative rounded-sm">
                  <img src={brand.img} alt={brand.name} className="w-full h-full object-cover transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-2 left-3 right-3 text-white text-left">
                    <p className="font-bold text-sm mb-0.5 uppercase tracking-tight">{brand.name}</p>
                    <p className="text-[10px] uppercase opacity-90"><span className="text-base font-black text-white">{brand.discount}</span> off</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Explore card */}
            <div className="bg-[#000000] text-white p-4 flex flex-col items-center justify-center text-center aspect-square rounded-sm border-2 border-transparent hover:border-white/20 transition-all">
              <h3 className="text-sm md:text-base font-bold uppercase tracking-tight leading-tight mb-2">Explore more brands</h3>
              <div className="w-6 h-0.5 bg-white/30"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBanners;


