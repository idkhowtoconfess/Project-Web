const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const form = document.getElementById('form-pengaduan');
const cekAnonim = document.getElementById('anonim');
const kolomNama = document.getElementById('nama');
const kolomNim = document.getElementById('nim');
const kolomIsi = document.getElementById('isi');

function aturBayangan() {
    nav.classList.toggle('bergeser', window.scrollY > 10);
}
window.addEventListener('scroll', aturBayangan);

if (hamburger) {
    hamburger.addEventListener('click', () => nav.classList.toggle('terbuka'));
}

if (form) {
    cekAnonim.addEventListener('change', () => {
        kolomNim.disabled = cekAnonim.checked;
        kolomNama.disabled = cekAnonim.checked;
        if (cekAnonim.checked) 
        {
            kolomNama.value = '';
            kolomNim.value = '';
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (kolomIsi.value.trim() === '') {
            alert('Isi pengaduan wajib diisi.');
            kolomIsi.focus();
            return;
        }

        alert('Pengaduan terkirim. Terima kasih!');
        form.reset();
        kolomNama.disabled = kolomNim.disabled = false;
    });
}

if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.foto-swiper').forEach(el => {
        new Swiper(el, {
            pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev')
            }
        });
    });
}