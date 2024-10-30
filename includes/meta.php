<?php

function hdf_print_scripts()
{
	wp_enqueue_style(
		'hdf_admin_style',
		plugin_dir_url(__FILE__) . 'css/builder.css',
		null,
		HDF_PLUGIN_VERSION
	);
	wp_enqueue_script(
		'hdf_sortable',
		plugins_url('js/sortable.js', __FILE__),
		array(),
		HDF_PLUGIN_VERSION,
		true
	);
	wp_enqueue_script(
		'hdf_admin_script',
		plugins_url('js/builder.js', __FILE__),
		array('jquery'),
		HDF_PLUGIN_VERSION,
		true
	);

	$hdf_status = get_post_status(get_the_ID());
	if ($hdf_status === FALSE || $hdf_status === "auto-draft") {
		$hdf_id = "";
	} else {
		$hdf_id = get_the_ID();
	}

	$form_data = hdf_encodeURIComponent(json_encode(get_post_meta($hdf_id, "form_data", true)));
	$form_blocks = hdf_encodeURIComponent(json_encode(get_post_meta($hdf_id, "form_blocks", true)));

	$hdf_inline_data = '
	var hdf_form_id = "' . $hdf_id . '";
	var hdf_form_data = "' . $form_data . '";
	var hdf_form_blocks ="' . $form_blocks . '";
	var hdf_ajaxurl = "' . admin_url('admin-ajax.php') . '";
	';
	wp_add_inline_script('hdf_admin_script', $hdf_inline_data, "before");
}
hdf_print_scripts();

wp_nonce_field('hdforms_nonce', 'hdforms_nonce');
?>

<div id="hdforms">
	<div id="hdf_content">
		<div id="hdf_block_selector"></div>
		<div id="hdf_title_wrapper">
			<input type="text" id="hdf_title" placeholder="form name..." />
		</div>
		<div id="hdf_form_wrapper">
			<!-- create initial section block -->
			<div id="hdf-init-block" class="hdf-item hdf-item-section hdf-item-genesis active_block" data-type="section">
				<div class="block_title">genesis block</div>
				<div class="block_handle"></div>
				<div class="add_new_block" style="display: block" data-block="paragraph" title="add new block">
					+
				</div>
				<div class="hdf-section" id="hdf_initial_section">
					<p style="text-align: center; padding: 0.4em; margin: 0">
						<small>
							<strong>NOTE: </strong> elements in the builder will have exagerated spacing and
							padding to make sorting and editing blocks/fields easer
						</small>
					</p>
					<p style="text-align: center; padding: 0.4em; margin: 0; background-color: #e3e3e3">
						please add your first field
					</p>
				</div>
			</div>
		</div>
	</div>
	<div id="hdf_sidebar">
		<div id="hdf_sidebar_block_form_toggle">
			<div data-id="form" class="hdf_sidebar_block_form_toggle">
				Form
			</div>
			<div data-id="block" class="hdf_sidebar_block_form_toggle">
				Block
			</div>
		</div>
	</div>
</div>