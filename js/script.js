// ============================================
// BAGIAN A: MENGAMBIL ELEMEN DARI HTML
// ============================================
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');

const cekAnonim = document.getElementById('anonim');
const kolomNama = document.getElementById('nama');
const kolomNim = document.getElementById('nim');

const form = document.getElementById('form-pengaduan');
const kolomIsi = document.getElementById('isi');
const pesanError = document.getElementById('error-isi');
const toast = document.getElementById('toast');


// ============================================
// FITUR 1: Bayangan navbar saat halaman di-scroll
// ============================================
function aturBayangan() {
    if (window.scrollY > 10) {
        nav.classList.add('bergeser');
    } else {
        nav.classList.remove('bergeser');
    }
}

window.addEventListener('scroll', aturBayangan);
aturBayangan();


// ============================================
// FITUR 2: Buka dan tutup menu hamburger
// ============================================
function bukaTutupMenu() {
    nav.classList.toggle('terbuka');
}

if (hamburger) {
    hamburger.addEventListener('click', bukaTutupMenu);
}


// ============================================
// FITUR 3: Pilihan anonim (nama dan NIM dikunci)
// ============================================
function aturAnonim() {
    if (cekAnonim.checked) {
        kolomNama.disabled = true;
        kolomNim.disabled = true;
        kolomNama.value = '';
        kolomNim.value = '';
    } else {
        kolomNama.disabled = false;
        kolomNim.disabled = false;
    }
}

if (cekAnonim) {
    cekAnonim.addEventListener('change', aturAnonim);
}


// ============================================
// FITUR 4: Validasi form dan pemberitahuan
// ============================================
function tampilkanNotifikasi(teks) {
    toast.textContent = teks;
    toast.classList.add('tampil');
    setTimeout(sembunyikanNotifikasi, 4000);
}

function sembunyikanNotifikasi() {
    toast.classList.remove('tampil');
}

function hapusError() {
    pesanError.textContent = '';
    pesanError.style.display = 'none';
    kolomIsi.classList.remove('tidak-valid');
}

function kirimForm(event) {
    event.preventDefault();

    // Hanya kolom isi yang wajib
    if (kolomIsi.value.trim() === '') {
        pesanError.textContent = 'Isi pengaduan wajib diisi.';
        pesanError.style.display = 'block';
        pesanError.style.color = '#ff6b6b';
        kolomIsi.classList.add('tidak-valid');
        kolomIsi.focus();
        return;
    }

    // Kalau lolos
    tampilkanNotifikasi('Pengaduan terkirim. Terima kasih!');
    form.reset();
    kolomNama.disabled = false;
    kolomNim.disabled = false;
}

if (form) {
    form.addEventListener('submit', kirimForm);
    kolomIsi.addEventListener('input', hapusError);
}


// ============================================
// BONUS: library (hapus bagian ini kalau tidak pakai Swiper / AOS)
// ============================================
if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.foto-swiper').forEach(function (el) {
        new Swiper(el, {
            pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev')
            }
        });
    });
}

if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true });
}