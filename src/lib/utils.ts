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
  
  // If it's a local source path (for bundled assets)
  if (typeof url === 'string' && url.startsWith('/src')) return url;

  // Fallback: If it's just a filename (old data), try to get it from backend uploads
  // Note: This only works if files exist on the server, which is usually only true for local dev
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}/uploads/${url}`;
};
