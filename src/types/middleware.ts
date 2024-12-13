import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedPages = ["/profile"];
const protectAfterAuth = ["/register", "/login"];
const protectAdmin = ["/blog/create"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.nextUrl.pathname;

  if (protectedPages.some((route) => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (protectAdmin.some((route) => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (protectAdmin.some((route) => url.startsWith(route)) && token) {
    const user: { role: "Admin" | "User" } = jwtDecode(token?.value);
    if (user.role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (protectAfterAuth.some((route) => url.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
