import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ChevronRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-100 py-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-widest">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-bold">Shopping Basket</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 pt-16 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header Section */}
            <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-12">Your Shopping Basket</h1>
            
            {/* Empty State Container */}
            <div className="bg-white border-2 border-dashed border-gray-100 rounded-[40px] p-12 md:p-20 relative overflow-hidden group">
              {/* Decorative Background blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-40 h-40 md:w-56 md:h-56 mb-10 relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-full scale-125 animate-pulse"></div>
                  <div className="bg-white w-full h-full rounded-full shadow-2xl flex items-center justify-center border border-gray-50">
                    <ShoppingBag className="w-20 h-20 md:w-28 md:h-28 text-slate-200 stroke-[1]" />
                  </div>
                  {/* Plus icon decoration */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg animate-bounce duration-3000">
                    <span className="text-2xl font-bold">+</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 max-w-md mx-auto leading-tight">
                  Your home is waiting for the best furniture & decor !
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium mb-12 max-w-sm mx-auto leading-relaxed">
                  Choose from the departments below and start shopping now. Every piece at Retro Roots is crafted for your comfort.
                </p>

                <Link 
                  to="/products"
                  className="inline-flex items-center gap-3 px-10 py-4 gold-gradient text-primary-foreground font-black rounded-2xl uppercase tracking-[0.2em] text-sm shadow-2xl hover:scale-105 transition-all active:scale-95 group"
                >
                  Explore Collections
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Quick Categories Links */}
            <div className="mt-16 pt-16 border-t border-gray-100">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Popular Collections</p>
               <div className="flex flex-wrap justify-center gap-4">
                  {["Sofa", "Dining Chair", "Lounger", "Recliners"].map(cat => (
                    <Link 
                      key={cat}
                      to={`/products?category=${cat.toLowerCase().replace(' ', '-')}`}
                      className="px-6 py-2 rounded-full border border-gray-100 text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all uppercase tracking-widest"
                    >
                      {cat}
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
