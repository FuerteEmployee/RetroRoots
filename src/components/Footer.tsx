// import { Link } from "react-router-dom";
// import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Twitter, Apple, Send, HelpCircle } from "lucide-react";

// const Footer = () => (
//   <footer className="bg-white text-black font-sans">
//     {/* Top Section: Subscribe & Download */}
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
//         {/* Subscribe */}
//         <div className="space-y-4">
//           <h3 className="text-2xl font-bold">Subscribe to our awesome emails.</h3>
//           <p className="text-gray-500 text-base md:text-sm">Get our latest offers and news straight in your inbox.</p>
//           <div className="flex w-full max-w-md mt-6">
//             <input 
//               type="email" 
//               placeholder="Please enter an email address" 
//               className="flex-grow bg-[#F5F5F5] px-4 py-4 text-sm focus:outline-none placeholder:text-gray-400"
//             />
//             <button className="bg-black text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors hover:bg-gray-800">
//               Subscribe
//             </button>
//           </div>
//         </div>

//         {/* Download Apps */}
//         <div className="space-y-4 md:pl-12">
//           <h3 className="text-2xl font-bold">Download our apps</h3>
//           <p className="text-gray-500 text-base md:text-sm">Shop our products and offers on-the-go.</p>
//           <div className="flex gap-4 mt-6">
//             <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <Apple className="w-6 h-6 fill-current" />
//               <div className="text-left">
//                 <p className="text-[10px] leading-tight opacity-70">Download on the</p>
//                 <p className="text-sm font-semibold leading-tight">App Store</p>
//               </div>
//             </button>
//             <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <Send className="w-5 h-5 fill-current" />
//               <div className="text-left">
//                 <p className="text-[10px] leading-tight opacity-70">GET IT ON</p>
//                 <p className="text-sm font-semibold leading-tight">Google Play</p>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Middle Section: Links */}
//     <div className="border-t border-gray-100">
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-1">
//             <img src="/logo.png" alt="Retro Roots" className="h-12 mb-6 object-contain" />
//             <p className="text-gray-500 text-base md:text-sm leading-relaxed">
//               At Retro Roots, every sofa is more than just furniture — it’s a story of comfort, craftsmanship, and character.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Navigate</h4>
//             <div className="flex flex-col gap-4">
//               {[{ l: "Home", p: "/" }, { l: "About Us", p: "/about" }, { l: "Products", p: "/products" }, { l: "Gallery", p: "/gallery" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }].map(({ l, p }) => (
//                 <Link key={l} to={p} className="text-base md:text-sm text-gray-400 hover:text-black transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Business</h4>
//             <div className="flex flex-col gap-4">
//               {[{ l: "Become a Distributor", p: "/distributor" }, { l: "Find a Distributor", p: "/distributor-finder" }, { l: "Certificates", p: "/certificates" }, { l: "Expo & Events", p: "/expo" }, { l: "Careers", p: "/careers" }, { l: "PR & News", p: "/pr-news" }].map(({ l, p }) => (
//                 <Link key={l} to={p} className="text-base md:text-sm text-gray-400 hover:text-black transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
//             <div className="flex flex-col gap-4 text-base md:text-sm text-gray-400">
//               <div className="flex gap-3 items-start">
//                 <MapPin className="w-5 h-5 text-black flex-shrink-0" />
//                 <span className="leading-relaxed">Star Interior Zone Lane, Opp. Speedwell party plot gate, Suvarnabhoomi Chowk, Rajkot 360005</span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <Phone className="w-5 h-5 text-black flex-shrink-0" />
//                 <span>+91 9624726247</span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <Mail className="w-5 h-5 text-black flex-shrink-0" />
//                 <span>info@retroroots.co.in</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Contact Bar Section */}
//     <div className="border-t border-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
//           <div className="flex flex-wrap justify-center lg:justify-start gap-12">
//             {/* Talk to us */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <Phone className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-sm md:text-xs text-gray-500">Talk to us</p>
//                 <p className="text-lg md:text-base font-bold">1800-212-7500</p>
//               </div>
//             </div>

