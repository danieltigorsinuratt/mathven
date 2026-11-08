import { NextResponse } from 'next/server';
import { SESSION_COOKIE, createSessionToken, getAdminConfig } from '@/lib/auth';
import { pool, initDb, hashPassword } from '@/lib/db';

export async function POST(req: Request) {
  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    // body kosong / bukan JSON
  }

  const { email, password, secret } = getAdminConfig();
  const inputEmail = (body.email ?? '').trim().toLowerCase();
  const inputPassword = body.password ?? '';

  if (!inputEmail || !inputPassword) {
    return NextResponse.json(
      { ok: false, message: 'Email dan password wajib diisi.' },
      { status: 400 }
    );
  }

  let isAuthenticated = false;

  // 1. Verifikasi langsung ke database MySQL
  try {
    await initDb();
    const [rows]: any = await pool.execute(
      'SELECT id, email, password_hash, name FROM admins WHERE LOWER(email) = ? LIMIT 1',
      [inputEmail]
    );
    const admin = rows[0];

    if (admin && admin.password_hash === hashPassword(inputPassword)) {
      isAuthenticated = true;
    }
  } catch (err) {
    console.warn('MySQL auth query fallback to config:', err);
  }

  // 2. Fallback jika database belum running / akun default
  if (!isAuthenticated) {
    if (inputEmail === email.toLowerCase() && inputPassword === password) {
      isAuthenticated = true;
    }
  }

  if (!isAuthenticated) {
    return NextResponse.json({ ok: false, message: 'Email atau password salah.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(email, secret), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return res;
}
