import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (request.nextUrl.pathname == "/dashboard") {
    if (request.cookies.get("user")) {
      let decodeUrl = new URL("/api/user/decode", request.url);
      let res = await fetch(decodeUrl, {
        method: "POST",
        body: JSON.stringify({
          token: request.cookies.get("user").value,
        }),
      });
      let data = await res.json();
      if (data.status == "success") {
        return NextResponse.next();
      }
    } else {
      return NextResponse.redirect(new URL("/profile/setup", request.url));
    }
  } else if (request.nextUrl.pathname == "/profile") {
    if (request.cookies.get("user")) {
      let decodeUrl = new URL("/api/user/decode", request.url);
      let res = await fetch(decodeUrl, {
        method: "POST",
        body: JSON.stringify({
          token: request.cookies.get("user").value,
        }),
      });
      let data = await res.json();
      if (data.status == "success") {
        return NextResponse.next();
      }
    } else {
      return NextResponse.redirect(new URL("/profile/setup", request.url));
    }
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/profile"],
};
