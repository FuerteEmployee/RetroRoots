// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { apiRequest, uploadFile } from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";
// import { Badge } from "@/components/ui/badge";
// import { ArrowLeft, Loader2, X, Plus } from "lucide-react";

// const TagInput = ({ label, values, onChange, placeholder }: { label: string; values: string[]; onChange: (vals: string[]) => void; placeholder?: string }) => {
//   const [input, setInput] = useState("");

//   const add = () => {
//     const trimmed = input.trim();
//     if (trimmed && !values.includes(trimmed)) {
//       onChange([...values, trimmed]);
//       setInput("");
//     }
//   };

//   const remove = (val: string) => {
//     onChange(values.filter(v => v !== val));
//   };

//   return (
//     <div className="space-y-2">
//       <Label className="text-sm font-medium">{label}</Label>
//       <div className="flex gap-2">
//         <Input 
//           value={input} 
//           onChange={e => setInput(e.target.value)} 
//           onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} 
//           placeholder={placeholder} 
//           className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
//         />
//         <Button type="button" variant="secondary" onClick={add} size="icon" className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
//           <Plus size={18} />
//         </Button>
//       </div>
//       <div className="flex flex-wrap gap-2 min-h-[36px] p-2 bg-muted/20 rounded-lg border border-border/30">
//         {values.length === 0 && <span className="text-xs text-muted-foreground italic">No items added yet</span>}
//         {values.map((v, i) => (
//           <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1 gap-1 h-7 bg-background border-border shadow-sm hover:border-primary/30 transition-all animate-in fade-in zoom-in duration-200">
//             {v}
//             <button type="button" onClick={() => remove(v)} className="hover:text-destructive p-0.5 rounded-full hover:bg-destructive/10 transition-colors">
//               <X size={12} />
//             </button>
//           </Badge>
//         ))}
//       </div>
//     </div>
//   );
// };

// const AddProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState<any>({
//     name: "", sku: "", category: "", industryTags: [],
//     description: "", aiMetaDescription: "", videoUrl: "", priceRange: "", 
//     sizes: [], seats: [], colors: [], isVisible: true,
//     variants: [],
//   });
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [existingImages, setExistingImages] = useState<{ url: string; publicId: string; label?: string }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const cats = await apiRequest("/categories");
//         setCategories(cats);

//         if (id) {
//           const p = await apiRequest(`/products/${id}`);
//           setForm({
//             name: p.name, sku: p.sku || "", category: p.category?._id || p.category || "",
//             industryTags: p.industryTags || [], description: p.description || "",
//             aiMetaDescription: p.aiMetaDescription || "", videoUrl: p.videoUrl || "",
//             priceRange: p.priceRange || "", 
//             sizes: p.sizes || [],
//             seats: p.seats || [],
//             colors: p.colors || [],
//             isVisible: p.isVisible,
//             variants: p.variants || [],
//           });
//           setExistingImages(p.images || []);
//         }
//       } catch (err) {
//         toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name) {
//       toast({ title: "Error", description: "Product name is required", variant: "destructive" });
//       return;
//     }
//     setSaving(true);
//     try {
//       let images = [...existingImages];
//       for (const file of imageFiles) {
//         const uploaded = await uploadFile(file);
//         images.push(uploaded);
//       }

//       const body = {
//         ...form,
//         industryTags: form.industryTags,
//         sizes: form.sizes,
//         seats: form.seats,
//         colors: form.colors,
//         images,
//         category: form.category || undefined,
//       };

//       if (id) {
//         await apiRequest(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) });
//         toast({ title: "Updated", description: "Product updated successfully" });
//       } else {
//         await apiRequest("/products", { method: "POST", body: JSON.stringify(body) });
//         toast({ title: "Created", description: "Product created successfully" });
//       }
//       navigate("/admin/products");
//     } catch (err: any) {
//       toast({ title: "Error", description: err.message, variant: "destructive" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const generateVariations = () => {
//     const { sizes, seats, colors, sku: parentSku } = form;

