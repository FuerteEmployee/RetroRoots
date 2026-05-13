import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getProduct } from "@/lib/api";
import { API_BASE_URL } from "@/contexts/AuthContext";
import { getImageUrl } from "@/lib/utils";
import ImageMagnifier from "@/components/ImageMagnifier";
import { Loader2, AlertCircle, ShoppingCart, Star, CheckCircle, Truck, XCircle, Plus, Minus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import catSofa from "@/assets/category-sofa.jpg";
import catDiningChair from "@/assets/category-dining-chair.png";
import catLounger from "@/assets/category-lounger.png";
import catLoungeChair from "@/assets/category-lounge-chair.jpg";



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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (product && product.variants?.length > 0) {
      // Find matching variant based on selections
      const match = product.variants.find((v: any) => 
        (v.seatingCapacity?.toLowerCase() === selectedSeat?.toLowerCase() || !selectedSeat) &&
        (v.color?.toLowerCase() === selectedColor?.toLowerCase() || !selectedColor) &&
        (v.size === selectedSize || !selectedSize) &&
        (v.type?.toLowerCase() === selectedType?.toLowerCase() || !selectedType)
      );
      
      if (match) {
        setSelectedVariant(match);
        if (match.images?.length > 0) {
          setSelectedImage(getImageUrl(match.images[0]));
        } else {
          // If variant has no specific image, try smart match or fallback
          findAndSetMatchingImage(selectedColor || selectedSeat || selectedSize);
        }
      } else {
        setSelectedVariant(null);
        setIsAvailable(false);
      }
    }
  }, [selectedSeat, selectedColor, selectedSize, selectedType, product]);

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

        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.seats?.length > 0) setSelectedSeat(data.seats[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
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





  // Smart image matcher (enhanced for variants)
  const findAndSetMatchingImage = (clickedOption: string) => {
    if (!clickedOption || !imagesList || imagesList.length === 0) return;
    const keyword = clickedOption.toLowerCase().trim();
    
    const currentSelections = {
      size: (selectedSize || "").toLowerCase().trim(),
      seat: (selectedSeat || "").toLowerCase().trim(),
      color: (selectedColor || "").toLowerCase().trim(),
      clicked: keyword
    };

    let bestMatch = null;
    let maxMatches = -1;

    imagesList.forEach((img: any) => {
      if (!img || !img.label || typeof img.label !== 'string') return;
      const labels = img.label.toLowerCase().split(",").map((l: string) => l.trim());
      
      let hasConflict = false;
      if (product.sizes) {
        product.sizes.forEach((s: string) => { 
          if (labels.includes(s.toLowerCase()) && s.toLowerCase() !== currentSelections.size && currentSelections.size) hasConflict = true; 
        });
      }
      if (product.seats) {
        product.seats.forEach((s: string) => { 
          if (labels.includes(s.toLowerCase()) && s.toLowerCase() !== currentSelections.seat && currentSelections.seat) hasConflict = true; 
        });
      }
      if (product.colors) {
        product.colors.forEach((c: string) => { 
          if (labels.includes(c.toLowerCase()) && c.toLowerCase() !== currentSelections.color && currentSelections.color) hasConflict = true; 
        });
      }

      if (hasConflict) return;

      const selectionsArray = [currentSelections.size, currentSelections.seat, currentSelections.color, currentSelections.clicked];
      const matchCount = selectionsArray.filter(s => s && labels.includes(s)).length;
      
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = img;
      }
    });

    if (bestMatch && maxMatches > 0) {
      setSelectedImage(getImageUrl(bestMatch));
      setIsAvailable(true);
    }
  };

  // Data preparation logic (moved up for scope visibility)
  const categoryName = product ? ((typeof product.categoryId === 'object' ? product.categoryId?.name : product.categoryId) ||
    (typeof product.category === 'object' ? product.category?.name : product.category) ||
    product.categoryName || "General") : "General";

  const imagesList = product?.images && product?.images.length > 0 ? product.images : (product?.image ? [product.image] : []);
  const variantPrice = (product?.variants && product.variants.length > 0) ? Number(product.variants[0].price) : 0;
  const currentPrice = product ? (Number(product.price) || variantPrice || 0) : 0;
  const inStock = product?.stock !== undefined ? Number(product.stock) > 0 : true;

  const getStockStatusLabel = () => {
    if (selectedVariant) {
      const stock = Number(selectedVariant.stock) || 0;
      if (stock > 5) return <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> In Stock</span>;
      if (stock > 0) return <span className="text-amber-600 font-bold flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Only {stock} left</span>;
      return <span className="text-rose-600 font-bold flex items-center gap-1"><XCircle className="w-4 h-4" /> Out of Stock</span>;
    }
    return inStock ? <span className="text-emerald-600 font-bold">In Stock</span> : <span className="text-rose-600 font-bold">Out of Stock</span>;
  };

  // Final safety check before complex render logic
  try {
    // Fallbacks for rich data
    const originalPrice = Number(product.mrp) || Math.floor(currentPrice * 1.15); 
    const discount = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

    const rating = Number(product.rating) || 4.5;
    const reviewsCount = Number(product.reviews) || Math.floor(Math.random() * 200) + 50;

    const features = product.features && Array.isArray(product.features) ? product.features : [
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
      <Layout title={`${product.name || 'Product'} | Retro Roots`} description={product.description || `View details for ${product.name}`}>
        <div className="relative py-10 md:py-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-black/80 z-0" />
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Product Details</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto">Discover premium craftsmanship</p>
          </div>
        </div>

        <section className="py-4 bg-background">
          <div className="container mx-auto px-4 max-w-7xl">

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">

              {/* Left Side: Image Gallery */}
              <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:sticky lg:top-24 h-fit relative z-10">
                <div className="w-full aspect-[4/5] bg-white rounded-2xl border border-border flex items-center justify-center p-4 shadow-xl group">
                  <ImageMagnifier
                    src={selectedImage || "/placeholder.svg"}
                    zoomSrc={selectedImage || "/placeholder.svg"}
                    alt={product.name || "Product"}
                    zoomLevel={2.5}
                  />
                  
                  {(!isAvailable || (selectedVariant ? selectedVariant.stock === 0 : !inStock)) && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none rounded-2xl">
                      <div className="bg-rose-600 text-white px-8 py-3 rounded-full font-black text-xl shadow-2xl transform -rotate-12 border-4 border-white animate-pulse">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
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
                          className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === url ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border opacity-70 hover:opacity-100'}`}
                        >
                          <img src={url} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Side: Info and Buy Box */}
              <div className="w-full lg:w-[55%] space-y-8">

                <div>
                  <Link to="/products" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest mb-3 block">
                    {categoryName}
                  </Link>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                    {product.name || "Product Name"}
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : i < rating ? 'fill-current opacity-50' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{rating} / 5.0 ({reviewsCount} verified reviews)</span>
                  </div>

                  <div className="flex items-end gap-3 mb-8">
                    <span className="text-4xl font-bold text-foreground">₹{(selectedVariant?.price || currentPrice).toLocaleString()}</span>
                    {discount > 0 && (
                      <>
                        <span className="text-lg text-muted-foreground line-through mb-1">₹{originalPrice.toLocaleString()}</span>
                        <Badge className="bg-emerald-100 text-emerald-700 mb-2 border-emerald-200">-{discount}% OFF</Badge>
                      </>
                    )}
                  </div>

                  <p className="text-foreground/70 leading-relaxed max-w-xl">
                    {product.description?.substring(0, 160) || "No description available."}...
                  </p>
                </div>

                <div className="space-y-8 p-6 bg-muted/30 rounded-3xl border border-border/50">
                  {/* Seating Capacity Selector */}
                  {product.seats && Array.isArray(product.seats) && product.seats.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Seating Capacity</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.seats.map((seat: string) => (
                          <button
                            key={seat}
                            onClick={() => {
                              setSelectedSeat(seat);
                              findAndSetMatchingImage(seat);
                            }}
                            className={`px-5 py-2.5 text-sm font-bold rounded-full border-2 transition-all duration-300 ${selectedSeat === seat ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-border bg-white hover:border-primary/50 text-foreground/70'}`}
                          >
                            {seat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selector */}
                  {product.colors && Array.isArray(product.colors) && product.colors.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Color Options</h3>
                      <div className="flex flex-wrap gap-4">
                        {product.colors.map((color: string) => {
                          const colorMap: Record<string, string> = {
                            "Beige": "#F5F5DC",
                            "Grey": "#808080",
                            "Brown": "#A52A2A",
                            "Black": "#000000",
                            "Cream": "#FFFDD0",
                            "Navy Blue": "#000080",
                            "Olive Green": "#808000"
                          };
                          const hex = colorMap[color] || color.toLowerCase();
                          
                          return (
                            <button
                              key={color}
                              onClick={() => {
                                setSelectedColor(color);
                                findAndSetMatchingImage(color);
                              }}
                              title={color}
                              className={`group relative flex flex-col items-center gap-2`}
                            >
                              <div className={`w-12 h-12 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${selectedColor === color ? 'border-primary scale-110 shadow-lg' : 'border-transparent hover:border-border scale-100'}`}>
                                <span 
                                  className="w-full h-full rounded-full border border-black/10 shadow-inner" 
                                  style={{ backgroundColor: hex }}
                                />
                              </div>
                              <span className={`text-[10px] font-bold uppercase transition-colors ${selectedColor === color ? 'text-primary' : 'text-muted-foreground'}`}>{color}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Size Selector */}
                  {product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Select Size</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size: string) => (
                          <button
                            key={size}
                            onClick={() => {
                              setSelectedSize(size);
                              findAndSetMatchingImage(size);
                            }}
                            className={`px-5 py-2.5 text-sm font-bold rounded-full border-2 transition-all duration-300 ${selectedSize === size ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-border bg-white hover:border-primary/50 text-foreground/70'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row items-center gap-6 pt-4 border-t border-border/50">
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quantity</Label>
                      <div className="flex items-center gap-1 p-1 bg-white rounded-full border-2 border-border w-fit shadow-sm">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors disabled:opacity-30 font-bold"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(selectedVariant?.stock || 99, quantity + 1))}
                          disabled={selectedVariant ? quantity >= selectedVariant.stock : false}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors font-bold"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 w-full space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Availability</span>
                          {getStockStatusLabel()}
                        </div>
                        {selectedVariant?.sku && (
                          <div className="text-right">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SKU</span>
                            <p className="text-sm font-mono font-bold">{selectedVariant.sku}</p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          disabled={!isAvailable || (selectedVariant ? selectedVariant.stock === 0 : !inStock)}
                          className="h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-muted disabled:text-muted-foreground"
                        >
                          {(!isAvailable || (selectedVariant ? selectedVariant.stock === 0 : !inStock)) ? (
                            <>
                              <XCircle className="w-5 h-5 mr-2" />
                              Sold Out
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-5 h-5 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline"
                          disabled={!isAvailable || (selectedVariant ? selectedVariant.stock === 0 : !inStock)}
                          className="h-14 rounded-full text-lg font-bold border-2 hover:bg-muted transition-all disabled:opacity-50"
                        >
                          {(!isAvailable || (selectedVariant ? selectedVariant.stock === 0 : !inStock)) ? "Notify Me" : "Buy Now"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <Truck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">5 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <Star className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Premium Quality</span>
                  </div>
                </div>

              </div>
            </div>

            <hr className="my-20 border-border/50" />

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
                          <td className="px-6 py-3 text-foreground/80">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
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
  } catch (renderError: any) {
    console.error("Critical render error:", renderError);
    return (
      <Layout title="Error" description="Something went wrong.">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">A technical error occurred while rendering this page.</p>
          <pre className="p-4 bg-muted rounded text-xs text-left overflow-auto max-w-full mb-6">
            {renderError.message || String(renderError)}
          </pre>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </Layout>
    );
  }
};

export default ProductDetail;
