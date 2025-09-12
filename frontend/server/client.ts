export const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
export const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
