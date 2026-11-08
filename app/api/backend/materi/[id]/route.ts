import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  try {
    await initDb();
    const { id } = await context.params;
    const materiId = Number(id);

    const [rows]: any = await pool.execute(
      'SELECT id, judul, deskripsi, created_at AS createdAt, updated_at AS updatedAt FROM materi WHERE id = ? LIMIT 1',
      [materiId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Materi tidak ditemukan.' }, { status: 404 });
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
    const materiId = Number(id);
    const body = await req.json();
    const judul = String(body?.judul ?? '').trim();
    const deskripsi = String(body?.deskripsi ?? '').trim();

    if (!judul || !deskripsi) {
      return NextResponse.json(
        { message: 'Judul materi dan deskripsi wajib diisi.' },
        { status: 400 }
      );
    }

    const [existing]: any = await pool.execute(
      'SELECT id FROM materi WHERE id = ? LIMIT 1',
      [materiId]
    );
    if (existing.length === 0) {
      return NextResponse.json({ message: 'Materi tidak ditemukan.' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE materi SET judul = ?, deskripsi = ?, updated_at = NOW() WHERE id = ?',
      [judul, deskripsi, materiId]
    );

    const [rows]: any = await pool.execute(
      'SELECT id, judul, deskripsi, created_at AS createdAt, updated_at AS updatedAt FROM materi WHERE id = ? LIMIT 1',
      [materiId]
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
    const materiId = Number(id);

    const [existing]: any = await pool.execute(
      'SELECT id FROM materi WHERE id = ? LIMIT 1',
      [materiId]
    );
    if (existing.length === 0) {
      return NextResponse.json({ message: 'Materi tidak ditemukan.' }, { status: 404 });
    }

    await pool.execute('DELETE FROM materi WHERE id = ?', [materiId]);
    return NextResponse.json({ ok: true, id: materiId });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
