// ===== 1. Bayangan navbar saat di-scroll (semua halaman) =====
const nav = document.querySelector('.nav');

function aturBayangan() {
    if (nav) nav.classList.toggle('bergeser', window.scrollY > 10);
}

aturBayangan();
window.addEventListener('scroll', aturBayangan);


// ===== 2. Menu hamburger (semua halaman) =====
const hamburger = document.querySelector('.hamburger');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const terbuka = nav.classList.toggle('terbuka');
        hamburger.setAttribute('aria-expanded', terbuka);
        hamburger.setAttribute('aria-label', terbuka ? 'Tutup menu' : 'Buka menu');
    });
}


// ===== 3. Halaman pengaduan: pilihan anonim =====
const anonim = document.querySelector('#anonim');
const nama = document.querySelector('#nama');
const nim = document.querySelector('#nim');

if (anonim && nama && nim) {
    anonim.addEventListener('change', () => {
        nama.disabled = anonim.checked;
        nim.disabled = anonim.checked;

        if (anonim.checked) {
            nama.value = '';
            nim.value = '';
        }
    });
}


// ===== 4. Halaman pengaduan: kirim ke Google Form =====
const form = document.querySelector('#form-pengaduan');

if (form) {
    const URL_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfotEFGqxYlnFjwguk5p_sIq3FdoevagsLOlnn8Y0ekNpY9pQ/formResponse';
    const KODE = {
        nama: 'entry.622727920',
        nim: 'entry.446707568',
        angkatan: 'entry.517577107',
        whatsapp: 'entry.1065347246',
        isi: 'entry.261207470',
        bukti: 'entry.462046197'
    };

    const isi = document.querySelector('#isi');
    const errorIsi = document.querySelector('#error-isi');
    const toast = document.querySelector('#toast');
    const tombol = form.querySelector('.tombol-kirim');

    function tampilkanToast(teks, gagal) {
        if (!toast) {
            alert(teks);
            return;
        }
        toast.textContent = teks;
        toast.classList.toggle('gagal', gagal);
        toast.classList.add('tampil');
        setTimeout(() => toast.classList.remove('tampil'), 4000);
    }

    function aturErrorIsi(pesan) {
        if (errorIsi) errorIsi.textContent = pesan;
        isi.classList.toggle('tidak-valid', pesan !== '');
    }

    // Pesan merah hilang begitu pengunjung mulai mengetik
    isi.addEventListener('input', () => aturErrorIsi(''));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Satu-satunya yang wajib: isi pengaduan
        if (isi.value.trim() === '') {
            aturErrorIsi('Isi pengaduan wajib diisi.');
            isi.focus();
            return;
        }

        // Susun data. Kolom lain opsional, dikirim kalau ada isinya.
        const data = new FormData();
        data.append(KODE.isi, isi.value.trim());

        const angkatan = document.querySelector('#angkatan');
        const whatsapp = document.querySelector('#whatsapp');
        const bukti = document.querySelector('#bukti');

        if (angkatan && angkatan.value) data.append(KODE.angkatan, angkatan.value);
        if (whatsapp && whatsapp.value.trim()) data.append(KODE.whatsapp, whatsapp.value.trim());
        if (bukti && bukti.value.trim()) data.append(KODE.bukti, bukti.value.trim());

        const anonimDicentang = anonim && anonim.checked;
        if (!anonimDicentang) {
            if (nama && nama.value.trim()) data.append(KODE.nama, nama.value.trim());
            if (nim && nim.value.trim()) data.append(KODE.nim, nim.value.trim());
        }

        // Kirim
        tombol.disabled = true;
        tombol.textContent = 'Mengirim...';

        fetch(URL_FORM, { method: 'POST', mode: 'no-cors', body: data })
            .then(() => {
                tampilkanToast('Pengaduan terkirim. Terima kasih!', false);
                form.reset();
                if (nama) nama.disabled = false;
                if (nim) nim.disabled = false;
            })
            .catch(() => {
                tampilkanToast('Gagal mengirim. Cek koneksi lalu coba lagi.', true);
            })
            .finally(() => {
                tombol.disabled = false;
                tombol.textContent = 'Kirim pengaduan';
            });
    });
}

// ===== 7. Halaman info: slider foto per berita (Swiper) =====
if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.foto-swiper').forEach((el) => {
        new Swiper(el, {
            watchOverflow: true,
            grabCursor: true,
            pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev')
            }
        });
    });
}

// ===== 9. Animasi saat di-scroll (AOS) =====
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
}