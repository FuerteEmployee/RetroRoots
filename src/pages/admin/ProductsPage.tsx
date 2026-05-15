import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/lib/api";
import { getImageUrl, getProductDisplayImage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: any;
  industryTags: string[];
  description: string;
  aiMetaDescription: string;
  images: { url: string; publicId: string }[];
  image?: { url: string; publicId: string };
  variants?: any[];
  modelFile: { url: string; publicId: string } | null;
  videoUrl: string;
  specPdf: { url: string; publicId: string } | null;
  priceRange: string;
  sizes: string[];
  seats: string[];
  colors: string[];
  isVisible: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    apiRequest("/products")
      .then(setProducts)
      .catch(() => toast({ title: "Error", description: "Failed to load products", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiRequest(`/products/${id}`, { method: "DELETE" });
      toast({ title: "Deleted", description: "Product deleted" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // Search logic
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => navigate("/admin/products/add")} className="shrink-0">
            <Plus size={16} className="mr-1" /> Add Product
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            {search ? `No products matching "${search}"` : "No products yet. Add your first product."}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold text-muted-foreground">Image</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Name</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground hidden md:table-cell">SKU</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground hidden lg:table-cell">Category</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedProducts.map((p) => {
                    const displayImage = getProductDisplayImage(p);
                    return (
                      <tr key={p._id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          {displayImage ? (
                            <img src={getImageUrl(displayImage)} className="w-12 h-12 rounded-lg object-cover border border-border" alt="" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-[10px] text-center px-1">No Image</div>
                          )}
                        </td>
                        <td className="p-4 font-medium text-card-foreground">
                          <div className="flex flex-col">
                            <span>{p.name}</span>
                            <span className="text-[10px] text-muted-foreground md:hidden">{p.sku}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell font-mono text-xs">{p.sku || "-"}</td>
                        <td className="p-4 text-muted-foreground hidden lg:table-cell">{p.category?.name || "-"}</td>
                        <td className="p-4">
                          {p.isVisible ? (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500"><Eye size={12} /> Visible</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground"><EyeOff size={12} /> Hidden</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                              title="Edit Product"
                              className="p-2 text-muted-foreground hover:text- hover:bg-primary/5 rounded-md transition-all"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(p._id)}
                              title="Delete Product"
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-md transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="font-medium">{filteredProducts.length}</span> products
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft size={16} />
                  </Button>

                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Show limited page numbers if there are too many
                      if (totalPages > 7 && Math.abs(page - currentPage) > 2 && page !== 1 && page !== totalPages) {
                        if (Math.abs(page - currentPage) === 3) return <span key={page} className="text-muted-foreground">...</span>;
                        return null;
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`h-8 w-8 p-0 text-xs ${currentPage === page ? 'shadow-md' : ''}`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

