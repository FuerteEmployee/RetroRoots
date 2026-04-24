import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getProduct } from "@/lib/api";
import { API_BASE_URL } from "@/contexts/AuthContext";
import ImageMagnifier from "@/components/ImageMagnifier";
import { Loader2, AlertCircle, ShoppingCart, Star, CheckCircle, Truck } from "lucide-react";
import catSofa from "@/assets/category-sofa.jpg";
import catDiningChair from "@/assets/category-dining-chair.png";
import catLounger from "@/assets/category-lounger.png";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";

const getImageUrl = (img: any) => {
  const url = typeof img === 'object' ? img?.url : img;
  if (!url) return "/placeholder.svg";
  if (typeof url !== 'string') return "/placeholder.svg";
  if (url.includes('http') || url.includes('data:image') || url.startsWith('/src')) return url;
  return `${API_BASE_URL.replace('/api', '')}/uploads/${url}`;
};

const dummyProductsMap: Record<string, any> = {
  "0": { name: "Royal Velvet Sofa", categoryName: "Sofa", tag: "Bestseller", image: catSofa, price: 45000, description: "A luxurious royal velvet sofa perfectly crafted for your living space. This sofa is designed to provide maximum comfort and elegance to any room.", features: ["Premium Velvet Fabric", "High-Density Foam", "Solid Wood Frame", "Ergonomic Support"], specifications: { "Material": "Velvet", "Color": "Royal Blue", "Dimensions": "84 x 35 x 30 inches", "Warranty": "5 Years" }, rating: 4.8, reviews: 124 },
  "1": { name: "Nordic Dining Chair", categoryName: "Dining Chair", tag: "New", image: catDiningChair, price: 12000, description: "Elegant nordic dining chair to complement your dining table.", features: ["Minimalist Design", "Matte Finish", "Sturdy Build", "Easy to Clean"], specifications: { "Material": "Engineered Wood", "Color": "Oak", "Warranty": "2 Years" }, rating: 4.5, reviews: 89 },
  "2": { name: "Traditional Diwaan Set", categoryName: "Lounger (Diwaan)", tag: "Premium", image: catLounger, price: 35000, description: "Traditional diwaan set offering maximum comfort and royal aesthetics.", features: ["Hand-carved Details", "Premium Upholstery", "Includes Bolsters", "Teak Wood Base"], specifications: { "Material": "Teak Wood", "Fabric": "Silk Blend", "Warranty": "10 Years" }, rating: 4.9, reviews: 56 },
  "3": { name: "Modern Accent Chair", categoryName: "Lounge Chair", tag: "Classic", image: catLoungeChair, price: 28000, description: "Modern accent chair designed for a minimalist look.", features: ["Comfortable Seating", "Sleek Metal Legs", "Breathable Fabric"], specifications: { "Material": "Metal & Fabric", "Color": "Grey", "Warranty": "3 Years" }, rating: 4.6, reviews: 42 },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    
    if (dummyProductsMap[id]) {
      const dummy = dummyProductsMap[id];
      setProduct(dummy);
      setSelectedImage(dummy.image);
      setLoading(false);
      return;
    }

    getProduct(id)
      .then(data => {
        setProduct(data);
        const images = data.images && data.images.length > 0 ? data.images : (data.image ? [data.image] : []);
        if (images.length > 0) {
          setSelectedImage(getImageUrl(images[0]));
        } else {
          setSelectedImage("/placeholder.svg");
        }
      })
      .catch(err => {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. It may have been removed.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout title="Loading Product..." description="Loading product details.">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Loading details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout title="Product Not Found" description="The requested product could not be found.">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6 max-w-md">{error || "The product you are looking for does not exist."}</p>
          <Link to="/products" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryName = (typeof product.categoryId === 'object' ? product.categoryId?.name : product.categoryId) || 
                       (typeof product.category === 'object' ? product.category?.name : product.category) || 
                       product.categoryName || "General";
                       
  const imagesList = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);

  // Fallbacks for rich data
  const currentPrice = product.price || 0;
  const originalPrice = product.mrp || Math.floor(currentPrice * 1.15); // 15% markup if MRP is missing
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  
  const rating = product.rating || 4.5;
  const reviewsCount = product.reviews || Math.floor(Math.random() * 200) + 50;
  
  const inStock = product.stock !== undefined ? product.stock > 0 : true;

  const features = product.features && product.features.length > 0 ? product.features : [
    "Premium quality materials and craftsmanship.",
    "Designed for maximum comfort and durability.",
    "Easy to clean and maintain over time.",
    "Sleek and modern aesthetic to fit any room style."
  ];

  const specifications = product.specifications || {
    "Brand": "Retro Roots",
    "Material": product.material || "Premium Wood & Fabric",
    "Color": "Refer to images",
    "Warranty": "1 Year Manufacturer Warranty",
    "Assembly": "Pre-assembled"
  };

  return (
    <Layout title={`${product.name} | Retro Roots`} description={product.description || `View details for ${product.name}`}>
      <PageHeader title="Product Details" subtitle="Discover premium craftsmanship" />
      
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Top Section: Images and Summary */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
            
            {/* Left Side: Image Gallery */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:sticky lg:top-24 h-fit relative z-10">
              <div className="w-full aspect-square bg-white rounded-xl border border-border flex items-center justify-center p-4 shadow-sm group">
                <ImageMagnifier 
                  src={selectedImage} 
                  zoomSrc={selectedImage} 
                  alt={product.name}
                  zoomLevel={2.5}
                />
              </div>
              
              {imagesList.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  {imagesList.map((img: any, idx: number) => {
                    const url = getImageUrl(img);
                    return (
                      <button 
                        key={idx}
                        onMouseEnter={() => setSelectedImage(url)}
                        onClick={() => setSelectedImage(url)}
                        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === url ? 'border-primary shadow-md' : 'border-border/50 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
                      >
                        <img src={url} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Right Side: Info and Buy Box */}
            <div className="w-full lg:w-[55%] flex flex-col md:flex-row gap-8">
              
              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-start">
                <Link to="/products" className="text-sm font-semibold text-primary hover:underline uppercase tracking-wider mb-2">
                  {categoryName}
                </Link>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-[#FFA41C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : i < rating ? 'fill-current opacity-50' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer">{rating} ({reviewsCount} ratings)</span>
                </div>
                
                <hr className="my-4 border-border" />
                
                {/* Pricing */}
                <div className="mb-6">
                  {discount > 0 && (
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-light text-[#CC0C39]">-{(discount)}%</span>
                      <span className="text-3xl font-semibold text-foreground flex items-start">
                        <span className="text-lg mt-1 mr-0.5">₹</span>{currentPrice.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {discount === 0 && (
                    <span className="text-3xl font-semibold text-foreground flex items-start mb-1">
                      <span className="text-lg mt-1 mr-0.5">₹</span>{currentPrice.toLocaleString()}
                    </span>
                  )}
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>M.R.P.:</span>
                    <span className="line-through decoration-1">₹{originalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm font-medium mt-1">Inclusive of all taxes</p>
                </div>

                <hr className="my-4 border-border" />

                {/* Short Highlights */}
                <div className="mb-6">
                  <h3 className="text-base font-bold text-foreground mb-3">About this item</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/90 leading-relaxed">
                    {features.map((feature: string, idx: number) => (
                      <li key={idx} className="pl-1">{feature}</li>
                    ))}
                  </ul>
                </div>

                {product.industryTags && product.industryTags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-foreground mb-3">Suitable For</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.industryTags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-3 py-1.5 bg-muted/50 text-foreground text-xs font-medium rounded-full border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Buy Box (Amazon style right column) */}
              <div className="w-full md:w-[280px] shrink-0">
                <div className="border border-border rounded-lg p-5 shadow-sm bg-white sticky top-24">
                  <span className="text-2xl font-semibold text-foreground flex items-start mb-4">
                    <span className="text-sm mt-1.5 mr-0.5">₹</span>{currentPrice.toLocaleString()}
                  </span>
                  
                  <div className="text-sm text-foreground/80 mb-4 flex items-start gap-2">
                    <Truck className="w-5 h-5 text-muted-foreground shrink-0" />
                    <p>FREE delivery on eligible orders. Details</p>
                  </div>
                  
                  <div className="mb-6">
                    {inStock ? (
                      <p className="text-lg font-medium text-[#007600] flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> In stock
                      </p>
                    ) : (
                      <p className="text-lg font-medium text-[#B12704]">Out of stock</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Sold by <span className="text-[#007185]">Retro Roots</span></p>
                  </div>
                  
                  <Link to="/contact" className="w-full py-3 mb-3 bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm font-medium rounded-full shadow-sm text-center flex items-center justify-center gap-2 transition-colors border border-[#FCD200]">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Link>
                  <Link to="/contact" className="w-full py-3 bg-[#FFA41C] hover:bg-[#FA8900] text-black text-sm font-medium rounded-full shadow-sm text-center flex items-center justify-center gap-2 transition-colors border border-[#FF8F00]">
                    Buy Now
                  </Link>
                  
                  <div className="mt-4 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="inline-block w-3 h-4 bg-muted-foreground/20 rounded-sm"></span> Secure transaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="my-10 border-border" />
          
          {/* Bottom Section: Detailed Description & Specs */}
          <div className="max-w-4xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#C60] mb-4">Product Description</h2>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/80 leading-loose">
                {product.description ? (
                  <p className="whitespace-pre-wrap">{product.description}</p>
                ) : (
                  <p className="italic text-muted-foreground">Detailed description is not available for this item at the moment.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#C60] mb-4">Product Specifications</h2>
              <div className="border border-border rounded-lg overflow-hidden max-w-2xl">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-border">
                    {Object.entries(specifications).map(([key, value], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-muted/30" : "bg-white"}>
                        <th className="px-6 py-3 font-semibold text-foreground/90 w-1/3 bg-muted/50 border-r border-border">{key}</th>
                        <td className="px-6 py-3 text-foreground/80">{value as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
