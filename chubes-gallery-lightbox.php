<?php
/**
 * Plugin Name: Chubes Gallery Lightbox
 * Plugin URI: https://chubes.net
 * Description: A clean, simple lightbox for WordPress galleries with keyboard navigation and mobile support.
 * Version: 1.2.0
 * Author: Chris Huber
 * Author URI: https://chubes.net
 * Network: true
 * Requires at least: 5.0
 * Tested up to: 6.6
 * Requires PHP: 7.4
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ChubesGalleryLightbox
 * @since 1.0.0
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants
define( 'CGL_VERSION', '1.2.0' );
define( 'CGL_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CGL_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Main Chubes Gallery Lightbox Class
 */
class ChubesGalleryLightbox {

    /**
     * Initialize the plugin
     */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'wp_footer', array( $this, 'render_lightbox_html' ) );
    }

    /**
     * Check if current page has a gallery block
     */
    private function has_gallery_block() {
        return is_singular() && has_block( 'gallery' );
    }

    /**
     * Enqueue CSS and JavaScript assets
     */
    public function enqueue_assets() {
        if ( ! $this->has_gallery_block() ) {
            return;
        }

        wp_enqueue_style(
            'chubes-gallery-lightbox',
            CGL_PLUGIN_URL . 'assets/css/lightbox.css',
            array(),
            CGL_VERSION
        );

        wp_enqueue_script(
            'chubes-gallery-lightbox',
            CGL_PLUGIN_URL . 'assets/js/lightbox.js',
            array(),
            CGL_VERSION,
            true
        );
    }

    /**
     * Render lightbox HTML structure in footer
     */
    public function render_lightbox_html() {
        if ( ! $this->has_gallery_block() ) {
            return;
        }
        ?>
        <div id="custom-lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox" aria-hidden="true">
            <div class="lightbox-content">
                <button type="button" class="close-lightbox" aria-label="Close lightbox">&times;</button>
                <img src="" alt="" />
                <div class="lightbox-nav">
                    <button type="button" class="lightbox-prev" aria-label="Previous image">&#8249;</button>
                    <button type="button" class="lightbox-next" aria-label="Next image">&#8250;</button>
                </div>
            </div>
        </div>
        <?php
    }
}

/**
 * Initialize the plugin
 */
function chubes_gallery_lightbox_init() {
    new ChubesGalleryLightbox();
}
add_action( 'init', 'chubes_gallery_lightbox_init' );
