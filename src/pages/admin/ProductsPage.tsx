import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: any;
  industryTags: string[];
  description: string;
  aiMetaDescription: string;
  images: { url: string; publicId: string }[];
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <Button onClick={() => navigate("/admin/products/add")}>
          <Plus size={16} /> Add Product
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No products yet. Add your first product.</div>
        ) : (
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
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      {p.images?.[0] ? (
                        <img src={getImageUrl(p.images[0])} className="w-12 h-12 rounded-lg object-cover border border-border" alt="" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-[10px]">No Image</div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-card-foreground">{p.name}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.sku || "-"}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{p.category?.name || "-"}</td>
                    <td className="p-4">
                      {p.isVisible ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-success/10 text-success"><Eye size={12} /> Visible</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground"><EyeOff size={12} /> Hidden</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end">
                        <button onClick={() => navigate(`/admin/products/edit/${p._id}`)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(p._id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

