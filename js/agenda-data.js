/*
  DATA AGENDA & BERITA
  Edit file ini untuk menambah kegiatan atau berita. Halaman Berita & Agenda
  menampilkannya otomatis:
   - tanggal hari ini atau setelahnya  -> "Agenda mendatang"
   - tanggal yang sudah lewat          -> "Kegiatan sebelumnya"

  Format agenda:
    { date: "2026-12-24", time: "19.00 WIB", title: "Misa Malam Natal", place: "Gereja GYB", desc: "Keterangan singkat" }
  Format berita:
    { date: "2026-12-01", title: "Judul berita", text: "Ringkasan singkat", link: "https://..." }
  (place, desc, link boleh dikosongkan)
*/
window.AGENDA = [
  { date: "2025-10-12", time: "09.00 WIB", title: "Rekoleksi Keluarga", desc: "Tema \"Pintu yang Selalu Terbuka\" dalam rangka Tahun Yubileum 2025." },
  { date: "2025-10-04", time: "10.00 WIB", title: "Medical Check Up", desc: "Pemeriksaan kesehatan untuk umat dan masyarakat umum oleh PSE Paroki." },
  { date: "2025-10-01", time: "16.00 WIB", title: "Pembukaan Bulan Rosario", desc: "Umat berkumpul untuk doa bersama." },
  { date: "2025-09-21", time: "07.30 WIB", title: "Misa HUP Perkawinan", desc: "Misa untuk pasangan suami istri yang merayakan HUP pada Juli dan Agustus." },
  { date: "2025-09-14", time: "10.00 WIB", title: "Pesta Umat HUT Paroki ke-43" },
  { date: "2025-05-17", time: "19.00 WIB", title: "The Bible Apocalypsis Revelation", desc: "Acara Seksi Kerasulan Kitab Suci untuk bapak, ibu, OMK, dan REKAT." },
  { date: "2025-05-13", time: "12.30 WIB", title: "Pembaharuan Janji Perkawinan", desc: "Untuk pasangan suami istri yang HUP pada Maret dan April." },
  { date: "2025-05-04", time: "09.00 – 11.30 WIB", title: "Donor Darah Bulan Mei", place: "GKP lantai 1" }
];

window.BERITA = [
  /* { date: "2026-12-01", title: "Judul berita", text: "Ringkasan singkat", link: "https://..." } */
];
