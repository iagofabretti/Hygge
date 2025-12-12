/* ================================================
   HY.GGE URBAN SALON - JavaScript
   Landing Page Interactivity
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Loader.init();
    Navigation.init();
    HeroSlider.init();
    ScrollAnimations.init();
    GalleryCarousel.init();
    BackToTop.init();
    TeamModal.init();
    SpaceMarquee.init();
});

/* ============================================
   LOADER MODULE
   ============================================ */
const Loader = {
    init: function() {
        const loader = document.getElementById('loader');
        
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 1000);
        });
    }
};

/* ============================================
   NAVIGATION MODULE
   ============================================ */
const Navigation = {
    navbar: null,
    navToggle: null,
    navMenu: null,
    navLinks: null,
    
    init: function() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.bindEvents();
        this.handleScroll();
    },
    
    bindEvents: function() {
        const self = this;
        
        // Mobile menu toggle
        this.navToggle.addEventListener('click', function() {
            self.toggleMenu();
        });
        
        // Close menu on link click
        this.navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                self.closeMenu();
                self.setActiveLink(this);
            });
        });
        
        // Scroll event for navbar styling and active section
        window.addEventListener('scroll', function() {
            self.handleScroll();
            self.updateActiveSection();
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                self.closeMenu();
            }
        });
    },
    
    toggleMenu: function() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    },
    
    closeMenu: function() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    handleScroll: function() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    setActiveLink: function(activeLink) {
        this.navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    },
    
    updateActiveSection: function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* ============================================
   HERO SLIDER MODULE
   ============================================ */
const HeroSlider = {
    slides: null,
    currentSlide: 0,
    slideInterval: null,
    
    init: function() {
        this.slides = document.querySelectorAll('.hero-slide');
        if (this.slides.length > 1) {
            this.shuffleSlides();
            this.startSlider();
        }
    },
    
    shuffleSlides: function() {
        const slider = document.querySelector('.hero-slider');
        const slidesArray = Array.from(this.slides);
        
        // Fisher-Yates shuffle
        for (let i = slidesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [slidesArray[i], slidesArray[j]] = [slidesArray[j], slidesArray[i]];
        }
        
        // Remove all slides and append in new order
        slidesArray.forEach(slide => {
            slide.classList.remove('active');
            slider.appendChild(slide);
        });
        
        // Update slides reference and set first as active
        this.slides = document.querySelectorAll('.hero-slide');
        this.slides[0].classList.add('active');
        this.currentSlide = 0;
    },
    
    startSlider: function() {
        const self = this;
        this.slideInterval = setInterval(function() {
            self.nextSlide();
        }, 6000);
    },
    
    nextSlide: function() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
};

/* ============================================
   SCROLL ANIMATIONS MODULE
   ============================================ */
const ScrollAnimations = {
    elements: null,
    
    init: function() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.bindEvents();
        this.checkElements();
    },
    
    bindEvents: function() {
        const self = this;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    self.checkElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
    },
    
    checkElements: function() {
        const triggerBottom = window.innerHeight * 0.85;
        
        this.elements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animated');
            }
        });
    }
};

/* ============================================
   GALLERY CAROUSEL MODULE
   ============================================ */
