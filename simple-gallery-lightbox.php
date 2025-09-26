<?php
/**
 * Plugin Name: Simple Gallery Lightbox
 * Plugin URI: https://extrachill.com
 * Description: A clean, simple lightbox for WordPress galleries with keyboard navigation and mobile support.
 * Version: 1.0.0
 * Author: Chris Huber
 * Author URI: https://chubes.net
 * Network: true
 * Requires at least: 5.0
 * Tested up to: 6.6
 * Requires PHP: 7.4
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package SimpleGalleryLightbox
 * @since 1.0.0
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants
define( 'SGL_VERSION', '1.0.0' );
define( 'SGL_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'SGL_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Main Simple Gallery Lightbox Class
 */
class SimpleGalleryLightbox {

    /**
     * Initialize the plugin
     */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'wp_footer', array( $this, 'render_lightbox_html' ) );
    }

    /**
     * Enqueue CSS and JavaScript assets
     */
    public function enqueue_assets() {
        // Enqueue lightbox CSS
        wp_enqueue_style(
            'simple-gallery-lightbox',
            SGL_PLUGIN_URL . 'assets/css/lightbox.css',
            array(),
            SGL_VERSION
        );

        // Enqueue lightbox JavaScript
        wp_enqueue_script(
            'simple-gallery-lightbox',
            SGL_PLUGIN_URL . 'assets/js/lightbox.js',
            array( 'jquery' ),
            SGL_VERSION,
            true
        );
    }

    /**
     * Render lightbox HTML structure in footer
     */
    public function render_lightbox_html() {
        ?>
        <div id="custom-lightbox" style="display: none;">
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
function simple_gallery_lightbox_init() {
    new SimpleGalleryLightbox();
}
add_action( 'init', 'simple_gallery_lightbox_init' );