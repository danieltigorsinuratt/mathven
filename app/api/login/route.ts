import { NextResponse } from "next/server";
import { SESSION_COOKIE, createSessionToken, getAdminConfig } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    // body kosong / bukan JSON -> dianggap gagal login
  }

  const { email, password, secret } = getAdminConfig();
  const inputEmail = (body.email ?? "").trim().toLowerCase();

  if (inputEmail !== email.toLowerCase() || body.password !== password) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(email, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
