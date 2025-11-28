/* ==========================================================================
   NET-ESPAÑA - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCookieBanner();
    initSlider();
    initDropdowns();
});

/* --------------------------------------------------------------------------
   Mobile Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    if (!toggle || !navList) return;

    toggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

/* --------------------------------------------------------------------------
   Dropdown Menus (Mobile)
   -------------------------------------------------------------------------- */
function initDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav__item--has-dropdown');

    dropdownItems.forEach(function(item) {
        const link = item.querySelector('.nav__link');

        link.addEventListener('click', function(e) {
            // Only prevent default on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');

                // Close other dropdowns
                dropdownItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Cookie Banner
   -------------------------------------------------------------------------- */
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    const moreInfoBtn = document.querySelector('.cookie-more-info');

    if (!banner) return;

    // Check if cookies have been accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        banner.classList.add('active');
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.classList.remove('active');
        });
    }

    if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', function() {
            // You can redirect to a privacy policy page or show more info
            alert('Para más información sobre nuestra política de cookies, contacte con nosotros.');
        });
    }
}

/* --------------------------------------------------------------------------
   Hero Slider (Swiper.js)
   -------------------------------------------------------------------------- */
function initSlider() {
    const swiperContainer = document.querySelector('.hero-slider');

    if (!swiperContainer || typeof Swiper === 'undefined') return;

    new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

/* --------------------------------------------------------------------------
   Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* --------------------------------------------------------------------------
   Video Modal (optional - for Vimeo embeds)
   -------------------------------------------------------------------------- */
function openVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal__overlay"></div>
        <div class="video-modal__content">
            <button class="video-modal__close">&times;</button>
            <iframe
                src="https://player.vimeo.com/video/${videoId}?autoplay=1"
                width="100%"
                height="100%"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal events
    modal.querySelector('.video-modal__overlay').addEventListener('click', closeVideoModal);
    modal.querySelector('.video-modal__close').addEventListener('click', closeVideoModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeVideoModal();
    });

    function closeVideoModal() {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Attach video modal to video cards
document.querySelectorAll('.video-card[data-video-id]').forEach(function(card) {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const videoId = this.dataset.videoId;
        if (videoId) {
            openVideoModal(videoId);
        }
    });
});

/* --------------------------------------------------------------------------
   Form Validation (for contact page)
   -------------------------------------------------------------------------- */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function(field) {
        const errorMsg = field.parentElement.querySelector('.form-error');

        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            if (errorMsg) errorMsg.style.display = 'block';
        } else {
            field.classList.remove('error');
            if (errorMsg) errorMsg.style.display = 'none';
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                if (errorMsg) {
                    errorMsg.textContent = 'Por favor, introduce un email válido';
                    errorMsg.style.display = 'block';
                }
            }
        }
    });

    return isValid;
}

// Apply form validation if contact form exists
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
        }
    });
}
