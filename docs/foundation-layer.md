# Foundation Layer — System Core

## 1. Tujuan Layer

Foundation Layer merupakan lapisan paling dasar dalam arsitektur Vectris Base Core.

Lapisan ini berfungsi sebagai **fondasi sistem global** yang mendukung seluruh aplikasi, tanpa memiliki ketergantungan terhadap:

- UI / Presentation
- Data bisnis
- CMS
- Integrasi pihak ketiga
- Logic spesifik project

Foundation Layer **tidak mengandung fitur**, dan **tidak merepresentasikan domain bisnis**.

Lapisan ini dirancang agar **jarang berubah**, stabil, dan aman untuk digunakan lintas project.

---

## 2. Prinsip Utama Foundation Layer

Foundation Layer dibangun berdasarkan prinsip berikut:

1. **System-Oriented**
   Berfokus pada kebutuhan sistem global, bukan kebutuhan fitur atau tampilan.

2. **Framework-Agnostic**
   Tidak bergantung pada CMS, UI framework, atau vendor eksternal.

3. **Stateless & Deterministic**
   Tidak menyimpan state aplikasi atau data dinamis.

4. **Strict Boundary**
   Tidak mengetahui keberadaan layer di atasnya (Integration, Presentation, App).

Foundation Layer berperan sebagai **penjaga konsistensi dan keamanan sistem**, bukan sebagai pusat logika aplikasi.

---

## 3. Lingkup Tanggung Jawab

Foundation Layer bertanggung jawab atas:

- Validasi environment variable inti aplikasi
- Definisi tipe data global
- Konstanta sistem yang bersifat universal
- Struktur error dasar aplikasi

Foundation Layer **tidak menangani**:

- Konten
- Branding
- Konfigurasi bisnis
- Data operasional
- CMS schema
- UI component

---

## 4. Struktur Folder

Struktur folder Foundation Layer adalah sebagai berikut:

```
src/core/
 ├─ env.ts
 ├─ types.ts
 ├─ constants.ts
 ├─ errors.ts
 └─ README.md
```

Struktur ini bersifat **final untuk Base Core v1** dan tidak boleh diperluas tanpa kebutuhan sistem yang jelas.

---

## 5. Penjelasan File

### 5.1 `env.ts`

Berfungsi sebagai **system guard**.

File ini melakukan validasi terhadap environment variable inti aplikasi (contoh: `NODE_ENV`, `NEXT_PUBLIC_SITE_URL`).

Jika environment tidak valid, aplikasi **harus gagal berjalan (fail fast)**.

Catatan penting:

- Tidak menyimpan environment variable spesifik integrasi
- Tidak memiliki default value untuk production
- Di-import satu kali pada entry point aplikasi

---

### 5.2 `types.ts`

Berisi definisi tipe data global yang bersifat umum dan lintas domain.

Contoh tipe yang diperbolehkan:

- Identifier (`ID`, `Slug`)
- Format tanggal (`ISODate`)
- Interface generik (`BaseEntity`, `PaginationResult`)

Larangan:

- Tipe UI
- Tipe CMS
- Tipe bisnis spesifik project

---

### 5.3 `constants.ts`

Berisi konstanta sistem yang **tidak bergantung pada branding atau konten**.

Contoh yang diperbolehkan:

- Nama internal aplikasi
- Locale default
- Format tanggal

Contoh yang tidak diperbolehkan:

- SEO
- Nama halaman
- Deskripsi bisnis
- Data yang berpotensi misleading jika berubah konteks

---

### 5.4 `errors.ts`

Berisi definisi error dasar aplikasi.

Digunakan untuk:

- Konsistensi penanganan error
- Standarisasi pesan dan struktur error

File ini **tidak berisi handling UI error**, hanya definisi struktur error.

---

### 5.5 `README.md`

Menjelaskan tujuan dan aturan Foundation Layer.

README ini berfungsi sebagai **penjaga disiplin arsitektur**, terutama untuk kolaborasi di masa depan.

---

## 6. Aturan Boundary (Wajib Dipatuhi)

Foundation Layer:

### Boleh:

- Digunakan oleh semua layer di atasnya
- Menjadi dependensi lintas project

### Tidak Boleh:

- Mengimpor dari Integration Layer
- Mengimpor dari Presentation Layer
- Mengimpor dari App Router
- Mengetahui CMS, UI, atau domain bisnis

Jika sebuah file membutuhkan pengetahuan tentang UI, CMS, atau data operasional, maka file tersebut **tidak boleh berada di Foundation Layer**.

---

## 7. Status Perubahan

Foundation Layer dirancang sebagai lapisan **paling stabil**.

Perubahan pada lapisan ini:

- Harus jarang
- Harus memiliki alasan sistemik
- Tidak dilakukan untuk kebutuhan project spesifik

---

## 8. Penutup

Foundation Layer bukan tempat untuk bereksperimen fitur, melainkan tempat untuk **menjaga fondasi arsitektur tetap bersih dan terkendali**.

Lapisan ini memastikan bahwa Base Core dapat berkembang tanpa kehilangan konsistensi dan arah sistem.
