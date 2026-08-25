# LCTK Quiz 2026

Static quiz app (HTML/CSS/JS) — siap di-host di **GitHub Pages** (tanpa PHP/SQL).

## Fitur

- Login/register (disimpan di `localStorage` sebagai JSON)
- 6 tipe soal (kategori), soal & opsi ABCD diacak
- Autosave per soal, % selesai, timer attempt, avg time/soal
- Profil: accuracy, topik lemah, daftar hafalan
- Export / Import JSON (pindah data PC ↔ HP)

## Kategori

| ID | Isi |
|----|-----|
| `android` | **Hanya** codename & nomor versi |
| `android_pengetahuan` | APK, Activity, Manifest, IDE, runtime |
| `singkatan` | Singkatan IT dengan jebakan mirip |
| `software_klasik` | Browser/app legendaris |
| `ai` | Dasar AI / ML / LLM |
| `hardware` | Hardware + gambar SVG |
| `printer` | Jenis printer (inkjet, laser, thermal, …) |
| `office` | Word/Excel/PPT — opsi jalur menu mirip |
| `keamanan` | Malware *-ware + skenario hack |
| `jaringan` | LAN/WAN, topologi, IP, router |
| `pemrograman` | Python, HTML, generasi bahasa |
| `sistem` | OS, DOS, utilitas |
| `tik` | Konsep TI, UNBK, e-learning |

## Jalankan lokal

Karena `fetch('data/questions.json')`, jangan buka file langsung (`file://`). Pakai server statis:

```bash
php -S localhost:3001
```

Lalu buka http://localhost:3001/

## Deploy GitHub Pages

1. Push repo ke GitHub
2. Settings → Pages → Source: **Deploy from a branch** → `main` / root
3. (Opsional) pastikan file `.nojekyll` ada (sudah disertakan)
4. Akses `https://<user>.github.io/<repo>/`

### Catatan data di HP

Data user/attempt ada di **browser masing-masing** (localStorage).  
Untuk sync PC ↔ HP: **Export JSON** di beranda, kirim file, lalu **Import JSON** di HP.

## Regenerasi bank soal

```bash
node tools/gen_questions.mjs
```

Ini juga otomatis merge `bank_soal_lctk_revisi.json`. Atau merge saja:

```bash
node tools/merge_revisi.mjs
```
