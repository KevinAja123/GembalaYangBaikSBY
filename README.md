# Website Paroki Gembala Yang Baik Surabaya

Website statis (HTML, CSS, JavaScript biasa), tanpa proses build.

## Struktur

```
index.html              Beranda
tentang-gereja.html     Romo, Jadwal Misa, Fasilitas, Sejarah
spiritualitas.html      Spiritualitas SVD
pelayanan.html          Pelayanan Umat dan Sakramen
kontak.html             Kontak dan lokasi
css/style.css           Seluruh gaya
js/script.js            Navbar adaptif, misa berikutnya, salin rekening, peta
images/                 Foto dan logo
```

## Peta Google di halaman Kontak

Di `js/script.js`, ubah `var EMBED_MAP=false;` menjadi `true` setelah website
dipasang di hosting atau dibuka dari komputer sendiri. Di pratinjau Claude,
bingkai situs lain diblokir sehingga peta tidak tampil.

## Yang perlu diperbarui secara berkala

- Jadwal misa: `index.html` dan `tentang-gereja.html` (kartu jadwal) serta `js/script.js` (jadwal untuk "Misa berikutnya").
- Romo: `tentang-gereja.html`.
- Rekening donasi: bagian bawah `index.html` (#donasi).