//             {/* Helpcentre */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <HelpCircle className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-sm md:text-xs text-gray-500">Helpcentre</p>
//                 <p className="text-lg md:text-base font-bold underline cursor-pointer">retroroots.in/help</p>
//               </div>
//             </div>

//             {/* Write to us */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-sm md:text-xs text-gray-500">Write to us</p>
//                 <p className="text-lg md:text-base font-bold">info@retroroots.co.in</p>
//               </div>
//             </div>
//           </div>

//           {/* Socials */}
//           <div className="flex gap-5">
//             {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
//               <a key={i} href="#" className="text-black hover:opacity-70 transition-opacity">
//                 <Icon className="w-6 h-6" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bottom Bar: Copyright & Links */}
//     <div className="border-t border-gray-100 bg-[#F9F9F9] py-8">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="flex items-center gap-8">
//           <img src="/logo.png" alt="Retro Roots" className="h-8 opacity-80" />
//           <p className="text-sm md:text-xs text-gray-500 font-medium tracking-wide leading-relaxed">
//             Terms & Conditions - Privacy Policy
//           </p>
//         </div>

//         <div className="flex items-center gap-6">
//           <p className="text-sm md:text-xs text-gray-400">© 2026 RetroRoots. | All rights reserved.</p>
//           <div className="flex gap-6">
//             <Link to="/privacy" className="text-sm md:text-xs text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Privacy Policy</Link>
//             <Link to="/delivery" className="text-sm md:text-xs text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Delivery Info</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;
//---------------------
// import { Link } from "react-router-dom";
// import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Twitter, Apple, Send, HelpCircle } from "lucide-react";

// const Footer = () => (
//   <footer className="bg-white text-black font-sans">
//     {/* Top Section: Subscribe & Download */}
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
//         {/* Subscribe */}
//         <div className="space-y-4">
//           <h3 className="text-2xl font-bold">Subscribe to our awesome emails.</h3>
//           <p className="text-base text-gray-500 leading-relaxed">Get our latest offers and news straight in your inbox.</p>
//           <div className="flex w-full max-w-md mt-6">
//             <input
//               type="email"
//               placeholder="Please enter an email address"
//               className="flex-grow bg-[#F5F5F5] px-4 py-4 text-base focus:outline-none placeholder:text-gray-400"
//             />
//             <button className="bg-black text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors hover:bg-gray-800">
//               Subscribe
//             </button>
//           </div>
//         </div>

//         {/* Download Apps */}
//         <div className="space-y-4 md:pl-12">
//           <h3 className="text-2xl font-bold">Download our apps</h3>
//           <p className="text-base text-gray-500 leading-relaxed">Shop our products and offers on-the-go.</p>
//           <div className="flex gap-4 mt-6">
//             <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <Apple className="w-6 h-6 fill-current" />
//               <div className="text-left">
//                 <p className="text-[10px] leading-tight opacity-70">Download on the</p>
//                 <p className="text-sm font-semibold leading-tight">App Store</p>
//               </div>
//             </button>
//             <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <Send className="w-5 h-5 fill-current" />
//               <div className="text-left">
//                 <p className="text-[10px] leading-tight opacity-70">GET IT ON</p>
//                 <p className="text-sm font-semibold leading-tight">Google Play</p>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Middle Section: Links */}
//     <div className="border-t border-gray-100">
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-1">
//             <img src="/logo.png" alt="Retro Roots" className="h-12 mb-6 object-contain" />
//             <p className="text-gray-500 text-base leading-relaxed">
//               At Retro Roots, every sofa is more than just furniture — it's a story of comfort, craftsmanship, and character.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Navigate</h4>
//             <div className="flex flex-col gap-4">
//               {[{ l: "Home", p: "/" }, { l: "About Us", p: "/about" }, { l: "Products", p: "/products" }, { l: "Gallery", p: "/gallery" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }].map(({ l, p }) => (
//                 <Link key={l} to={p} className="text-base text-gray-400 hover:text-black transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Business</h4>
//             <div className="flex flex-col gap-4">
//               {[{ l: "Become a Distributor", p: "/distributor" }, { l: "Find a Distributor", p: "/distributor-finder" }, { l: "Certificates", p: "/certificates" }, { l: "Expo & Events", p: "/expo" }, { l: "Careers", p: "/careers" }, { l: "PR & News", p: "/pr-news" }].map(({ l, p }) => (
//                 <Link key={l} to={p} className="text-base text-gray-400 hover:text-black transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
//             <div className="flex flex-col gap-4 text-base text-gray-400">
//               <div className="flex gap-3 items-start">
//                 <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
//                 <span className="leading-relaxed">Star Interior Zone Lane, Opp. Speedwell party plot gate, Suvarnabhoomi Chowk, Rajkot 360005</span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <Phone className="w-5 h-5 text-black flex-shrink-0" />
//                 <span>+91 9624726247</span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <Mail className="w-5 h-5 text-black flex-shrink-0" />
//                 <span>info@retroroots.co.in</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Contact Bar Section */}
//     <div className="border-t border-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
//           <div className="flex flex-wrap justify-center lg:justify-start gap-12">
//             {/* Talk to us */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <Phone className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-base text-gray-500">Talk to us</p>
//                 <p className="text-xl font-bold">1800-212-7500</p>
//               </div>
//             </div>

