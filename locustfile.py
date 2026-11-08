"""
Locust Load Testing Script for MathVenture Admin (MySQL Backend)
Endpoints Tested:
  - POST /api/backend/materi         (Tambah Materi)
  - DELETE /api/backend/materi/[id]  (Hapus Materi)
  - POST /api/backend/users          (Tambah Siswa/User)
  - DELETE /api/backend/users/[id]   (Hapus Siswa/User)
  - GET /api/backend/materi          (Lihat Daftar Materi)
  - GET /api/backend/bootstrap       (Load Data Dashboard)
"""

from locust import HttpUser, task, between
import random
import string


def get_random_string(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))


class MathVentureLoadTestUser(HttpUser):
    # Jeda 1 - 2 detik per virtual user
    wait_time = between(1.0, 2.0)

    @task(3)
    def test_get_dashboard_and_materi(self):
        """Membaca data bootstrap dan daftar materi"""
        self.client.get("/api/backend/bootstrap", name="[GET] /api/backend/bootstrap")
        self.client.get("/api/backend/materi", name="[GET] /api/backend/materi")

    @task(2)
    def test_crud_materi(self):
        """Siklus: Tambah Materi (POST) -> Simpan ID -> Hapus Materi (DELETE)"""
        tag = get_random_string(6)
        payload = {
            "judul": f"Materi Uji #{tag}",
            "deskripsi": f"Deskripsi materi pembelajaran matematika otomatis #{tag}"
        }

        # 1. Tambah Data Materi
        with self.client.post(
            "/api/backend/materi",
            json=payload,
            name="[POST] /api/backend/materi",
            catch_response=True
        ) as response:
            if response.status_code == 201:
                data = response.json()
                created_id = data.get("id")
                
                # 2. Hapus Data Materi yang baru dibuat
                if created_id:
                    self.client.delete(
                        f"/api/backend/materi/{created_id}",
                        name="[DELETE] /api/backend/materi/[id]"
                    )
                response.success()
            else:
                response.failure(f"Gagal POST Materi: HTTP {response.status_code}")

    @task(1)
    def test_crud_siswa(self):
        """Siklus: Tambah Siswa (POST) -> Simpan ID -> Hapus Siswa (DELETE)"""
        tag = get_random_string(5)
        payload = {
            "nama": f"Siswa Uji {tag}",
            "kelas": f"{random.randint(1, 6)} SD",
            "sekolah": "SD Negeri Simulasi"
        }

        # 1. Tambah Data Siswa
        with self.client.post(
            "/api/backend/users",
            json=payload,
            name="[POST] /api/backend/users",
            catch_response=True
        ) as response:
            if response.status_code == 201:
                data = response.json()
                created_id = data.get("id")
                
                # 2. Hapus Siswa yang baru dibuat
                if created_id:
                    self.client.delete(
                        f"/api/backend/users/{created_id}",
                        name="[DELETE] /api/backend/users/[id]"
                    )
                response.success()
            else:
                response.failure(f"Gagal POST User: HTTP {response.status_code}")
