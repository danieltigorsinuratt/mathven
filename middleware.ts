import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, createSessionToken, getAdminConfig } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { email, secret } = getAdminConfig();
  const expected = await createSessionToken(email, secret);
  const isAuthed = req.cookies.get(SESSION_COOKIE)?.value === expected;
  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    if (isAuthed) return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.next();
  }

  if (!isAuthed) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/materi/:path*", "/soal/:path*", "/user/:path*"],
};
