import { NextResponse } from 'next/server';
import { pool, initDb, getAllMateri } from '@/lib/db';

export async function GET() {
  try {
    const materi = await getAllMateri();
    return NextResponse.json(materi);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDb();
    const body = await req.json();
    const judul = String(body?.judul ?? '').trim();
    const deskripsi = String(body?.deskripsi ?? '').trim();

    if (!judul || !deskripsi) {
      return NextResponse.json(
        { message: 'Judul materi dan deskripsi wajib diisi.' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.execute(
      'INSERT INTO materi (judul, deskripsi) VALUES (?, ?)',
      [judul, deskripsi]
    );

    const [rows]: any = await pool.execute(
      'SELECT id, judul, deskripsi, created_at AS createdAt, updated_at AS updatedAt FROM materi WHERE id = ? LIMIT 1',
      [result.insertId]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    console.error('Error creating materi:', err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
