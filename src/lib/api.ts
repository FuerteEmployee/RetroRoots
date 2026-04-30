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
    const errorText = await res.text();
    let errMessage = "Request failed";
    try {
      const errJson = JSON.parse(errorText);
      errMessage = errJson.message || errMessage;
    } catch {
      errMessage = errorText ? `Error ${res.status}: ${errorText.substring(0, 50)}...` : `Request failed with status ${res.status}`;
    }
    throw new Error(errMessage);
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
export const getProduct = (id: string) => apiRequest(`/products/${id}`);
export const getBlogs = () => apiRequest("/blogs");
export const getGallery = () => apiRequest("/gallery");

