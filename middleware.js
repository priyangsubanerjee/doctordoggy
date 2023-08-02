import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (request.nextUrl.pathname == "/dashboard") {
    if (request.cookies.get("user")) {
      let decodeUrl = new URL("/api/user/decode", request.url);
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard"],
};
