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
                    this.open(this.getFullSizeUrl(img));
                });
            });
        },

        getFullSizeUrl: function(img) {
            const parentLink = img.closest('a');
            if (parentLink && parentLink.href) {
                return parentLink.href;
            }
            return img.src;
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
            this.image.src = this.getFullSizeUrl(galleryImages[currentIndex]);
        },

        next: function() {
            if (galleryImages.length === 0) return;
            currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
            this.image.src = this.getFullSizeUrl(galleryImages[currentIndex]);
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
