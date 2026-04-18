import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Twitter, Apple, Send, HelpCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-white text-black font-sans">
    {/* Top Section: Subscribe & Download */}
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Subscribe */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Subscribe to our awesome emails.</h3>
          <p className="text-gray-500 text-sm">Get our latest offers and news straight in your inbox.</p>
          <div className="flex w-full max-w-md mt-6">
            <input 
              type="email" 
              placeholder="Please enter an email address" 
              className="flex-grow bg-[#F5F5F5] px-4 py-4 text-sm focus:outline-none placeholder:text-gray-400"
            />
            <button className="bg-black text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>

        {/* Download Apps */}
        <div className="space-y-4 md:pl-12">
          <h3 className="text-2xl font-bold">Download our apps</h3>
          <p className="text-gray-500 text-sm">Shop our products and offers on-the-go.</p>
          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              <Apple className="w-6 h-6 fill-current" />
              <div className="text-left">
                <p className="text-[10px] leading-tight opacity-70">Download on the</p>
                <p className="text-sm font-semibold leading-tight">App Store</p>
              </div>
            </button>
            <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              <Send className="w-5 h-5 fill-current" />
              <div className="text-left">
                <p className="text-[10px] leading-tight opacity-70">GET IT ON</p>
                <p className="text-sm font-semibold leading-tight">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Middle Section: Links */}
    <div className="border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img src="/logo.png" alt="Retro Roots" className="h-12 mb-6 object-contain" />
            <p className="text-gray-500 text-sm leading-relaxed">
              At Retro Roots, every sofa is more than just furniture — it’s a story of comfort, craftsmanship, and character.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Navigate</h4>
            <div className="flex flex-col gap-4">
              {[{ l: "Home", p: "/" }, { l: "About Us", p: "/about" }, { l: "Products", p: "/products" }, { l: "Gallery", p: "/gallery" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }].map(({ l, p }) => (
                <Link key={l} to={p} className="text-sm text-gray-400 hover:text-black transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Business</h4>
            <div className="flex flex-col gap-4">
              {[{ l: "Become a Distributor", p: "/distributor" }, { l: "Find a Distributor", p: "/distributor-finder" }, { l: "Certificates", p: "/certificates" }, { l: "Expo & Events", p: "/expo" }, { l: "Careers", p: "/careers" }, { l: "PR & News", p: "/pr-news" }].map(({ l, p }) => (
                <Link key={l} to={p} className="text-sm text-gray-400 hover:text-black transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-black flex-shrink-0" />
                <span className="leading-relaxed">Star Interior Zone Lane, Opp. Speedwell party plot gate, Suvarnabhoomi Chowk, Rajkot 360005</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-black flex-shrink-0" />
                <span>+91 9624726247</span>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-black flex-shrink-0" />
                <span>info@retroroots.co.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Contact Bar Section */}
    <div className="border-t border-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-12">
            {/* Talk to us */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Talk to us</p>
                <p className="text-base font-bold">1800-212-7500</p>
              </div>
            </div>

            {/* Helpcentre */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Helpcentre</p>
                <p className="text-base font-bold underline cursor-pointer">retroroots.in/help</p>
              </div>
            </div>

            {/* Write to us */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Write to us</p>
                <p className="text-base font-bold">info@retroroots.co.in</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-5">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="text-black hover:opacity-70 transition-opacity">
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar: Copyright & Links */}
    <div className="border-t border-gray-100 bg-[#F9F9F9] py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <img src="/logo.png" alt="Retro Roots" className="h-8 opacity-80" />
          <p className="text-xs text-gray-500 font-medium tracking-wide leading-relaxed">
            Terms & Conditions - Privacy Policy
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <p className="text-xs text-gray-400">© 2026 RetroRoots. | All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Privacy Policy</Link>
            <Link to="/delivery" className="text-xs text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Delivery Info</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

