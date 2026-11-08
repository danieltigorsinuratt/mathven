import { NextResponse } from 'next/server';
import { pool, initDb, getAllSoal } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawMateriId = searchParams.get('materiId');

    if (rawMateriId) {
      const materiId = Number(rawMateriId);
      await initDb();
      const [filtered]: any = await pool.execute(
        `SELECT s.id,
                s.materi_id AS materiId,
                s.pertanyaan,
                s.jawaban,
                m.judul AS materiJudul,
                s.created_at AS createdAt,
                s.updated_at AS updatedAt
         FROM soal s
         LEFT JOIN materi m ON m.id = s.materi_id
         WHERE s.materi_id = ?
         ORDER BY s.id DESC`,
        [materiId]
      );
      return NextResponse.json(filtered);
    }

    const soal = await getAllSoal();
    return NextResponse.json(soal);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDb();
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

    const [materiRows]: any = await pool.execute(
      'SELECT id FROM materi WHERE id = ? LIMIT 1',
      [materiId]
    );
    if (materiRows.length === 0) {
      return NextResponse.json(
        { message: 'Materi yang dipilih tidak ditemukan.' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.execute(
      'INSERT INTO soal (materi_id, pertanyaan, jawaban) VALUES (?, ?, ?)',
      [materiId, pertanyaan, jawaban]
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
      [result.insertId]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
