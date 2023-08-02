import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let path = request.nextUrl.pathname;
  if (path == "/dashboard") {
    if (request.cookies.get("user") == null) {
      return NextResponse.redirect(
        new URL("/profile?setup=true&focus=phone", request.nextUrl).href
      );
    } else {
      let token = request.cookies.get("user").value;
      let url = new URL("/api/user/decode", request.url);
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
      });
      let data = await res.json();
      if (data.user.phone == "" || data.user.pincode == "") {
        return NextResponse.redirect(
          new URL("/profile?setup=true&focus=phone", request.nextUrl).href
        );
      } else {
        return;
      }

      return;
    }
  } else if (path == "/profile") {
    if (request.cookies.get("user") == null) {
      if (request.nextUrl.searchParams.get("setup") == "true") {
        return;
      } else {
        return NextResponse.redirect(
          new URL("/profile?setup=true&focus=phone", request.nextUrl).href
        );
      }
    }
  }
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/profile"],
};
