<?php
/*
    * Plugin Name: HDForms
    * Description: HDForms - Best Contact Form Builder
    * Plugin URI: https://harmonicdesign.ca/hdforms
    * Author: Harmonic Design
    * Author URI: https://harmonicdesign.ca/
    * Version: 1.5
*/


// TODO: hook into builder and script to allow custom blocks.
// 		 - HDF.blocks hook
// 		 - construct
// 		 - validate
// 		 - sanitize as type
// Create hidden field. will hidden fields send (cause not visible)?
// allow custom blocks/elements filterable
// use visual edtor, uploader, hidden, and post/get inside new pro addon

if (!defined('ABSPATH')) {
	die('Invalid request.');
}

if (!defined('HDF_PLUGIN_VERSION')) {
	define('HDF_PLUGIN_VERSION', 20240119);
}

/* Include the basic required files
------------------------------------------------------- */
require dirname(__FILE__) . '/includes/post-type.php'; // custom post types
require_once dirname(__FILE__) . '/includes/functions.php'; // general functions

/* Add shortcode
------------------------------------------------------- */
function hdf_add_shortcode($atts)
{
	// Attributes
	extract(
		shortcode_atts(
			array(
				'form' => '',
			),
			$atts
		)
	);

	// Code
	ob_start();
	include plugin_dir_path(__FILE__) . './includes/template.php';
	return ob_get_clean();
}
add_shortcode('hdf', 'hdf_add_shortcode');


/* Add Gutenberg block
------------------------------------------------------- */
function hdf_register_block_box()
{
	if (!function_exists('register_block_type')) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'hdf-block-form',
		plugin_dir_url(__FILE__) . 'includes/js/block.js',
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
		HDF_PLUGIN_VERSION
	);

	register_block_type('hdforms/hdf-block-form', array(
		'style' => 'hdf-block-form',
		'editor_style' => 'hdf-block-form',
		'editor_script' => 'hdf-block-form',
	));
}
add_action('init', 'hdf_register_block_box');

/* Return JSON string list of all available forms
------------------------------------------------------- */
function hdf_get_form_list()
{
	// WP_Query arguments
	$args = array(
		'post_type'              => array('hdf_form'),
		'posts_per_page'         => -1,
	);

	// The Query
	$query = new WP_Query($args);

	$forms = array();

	// The Loop
	if ($query->have_posts()) {
		while ($query->have_posts()) {
			$query->the_post();

			$form_id = get_the_ID();

			$form = new stdClass;
			$form->value = $form_id;
			$form->label = get_the_title($form_id);
			array_push($forms, $form);
		}
	}

	wp_reset_postdata();

	echo json_encode($forms);
	die();
}
add_action('wp_ajax_hdf_get_form_list', 'hdf_get_form_list');


/* Add menu pages
------------------------------------------------------- */
function hdf_register_settings_page()
{
	add_submenu_page('edit.php?post_type=hdf_form', 'HDForms', 'About / Options', 'manage_options', 'hdf_options', 'hdf_register_settings_page_callback');
}

function hdf_register_settings_page_callback()
{
	require(dirname(__FILE__) . '/includes/about.php');
}
add_action('admin_menu', 'hdf_register_settings_page');
