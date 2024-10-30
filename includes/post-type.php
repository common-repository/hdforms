<?php

/* Register CPT Forms
------------------------------------------------------- */
function hdf_register_cpt()
{

	$labels = array(
		'name'                  => _x('Forms', 'Post Type General Name', 'text_domain'),
		'singular_name'         => _x('Forms', 'Post Type Singular Name', 'text_domain'),
		'menu_name'             => __('HDForms', 'text_domain'),
		'name_admin_bar'        => __('HDForms', 'text_domain'),
		'archives'              => __('Item Archives', 'text_domain'),
		'attributes'            => __('Item Attributes', 'text_domain'),
		'parent_item_colon'     => __('Parent Item:', 'text_domain'),
		'all_items'             => __('All Items', 'text_domain'),
		'add_new_item'          => __('Add New Item', 'text_domain'),
		'add_new'               => __('Add New', 'text_domain'),
		'new_item'              => __('New Item', 'text_domain'),
		'edit_item'             => __('Edit Item', 'text_domain'),
		'update_item'           => __('Update Item', 'text_domain'),
		'view_item'             => __('View Item', 'text_domain'),
		'view_items'            => __('View Items', 'text_domain'),
		'search_items'          => __('Search Item', 'text_domain'),
		'not_found'             => __('Not found', 'text_domain'),
		'not_found_in_trash'    => __('Not found in Trash', 'text_domain'),
		'featured_image'        => __('Featured Image', 'text_domain'),
		'set_featured_image'    => __('Set featured image', 'text_domain'),
		'remove_featured_image' => __('Remove featured image', 'text_domain'),
		'use_featured_image'    => __('Use as featured image', 'text_domain'),
		'insert_into_item'      => __('Insert into item', 'text_domain'),
		'uploaded_to_this_item' => __('Uploaded to this item', 'text_domain'),
		'items_list'            => __('Items list', 'text_domain'),
		'items_list_navigation' => __('Items list navigation', 'text_domain'),
		'filter_items_list'     => __('Filter items list', 'text_domain'),
	);
	$args = array(
		'label'                 => __('Forms', 'text_domain'),
		'labels'                => $labels,
		'supports'              => false,
		'hierarchical'          => false,
		'public'                => false,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-email-alt',
		'show_in_admin_bar'     => false,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => false,
		'capability_type'       => 'page',
	);
	register_post_type('hdf_form', $args);
}
add_action('init', 'hdf_register_cpt', 0);


/* Add custom metabox to hdform pages
------------------------------------------------------- */
function hdf_create_hdf_form_page()
{
	function hdf_meta_forms_setup()
	{
		add_action('add_meta_boxes', 'hdf_add_meta_forms');
	}
	add_action('load-post.php', 'hdf_meta_forms_setup');
	add_action('load-post-new.php', 'hdf_meta_forms_setup');

	function hdf_add_meta_forms()
	{
		add_meta_box(
			'hdf_meta_forms',
			esc_html__('HDForms', 'example'),
			'hdf_meta_forms',
			'hdf_form',
			'normal',
			'high'
		);

		function force_hdf_meta_forms_to_top()
		{
			global $wp_meta_boxes;
			global $post;
			if ($post->post_type == "hdf_form") {
				$meta = $wp_meta_boxes["hdf_form"];
				$meta = array();
				$hdform = array();
				$hdform["hdf_meta_forms"] = array();
				$hdform["hdf_meta_forms"]["id"] = "hdf_meta_forms";
				$hdform["hdf_meta_forms"]["title"] = "HDForms";
				$hdform["hdf_meta_forms"]["callback"] = "hdf_meta_forms";
				$hdform["hdf_meta_forms"]["args"] = array();
				$meta["hdf_form"]["normal"]["high"] = $hdform;
				$wp_meta_boxes = $meta;
			}
		}
		force_hdf_meta_forms_to_top();
	}
}
hdf_create_hdf_form_page();

function hdf_meta_forms($object, $box)
{
	include dirname(__FILE__) . '/meta.php';
}

/* Only allow form pages to have 1 column
------------------------------------------------------- */
function hdf_set_forms_screen()
{
	// Only allow one column for product page
	function hdf_screen_layout_columns($columns)
	{
		$columns['hdform'] = 1;
		return $columns;
	}
	add_filter('screen_layout_columns', 'hdf_screen_layout_columns');

	// Set the column to 1
	function hdf_screen_layout()
	{
		return 1;
	}
	add_filter('get_user_option_screen_layout_hdform', 'hdf_screen_layout');
}
hdf_set_forms_screen();


/* Add shortcodes column
------------------------------------------------------- */
function hdf_add_forms_column_heading($headings)
{
	$headings['hdf_shortcode'] = 'Shortcode';
	return $headings;
}
add_filter('manage_hdf_form_posts_columns', 'hdf_add_forms_column_heading');

function hdf_columns_heading_shortcode($column, $post_ID)
{
	if ($column == 'hdf_shortcode') {
		echo '<code>[hdf form = "' . $post_ID . '"]</code>';
	}
}
add_action('manage_hdf_form_posts_custom_column', 'hdf_columns_heading_shortcode', 10, 2);