//             {/* Helpcentre */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <HelpCircle className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-base text-gray-500">Helpcentre</p>
//                 <p className="text-xl font-bold underline cursor-pointer">retroroots.in/help</p>
//               </div>
//             </div>

//             {/* Write to us */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-base text-gray-500">Write to us</p>
//                 <p className="text-xl font-bold">info@retroroots.co.in</p>
//               </div>
//             </div>
//           </div>

//           {/* Socials */}
//           <div className="flex gap-5">
//             {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
//               <a key={i} href="#" className="text-black hover:opacity-70 transition-opacity">
//                 <Icon className="w-6 h-6" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bottom Bar: Copyright & Links */}
//     <div className="border-t border-gray-100 bg-[#F9F9F9] py-8">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="flex items-center gap-8">
//           <img src="/logo.png" alt="Retro Roots" className="h-8 opacity-80" />
//           <p className="text-sm text-gray-500 font-medium tracking-wide leading-relaxed">
//             Terms & Conditions - Privacy Policy
//           </p>
//         </div>

//         <div className="flex items-center gap-6">
//           <p className="text-sm text-gray-400">© 2026 RetroRoots. | All rights reserved.</p>
//           <div className="flex gap-6">
//             <Link to="/privacy" className="text-sm text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Privacy Policy</Link>
//             <Link to="/delivery" className="text-sm text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Delivery Info</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;


// import { Link } from "react-router-dom";
// import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Twitter, Apple, Send, HelpCircle } from "lucide-react";

// const Footer = () => (
//   <footer className="bg-white text-black font-sans">
//     {/* Top Section: Subscribe & Download */}
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
//         {/* Subscribe */}
//         <div className="space-y-4">
//           <h3 className="text-2xl font-bold">Subscribe to our awesome emails.</h3>
//           <p className="text-lg text-gray-500 leading-relaxed">Get our latest offers and news straight in your inbox.</p>
//           <div className="flex w-full max-w-md mt-6">
//             <input
//               type="email"
//               placeholder="Please enter an email address"
//               className="flex-grow bg-[#F5F5F5] px-4 py-4 text-lg focus:outline-none placeholder:text-gray-400"
//             />
//             <button className="bg-black text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors hover:bg-gray-800">
//               Subscribe
//             </button>
//           </div>
//         </div>

