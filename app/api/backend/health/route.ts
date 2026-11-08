import { NextResponse } from 'next/server';
import { initDb, dbConfig } from '@/lib/db';

export async function GET() {
  try {
    await initDb();
    return NextResponse.json({
      ok: true,
      service: 'mathventure-backend-integrated',
      database: 'mysql',
      dbName: dbConfig.database,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        service: 'mathventure-backend-integrated',
        database: 'mysql',
        error: err.message,
      },
      { status: 503 }
    );
  }
}
