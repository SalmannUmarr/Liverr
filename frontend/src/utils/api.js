export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://liverbackend.vercel.app/api/auth";

export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