//         {/* Download Apps */}
//         <div className="space-y-4 md:pl-12">
//           <h3 className="text-2xl font-bold">Download our apps</h3>
//           <p className="text-lg text-gray-500 leading-relaxed">Shop our products and offers on-the-go.</p>
//           <div className="flex gap-4 mt-6">
//             <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <Apple className="w-6 h-6 fill-current" />
//               <div className="text-left">
//                 <p className="text-[10px] leading-tight opacity-70">Download on the</p>
//                 <p className="text-sm font-semibold leading-tight">App Store</p>
//               </div>
//             </button>
//             <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <Send className="w-5 h-5 fill-current" />
//               <div className="text-left">
//                 <p className="text-[10px] leading-tight opacity-70">GET IT ON</p>
//                 <p className="text-sm font-semibold leading-tight">Google Play</p>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Middle Section: Links */}
//     <div className="border-t border-gray-100">
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-1">
//             <img src="/logo.png" alt="Retro Roots" className="h-12 mb-6 object-contain" />
//             <p className="text-gray-500 text-lg leading-relaxed">
//               At Retro Roots, every sofa is more than just furniture — it's a story of comfort, craftsmanship, and character.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Navigate</h4>
//             <div className="flex flex-col gap-4">
//               {[{ l: "Home", p: "/" }, { l: "About Us", p: "/about" }, { l: "Products", p: "/products" }, { l: "Gallery", p: "/gallery" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }].map(({ l, p }) => (
//                 <Link key={l} to={p} className="text-lg text-gray-400 hover:text-black transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Business</h4>
//             <div className="flex flex-col gap-4">
//               {[{ l: "Become a Distributor", p: "/distributor" }, { l: "Find a Distributor", p: "/distributor-finder" }, { l: "Certificates", p: "/certificates" }, { l: "Expo & Events", p: "/expo" }, { l: "Careers", p: "/careers" }, { l: "PR & News", p: "/pr-news" }].map(({ l, p }) => (
//                 <Link key={l} to={p} className="text-lg text-gray-400 hover:text-black transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
//             <div className="flex flex-col gap-4 text-lg text-gray-400">
//               <div className="flex gap-3 items-start">
//                 <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
//                 <span className="leading-relaxed">Star Interior Zone Lane, Opp. Speedwell party plot gate, Suvarnabhoomi Chowk, Rajkot 360005</span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <Phone className="w-5 h-5 text-black flex-shrink-0" />
//                 <span>+91 9624726247</span>
//               </div>
//               <div className="flex gap-3 items-center">
//                 <Mail className="w-5 h-5 text-black flex-shrink-0" />
//                 <span>info@retroroots.co.in</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Contact Bar Section */}
//     <div className="border-t border-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
//           <div className="flex flex-wrap justify-center lg:justify-start gap-12">
//             {/* Talk to us */}
//             {/* <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <Phone className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-lg text-gray-500">Talk to us</p>
//                 <p className="text-2xl font-bold">1800-212-7500</p>
//               </div>
//             </div> */}

//             {/* Helpcentre */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <HelpCircle className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-lg text-gray-500">Helpcentre</p>
//                 <p className="text-2xl font-bold underline cursor-pointer">retroroots.in/help</p>
//               </div>
//             </div>

//             {/* Write to us */}
//             {/* <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-lg text-gray-500">Write to us</p>
//                 <p className="text-2xl font-bold">info@retroroots.co.in</p>
//               </div>
//             </div> */}
//           </div>

//           {/* Socials */}
//           <div className="flex gap-5">
//             {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
//               <a key={i} href="#" className="text-black hover:opacity-70 transition-opacity">
//                 <Icon className="w-6 h-6" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bottom Bar: Copyright & Links */}
//     <div className="border-t border-gray-100 bg-[#F9F9F9] py-8">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="flex items-center gap-8">
//           <img src="/logo.png" alt="Retro Roots" className="h-8 opacity-80" />
//           <p className="text-sm text-gray-500 font-medium tracking-wide leading-relaxed">
//             Terms & Conditions - Privacy Policy
//           </p>
//         </div>

//         <div className="flex items-center gap-6">
//           <p className="text-sm text-gray-400">© 2026 RetroRoots. | All rights reserved.</p>
//           <div className="flex gap-6">
//             <Link to="/privacy" className="text-sm text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Privacy Policy</Link>
//             <Link to="/delivery" className="text-sm text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Delivery Info</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;