//     if (sizes.length === 0 && seats.length === 0 && colors.length === 0) {
//       toast({ title: "Error", description: "Please add at least one Size, Seat, or Color first", variant: "destructive" });
//       return;
//     }

//     const newVariants = [...(form.variants || [])];

//     const sizeArr = sizes.length ? sizes : [""];
//     const seatArr = seats.length ? seats : [""];
//     const colorArr = colors.length ? colors : [""];

//     let count = 0;
//     sizeArr.forEach(size => {
//       seatArr.forEach(seat => {
//         colorArr.forEach(color => {
//           const exists = newVariants.some(v => 
//             (v.size || "") === size && 
//             (v.seatingCapacity || "") === seat && 
//             (v.color || "") === color
//           );

//           if (!exists) {
//             const skuSuffix = `${size ? '-' + size : ''}${seat ? '-' + seat : ''}${color ? '-' + color : ''}`.replace(/\s+/g, '').replace(/\*/g, 'x');
//             newVariants.push({
//               size,
//               seatingCapacity: seat,
//               color,
//               sku: parentSku ? `${parentSku}${skuSuffix}` : `SKU-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
//               price: 0,
//               stock: 0,
//               images: [],
//               isVisible: true
//             });
//             count++;
//           }
//         });
//       });
//     });

//     setForm({ ...form, variants: newVariants });
//     if (count > 0) {
//       toast({ title: "Variations Generated", description: `Added ${count} new combinations.` });
//     } else {
//       toast({ title: "No New Variations", description: "All possible combinations already exist." });
//     }
//   };

//   const handleBulkUpdate = (field: "price" | "stock", value: number) => {
//     const newVariants = form.variants.map((v: any) => ({ ...v, [field]: value }));
//     setForm({ ...form, variants: newVariants });
//     toast({ title: "Bulk Update", description: `Updated ${field} for all variations.` });
//   };

//   const handleVariantImageUpload = async (idx: number, files: FileList | null) => {
//     if (!files) return;
//     const variant = { ...form.variants[idx] };
//     const newImages = [...(variant.images || [])];

//     toast({ title: "Uploading...", description: "Please wait while images are uploaded." });

//     try {
//       for (let i = 0; i < files.length; i++) {
//         const uploaded = await uploadFile(files[i]);
//         newImages.push(uploaded);
//       }
//       const newVariants = [...form.variants];
//       newVariants[idx] = { ...variant, images: newImages };
//       setForm({ ...form, variants: newVariants });
//       toast({ title: "Success", description: "Variant images uploaded." });
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to upload variant images.", variant: "destructive" });
//     }
//   };

//   const removeVariantImage = (vIdx: number, imgIdx: number) => {
//     const newVariants = [...form.variants];
//     newVariants[vIdx].images = newVariants[vIdx].images.filter((_: any, i: number) => i !== imgIdx);
//     setForm({ ...form, variants: newVariants });
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-primary" size={40} /></div>;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" size="icon" onClick={() => navigate("/admin/products")}><ArrowLeft size={16} /></Button>
//         <h1 className="text-2xl font-bold text-foreground">{id ? "Edit" : "Add"} Product</h1>
//       </div>

