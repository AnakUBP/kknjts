document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
    ANIMASI ANGKA BERHITUNG (COUNTER UP IMPROVED)
    ------------------------------------------ */
    const statNumbers = document.querySelectorAll('.card-stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const textContent = counter.innerText.trim();
            
            // Ekstrak angka pertama yang ditemukan
            const matchNumber = textContent.match(/\d+/);
            if (!matchNumber) return;

            const target = parseInt(matchNumber[0], 10);
            
            // Ambil karakter sebelum & sesudah angka (misal "+", " kg", " Minggu")
            const prefix = textContent.substring(0, matchNumber.index);
            const suffix = textContent.substring(matchNumber.index + matchNumber[0].length);

            let count = 0;
            const duration = 2000; // 2 detik
            const increment = Math.ceil(target / (duration / 16));

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = `${prefix}${count}${suffix}`;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = `${prefix}${target}${suffix}`;
                }
            };

            updateCount();
        });
    };

    // Intersection Observer
    const observerTarget = document.querySelector('.capaian-grid') || document.querySelector('.grid-3');
    if (observerTarget) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.2 });

        observer.observe(observerTarget);
    }


    /* ------------------------------------------
       2. EFEK TEKS MENGETIK (TYPEWRITER EFFECT)
       ------------------------------------------ */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = "Optimalisasi Pengelolaan Sampah Berbasis Edukasi, Teknologi, dan Pemberdayaan Masyarakat";
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
    3. LOGIKA HIDE SCROLL TOAST SAAT DI-SCROLL
    ------------------------------------------ */
    window.addEventListener('scroll', () => {
        const scrollToast = document.getElementById('scroll-toast');
        if (scrollToast) {
            if (window.scrollY > 50) {
                scrollToast.classList.add('hide');
            } else {
                scrollToast.classList.remove('hide');
            }
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

    /* ------------------------------------------
   ANIMASI MENGETIK (TYPEWRITER EFFECT) TESTIMONI
   ------------------------------------------ */
    const quoteElement = document.getElementById('typed-quote');

    if (quoteElement) {
        const quoteText = '"Kehadiran adik-adik mahasiswa KKN membawa perubahan nyata bagi Desa Jatisari. Warga kami kini tidak lagi membakar sampah secara liar, melainkan paham cara mengolahnya demi kelestarian alam dan tambahan ekonomi."';
        
        quoteElement.innerText = ''; // Kosongkan teks awal
        let charIndex = 0;
        let isTypingStarted = false;

        const typeEffect = () => {
            if (charIndex < quoteText.length) {
                quoteElement.innerText += quoteText.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 35); // Kecepatan mengetik (35ms per karakter)
            }
        };

        // Jalankan efek saat section terlihat di layar
        const quoteSection = document.getElementById('testimoni-kades');
        if (quoteSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isTypingStarted) {
                        isTypingStarted = true;
                        setTimeout(typeEffect, 300); // Delay singkat sebelum mulai
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(quoteSection);
        }
    }
    // 1. Ambil semua section yang memiliki atribut ID
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    // Jika tidak ada section di halaman ini (misal di halaman lain), tidak perlu jalankan observer
    if (sections.length === 0) return;

    // 2. Opsi untuk IntersectionObserver (mendeteksi saat section fokus di layar)
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -45% 0px', // Fokus area deteksi di tengah layar
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                // Hapus kelas 'active' dari seluruh nav-link
                navLinks.forEach(link => link.classList.remove('active'));

                // Cari link yang atribut href-nya mengarah ke ID section saat ini
                // Mendukung pencocokan: "index.html#id" maupun "#id"
                const activeLink = Array.from(navLinks).find(link => {
                    const href = link.getAttribute('href');
                    return href && (href.endsWith(`#${currentId}`) || href === `#${currentId}`);
                });

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // 3. Daftarkan setiap section ke observer
    sections.forEach(section => observer.observe(section));
});
