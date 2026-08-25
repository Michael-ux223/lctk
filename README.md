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
| `android` | Versi & codename Android |
| `singkatan` | Singkatan IT dengan jebakan mirip |
| `software_klasik` | Browser/app legendaris |
| `ai` | Dasar AI / ML / LLM |
| `hardware` | Hardware + gambar SVG |
| `office` | Word / Excel / PowerPoint |

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
