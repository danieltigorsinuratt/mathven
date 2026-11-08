import { NextResponse } from 'next/server';
import { getAllMateri, getAllSoal, getAllUsers, getStats } from '@/lib/db';

export async function GET() {
  try {
    const [materi, soal, users, stats] = await Promise.all([
      getAllMateri(),
      getAllSoal(),
      getAllUsers(),
      getStats(),
    ]);
    return NextResponse.json({ materi, soal, users, stats });
  } catch (err: any) {
    console.error('Error in /api/backend/bootstrap:', err);
    return NextResponse.json(
      { error: err.message || 'Gagal memuat bootstrap data' },
      { status: 500 }
    );
  }
}