//       <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label>Name *</Label>
//             <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" />
//           </div>
//           <div>
//             <Label>SKU</Label>
//             <Input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="mt-1" />
//           </div>
//           <div>
//             <Label>Category</Label>
//             <select
//               value={form.category}
//               onChange={e => setForm({ ...form, category: e.target.value })}
//               className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
//             >
//               <option value="">Select Category</option>
//               {categories.filter(c => c.type === "category").map(c => (
//                 <option key={c._id} value={c._id}>{c.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <TagInput 
//               label="Industry Tags" 
//               values={form.industryTags} 
//               onChange={vals => setForm({ ...form, industryTags: vals })} 
//               placeholder="e.g. Kitchen, Hospital, Hotel" 
//             />
//           </div>
//           <div className="md:col-span-2">
//             <Label>Description</Label>
//             <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={4} />
//           </div>
//           <div className="md:col-span-2">
//             <Label>AI Meta Description</Label>
//             <Textarea value={form.aiMetaDescription} onChange={e => setForm({ ...form, aiMetaDescription: e.target.value })} className="mt-1" rows={2} />
//           </div>
//           <div>
//             <Label>Video URL</Label>
//             <Input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} className="mt-1" />
//           </div>
//           <div>
//             <Label>Price Range</Label>
//             <Input value={form.priceRange} onChange={e => setForm({ ...form, priceRange: e.target.value })} className="mt-1" />
//           </div>
//           <div>
//             <TagInput 
//               label="Sizes" 
//               values={form.sizes} 
//               onChange={vals => setForm({ ...form, sizes: vals })} 
//               placeholder="e.g. 200*200, 200*400" 
//             />
//           </div>
//           <div>
//             <TagInput 
//               label="Seating Capacity" 
//               values={form.seats} 
//               onChange={vals => setForm({ ...form, seats: vals })} 
//               placeholder="e.g. 1 Seater, 2 Seater" 
//             />
//           </div>
//           <div>
//             <TagInput 
//               label="Colors" 
//               values={form.colors} 
//               onChange={vals => setForm({ ...form, colors: vals })} 
//               placeholder="e.g. Beige, Grey, Black" 
//             />
//           </div>
//           <div className="md:col-span-2">
//             <Label>Images</Label>
//             {existingImages.length > 0 && (
//               <div className="flex flex-wrap gap-3 my-3">
//                 {existingImages.map((img, i) => (
//                   <div key={i} className="relative w-32 group">
//                     <div className="w-32 h-32 rounded-lg overflow-hidden border border-border">
//                       <img src={img.url} className="w-full h-full object-cover" alt="" />
//                       <button type="button" onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))} className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
//                     </div>
//                     <Input 
//                       placeholder="Label (e.g. Black)" 
//                       value={img.label || ""} 
//                       onChange={e => {
//                         const newImages = [...existingImages];
//                         newImages[i].label = e.target.value;
//                         setExistingImages(newImages);
//                       }}
//                       className="mt-1 h-7 text-[10px] px-2"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//             <Input type="file" accept="image/*" multiple onChange={e => setImageFiles(Array.from(e.target.files || []))} className="mt-1" />
//           </div>
//           <div className="md:col-span-2 space-y-6 pt-6 border-t border-border">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <h3 className="text-xl font-bold">Product Variations</h3>
//                 <p className="text-sm text-muted-foreground">Manage individual combinations of size, seat, and color.</p>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <Button type="button" variant="outline" size="sm" onClick={() => {
//                   const newVariants = [...(form.variants || [])];
//                   newVariants.push({ seatingCapacity: "", color: "", size: "", type: "", sku: "", stock: 0, price: 0, images: [], isVisible: true });
//                   setForm({ ...form, variants: newVariants });
//                 }}>
//                   <Plus size={16} className="mr-2" /> Add Manual
//                 </Button>
//                 <Button type="button" onClick={generateVariations} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
//                   <Plus size={16} className="mr-2" /> Generate All Variations
//                 </Button>
//               </div>
//             </div>

