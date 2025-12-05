<?php
/**
 * Plugin Name: Chubes Gallery Lightbox
 * Plugin URI: https://chubes.net
 * Description: A clean, simple lightbox for WordPress galleries with keyboard navigation and mobile support.
 * Version: 1.1.1
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
define( 'CGL_VERSION', '1.1.1' );
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
        <div id="custom-lightbox">
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="" alt="" />
                <div class="lightbox-nav">
                    <button class="lightbox-prev">&#8249;</button>
                    <button class="lightbox-next">&#8250;</button>
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