const GalleryCarousel = {
    track: null,
    images: [],
    slides: [],
    currentIndex: 0,
    autoPlayInterval: null,
    lightbox: null,
    lightboxImg: null,
    
    init: function() {
        this.track = document.getElementById('gallery-track');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        
        if (!this.track) return;
        
        this.loadImages();
        this.bindEvents();
    },
    
    loadImages: function() {
        const self = this;
        
        // Lista de fotos da pasta Fotos
        this.images = ["Barbeiro.jpg","Coloração.jpg","Corte.jpg","DSC06834.jpg","DSC06840.jpg","DSC06842.jpg","DSC06843.jpg","DSC06847.jpg","DSC06851.jpg","DSC06854.jpg","DSC06855.jpg","DSC06857.jpg","DSC06860.jpg","DSC06865.jpg","DSC06867.jpg","DSC06870.jpg","DSC06873.jpg","DSC06880.jpg","DSC06884.jpg","DSC06885.jpg","DSC06888.jpg","DSC06894.jpg","DSC06896.jpg","DSC06897.jpg","DSC06906.jpg","DSC06911.jpg","DSC06914.jpg","DSC06920.jpg","DSC06924.jpg","DSC06926.jpg","DSC06927.jpg","DSC06929.jpg","DSC06932.jpg","DSC06934.jpg","DSC06943.jpg","DSC06955-Editar.jpg","DSC06959.jpg","DSC06964.jpg","DSC06968.jpg","DSC06969.jpg","DSC06976.jpg","DSC06978.jpg","DSC06983.jpg","DSC06988.jpg","DSC06995.jpg","DSC06998.jpg","DSC07000.jpg","DSC07001.jpg","DSC07004.jpg","DSC07009.jpg","DSC07015.jpg","DSC07018.jpg","DSC07022.jpg","DSC07025.jpg","DSC07027.jpg","DSC07031.jpg","DSC07038-Editar.jpg","DSC07039.jpg","DSC07045.jpg","DSC07055.jpg","DSC07067.jpg","DSC07091.jpg","DSC07099.jpg","DSC07102.jpg","DSC07109.jpg","DSC07113.jpg","DSC07115.jpg","DSC07141.jpg","DSC07332.jpg","DSC07346.jpg","DSC07349.jpg","DSC07362.jpg","DSC07374.jpg","DSC07506.jpg","DSC07623.jpg","DSC07628.jpg","MANICURE.jpg","MAQUIAGEM.jpg","Profissionais.jpg","Tratamento Capilares.jpg"].map(foto => `Fotos/${foto}`);
        
        this.buildCarousel();
        this.startAutoPlay();
    },
    

    
    buildCarousel: function() {
        this.track.innerHTML = '';
        this.slides = [];
        
        this.images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `<img src="${img}" alt="Hy.gge Salon" loading="lazy">`;
            
            slide.addEventListener('click', () => {
                if (index === this.currentIndex) {
                    this.openLightbox(img);
                } else {
                    this.goToSlide(index);
                }
            });
            
            this.track.appendChild(slide);
            this.slides.push(slide);
        });
        
        this.currentIndex = 0;
        setTimeout(() => this.updateCarousel(), 100);
    },
    
    updateCarousel: function() {
        if (this.slides.length === 0) return;
        
        const total = this.slides.length;
        
        this.slides.forEach((slide, index) => {
            // Calculate circular distance
            let offset = (index - this.currentIndex + total) % total;
            if (offset > total / 2) {
                offset -= total;
            }
            
            // Esconde completamente slides distantes (mais que 2 posições) ou muito à esquerda
            if (offset < -2 || offset > 3) {
                slide.style.display = 'none';
                return;
            }
            
            slide.style.display = 'block';
            slide.style.opacity = 1;
            slide.style.pointerEvents = 'auto';
            slide.style.visibility = 'visible';
            
            if (offset === 0) {
                // Center Item
                slide.style.zIndex = 20;
                slide.style.transform = `translate(-50%, -50%) scale(1)`;
                slide.style.filter = 'none';
                slide.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
            } else if (offset < 0) {
                // Left Side (Negative offset) - apenas -1 e -2 visíveis
                slide.style.zIndex = 10 + offset;
                
                const finalTx = -420 + ((offset + 1) * 40);
                
                slide.style.transform = `translate(-50%, -50%) translateX(${finalTx}px) translateZ(${Math.abs(offset) * -50}px) rotateY(60deg) scale(0.9)`;
                slide.style.filter = 'brightness(0.6) grayscale(30%)';
                slide.style.boxShadow = '-5px 0 10px rgba(0,0,0,0.3)';
                
            } else {
                // Right Side (Positive offset)
                slide.style.zIndex = 10 - offset;
                
                const finalTx = 420 + ((offset - 1) * 40);
                
                slide.style.transform = `translate(-50%, -50%) translateX(${finalTx}px) translateZ(${Math.abs(offset) * -50}px) rotateY(-60deg) scale(0.9)`;
                slide.style.filter = 'brightness(0.6) grayscale(30%)';
                slide.style.boxShadow = '5px 0 10px rgba(0,0,0,0.3)';
            }
        });
    },
    
    goToSlide: function(index) {
        let newIndex = index;
        // Wrap around logic
        if (newIndex < 0) newIndex = this.images.length - 1;
        if (newIndex >= this.images.length) newIndex = 0;
        
        this.currentIndex = newIndex;
        this.updateCarousel();
        this.resetAutoPlay();
    },
    
    nextSlide: function() {
        this.goToSlide(this.currentIndex + 1);
    },
    
    prevSlide: function() {
        this.goToSlide(this.currentIndex - 1);
    },
    
    startAutoPlay: function() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    },
    
    resetAutoPlay: function() {
        this.startAutoPlay();
    },
    
    bindEvents: function() {
        const prevBtn = document.getElementById('gallery-prev');
        const nextBtn = document.getElementById('gallery-next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        
        window.addEventListener('resize', () => this.updateCarousel());
        
        // Lightbox controls
        const closeBtn = this.lightbox ? this.lightbox.querySelector('.lightbox-close') : null;
        const lbPrevBtn = this.lightbox ? this.lightbox.querySelector('.lightbox-prev') : null;
        const lbNextBtn = this.lightbox ? this.lightbox.querySelector('.lightbox-next') : null;
        
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.closeLightbox();
            });
        }
        
        if (lbPrevBtn) lbPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevImage();
        });
        
        if (lbNextBtn) lbNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextImage();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox || !this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
    },
    
    openLightbox: function(imgSrc) {
        if (!this.lightboxImg) return;
        this.lightboxImg.src = imgSrc;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeLightbox: function() {
        if (!this.lightbox) return;
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    prevImage: function() {
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) newIndex = this.images.length - 1;
        this.currentIndex = newIndex;
        this.updateCarousel();
        this.lightboxImg.src = this.images[this.currentIndex];
    },
    
    nextImage: function() {
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.images.length) newIndex = 0;
        this.currentIndex = newIndex;
        this.updateCarousel();
        this.lightboxImg.src = this.images[this.currentIndex];
    }
};

