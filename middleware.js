import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let path = request.nextUrl.pathname;
  if (path == "/dashboard") {
    console.log("/dashboard");
    if (request.cookies.get("user") == null) {
      return NextResponse.redirect(
        new URL("/profile?setup=true&focus=phone", request.nextUrl).href
      );
    } else {
      let userObj = JSON.parse(request.cookies.get("user").value);
      if (userObj.phone == "" || userObj.pincode == "") {
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
