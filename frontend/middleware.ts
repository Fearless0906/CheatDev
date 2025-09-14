import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
// Must match Django's SIGNING_KEY!

export async function middleware(req: NextRequest) {
  const publicPaths = [
    "/",
    "/accounts/auth/jwt/verify",
    "/accounts/auth/jwt/refresh",
  ];

  // Allow public routes
  if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    // Check token expiration
    const exp = payload.exp ? payload.exp * 1000 : null; // convert to ms
    const now = Date.now();

    if (!exp || now >= exp) {
      // Token expired → redirect to login
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("token");
      return res;
    }

    // Check if token will expire soon (5 minutes)
    if (exp - now < 5 * 60 * 1000) {
      try {
        // Attempt to refresh token
        const refreshRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/jwt/refresh/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token, // Send current token for refresh
            }),
          }
        );

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          const res = NextResponse.next();
          // Set the new token
          res.cookies.set("token", data.access, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
          });
          return res;
        }
      } catch (refreshError) {
        // If refresh fails, continue with current token
        console.error("Token refresh failed:", refreshError);
      }
    }

    return NextResponse.next();
  } catch {
    // Invalid token → redirect to login
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }
}

// Define which routes this middleware applies to
export const config = {
  matcher: [
    "/cheatsheet/:path*", // protect /cheatsheet
    "/dashboard/:path*", // protect /dashboard
    "/profile/:path*", // protect /profile
    // add other protected routes here
  ],
};