import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail, Twitter, Apple, Send, HelpCircle, MessageCircle } from "lucide-react";
import catSofa from "@/assets/category-sofa.jpg";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";
import catLounger from "@/assets/category-lounger.png";
import insta1 from "@/assets/insta-1.png";
import insta2 from "@/assets/insta-2.png";
import insta3 from "@/assets/insta-3.png";
import insta4 from "@/assets/insta-4.png";
import insta5 from "@/assets/insta-5.png";
import insta6 from "@/assets/insta-6.png";

const instaPosts = [
  insta1, insta2, insta3, insta4, insta5, insta6
];

const Footer = () => (
  <footer className="bg-white text-black font-sans">
    {/* Top Section: Subscribe */}
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h3 className="text-2xl font-bold">Subscribe to our awesome emails.</h3>
        <p className="text-lg md:text-sm text-gray-500 leading-relaxed">Get our latest offers and news straight in your inbox.</p>
        <div className="flex w-full max-w-md mt-6">
          <input
            type="email"
            placeholder="Please enter an email address"
            className="flex-grow bg-[#F5F5F5] px-4 py-4 text-lg md:text-sm focus:outline-none placeholder:text-gray-400"
          />
          <button className="bg-black text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    {/* Middle Section: Links */}
    <div className="border-t border-gray-100 px-10 ">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(15,minmax(0,1fr))] gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <img src="/logo.png" alt="Retro Roots" className="h-20 mb-6 object-contain" />
            <p className="text-gray-500 text-xl md:text-sm leading-relaxed">
              At Retro Roots, every sofa is more than just furniture - its a story of comfort, craftsmanship, and character.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Navigate</h4>
            <div className="flex flex-col gap-4">
              {[{ l: "Home", p: "/" }, { l: "About Us", p: "/about" }, { l: "Products", p: "/products" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }].map(({ l, p }) => (
                <Link key={l} to={p} className="text-xl md:text-sm text-gray-400 hover:text-black transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Useful</h4>
            <div className="flex flex-col gap-4">
              {[{ l: "Privacy Policy", p: "/privacy" }, { l: "Refund Policy", p: "/refund-policy" }, { l: "Return Policy", p: "/return-policy" }, { l: "Terms & Conditions", p: "/terms" }].map(({ l, p }) => (
                <Link key={l} to={p} className="text-xl md:text-sm text-gray-400 hover:text-black transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 ms-0 ps-0">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
            <div className="flex flex-col gap-4 text-xl md:text-sm text-gray-400">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
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

              {/* Socials moved here */}
              <div className="flex gap-4 mt-2">
                {[
                  { Icon: Facebook, url: "https://www.facebook.com/retrorootsofficial" },
                  { Icon: Instagram, url: "https://www.instagram.com/retro_roots.in/" },
                  { Icon: MessageCircle, url: "https://api.whatsapp.com/send/?phone=919998388321&text&type=phone_number&app_absent=0" }
                ].map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black :text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>


            </div>
          </div>

          {/* Instagram Column */}
          <div className="lg:col-span-4">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase">Instagram</h4>
            <div className="bg-[#121212] text-white p-4 rounded-xl flex items-center justify-between shadow-md mb-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <h5 className="font-bold text-xs leading-none">retro_roots.in</h5>
                  <p className="text-[10px] text-gray-400 mt-1">Retro Roots</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/retro_roots.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4B785] hover:bg-[#cbb07a] text-black font-bold text-xs px-4 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                Follow
              </a>
            </div>

            {/* Instagram Posts Grid - 6 posts */}
            <div className="grid grid-cols-3 gap-2">
              {instaPosts.map((img, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/retro_roots.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-lg overflow-hidden group border border-white/5"
                >
                  <img src={img} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                    <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar: Copyright & Links */}
    <div className="border-t border-gray-100 bg-[#F9F9F9] py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">© 2026 RetroRoots. | All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-sm text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Privacy Policy</Link>
          <Link to="/delivery" className="text-sm text-gray-400 hover:text-black transition-colors underline decoration-gray-200">Delivery Info</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;