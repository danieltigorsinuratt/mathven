import { NextResponse } from 'next/server';
import { pool, initDb, getAllUsers } from '@/lib/db';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDb();
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

    const [result]: any = await pool.execute(
      'INSERT INTO users (nama, kelas, sekolah) VALUES (?, ?, ?)',
      [nama, kelas, sekolah]
    );

    const [rows]: any = await pool.execute(
      'SELECT id, nama, kelas, sekolah, created_at AS createdAt, updated_at AS updatedAt FROM users WHERE id = ? LIMIT 1',
      [result.insertId]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
