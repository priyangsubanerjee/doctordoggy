import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({
    req: req,
    secret: process.env.AUTH_SECRET_SALT,
  });

  if (req.nextUrl.pathname === "/signin") {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  } else {
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
}

export const config = {
  matcher: ["/", "/signin/:path*", "/account/:path*", "/pets/:path*"],
};
