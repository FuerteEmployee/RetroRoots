import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto section-padding pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <img src="/logo.png" alt="Retro Roots" className="h-16 mb-6 object-contain" />
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
            At Retro Roots, every sofa is more than just furniture — it’s a story of comfort, craftsmanship, and character.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/60 hover:text-primary hover:border-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigate</h4>
          <div className="flex flex-col gap-2.5">
            {[{ l: "Home", p: "/" }, { l: "About Us", p: "/about" }, { l: "Products", p: "/products" }, { l: "Gallery", p: "/gallery" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }].map(({ l, p }) => (
              <Link key={l} to={p} className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Business</h4>
          <div className="flex flex-col gap-2.5">
            {[{ l: "Become a Distributor", p: "/distributor" }, { l: "Find a Distributor", p: "/distributor-finder" }, { l: "Certificates", p: "/certificates" }, { l: "Expo & Events", p: "/expo" }, { l: "Careers", p: "/careers" }, { l: "PR & News", p: "/pr-news" }].map(({ l, p }) => (
              <Link key={l} to={p} className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <div className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Star Interior Zone Lane, Opp. Speedwell party plot gate,
                Suvarnabhoomi Chowk, Rajkot 360005</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+91 9624726247</span>
            </div>
            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span>info@retroroots.co.in
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/40">© 2026 RetroRoots. | All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-xs text-primary-foreground/40 hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/delivery" className="text-xs text-primary-foreground/40 hover:text-primary transition-colors">Delivery Info</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