/* ============================================
   BACK TO TOP MODULE
   ============================================ */
const BackToTop = {
    button: null,
    
    init: function() {
        this.button = document.getElementById('back-to-top');
        this.bindEvents();
    },
    
    bindEvents: function() {
        const self = this;
        
        window.addEventListener('scroll', function() {
            self.toggleVisibility();
        });
        
        this.button.addEventListener('click', function() {
            self.scrollToTop();
        });
    },
    
    toggleVisibility: function() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   PARALLAX EFFECT
   ============================================ */
window.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        parallaxBg.style.transform = 'translate3d(0, ' + rate + 'px, 0)';
    }
});

/* ============================================
   LAZY LOADING FOR IMAGES
   ============================================ */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const image = entry.target;
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                }
                observer.unobserve(image);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
    });
}

/* ============================================
   TEAM MODAL MODULE
   ============================================ */
const TeamModal = {
    modal: null,
    overlay: null,
    closeBtn: null,
    modalImage: null,
    modalName: null,
    modalRole: null,
    modalDesc: null,
    modalInsta: null,
    modalInstaHandle: null,
    
    init: function() {
        this.modal = document.getElementById('team-modal');
        if (!this.modal) return;

        this.overlay = this.modal.querySelector('.team-modal-overlay');
        this.closeBtn = this.modal.querySelector('.team-modal-close');
        this.modalImage = document.getElementById('modal-image');
        this.modalName = document.getElementById('modal-name');
        this.modalRole = document.getElementById('modal-role');
        this.modalDesc = document.getElementById('modal-description');
        this.modalInsta = document.getElementById('modal-instagram');
        this.modalInstaHandle = document.getElementById('modal-instagram-handle');
        
        this.bindEvents();
    },
    
    bindEvents: function() {
        const self = this;
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('click', function() {
                const data = {"meses":[{"nome":"Dezembro","pasta":"12 - Dezembro","fotos":["DSC06075.jpg","DSC06511.jpg","DSC06527.jpg","DSC06530.jpg","DSC06533.jpg","DSC06534.jpg","DSC06536.jpg","DSC06539.jpg","DSC06542.jpg","DSC06544.jpg","DSC06545.jpg","DSC06547.jpg","DSC06549.jpg","DSC06552.jpg","DSC06553.jpg","DSC06555.jpg","DSC06559.jpg","DSC06560.jpg","DSC06564.jpg","DSC06566.jpg","DSC06569.jpg","DSC06571.jpg","DSC06574.jpg","DSC06575.jpg","DSC06577.jpg","DSC06578.jpg","DSC06581.jpg","DSC06583.jpg","DSC06589.jpg","DSC06601.jpg","DSC06602.jpg","DSC06620.jpg","DSC06625.jpg","DSC06627.jpg","DSC06634.jpg","DSC06637.jpg","DSC06640.jpg","DSC06642.jpg","DSC06644.jpg","DSC06648.jpg","DSC06651.jpg","DSC06661.jpg","DSC06669.jpg","DSC06674.jpg","DSC06678.jpg","DSC06681.jpg","DSC06684.jpg","DSC06687.jpg","DSC06689.jpg","DSC06691.jpg","DSC06693.jpg","DSC06694.jpg","DSC06697.jpg","DSC06699.jpg","DSC06701.jpg","DSC06703.jpg","DSC06705.jpg"]},{"nome":"Novembro","pasta":"11 - Novembro","fotos":["DSC07177-Editar.jpg","DSC07190.jpg","DSC07209.jpg","DSC07211-Editar.jpg","DSC07225.jpg","DSC07228.jpg","DSC07232.jpg","DSC07234.jpg","DSC07236.jpg","DSC07237.jpg","DSC07256.jpg","DSC07257.jpg","DSC07258.jpg","DSC07266.jpg","DSC07270.jpg","DSC07276.jpg","DSC07277.jpg","DSC07285.jpg","DSC07287.jpg","DSC07290.jpg","DSC07294.jpg","DSC07311.jpg","DSC07320.jpg","DSC07325.jpg","DSC07327.jpg","DSC07329.jpg","DSC07330.jpg","DSC07332.jpg","DSC07335.jpg","DSC07340.jpg","DSC07342.jpg","DSC07344.jpg","DSC07346.jpg","DSC07347.jpg","DSC07349.jpg","DSC07351.jpg","DSC07353.jpg","DSC07358.jpg","DSC07360.jpg","DSC07362.jpg","DSC07365.jpg","DSC07367.jpg","DSC07371.jpg","DSC07373.jpg","DSC07374.jpg","DSC07376.jpg","DSC07379.jpg","DSC07380.jpg","DSC07385.jpg","DSC07389.jpg","DSC07392.jpg","DSC07395.jpg","DSC07397.jpg","DSC07404.jpg","DSC07405.jpg","DSC07406.jpg","DSC07407.jpg","DSC07408.jpg","DSC07409.jpg","DSC07426.jpg","DSC07428.jpg","DSC07434.jpg","DSC07461.jpg","DSC07466.jpg","DSC07469-Editar.jpg","DSC07472.jpg","DSC07473.jpg","DSC07474.jpg","DSC07476.jpg","DSC07477.jpg","DSC07482.jpg","DSC07486-Editar.jpg","DSC07487.jpg","DSC07491.jpg","DSC07505.jpg","DSC07506.jpg","DSC07521.jpg","DSC07525.jpg","DSC07526.jpg","DSC07535.jpg","DSC07536.jpg","DSC07537-Editar.jpg","DSC07538.jpg","DSC07539.jpg","DSC07541.jpg","DSC07543-Editar.jpg","DSC07545.jpg","DSC07547.jpg","DSC07553.jpg","DSC07555.jpg","DSC07558.jpg","DSC07575.jpg","DSC07577.jpg","DSC07589-Editar.jpg","DSC07590.jpg","DSC07592.jpg","DSC07594.jpg","DSC07598.jpg","DSC07600.jpg","DSC07602.jpg","DSC07603-Editar.jpg","DSC07605.jpg","DSC07607.jpg","DSC07608.jpg","DSC07609.jpg","DSC07613.jpg","DSC07615-Editar.jpg","DSC07616.jpg","DSC07617-Editar.jpg","DSC07618.jpg","DSC07620.jpg","DSC07621.jpg","DSC07623.jpg","DSC07624.jpg","DSC07625.jpg","DSC07626.jpg","DSC07628.jpg","DSC07646.jpg","DSC07651.jpg","DSC07661.jpg","DSC07662.jpg","DSC07667.jpg","DSC07675.jpg","DSC07676.jpg","DSC07677.jpg","IMGL8481.jpg","IMGL8482.jpg","IMGL8483.jpg","IMGL8484.jpg","IMGL8485.jpg","IMGL8486.jpg","IMGL8487.jpg","IMGL8488.jpg","IMGL8489.jpg","IMGL8490.jpg","IMGL8492.jpg","IMGL8493.jpg","IMGL8494.jpg","IMGL8495.jpg"]},{"nome":"Outubro","pasta":"10 - Outubro","fotos":["DSC04895.jpg","DSC05126.jpg"]}]};
                self.open(data);
            });
        });
        
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && self.modal.classList.contains('active')) {
                self.close();
            }
        });
    },
    
    open: function(data) {
        this.modalImage.src = data.image;
        this.modalImage.alt = data.name;
        this.modalName.textContent = data.name;
        this.modalRole.textContent = data.role;
        this.modalDesc.textContent = data.description;
        this.modalInsta.href = data.link;
        this.modalInstaHandle.textContent = data.instagram;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close: function() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/* ============================================
   SPACE MARQUEE (INFINITE SCROLL) & LIGHTBOX
   ============================================ */
const SpaceMarquee = {
    images: [],
    currentImageIndex: 0,
    lightbox: null,
    lightboxImg: null,

    init: function() {
        const track = document.getElementById('marquee-track');
        if (!track) return;

        // Collect images for lightbox
        const originalImages = track.querySelectorAll('img');
        this.images = Array.from(originalImages).map(img => img.src);

        // Clone content to ensure seamless loop
        const content = track.innerHTML;
        track.innerHTML = content + content + content; // Triple content for safety

        // Animation logic
        let scrollPos = 0;
        const speed = 0.5; // Pixels per frame
        let isHovered = false;
        let animationId;

        const animate = () => {
            if (!isHovered) {
                scrollPos -= speed;
                // Reset when first set is fully scrolled out
                if (Math.abs(scrollPos) >= track.scrollWidth / 3) {
                    scrollPos = 0;
                }
                track.style.transform = `translateX(${scrollPos}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        // Pause on hover
        track.addEventListener('mouseenter', () => isHovered = true);
        track.addEventListener('mouseleave', () => isHovered = false);

        // Start animation
        animate();

        // Initialize Lightbox
        this.initLightbox(track);
    },

    initLightbox: function(track) {
        this.lightbox = document.getElementById('space-lightbox');
        this.lightboxImg = document.getElementById('space-lightbox-img');
        const closeBtn = this.lightbox ? this.lightbox.querySelector('.lightbox-close') : null;
        const prevBtn = this.lightbox ? this.lightbox.querySelector('.lightbox-prev') : null;
        const nextBtn = this.lightbox ? this.lightbox.querySelector('.lightbox-next') : null;

        if (!this.lightbox || !this.lightboxImg) return;

        // Open Lightbox on Click
        track.addEventListener('click', (e) => {
            // Check if clicked element is an image or inside an image wrapper
            const img = e.target.closest('img');
            if (img) {
                const src = img.src;
                // Find index based on src (handling potential URL encoding differences)
                this.currentImageIndex = this.images.findIndex(s => s === src || decodeURIComponent(s) === decodeURIComponent(src));
                
                // If not found (maybe due to cloning or other issues), try to find by filename
                if (this.currentImageIndex === -1) {
                     this.currentImageIndex = this.images.findIndex(s => s.split('/').pop() === src.split('/').pop());
                }

                if (this.currentImageIndex !== -1) {
                    this.openLightbox();
                }
            }
        });

        // Close Lightbox
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });

        // Navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prevImage();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextImage();
            });
        }

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
    },

    openLightbox: function() {
        this.updateLightboxImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeLightbox: function() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    },

    updateLightboxImage: function() {
        if (this.images[this.currentImageIndex]) {
            this.lightboxImg.src = this.images[this.currentImageIndex];
        }
    },

    prevImage: function() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    },

    nextImage: function() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateLightboxImage();
    }
};
