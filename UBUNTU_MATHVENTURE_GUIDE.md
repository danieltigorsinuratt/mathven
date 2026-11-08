# Panduan Hosting MathVenture Admin di Ubuntu Server (MySQL) & Pengujian Locust

Proyek ini adalah **MathVenture Admin Panel** berbasis **Next.js (App Router)** yang telah diintegrasikan langsung dengan database **MySQL** (tanpa perlu server backend terpisah) serta dilengkapi skrip pengujian beban **Locust** untuk tambah & hapus data.

---

## 1. Persiapan Database MySQL di Ubuntu Server

Buka terminal SSH Ubuntu Server:

```bash
# 1. Pastikan MySQL terinstall dan aktif
sudo apt update
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# 2. Masuk ke prompt MySQL
sudo mysql
```

Ketik perintah SQL berikut di prompt `mysql>`:
```sql
CREATE DATABASE IF NOT EXISTS mathventure CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'mathuser'@'localhost' IDENTIFIED BY 'MathVenture@2026';

GRANT ALL PRIVILEGES ON mathventure.* TO 'mathuser'@'localhost';

FLUSH PRIVILEGES;

EXIT;
```

---

## 2. Transfer / Upload Project ke Ubuntu Server

Letakkan project ini di direktori `/var/www/mathventure`.

### Opsi A: Transfer via SCP dari PowerShell Windows (Komputer Lokal)
```powershell
scp -r "C:\Users\Hi\Documents\Project\Yulinafaesa\mathventure-admin" root@<IP_UBUNTU>:/var/www/mathventure
```

### Opsi B: Menggunakan Git Clone di Ubuntu
```bash
cd /var/www
git clone <URL_REPO_GITHUB_KAMU> mathventure
```

---

## 3. Instalasi Dependencies & Konfigurasi .env di Ubuntu

Masuk ke folder project di Ubuntu:
```bash
cd /var/www/mathventure

# 1. Install seluruh package
npm install

# 2. Buat file .env
nano .env
```

Isikan konfigurasi database MySQL:
```env
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="mathuser"
DB_PASSWORD="MathVenture@2026"
DB_NAME="mathventure"

ADMIN_EMAIL="adminmathventure@gmail.com"
ADMIN_PASSWORD="Admin@123456"
AUTH_SECRET="mathventure-production-secret-key-2026"
```
*Simpan dengan menekan `CTRL + O`, lalu `Enter`, dan keluar dengan `CTRL + X`.*

---

## 4. Build Aplikasi Next.js untuk Production

```bash
npm run build
```
*(Tabel MySQL `admins`, `materi`, `soal`, dan `users` beserta data awal akan otomatis dibuat saat aplikasi berjalan).*

---

## 5. Jalankan Aplikasi dengan PM2

```bash
# 1. Install PM2 jika belum ada
sudo npm install -g pm2

# 2. Jalankan aplikasi MathVenture
cd /var/www/mathventure
pm2 start npm --name "mathventure" -- start

# 3. Setting auto-start saat reboot
pm2 startup
# (Jalankan perintah sudo env PATH=... jika diminta)
pm2 save
```

Cek status:
```bash
pm2 status
```
*(Status `mathventure` harus bertuliskan `online`).*

---

## 6. Konfigurasi Nginx Reverse Proxy (Port 80)

```bash
sudo nano /etc/nginx/sites-available/mathventure
```

Isikan:
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifkan konfigurasi Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mathventure /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

Buka firewall:
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

Buka browser kamu: `http://<IP_UBUNTU_SERVER>/login`
* **Email**: `adminmathventure@gmail.com`
* **Password**: `Admin@123456`

---

## 7. Menjalankan Pengujian Beban (Locust)

File `locustfile.py` sudah disiapkan di dalam folder project (dan bisa kamu salin ke folder mana pun di laptopmu).

Jalankan dari laptop:
```bash
pip install locust
locust -f locustfile.py
```

1. Buka browser di laptop: `http://localhost:8089`
2. Masukkan **Host**: `http://<IP_UBUNTU_SERVER>`
3. Masukkan **Number of users**: misal `50` dan **Spawn rate**: `5`
4. Klik **Start swarming**.

### Apa yang Diuji oleh Locust?
* `POST /api/backend/materi` $\rightarrow$ Menambah materi acak.
* `DELETE /api/backend/materi/[id]` $\rightarrow$ Menghapus materi yang baru dibuat berdasarkan ID.
* `POST /api/backend/users` $\rightarrow$ Menambah data siswa baru.
* `DELETE /api/backend/users/[id]` $\rightarrow$ Menghapus data siswa tersebut kembali.
* `GET /api/backend/bootstrap` & `GET /api/backend/materi` $\rightarrow$ Membaca data dashboard.
