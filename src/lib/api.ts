import { API_BASE_URL, useAuth } from "@/contexts/AuthContext";

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("retroroots_token");
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message);
  }
  if (res.headers.get("content-type")?.includes("text/csv")) {
    return res.blob();
  }
  return res.json();
};

export const uploadFile = async (file: File): Promise<{ url: string; publicId: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  return apiRequest("/upload/image", { method: "POST", body: formData });
};

export const uploadFiles = async (files: File[]): Promise<{ url: string; publicId: string }[]> => {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  return apiRequest("/upload/images", { method: "POST", body: formData });
};

export const getProducts = () => apiRequest("/products");
export const getBlogs = () => apiRequest("/blogs");
export const getGallery = () => apiRequest("/gallery");

