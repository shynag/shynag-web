# Integration Layer

## 1. Tujuan Layer

Integration Layer bertanggung jawab sebagai **jembatan antara sistem internal Vectris Studio dan layanan eksternal** yang digunakan dalam project.

Layer ini menangani:

- Pengambilan data dari CMS
- Integrasi dengan layanan pihak ketiga
- Normalisasi data sebelum digunakan oleh layer lain

Integration Layer **bukan pusat logika bisnis** dan **bukan sumber kebenaran sistem**, melainkan penyedia data terstruktur.

---

## 2. Ruang Lingkup Integration Layer

Integration Layer mencakup integrasi terhadap:

- Headless CMS (Keystatic)
- API pihak ketiga (jika ada)
- Layanan eksternal non-UI lainnya

Layer ini **tidak menangani**:

- Rendering UI
- Validasi UX
- Penentuan aturan sistem global
- Logic bisnis tingkat aplikasi

---

## 3. Prinsip Utama

Integration Layer dibangun berdasarkan prinsip berikut:

1. **External Dependency Isolation**
   Detail implementasi layanan eksternal tidak boleh bocor ke layer lain.

2. **Data as Input, Not Authority**
   Data dari CMS dianggap sebagai _input_, bukan keputusan sistem.

3. **Replaceable by Design**
   CMS atau layanan dapat diganti di masa depan tanpa mempengaruhi struktur layer lain.

4. **Minimal Schema Scope**
   Hanya data operasional yang relevan yang disimpan dan diambil.

---

## 4. Peran CMS dalam Arsitektur

Dalam konteks Vectris Studio, CMS digunakan sebagai:

- Penyimpanan data operasional
- Media pengelolaan konten sederhana
- Sumber data statis untuk website

CMS **bukan**:

- Sistem manajemen bisnis
- Workflow engine
- Page builder penuh
- Produk CMS end-user

Pendekatan ini menjaga sistem tetap ringan dan terkontrol.

---

## 5. Struktur Folder Integration

Struktur yang direkomendasikan:

```
src/integrations/
 └─ keystatic/
     ├─ config.ts
     ├─ env.ts
     ├─ schemas/
     │   ├─ site.ts
     │   └─ navigation.ts
     └─ reader.ts
```

---

## 6. Penjelasan Komponen

### `env.ts`

Berisi validasi environment variable **khusus Keystatic**.
Tidak di-export ke sistem global.

---

### `config.ts`

Berisi konfigurasi teknis Keystatic (storage mode, path, dsb).

---

### `schemas/`

Berisi definisi struktur data CMS.

Prinsip schema:

- Sederhana
- Fokus pada data operasional
- Tidak mengandung logika tampilan

---

### `reader.ts`

Berfungsi sebagai **abstraction layer** untuk membaca data dari CMS.

Layer lain **tidak boleh langsung memanggil API CMS**.

---

## 7. Aturan Ketat (Boundary Rules)

Integration Layer:

- ❌ Tidak boleh mengandung JSX
- ❌ Tidak boleh mengatur UI behavior
- ❌ Tidak boleh mengatur SEO atau layout
- ❌ Tidak boleh mengimpor Presentation Layer

Integration Layer:

- ✅ Boleh mengimpor Core Layer
- ✅ Boleh digunakan oleh Modules
- ✅ Boleh menjadi satu-satunya pintu akses CMS

---

## 8. Relasi dengan Layer Lain

| Layer        | Relasi                               |
| ------------ | ------------------------------------ |
| Core         | Digunakan untuk utilitas sistem      |
| Presentation | Tidak mengetahui CMS secara langsung |
| Modules      | Menggunakan data dari Integration    |
| App Router   | Mengonsumsi hasil akhir, bukan CMS   |

---

## 9. Penutup

Integration Layer dirancang untuk menjaga **ketertiban arsitektur** dan **kebebasan evolusi sistem**.

Dengan membatasi peran CMS sebagai sumber data operasional saja, Vectris Studio memastikan bahwa sistem tetap ringan, mudah dirawat, dan tidak terikat pada satu vendor atau pendekatan teknis tertentu.
