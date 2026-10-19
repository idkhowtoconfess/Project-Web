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


// ===== 4. Halaman pengaduan: validasi dan pemberitahuan =====
const form = document.querySelector('#form-pengaduan');

if (form) {
    const isi = document.querySelector('#isi');
    const errorIsi = document.querySelector('#error-isi');
    const toast = document.querySelector('#toast');

    // Menampilkan pemberitahuan kecil selama 4 detik
    function tampilkanToast(teks) {
        if (!toast) {
            alert(teks);
            return;
        }
        toast.textContent = teks;
        toast.classList.add('tampil');
        setTimeout(() => toast.classList.remove('tampil'), 4000);
    }

    // Menampilkan atau menghapus pesan merah di bawah kolom isi
    function aturErrorIsi(pesan) {
        if (errorIsi) errorIsi.textContent = pesan;
        isi.classList.toggle('tidak-valid', pesan !== '');
    }

    // Pesan merah hilang begitu pengunjung mulai mengetik
    isi.addEventListener('input', () => aturErrorIsi(''));

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // cegah halaman reload

        // Satu-satunya yang wajib: isi pengaduan
        if (isi.value.trim() === '') {
            aturErrorIsi('Isi pengaduan wajib diisi.');
            isi.focus();
            return;
        }

        // Lolos validasi
        tampilkanToast('Pengaduan terkirim. Terima kasih!');
        form.reset();
        if (nama) nama.disabled = false;
        if (nim) nim.disabled = false;
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