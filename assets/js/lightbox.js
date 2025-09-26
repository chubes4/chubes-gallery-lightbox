jQuery(document).ready(function($) {
    // Select all images within the gallery block
    var $galleryImages = $('.wp-block-gallery figure.wp-block-image img');
    var currentIndex = -1;

    // Open lightbox on image click
    $galleryImages.on('click', function(e) {
        e.preventDefault();
        currentIndex = $galleryImages.index(this);
        openLightbox($(this).attr('src'));
    });

    // Function to open the lightbox (uses HTML structure from PHP)
    function openLightbox(imgSrc) {
        $('#custom-lightbox img').attr('src', imgSrc);
        $('#custom-lightbox').fadeIn(300);
    }

    // Close lightbox when clicking overlay or close button
    $('body').on('click', '#custom-lightbox, .close-lightbox', function() {
        $('#custom-lightbox').fadeOut(300);
    });

    // Prevent lightbox closing when clicking inside content area
    $('body').on('click', '.lightbox-content', function(e) {
        e.stopPropagation();
    });

    // Navigate to previous image
    $('body').on('click', '.lightbox-prev', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : $galleryImages.length - 1;
        var newImg = $galleryImages.eq(currentIndex).attr('src');
        $('#custom-lightbox img').attr('src', newImg);
    });

    // Navigate to next image
    $('body').on('click', '.lightbox-next', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex < $galleryImages.length - 1) ? currentIndex + 1 : 0;
        var newImg = $galleryImages.eq(currentIndex).attr('src');
        $('#custom-lightbox img').attr('src', newImg);
    });

    // Keyboard navigation: left/right arrows for prev/next, Esc to close
    $(document).on('keydown', function(e) {
        if ($('#custom-lightbox').is(':visible')) {
            if (e.keyCode === 37) { // left arrow
                e.preventDefault();
                $('.lightbox-prev').trigger('click');
            } else if (e.keyCode === 39) { // right arrow
                e.preventDefault();
                $('.lightbox-next').trigger('click');
            } else if (e.keyCode === 27) { // escape
                e.preventDefault();
                $('#custom-lightbox').fadeOut(300);
            }
        }
    });

    // Swipe navigation for mobile devices
    var touchStartX = 0;
    var touchEndX = 0;

    // Record starting X coordinate
    $('body').on('touchstart', '#custom-lightbox .lightbox-content', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    // Determine swipe direction on touchend
    $('body').on('touchend', '#custom-lightbox .lightbox-content', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        var diff = touchStartX - touchEndX;
        // Use a threshold of 50px for swipe detection
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left, move to next image
                $('.lightbox-next').trigger('click');
            } else {
                // Swipe right, move to previous image
                $('.lightbox-prev').trigger('click');
            }
        }
    });
});