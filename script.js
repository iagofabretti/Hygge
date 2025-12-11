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
    GalleryGrid.init();
    BackToTop.init();
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
   GALLERY GRID MODULE
   ============================================ */
const GalleryGrid = {
    grid: null,
    loadMoreBtn: null,
    lightbox: null,
    lightboxImg: null,
    images: [],
    displayedImages: 12,
    imagesPerLoad: 8,
    currentIndex: 0,
    transitionInterval: null,
    galleryItems: [],
    
    init: function() {
        this.grid = document.getElementById('gallery-grid');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        
        if (!this.grid) return;
        
        this.loadImages();
    },
    
    loadImages: function() {
        const self = this;
        
        fetch('fotos.json')
            .then(response => response.json())
            .then(data => {
                self.images = self.shuffleArray(data.fotos);
                self.buildGrid();
                self.bindEvents();
                self.startAutoTransition();
            })
            .catch(error => {
                console.log('Loading fallback images');
                self.loadFallbackImages();
            });
    },
    
    loadFallbackImages: function() {
        this.images = [
            'DSC06829.jpg', 'DSC06834.jpg', 'DSC06838.jpg', 'DSC06840.jpg',
            'DSC06857.jpg', 'DSC06865.jpg', 'DSC06873.jpg', 'DSC06880.jpg',
            'DSC06893.jpg', 'DSC06911.jpg', 'DSC06932.jpg', 'DSC06943.jpg',
            'DSC07037.jpg', 'DSC07085.jpg', 'DSC07349.jpg', 'DSC07371.jpg'
        ];
        this.buildGrid();
        this.bindEvents();
        this.startAutoTransition();
    },
    
    shuffleArray: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    buildGrid: function() {
        const self = this;
        this.grid.innerHTML = '';
        this.galleryItems = [];
        
        const imagesToShow = this.images.slice(0, this.displayedImages);
        
        imagesToShow.forEach((img, index) => {
            const item = self.createGalleryItem(img, index);
            self.grid.appendChild(item);
            self.galleryItems.push({
                element: item,
                currentImageIndex: index
            });
        });
        
        this.updateLoadMoreButton();
    },
    
    createGalleryItem: function(img, index) {
        const self = this;
        const item = document.createElement('div');
        
        // Add variety to grid layout
        const layoutClass = this.getLayoutClass(index);
        item.className = `gallery-item ${layoutClass}`;
        
        item.innerHTML = `
            <img class="gallery-img current" src="Fotos/${img}" alt="Hy.gge Salon" loading="lazy">
            <img class="gallery-img next" src="" alt="Hy.gge Salon" loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-expand"></i>
            </div>
        `;
        
        item.addEventListener('click', () => self.openLightbox(item.querySelector('.gallery-img.current').src));
        
        return item;
    },
    
    startAutoTransition: function() {
        const self = this;
        
        // Transition one random image every 1.5 seconds
        this.transitionInterval = setInterval(function() {
            self.transitionRandomImage();
        }, 1500);
    },
    
    transitionRandomImage: function() {
        if (this.galleryItems.length === 0) return;
        
        // Pick a random gallery item
        const randomIndex = Math.floor(Math.random() * this.galleryItems.length);
        const item = this.galleryItems[randomIndex];
        const element = item.element;
        
        // Get a new random image that's different from current
        let newImageIndex;
        do {
            newImageIndex = Math.floor(Math.random() * this.images.length);
        } while (newImageIndex === item.currentImageIndex && this.images.length > 1);
        
        const currentImg = element.querySelector('.gallery-img.current');
        const nextImg = element.querySelector('.gallery-img.next');
        
        // Set the new image
        nextImg.src = `Fotos/${this.images[newImageIndex]}`;
        
        // Wait for image to load then animate
        nextImg.onload = function() {
            element.classList.add('transitioning');
            
            setTimeout(() => {
                // Swap classes
                currentImg.classList.remove('current');
                currentImg.classList.add('next');
                nextImg.classList.remove('next');
                nextImg.classList.add('current');
                
                // Update the src of the old current (now next) for future transitions
                element.classList.remove('transitioning');
                
                // Update tracking
                item.currentImageIndex = newImageIndex;
            }, 800);
        };
    },
    
    getLayoutClass: function(index) {
        // Create visual variety in the grid
        const pattern = index % 10;
        if (pattern === 0 || pattern === 7) return 'large';
        if (pattern === 3) return 'tall';
        return '';
    },
    
    loadMore: function() {
        const self = this;
        const startIndex = this.displayedImages;
        const endIndex = Math.min(startIndex + this.imagesPerLoad, this.images.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const item = this.createGalleryItem(this.images[i], i);
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            this.grid.appendChild(item);
            
            // Track the new item
            this.galleryItems.push({
                element: item,
                currentImageIndex: i
            });
            
            // Animate in
            setTimeout(() => {
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, (i - startIndex) * 100);
        }
        
        this.displayedImages = endIndex;
        this.updateLoadMoreButton();
    },
    
    updateLoadMoreButton: function() {
        if (this.displayedImages >= this.images.length) {
            this.loadMoreBtn.classList.add('hidden');
        } else {
            this.loadMoreBtn.classList.remove('hidden');
        }
    },
    
    bindEvents: function() {
        const self = this;
        
        // Load more button
        this.loadMoreBtn.addEventListener('click', () => self.loadMore());
        
        // Lightbox controls
        document.querySelector('.lightbox-close').addEventListener('click', () => self.closeLightbox());
        document.querySelector('.lightbox-prev').addEventListener('click', () => self.prevImage());
        document.querySelector('.lightbox-next').addEventListener('click', () => self.nextImage());
        
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === self.lightbox) self.closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!self.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') self.closeLightbox();
            if (e.key === 'ArrowLeft') self.prevImage();
            if (e.key === 'ArrowRight') self.nextImage();
        });
    },
    
    openLightbox: function(imgSrc) {
        this.lightboxImg.src = imgSrc;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Find current index based on src
        const filename = imgSrc.split('/').pop();
        this.currentIndex = this.images.indexOf(filename);
        if (this.currentIndex === -1) this.currentIndex = 0;
    },
    
    closeLightbox: function() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    prevImage: function() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.lightboxImg.src = `Fotos/${this.images[this.currentIndex]}`;
    },
    
    nextImage: function() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.lightboxImg.src = `Fotos/${this.images[this.currentIndex]}`;
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
