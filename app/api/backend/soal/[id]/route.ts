import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  try {
    await initDb();
    const { id } = await context.params;
    const soalId = Number(id);

    const [rows]: any = await pool.execute(
      `SELECT s.id,
              s.materi_id AS materiId,
              s.pertanyaan,
              s.jawaban,
              m.judul AS materiJudul,
              s.created_at AS createdAt,
              s.updated_at AS updatedAt
       FROM soal s
       LEFT JOIN materi m ON m.id = s.materi_id
       WHERE s.id = ?
       LIMIT 1`,
      [soalId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Soal tidak ditemukan.' }, { status: 404 });
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
    const soalId = Number(id);
    const body = await req.json();
    const materiId = Number(body?.materiId);
    const pertanyaan = String(body?.pertanyaan ?? '').trim();
    const jawaban = String(body?.jawaban ?? '').trim();

    if (!materiId || !pertanyaan || !jawaban) {
      return NextResponse.json(
        { message: 'Materi, pertanyaan, dan jawaban wajib diisi.' },
        { status: 400 }
      );
    }

    const [existing]: any = await pool.execute('SELECT id FROM soal WHERE id = ? LIMIT 1', [soalId]);
    if (existing.length === 0) {
      return NextResponse.json({ message: 'Soal tidak ditemukan.' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE soal SET materi_id = ?, pertanyaan = ?, jawaban = ?, updated_at = NOW() WHERE id = ?',
      [materiId, pertanyaan, jawaban, soalId]
    );

    const [rows]: any = await pool.execute(
      `SELECT s.id,
              s.materi_id AS materiId,
              s.pertanyaan,
              s.jawaban,
              m.judul AS materiJudul,
              s.created_at AS createdAt,
              s.updated_at AS updatedAt
       FROM soal s
       LEFT JOIN materi m ON m.id = s.materi_id
       WHERE s.id = ?
       LIMIT 1`,
      [soalId]
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
    const soalId = Number(id);

    const [existing]: any = await pool.execute('SELECT id FROM soal WHERE id = ? LIMIT 1', [soalId]);
    if (existing.length === 0) {
      return NextResponse.json({ message: 'Soal tidak ditemukan.' }, { status: 404 });
    }

    await pool.execute('DELETE FROM soal WHERE id = ?', [soalId]);
    return NextResponse.json({ ok: true, id: soalId });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
