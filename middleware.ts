import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;
  console.log(user);
  // Protect /dashboard routes: redirect unauthenticated users to /auth
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    // Optionally include original path for post-login redirect
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
};