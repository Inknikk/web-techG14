document.addEventListener('DOMContentLoaded', () => {
    // --- HEADER NAVIGATION SYSTEM ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');
    const header = document.querySelector('header');

    if (hamburger && navMenu && navLinks.length > 0 && header) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            const hamburgerIcon = hamburger.querySelector('i');
            if (hamburgerIcon) {
                if (navMenu.classList.contains('active')) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-times'); // Change to close icon
                } else {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars'); // Change back to hamburger icon
                }
            }
            document.body.classList.toggle('no-scroll'); // Toggle body scroll lock
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // For anchor links, prevent default and scroll smoothly
                if (link.hash && link.pathname === window.location.pathname) {
                    e.preventDefault();

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                        // Reset hamburger icon when menu closes
                        const hamburgerIcon = hamburger.querySelector('i');
                        if (hamburgerIcon) {
                            hamburgerIcon.classList.remove('fa-times');
                            hamburgerIcon.classList.add('fa-bars');
                        }
                    }

                    // Smooth scroll to section
                    const target = document.querySelector(link.hash);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - header.offsetHeight, // Adjust for sticky header
                            behavior: 'smooth'
                        });
                        history.pushState(null, null, link.hash); // Update URL without page jump
                    }
                }
            });
        });

        // Sticky header on scroll (Hide on scroll down, show on scroll up)
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Always show header when scrolling up or at the very top
            if (currentScroll <= 0) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up'); // Ensure it's explicitly 'up'
                return;
            }

            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scrolling down
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scrolling up
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Add buffer for the sticky header
                if (pageYOffset >= (sectionTop - header.offsetHeight - 50)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.hash === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !e.target.closest('#hamburger')) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    const hamburgerIcon = hamburger.querySelector('i');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('fa-times');
                        hamburgerIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    }


    // --- IMAGE CAROUSEL LOGIC ---
    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection) { // Ensure the section exists before trying to access its elements
        const carouselOuter = carouselSection.querySelector('.carousel-outer');
        const carouselInner = carouselOuter.querySelector('.carousel-inner');
        const carouselImages = carouselInner.querySelectorAll('img');
        const prevBtn = carouselOuter.querySelector('.prev');
        const nextBtn = carouselOuter.querySelector('.next');
        const indicatorsContainer = carouselOuter.querySelector('.carousel-indicators');

        let currentImageIndex = 0;
        let slideInterval;
        const autoSlideDelay = 5000; // 5 seconds per slide

        function showImage(index) {
            carouselImages.forEach(img => img.classList.remove('active'));
            if (carouselImages[index]) { // Ensure image exists before trying to add class
                carouselImages[index].classList.add('active');
            }
            updateIndicators(index);
        }

        function updateIndicators(activeIndex) {
            indicatorsContainer.innerHTML = ''; // Clear existing indicators
            carouselImages.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                if (index === activeIndex) {
                    indicator.classList.add('active');
                }
                indicator.addEventListener('click', () => {
                    currentImageIndex = index;
                    showImage(currentImageIndex);
                    resetAutoSlide();
                });
                indicatorsContainer.appendChild(indicator);
            });
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            showImage(currentImageIndex);
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
            showImage(currentImageIndex);
        }

        function startAutoSlide() {
            slideInterval = setInterval(nextImage, autoSlideDelay);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Event Listeners for carousel navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevImage();
                resetAutoSlide();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextImage();
                resetAutoSlide();
            });
        }

        // Pause/Play on hover (applied to the main visual carousel block)
        if (carouselOuter) {
            carouselOuter.addEventListener('mouseenter', stopAutoSlide);
            carouselOuter.addEventListener('mouseleave', startAutoSlide);
        }

        // Initialize carousel
        if (carouselImages.length > 0) {
            showImage(currentImageIndex);
            startAutoSlide();
        }
    }
});