# Website Paroki Gembala Yang Baik Surabaya

Website statis (HTML, CSS, JavaScript). Tidak perlu build. Isi yang sering berubah disimpan
di folder `data/` dan bisa diubah lewat panel admin.

## Mengubah isi lewat panel admin (disarankan)

1. Buka https://app.pagescms.org dan masuk dengan akun GitHub yang sudah diundang ke repo ini.
2. Pilih repo `GembalaYangBaikSBY`.
3. Pilih bagian yang mau diubah, isi formulirnya, lalu klik **Save**.
4. Sekitar satu menit kemudian website ikut berubah (bila dipasang di Vercel/Netlify/Cloudflare Pages dari repo ini).

Bagian yang bisa diubah: Jadwal Misa, Agenda Kegiatan, Berita, Romo Paroki, Fasilitas,
Ruang Adorasi, Rekening Donasi, Kontak, dan Foto Beranda. Foto diunggah langsung dari formulir.
Konfigurasi formulir ada di `.pages.yml`.

## Struktur

```
index.html, tentang-gereja.html, spiritualitas.html,
pelayanan.html, berita-agenda.html, kontak.html   halaman
css/style.css                                     gaya
js/script.js                                      menu, navbar adaptif, hitung mundur misa, peta
js/data.js, js/render.js, js/agenda.js            memuat data/*.json dan menampilkannya
data/*.json                                       isi website (diubah lewat panel admin)
images/                                           foto dan logo
.pages.yml                                        konfigurasi panel admin
```

Teks yang jarang berubah (Sejarah, Spiritualitas, Sakramen) ada langsung di file HTML-nya.

## Catatan

- Untuk menjalankan di komputer, jangan buka file HTML langsung. Pakai server lokal
  (misalnya `python3 -m http.server`) supaya data dapat dimuat.
- Peta Google di halaman Kontak aktif bila `EMBED_MAP=true` di `js/script.js` (sudah aktif di repo ini).