//             {form.variants?.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-xl border border-dashed border-border/50">
//                 <div className="space-y-2">
//                   <Label className="text-xs uppercase font-black text-muted-foreground">Bulk Update Price</Label>
//                   <div className="flex gap-2">
//                     <Input type="number" placeholder="Enter price" id="bulk-price" className="h-9" />
//                     <Button type="button" variant="outline" size="sm" onClick={() => {
//                       const val = (document.getElementById("bulk-price") as HTMLInputElement).value;
//                       if (val) handleBulkUpdate("price", parseInt(val));
//                     }}>Apply</Button>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-xs uppercase font-black text-muted-foreground">Bulk Update Stock</Label>
//                   <div className="flex gap-2">
//                     <Input type="number" placeholder="Enter stock" id="bulk-stock" className="h-9" />
//                     <Button type="button" variant="outline" size="sm" onClick={() => {
//                       const val = (document.getElementById("bulk-stock") as HTMLInputElement).value;
//                       if (val) handleBulkUpdate("stock", parseInt(val));
//                     }}>Apply</Button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="grid grid-cols-1 gap-6">
//               {form.variants?.map((v: any, idx: number) => (
//                 <div key={idx} className="p-5 border rounded-2xl bg-card shadow-sm space-y-4 relative group hover:border-primary/30 transition-all">
//                   <div className="flex items-center justify-between border-b pb-3 mb-3">
//                     <div className="flex items-center gap-3">
//                       <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{idx + 1}</span>
//                       <h4 className="font-bold text-sm">
//                         {[v.size, v.seatingCapacity, v.color].filter(Boolean).join(" / ") || "New Variation"}
//                       </h4>
//                     </div>
//                     <button 
//                       type="button" 
//                       onClick={() => {
//                         const newVariants = [...form.variants];
//                         newVariants.splice(idx, 1);
//                         setForm({ ...form, variants: newVariants });
//                       }}
//                       className="text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                     <div className="col-span-2 md:col-span-1">
//                       <Label className="text-[10px] uppercase font-black text-muted-foreground">Size</Label>
//                       <Input value={v.size} onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].size = e.target.value;
//                         setForm({ ...form, variants: newVariants });
//                       }} className="h-9 text-sm" placeholder="e.g. 200*200" />
//                     </div>
//                     <div className="col-span-2 md:col-span-1">
//                       <Label className="text-[10px] uppercase font-black text-muted-foreground">Seats</Label>
//                       <Input value={v.seatingCapacity} onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].seatingCapacity = e.target.value;
//                         setForm({ ...form, variants: newVariants });
//                       }} className="h-9 text-sm" placeholder="e.g. 3 Seater" />
//                     </div>
//                     <div className="col-span-2 md:col-span-1">
//                       <Label className="text-[10px] uppercase font-black text-muted-foreground">Color</Label>
//                       <Input value={v.color} onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].color = e.target.value;
//                         setForm({ ...form, variants: newVariants });
//                       }} className="h-9 text-sm" placeholder="e.g. Black" />
//                     </div>
//                     <div className="col-span-2 md:col-span-1">
//                       <Label className="text-[10px] uppercase font-black text-muted-foreground">SKU</Label>
//                       <Input value={v.sku} onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].sku = e.target.value;
//                         setForm({ ...form, variants: newVariants });
//                       }} className="h-9 text-sm" />
//                     </div>
//                     <div>
//                       <Label className="text-[10px] uppercase font-black text-muted-foreground">Stock</Label>
//                       <Input type="number" value={v.stock} onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].stock = parseInt(e.target.value) || 0;
//                         setForm({ ...form, variants: newVariants });
//                       }} className="h-9 text-sm" />
//                     </div>
//                     <div>
//                       <Label className="text-[10px] uppercase font-black text-muted-foreground">Price</Label>
//                       <Input type="number" value={v.price} onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].price = parseInt(e.target.value) || 0;
//                         setForm({ ...form, variants: newVariants });
//                       }} className="h-9 text-sm" />
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <Label className="text-[10px] uppercase font-black text-muted-foreground block">Variation Images</Label>
//                     <div className="flex flex-wrap gap-3">
//                       {v.images?.map((img: any, imgIdx: number) => (
//                         <div key={imgIdx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group/img">
//                           <img src={img.url} className="w-full h-full object-cover" alt="" />
//                           <button 
//                             type="button" 
//                             onClick={() => removeVariantImage(idx, imgIdx)}
//                             className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
//                           >
//                             <X size={10} />
//                           </button>
//                         </div>
//                       ))}
//                       <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center relative hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden">
//                         <Plus size={20} className="text-muted-foreground" />
//                         <span className="text-[10px] text-muted-foreground font-medium">Add</span>
//                         <input 
//                           type="file" 
//                           multiple 
//                           accept="image/*"
//                           onChange={e => handleVariantImageUpload(idx, e.target.files)}
//                           className="absolute inset-0 opacity-0 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 pt-2">
//                     <input 
//                       type="checkbox" 
//                       checked={v.isVisible !== false} 
//                       onChange={e => {
//                         const newVariants = [...form.variants];
//                         newVariants[idx].isVisible = e.target.checked;
//                         setForm({ ...form, variants: newVariants });
//                       }} 
//                       id={`visible-${idx}`}
//                       className="rounded" 
//                     />
//                     <Label htmlFor={`visible-${idx}`} className="text-xs">Active variation</Label>
//                   </div>
//                 </div>
//               ))}
//               {(!form.variants || form.variants.length === 0) && (
//                 <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-muted/10 text-muted-foreground">
//                   <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
//                     <Plus size={24} />
//                   </div>
//                   <h5 className="font-bold text-foreground">No Variations Yet</h5>
//                   <p className="text-sm max-w-xs mx-auto">Add sizes, seats, and colors above then click "Generate" to create combinations automatically.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <input type="checkbox" checked={form.isVisible} onChange={e => setForm({ ...form, isVisible: e.target.checked })} id="visible" className="rounded" />
//             <Label htmlFor="visible">Visible on website</Label>
//           </div>

