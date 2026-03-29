/**
 * Chubes Gallery Lightbox - Vanilla JS
 * Handles lightbox functionality for WordPress gallery blocks
 */
(function() {
    'use strict';

    let galleryImages = [];
    let currentIndex = -1;
    let touchStartX = 0;
    let touchEndX = 0;

    const lightbox = {
        element: null,
        image: null,
        prevBtn: null,
        nextBtn: null,
        closeBtn: null,

        init: function() {
            this.element = document.getElementById('custom-lightbox');
            if (!this.element) return;

            this.image = this.element.querySelector('img');
            this.prevBtn = this.element.querySelector('.lightbox-prev');
            this.nextBtn = this.element.querySelector('.lightbox-next');
            this.closeBtn = this.element.querySelector('.close-lightbox');

            this.bindGalleryImages();
            this.bindNavigation();
            this.bindKeyboard();
            this.bindTouch();
        },

        bindGalleryImages: function() {
            galleryImages = Array.from(
                document.querySelectorAll('.wp-block-gallery .wp-block-image img')
            );

            galleryImages.forEach((img, index) => {
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentIndex = index;
                    this.open(this.getBestUrl(img));
                    this.preloadAdjacent();
                });
            });
        },

        /**
         * Pick the best image URL for the lightbox based on screen size.
         *
         * Instead of always loading the full-size original (which can be
         * 3000-5000px and several MB), this picks the smallest srcset entry
         * that covers the viewport at the device's pixel density. Falls back
         * to the parent <a> href or img src if no srcset is available.
         */
        getBestUrl: function(img) {
            var srcset = img.getAttribute('srcset');
            if (srcset) {
                var screenWidth = window.innerWidth * (window.devicePixelRatio || 1);
                var sources = srcset.split(',').map(function(s) {
                    var parts = s.trim().split(/\s+/);
                    return { url: parts[0], width: parseInt(parts[1]) || 0 };
                });
                // Sort ascending by width so we can find the smallest adequate source.
                sources.sort(function(a, b) { return a.width - b.width; });
                // Pick the first source wider than the screen (with some headroom).
                var target = screenWidth * 1.2;
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i].width >= target) {
                        return sources[i].url;
                    }
                }
                // No source wide enough — use the largest available.
                if (sources.length > 0) {
                    return sources[sources.length - 1].url;
                }
            }
            // No srcset: fall back to parent link (full-size) or current src.
            var parentLink = img.closest('a');
            if (parentLink && parentLink.href) {
                return parentLink.href;
            }
            return img.src;
        },

        /**
         * Preload the next and previous images during idle time so gallery
         * navigation feels instant.
         */
        preloadAdjacent: function() {
            if (galleryImages.length < 2) return;
            var self = this;
            var preload = function() {
                var prevIdx = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
                var nextIdx = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
                [prevIdx, nextIdx].forEach(function(idx) {
                    var url = self.getBestUrl(galleryImages[idx]);
                    var img = new Image();
                    img.src = url;
                });
            };
            // Use requestIdleCallback where available, setTimeout as fallback.
            if (typeof requestIdleCallback === 'function') {
                requestIdleCallback(preload);
            } else {
                setTimeout(preload, 100);
            }
        },

        open: function(imgSrc) {
            this.image.src = imgSrc;
            this.element.classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        close: function() {
            this.element.classList.remove('active');
            document.body.style.overflow = '';
        },

        prev: function() {
            if (galleryImages.length === 0) return;
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
            this.image.src = this.getBestUrl(galleryImages[currentIndex]);
            this.preloadAdjacent();
        },

        next: function() {
            if (galleryImages.length === 0) return;
            currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
            this.image.src = this.getBestUrl(galleryImages[currentIndex]);
            this.preloadAdjacent();
        },

        bindNavigation: function() {
            this.element.addEventListener('click', (e) => {
                if (e.target === this.element) {
                    this.close();
                }
            });

            this.closeBtn.addEventListener('click', () => this.close());

            this.prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prev();
            });

            this.nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.next();
            });
        },

        bindKeyboard: function() {
            document.addEventListener('keydown', (e) => {
                if (!this.element.classList.contains('active')) return;

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.next();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.close();
                        break;
                }
            });
        },

        bindTouch: function() {
            const content = this.element.querySelector('.lightbox-content');

            content.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            content.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }
    };

    document.addEventListener('DOMContentLoaded', () => lightbox.init());
})();
