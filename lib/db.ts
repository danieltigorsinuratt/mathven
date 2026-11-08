import mysql, { Pool } from 'mysql2/promise';
import crypto from 'node:crypto';

export const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mathventure',
};

// Global pool instance to prevent re-creation during hot-reloads
const globalForDb = globalThis as unknown as {
  mysqlPool: Pool | undefined;
  isInitialized: boolean | undefined;
  initPromise: Promise<void> | null;
};

export const pool: Pool =
  globalForDb.mysqlPool ??
  mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    dateStrings: true,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.mysqlPool = pool;
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function initDb(): Promise<void> {
  if (globalForDb.isInitialized) return;
  if (globalForDb.initPromise) return globalForDb.initPromise;

  globalForDb.initPromise = (async () => {
    try {
      // 1. Pastikan database mathventure sudah ada
      const rootConn = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
      });

      await rootConn.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
      await rootConn.end();

      // 2. Buat tabel-tabel utama jika belum ada
      await pool.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL DEFAULT 'Admin',
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS materi (
          id INT AUTO_INCREMENT PRIMARY KEY,
          judul VARCHAR(255) NOT NULL,
          deskripsi TEXT NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS soal (
          id INT AUTO_INCREMENT PRIMARY KEY,
          materi_id INT NOT NULL,
          pertanyaan TEXT NOT NULL,
          jawaban TEXT NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          CONSTRAINT fk_soal_materi
            FOREIGN KEY (materi_id) REFERENCES materi(id)
            ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nama VARCHAR(255) NOT NULL,
          kelas VARCHAR(100) NOT NULL,
          sekolah VARCHAR(255) NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      // 3. Seed data awal admin jika belum ada
      const [adminRows]: any = await pool.query('SELECT COUNT(*) AS count FROM admins');
      if (Number(adminRows[0]?.count) === 0) {
        const defaultEmail = (process.env.ADMIN_EMAIL || 'adminmathventure@gmail.com').toLowerCase();
        const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
        await pool.execute('INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)', [
          defaultEmail,
          hashPassword(defaultPassword),
          'Admin MathVenture',
        ]);
      }

      // 4. Seed data awal materi & soal jika kosong
      const [materiRows]: any = await pool.query('SELECT COUNT(*) AS count FROM materi');
      if (Number(materiRows[0]?.count) === 0) {
        const initialMateri = [
          {
            id: 1,
            judul: 'Mengenal Bilangan',
            deskripsi:
              'Bilangan dapat diurutkan dari yang terkecil hingga terbesar dengan membandingkan nilai tempatnya. Bilangan dengan ratusan yang lebih kecil diletakkan lebih dahulu.',
          },
          { id: 2, judul: 'Nilai Tempat', deskripsi: 'Mengenal satuan, puluhan, dan ratusan' },
          { id: 3, judul: 'Penjumlahan', deskripsi: 'Penjumlahan bersusun hingga ratusan' },
          { id: 4, judul: 'Pengurangan', deskripsi: 'Pengurangan bersusun dengan meminjam' },
        ];
        for (const m of initialMateri) {
          await pool.execute('INSERT INTO materi (id, judul, deskripsi) VALUES (?, ?, ?)', [
            m.id,
            m.judul,
            m.deskripsi,
          ]);
        }

        const initialSoal = [
          { id: 1, materiId: 1, pertanyaan: '456', jawaban: 'Empat Ratus Lima Puluh Enam' },
          { id: 2, materiId: 1, pertanyaan: '809', jawaban: 'Delapan Ratus Sembilan' },
          { id: 3, materiId: 2, pertanyaan: 'Angka 7 pada 372 bernilai ...', jawaban: 'Puluhan' },
          { id: 4, materiId: 3, pertanyaan: '235 + 148 = ...', jawaban: '383' },
          { id: 5, materiId: 4, pertanyaan: '502 - 267 = ...', jawaban: '235' },
        ];
        for (const s of initialSoal) {
          await pool.execute('INSERT INTO soal (id, materi_id, pertanyaan, jawaban) VALUES (?, ?, ?, ?)', [
            s.id,
            s.materiId,
            s.pertanyaan,
            s.jawaban,
          ]);
        }
      }

      // 5. Seed data awal users (siswa)
      const [userRows]: any = await pool.query('SELECT COUNT(*) AS count FROM users');
      if (Number(userRows[0]?.count) === 0) {
        const initialUsers = [
          { id: 1, nama: 'Eca', kelas: '3 SD', sekolah: 'SD Brawijaya' },
          { id: 2, nama: 'Rafi Akbar', kelas: '3 SD', sekolah: 'SD Brawijaya' },
          { id: 3, nama: 'Naura Azzahra', kelas: '2 SD', sekolah: 'SDN Sumbersari 1' },
          { id: 4, nama: 'Daffa Pratama', kelas: '4 SD', sekolah: 'SD Islam Malang' },
          { id: 5, nama: 'Kirana Larasati', kelas: '3 SD', sekolah: 'SDN Lowokwaru 3' },
        ];
        for (const u of initialUsers) {
          await pool.execute('INSERT INTO users (id, nama, kelas, sekolah) VALUES (?, ?, ?, ?)', [
            u.id,
            u.nama,
            u.kelas,
            u.sekolah,
          ]);
        }
      }

      globalForDb.isInitialized = true;
    } catch (err) {
      console.error('Failed to init MySQL:', err);
    } finally {
      globalForDb.initPromise = null;
    }
  })();

  return globalForDb.initPromise;
}

export async function getAllMateri() {
  await initDb();
  const [rows] = await pool.query(
    'SELECT id, judul, deskripsi, created_at AS createdAt, updated_at AS updatedAt FROM materi ORDER BY id DESC'
  );
  return rows;
}

export async function getAllSoal() {
  await initDb();
  const [rows] = await pool.query(
    `SELECT s.id,
            s.materi_id AS materiId,
            s.pertanyaan,
            s.jawaban,
            m.judul AS materiJudul,
            s.created_at AS createdAt,
            s.updated_at AS updatedAt
     FROM soal s
     LEFT JOIN materi m ON m.id = s.materi_id
     ORDER BY s.id DESC`
  );
  return rows;
}

export async function getAllUsers() {
  await initDb();
  const [rows] = await pool.query(
    'SELECT id, nama, kelas, sekolah, created_at AS createdAt, updated_at AS updatedAt FROM users ORDER BY id DESC'
  );
  return rows;
}

export async function getStats() {
  await initDb();
  const [materiRow]: any = await pool.query('SELECT COUNT(*) AS count FROM materi');
  const [soalRow]: any = await pool.query('SELECT COUNT(*) AS count FROM soal');
  const [usersRow]: any = await pool.query('SELECT COUNT(*) AS count FROM users');
  return {
    totalMateri: Number(materiRow[0]?.count ?? 0),
    totalSoal: Number(soalRow[0]?.count ?? 0),
    totalUsers: Number(usersRow[0]?.count ?? 0),
  };
}