//           <div className="md:col-span-2 flex gap-3 pt-6 border-t border-border">
//             <Button type="submit" disabled={saving} className="min-w-[140px]">
//               {saving ? <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</> : id ? "Update Product" : "Add Product"}
//             </Button>
//             <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>Cancel</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, X, Plus } from "lucide-react";

const TagInput = ({ label, values, onChange, placeholder }: { label: string; values: string[]; onChange: (vals: string[]) => void; placeholder?: string }) => {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
      setInput("");
    }
  };

  const remove = (val: string) => {
    onChange(values.filter(v => v !== val));
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
        />
        <Button type="button" variant="secondary" onClick={add} size="icon" className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
          <Plus size={18} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[36px] p-2 bg-muted/20 rounded-lg border border-border/30">
        {values.length === 0 && <span className="text-xs text-muted-foreground italic">No items added yet</span>}
        {values.map((v, i) => (
          <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1 gap-1 h-7 bg-background border-border shadow-sm hover:border-primary/30 transition-all animate-in fade-in zoom-in duration-200">
            {v}
            <button type="button" onClick={() => remove(v)} className="hover:text-destructive p-0.5 rounded-full hover:bg-destructive/10 transition-colors">
              <X size={12} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({
    name: "", sku: "", category: "", industryTags: [],
    description: "", aiMetaDescription: "", videoUrl: "", priceRange: "",
    sizes: [], seats: [], colors: [], isVisible: true,
    variants: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [newImageLabels, setNewImageLabels] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string; label?: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await apiRequest("/categories");
        setCategories(cats);

        if (id) {
          const p = await apiRequest(`/products/${id}`);
          setForm({
            name: p.name, sku: p.sku || "", category: p.category?._id || p.category || "",
            industryTags: p.industryTags || [], description: p.description || "",
            aiMetaDescription: p.aiMetaDescription || "", videoUrl: p.videoUrl || "",
            priceRange: p.priceRange || "",
            sizes: p.sizes || [],
            seats: p.seats || [],
            colors: p.colors || [],
            isVisible: p.isVisible,
            variants: p.variants || [],
          });
          setExistingImages(p.images || []);
        }
      } catch (err) {
        toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast({ title: "Error", description: "Product name is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      let images = [...existingImages];
      for (let i = 0; i < imageFiles.length; i++) {
        const uploaded = await uploadFile(imageFiles[i]);
        uploaded.label = newImageLabels[i] || "";
        images.push(uploaded);
      }

      const body = {
        ...form,
        industryTags: form.industryTags,
        sizes: form.sizes,
        seats: form.seats,
        colors: form.colors,
        images,
        category: form.category || undefined,
      };

      if (id) {
        await apiRequest(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) });
        toast({ title: "Updated", description: "Product updated successfully" });
      } else {
        await apiRequest("/products", { method: "POST", body: JSON.stringify(body) });
        toast({ title: "Created", description: "Product created successfully" });
      }
      navigate("/admin/products");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const generateVariations = () => {
    const { sizes, seats, colors, sku: parentSku } = form;

    if (sizes.length === 0 && seats.length === 0 && colors.length === 0) {
      toast({ title: "Error", description: "Please add at least one Size, Seat, or Color first", variant: "destructive" });
      return;
    }

    const newVariants = [...(form.variants || [])];

    const sizeArr = sizes.length ? sizes : [""];
    const seatArr = seats.length ? seats : [""];
    const colorArr = colors.length ? colors : [""];

    let count = 0;
    sizeArr.forEach(size => {
      seatArr.forEach(seat => {
        colorArr.forEach(color => {
          const exists = newVariants.some(v =>
            (v.size || "") === size &&
            (v.seatingCapacity || "") === seat &&
            (v.color || "") === color
          );

          if (!exists) {
            const skuSuffix = `${size ? '-' + size : ''}${seat ? '-' + seat : ''}${color ? '-' + color : ''}`.replace(/\s+/g, '').replace(/\*/g, 'x');
            newVariants.push({
              size,
              seatingCapacity: seat,
              color,
              sku: parentSku ? `${parentSku}${skuSuffix}` : `SKU-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
              price: 0,
              stock: 0,
              images: [],
              isVisible: true
            });
            count++;
          }
        });
      });
    });

    setForm({ ...form, variants: newVariants });
    if (count > 0) {
      toast({ title: "Variations Generated", description: `Added ${count} new combinations.` });
    } else {
      toast({ title: "No New Variations", description: "All possible combinations already exist." });
    }
  };

  const handleBulkUpdate = (field: "price" | "stock", value: number) => {
    const newVariants = form.variants.map((v: any) => ({ ...v, [field]: value }));
    setForm({ ...form, variants: newVariants });
    toast({ title: "Bulk Update", description: `Updated ${field} for all variations.` });
  };

  const handleVariantImageUpload = async (idx: number, files: FileList | null) => {
    if (!files) return;
    const variant = { ...form.variants[idx] };
    const newImages = [...(variant.images || [])];

    toast({ title: "Uploading...", description: "Please wait while images are uploaded." });

    try {
      for (let i = 0; i < files.length; i++) {
        const uploaded = await uploadFile(files[i]);
        newImages.push(uploaded);
      }
      const newVariants = [...form.variants];
      newVariants[idx] = { ...variant, images: newImages };
      setForm({ ...form, variants: newVariants });
      toast({ title: "Success", description: "Variant images uploaded." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to upload variant images.", variant: "destructive" });
    }
  };

  const removeVariantImage = (vIdx: number, imgIdx: number) => {
    const newVariants = [...form.variants];
    newVariants[vIdx].images = newVariants[vIdx].images.filter((_: any, i: number) => i !== imgIdx);
    setForm({ ...form, variants: newVariants });
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/products")}><ArrowLeft size={16} /></Button>
        <h1 className="text-2xl font-bold text-foreground">{id ? "Edit" : "Add"} Product</h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Name *</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label>SKU</Label>
            <Input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label>Category</Label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select Category</option>
              {categories.filter(c => c.type === "category").map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <TagInput
              label="Industry Tags"
              values={form.industryTags}
              onChange={vals => setForm({ ...form, industryTags: vals })}
              placeholder="e.g. Kitchen, Hospital, Hotel"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={4} />
          </div>
          <div className="md:col-span-2">
            <Label>AI Meta Description</Label>
            <Textarea value={form.aiMetaDescription} onChange={e => setForm({ ...form, aiMetaDescription: e.target.value })} className="mt-1" rows={2} />
          </div>
          <div>
            <Label>Video URL</Label>
            <Input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label>Price Range</Label>
            <Input value={form.priceRange} onChange={e => setForm({ ...form, priceRange: e.target.value })} className="mt-1" />
          </div>
          <div>
            <TagInput
              label="Sizes"
              values={form.sizes}
              onChange={vals => setForm({ ...form, sizes: vals })}
              placeholder="e.g. 200*200, 200*400"
            />
          </div>
          <div>
            <TagInput
              label="Seating Capacity"
              values={form.seats}
              onChange={vals => setForm({ ...form, seats: vals })}
              placeholder="e.g. 1 Seater, 2 Seater"
            />
          </div>
          <div>
            <TagInput
              label="Colors"
              values={form.colors}
              onChange={vals => setForm({ ...form, colors: vals })}
              placeholder="e.g. Beige, Grey, Black"
            />
          </div>

          {/* ── Images ── */}
          <div className="md:col-span-2">
            <Label>Images</Label>

            {/* Already-saved images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-3 my-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative w-32 group">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-border relative">
                      <img src={img.url} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <Input
                      placeholder="Label (e.g. Black)"
                      value={img.label || ""}
                      onChange={e => {
                        const newImages = [...existingImages];
                        newImages[i].label = e.target.value;
                        setExistingImages(newImages);
                      }}
                      className="mt-1 h-7 text-[10px] px-2"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Instant previews for newly selected (not yet uploaded) files */}
            {imageFiles.length > 0 && (
              <div className="flex flex-wrap gap-3 my-3">
                {imageFiles.map((file, i) => (
                  <div key={i} className="relative w-32 group">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-primary/50 relative bg-muted/10">
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      {/* NEW badge */}
                      <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        NEW
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setImageFiles(imageFiles.filter((_, j) => j !== i));
                          setNewImageLabels(newImageLabels.filter((_, j) => j !== i));
                        }}
                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <Input
                      placeholder="Label (e.g. Black)"
                      value={newImageLabels[i] || ""}
                      onChange={e => {
                        const updated = [...newImageLabels];
                        updated[i] = e.target.value;
                        setNewImageLabels(updated);
                      }}
                      className="mt-1 h-7 text-[10px] px-2"
                    />
                  </div>
                ))}
              </div>
            )}

            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setImageFiles(prev => [...prev, ...files]);
                setNewImageLabels(prev => [...prev, ...files.map(() => "")]);
                // reset so same file can be picked again if needed
                e.target.value = "";
              }}
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2 space-y-6 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Product Variations</h3>
                <p className="text-sm text-muted-foreground">Manage individual combinations of size, seat, and color.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => {
                  const newVariants = [...(form.variants || [])];
                  newVariants.push({ seatingCapacity: "", color: "", size: "", type: "", sku: "", stock: 0, price: 0, images: [], isVisible: true });
                  setForm({ ...form, variants: newVariants });
                }}>
                  <Plus size={16} className="mr-2" /> Add Manual
                </Button>
                <Button type="button" onClick={generateVariations} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                  <Plus size={16} className="mr-2" /> Generate All Variations
                </Button>
              </div>
            </div>

            {form.variants?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-xl border border-dashed border-border/50">
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-black text-muted-foreground">Bulk Update Price</Label>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Enter price" id="bulk-price" className="h-9" />
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      const val = (document.getElementById("bulk-price") as HTMLInputElement).value;
                      if (val) handleBulkUpdate("price", parseInt(val));
                    }}>Apply</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-black text-muted-foreground">Bulk Update Stock</Label>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Enter stock" id="bulk-stock" className="h-9" />
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      const val = (document.getElementById("bulk-stock") as HTMLInputElement).value;
                      if (val) handleBulkUpdate("stock", parseInt(val));
                    }}>Apply</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              {form.variants?.map((v: any, idx: number) => (
                <div key={idx} className="p-5 border rounded-2xl bg-card shadow-sm space-y-4 relative group hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{idx + 1}</span>
                      <h4 className="font-bold text-sm">
                        {[v.size, v.seatingCapacity, v.color].filter(Boolean).join(" / ") || "New Variation"}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newVariants = [...form.variants];
                        newVariants.splice(idx, 1);
                        setForm({ ...form, variants: newVariants });
                      }}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label className="text-[10px] uppercase font-black text-muted-foreground">Size</Label>
                      <Input value={v.size} onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].size = e.target.value;
                        setForm({ ...form, variants: newVariants });
                      }} className="h-9 text-sm" placeholder="e.g. 200*200" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label className="text-[10px] uppercase font-black text-muted-foreground">Seats</Label>
                      <Input value={v.seatingCapacity} onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].seatingCapacity = e.target.value;
                        setForm({ ...form, variants: newVariants });
                      }} className="h-9 text-sm" placeholder="e.g. 3 Seater" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label className="text-[10px] uppercase font-black text-muted-foreground">Color</Label>
                      <Input value={v.color} onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].color = e.target.value;
                        setForm({ ...form, variants: newVariants });
                      }} className="h-9 text-sm" placeholder="e.g. Black" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label className="text-[10px] uppercase font-black text-muted-foreground">SKU</Label>
                      <Input value={v.sku} onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].sku = e.target.value;
                        setForm({ ...form, variants: newVariants });
                      }} className="h-9 text-sm" />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase font-black text-muted-foreground">Stock</Label>
                      <Input type="number" value={v.stock} onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].stock = parseInt(e.target.value) || 0;
                        setForm({ ...form, variants: newVariants });
                      }} className="h-9 text-sm" />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase font-black text-muted-foreground">Price</Label>
                      <Input type="number" value={v.price} onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].price = parseInt(e.target.value) || 0;
                        setForm({ ...form, variants: newVariants });
                      }} className="h-9 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground block">Variation Images</Label>
                    <div className="flex flex-wrap gap-3">
                      {v.images?.map((img: any, imgIdx: number) => (
                        <div key={imgIdx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group/img">
                          <img src={img.url} className="w-full h-full object-cover" alt="" />
                          <button
                            type="button"
                            onClick={() => removeVariantImage(idx, imgIdx)}
                            className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center relative hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden">
                        <Plus size={20} className="text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground font-medium">Add</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={e => handleVariantImageUpload(idx, e.target.files)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      checked={v.isVisible !== false}
                      onChange={e => {
                        const newVariants = [...form.variants];
                        newVariants[idx].isVisible = e.target.checked;
                        setForm({ ...form, variants: newVariants });
                      }}
                      id={`visible-${idx}`}
                      className="rounded"
                    />
                    <Label htmlFor={`visible-${idx}`} className="text-xs">Active variation</Label>
                  </div>
                </div>
              ))}
              {(!form.variants || form.variants.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-muted/10 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <Plus size={24} />
                  </div>
                  <h5 className="font-bold text-foreground">No Variations Yet</h5>
                  <p className="text-sm max-w-xs mx-auto">Add sizes, seats, and colors above then click "Generate" to create combinations automatically.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.isVisible} onChange={e => setForm({ ...form, isVisible: e.target.checked })} id="visible" className="rounded" />
            <Label htmlFor="visible">Visible on website</Label>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-6 border-t border-border">
            <Button type="submit" disabled={saving} className="min-w-[140px]">
              {saving ? <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</> : id ? "Update Product" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;