<?php
/**
 * Dependency-free smoke test for the lightbox's accessible markup.
 */

define( 'ABSPATH', __DIR__ . '/' );

function add_action() {}
function plugin_dir_url() { return ''; }
function plugin_dir_path() { return ''; }
function is_singular() { return true; }
function has_block() { return true; }

require dirname( __DIR__ ) . '/chubes-gallery-lightbox.php';

ob_start();
( new ChubesGalleryLightbox() )->render_lightbox_html();
$markup = ob_get_clean();

$expectations = array(
    'role="dialog"',
    'aria-modal="true"',
    'aria-label="Image lightbox"',
    'aria-hidden="true"',
    '<button type="button" class="close-lightbox" aria-label="Close lightbox">',
    'class="lightbox-prev" aria-label="Previous image"',
    'class="lightbox-next" aria-label="Next image"',
);

foreach ( $expectations as $expectation ) {
    if ( false === strpos( $markup, $expectation ) ) {
        fwrite( STDERR, "Missing expected markup: {$expectation}\n" );
        exit( 1 );
    }
}

if ( false !== strpos( $markup, '<span class="close-lightbox"' ) ) {
    fwrite( STDERR, "Close control must not be a span.\n" );
    exit( 1 );
}

fwrite( STDOUT, "Accessible lightbox markup passed.\n" );
