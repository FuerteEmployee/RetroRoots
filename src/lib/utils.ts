import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_BASE_URL } from "@/contexts/AuthContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (image: any) => {
  if (!image) return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400";
  
  // Handle object {url: "..."} which is Cloudinary format
  const url = typeof image === 'object' ? image?.url : image;
  
  if (!url) return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400";
  
  // If it's already a full URL or data URI, return as is
  if (typeof url === 'string' && (url.includes('http') || url.startsWith('data:'))) return url;
  
  // If it's a local source path (bundled assets in dev or prod)
  // Vite assets in production start with / and usually contain /assets/
  if (typeof url === 'string' && (url.startsWith('/') || url.startsWith('/src'))) return url;

  // Fallback: If it's just a filename (old data like "image.jpg"), 
  // try to get it from backend uploads.
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}/uploads/${url}`;
};

export const getProductDisplayImage = (p: any) => {
  if (!p) return null;
  // 1. First variation image
  if (p.variants && p.variants.length > 0 && p.variants[0].images && p.variants[0].images.length > 0) {
    return p.variants[0].images[0];
  }
  // 2. Product featured image (new field)
  if (p.images && p.images.length > 0) {
    return p.images[0];
  }
  // 3. Fallback to legacy image field
  return p.image;
};

export const toSlug = (text: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};
