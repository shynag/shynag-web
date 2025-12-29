# Presentation Layer

## 1. Tujuan Layer

Presentation Layer merupakan lapisan utama
tempat pengembangan UI dan halaman website dilakukan.

Lapisan ini bertanggung jawab atas:

- Tampilan visual
- Struktur halaman
- Komponen UI
- Pengalaman pengguna

Sebagian besar pekerjaan pengembangan
dilakukan pada lapisan ini.

---

## 2. Ruang Lingkup

Presentation Layer mencakup:

- UI components (berbasis Shadcn/UI)
- Section dan layout halaman
- Styling global dan design tokens
- Utility khusus UI (mis. class merging)

Lapisan ini tidak:

- Mengambil data langsung dari CMS
- Menangani validasi environment
- Menyimpan logic bisnis kompleks

---

## 3. Pendekatan Pengembangan

Presentation Layer dikembangkan dengan prinsip:

- Page-oriented
- Component-driven
- Reusable secara visual
- Fleksibel terhadap desain

Komponen bersifat presentasional
dan menerima data melalui props.

---

## 4. Hubungan dengan App Router

Folder `app/` berfungsi sebagai penghubung routing.
Presentation Layer tidak bergantung langsung pada App Router,
melainkan dirender melalui file `page.tsx` dan `layout.tsx`.

Dengan pendekatan ini:

- Presentation Layer tetap terisolasi
- Routing dapat berubah tanpa memengaruhi UI

---

## 5. Prinsip Desain

Presentation Layer mengikuti prinsip:

- Konsistensi visual
- Kejelasan struktur
- Kemudahan modifikasi desain
- Minim logic non-UI

Lapisan ini dirancang untuk mempercepat
pengerjaan project client tanpa mengorbankan kualitas.
