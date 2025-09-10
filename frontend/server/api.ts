import { Login, SignUp } from "@/interface/types";
import { BASE_URL } from "./client";

export const login = async (data: Login) => {
  const response = await fetch(`${BASE_URL}/accounts/auth/jwt/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const signup = async (data: SignUp) => {
  const response = await fetch(`${BASE_URL}/accounts/auth/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
