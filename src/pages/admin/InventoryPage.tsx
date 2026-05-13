import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  Edit, 
  ArrowUpDown, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Download
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/contexts/AuthContext";
import { getImageUrl } from "@/lib/utils";

const InventoryPage = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateStockValue, setUpdateStockValue] = useState(0);
  const { toast } = useToast();

  // Filters
  const [filterColor, setFilterColor] = useState("");
  const [filterCapacity, setFilterCapacity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("retroroots_token");
      const response = await fetch(`${API_BASE_URL}/inventory`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      toast({
        title: "Error",
        description: "Failed to load inventory data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleUpdateStock = async () => {
    if (!selectedVariant) return;
    
    try {
      const token = localStorage.getItem("retroroots_token");
      const response = await fetch(`${API_BASE_URL}/inventory/${selectedVariant.productId}/${selectedVariant._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ stock: updateStockValue })
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Stock updated successfully",
        });
        setIsUpdateModalOpen(false);
        fetchInventory();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stock",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" /> In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"><AlertTriangle className="w-3 h-3 mr-1" /> Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200"><XCircle className="w-3 h-3 mr-1" /> Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const safeInventory = Array.isArray(inventory) ? inventory : [];

  const filteredInventory = safeInventory.filter(item => {
    const matchesSearch = 
      item.productName?.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase());
    
    const matchesColor = filterColor ? item.color === filterColor : true;
    const matchesCapacity = filterCapacity ? item.seatingCapacity === filterCapacity : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;

    return matchesSearch && matchesColor && matchesCapacity && matchesStatus;
  });

  // Final safety check before render
  try {
    const lowStockCount = safeInventory.filter(item => item.status === "Low Stock").length;
    const outOfStockCount = safeInventory.filter(item => item.status === "Out of Stock").length;

    return (
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage stock across all product variants.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => {}}>
              <Download className="w-4 h-4 mr-2" /> Export Excel
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Variants</p>
            <p className="text-2xl font-bold mt-1">{safeInventory.length}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Low Stock Alerts</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
              {lowStockCount > 0 && <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 animate-pulse">Action Required</Badge>}
            </div>
          </div>
          <div className="bg-card p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Out of Stock</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{outOfStockCount}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Stock Value</p>
            <p className="text-2xl font-bold mt-1">₹ {safeInventory.reduce((acc, item) => acc + (item.price || 0) * item.stock, 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card p-4 rounded-xl border shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by product name or SKU..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select 
                className="px-3 py-2 rounded-md border bg-background text-sm outline-none"
                value={filterColor}
                onChange={(e) => setFilterColor(e.target.value)}
              >
                <option value="">All Colors</option>
                {Array.from(new Set(safeInventory.map(i => i.color))).filter(Boolean).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select 
                className="px-3 py-2 rounded-md border bg-background text-sm outline-none"
                value={filterCapacity}
                onChange={(e) => setFilterCapacity(e.target.value)}
              >
                <option value="">All Capacities</option>
                {Array.from(new Set(safeInventory.map(i => i.seatingCapacity))).filter(Boolean).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select 
                className="px-3 py-2 rounded-md border bg-background text-sm outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <Button variant="ghost" size="sm" onClick={() => {setSearch(""); setFilterColor(""); setFilterCapacity(""); setFilterStatus("");}}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product & SKU</TableHead>
                <TableHead>Variant Details</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Loading inventory...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No products found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => (
                  <TableRow key={item._id} className="group">
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg bg-muted border overflow-hidden">
                        <img 
                          src={
                            (item.images && item.images.length > 0) ? getImageUrl(item.images[0]) : 
                            (item.productImages && item.productImages.length > 0) ? getImageUrl(item.productImages[0]) : 
                            "/placeholder.svg"
                          } 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{item.productName}</span>
                        <span className="text-xs text-muted-foreground font-mono">{item.sku || "NO-SKU"}</span>
                        <span className="text-[10px] text-primary/70 uppercase mt-0.5">{item.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.seatingCapacity && <Badge variant="secondary" className="text-[10px] h-5">{item.seatingCapacity}</Badge>}
                        {item.color && <Badge variant="secondary" className="text-[10px] h-5">{item.color}</Badge>}
                        {item.size && <Badge variant="secondary" className="text-[10px] h-5">{item.size}</Badge>}
                        {item.type && <Badge variant="secondary" className="text-[10px] h-5">{item.type}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={item.stock <= 5 ? "text-amber-600 font-bold" : ""}>
                        {item.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.soldQuantity || 0}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedVariant(item);
                            setUpdateStockValue(item.stock);
                            setIsUpdateModalOpen(true);
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Update Stock Modal */}
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Inventory</DialogTitle>
            </DialogHeader>
            {selectedVariant && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-16 h-16 rounded border overflow-hidden shrink-0">
                    <img src={selectedVariant.images?.[0]?.url || "/placeholder.svg"} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{selectedVariant.productName}</h4>
                    <p className="text-xs text-muted-foreground">{selectedVariant.seatingCapacity} | {selectedVariant.color} | {selectedVariant.size}</p>
                    <p className="text-xs font-mono mt-1">SKU: {selectedVariant.sku}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Adjust Available Stock</label>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setUpdateStockValue(prev => Math.max(0, prev - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input 
                      type="number" 
                      className="text-center font-bold text-lg" 
                      value={updateStockValue}
                      onChange={(e) => setUpdateStockValue(parseInt(e.target.value) || 0)}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setUpdateStockValue(prev => prev + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>Current: {selectedVariant.stock}</span>
                    <span className={updateStockValue !== selectedVariant.stock ? "text-primary font-bold" : ""}>
                      New: {updateStockValue}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateStock}>Update Inventory</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  } catch (error) {
    console.error("InventoryPage render error:", error);
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-destructive mb-2">Inventory System Error</h2>
        <p className="text-muted-foreground mb-4">An error occurred while loading the inventory dashboard.</p>
        <pre className="p-4 bg-muted rounded text-xs text-left inline-block max-w-full">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
};

export default InventoryPage;
