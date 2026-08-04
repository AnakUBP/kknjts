document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
       1. ANIMASI ANGKA BERHITUNG (COUNTER UP)
       ------------------------------------------ */
    const statNumbers = document.querySelectorAll('.card-stat-number');
    let hasAnimated = false;

    // Fungsi untuk menjalankan animasi hitung angka
    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const textContent = counter.innerText.trim();
            // Ekstrak angka saja dari teks (misal: "30 Hari" -> 30, "5" -> 5)
            const target = parseInt(textContent.match(/\d+/)[0], 10);
            const suffix = textContent.replace(/\d+/g, '').trim(); // Mengambil teks tambahan jika ada (seperti "Hari")

            let count = 0;
            const duration = 2000; // Durasi animasi dalam milidetik (2 detik)
            const increment = Math.ceil(target / (duration / 16)); // ~60fps

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = count + (suffix ? ' ' + suffix : '');
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + (suffix ? ' ' + suffix : '');
                }
            };

            updateCount();
        });
    };

    // Jalankan animasi saat elemen kartu terlihat di layar (Intersection Observer)
    const observerTarget = document.querySelector('.grid-3');
    if (observerTarget) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true; // Agar animasi hanya berjalan sekali
                }
            });
        }, { threshold: 0.3 });

        observer.observe(observerTarget);
    }


    /* ------------------------------------------
       2. EFEK TEKS MENGETIK (TYPEWRITER EFFECT)
       ------------------------------------------ */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = "Membangun Desa, Mengabdi Untuk Masyarakat";
        heroTitle.innerText = ''; // Kosongkan teks awal
        let charIndex = 0;

        const typeEffect = () => {
            if (charIndex < originalText.length) {
                heroTitle.innerText += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 50); // Kecepatan mengetik (50ms per karakter)
            }
        };

        // Mulai animasi ketik setelah delay singkat
        setTimeout(typeEffect, 300);
    }


    /* ------------------------------------------
       3. EFEK NAVBAR PADA SCROLL
       ------------------------------------------ */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });


    /* ------------------------------------------
       4. ANIMASI FADE-IN KARTU SAAT DI-SCROLL
       ------------------------------------------ */
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const navMenu = document.getElementById('nav-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // Fungsi Buka Sidebar
    function openSidebar(e) {
        if (e) e.preventDefault();
        navMenu.classList.add('show');
        sidebarOverlay.classList.add('show');
        document.body.classList.add('sidebar-open'); // Mengunci scroll body
    }

    // Fungsi Tutup Sidebar
    function closeSidebar(e) {
        if (e) e.preventDefault();
        navMenu.classList.remove('show');
        sidebarOverlay.classList.remove('show');
        document.body.classList.remove('sidebar-open');
    }

    // Gunakan Event Listener langsung dengan penanganan fallback
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = openSidebar;
    }

    if (closeBtn) {
        closeBtn.onclick = closeSidebar;
    }

    if (sidebarOverlay) {
        sidebarOverlay.onclick = closeSidebar;
    }

    // Dropdown Accordion khusus Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.onclick = function(e) {
            if (window.innerWidth <= 1000) {
                e.preventDefault();
                const parentDropdown = this.parentElement;
                parentDropdown.classList.toggle('active');
            }
        };
    });
});
