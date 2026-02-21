import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/admin/:path*",
    "/verify/:path*",
    "/sign-up",
    "/sign-in",
    "/profile",
  ],
};

export async function middleware(request) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    if (
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (token && !token.isAdmin && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
