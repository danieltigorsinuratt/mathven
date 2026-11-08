import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  try {
    await initDb();
    const { id } = await context.params;
    const userId = Number(id);

    const [rows]: any = await pool.execute(
      'SELECT id, nama, kelas, sekolah, created_at AS createdAt, updated_at AS updatedAt FROM users WHERE id = ? LIMIT 1',
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    await initDb();
    const { id } = await context.params;
    const userId = Number(id);
    const body = await req.json();
    const nama = String(body?.nama ?? '').trim();
    const kelas = String(body?.kelas ?? '').trim();
    const sekolah = String(body?.sekolah ?? '').trim();

    if (!nama || !kelas || !sekolah) {
      return NextResponse.json(
        { message: 'Nama, kelas, dan sekolah wajib diisi.' },
        { status: 400 }
      );
    }

    const [existing]: any = await pool.execute('SELECT id FROM users WHERE id = ? LIMIT 1', [userId]);
    if (existing.length === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE users SET nama = ?, kelas = ?, sekolah = ?, updated_at = NOW() WHERE id = ?',
      [nama, kelas, sekolah, userId]
    );

    const [rows]: any = await pool.execute(
      'SELECT id, nama, kelas, sekolah, created_at AS createdAt, updated_at AS updatedAt FROM users WHERE id = ? LIMIT 1',
      [userId]
    );

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    await initDb();
    const { id } = await context.params;
    const userId = Number(id);

    const [existing]: any = await pool.execute('SELECT id FROM users WHERE id = ? LIMIT 1', [userId]);
    if (existing.length === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return NextResponse.json({ ok: true, id: userId });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
