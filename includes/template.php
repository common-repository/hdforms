<?php
$form_id = intval($form);
if (get_post_status($form_id) != "publish") {
	echo '<p>This form no longer exists</p>';
	return;
}

$form_blocks = get_post_meta($form_id, "form_blocks", true);
$form_blocks = hdf_sanitize_fields($form_blocks);
$form_data = $form_blocks;
$form_blocks = hdf_encodeURIComponent(json_encode($form_blocks));

hdf_print_form_scripts($form_id, $form_blocks);

$hdf_inline_data = '
var hdf_form_blocks_' . $form_id . ' = "' . $form_blocks . '";
var hdf_ajaxurl = "' . admin_url('admin-ajax.php') . '";
';
wp_add_inline_script('hdf_script', $hdf_inline_data, "before");

do_action("hdf_before");
?>
<div id="hdf-<?php echo intval($form); ?>" data-id="<?php echo intval($form); ?>"><noscript>please enable JavaScript in order to use this form</noscript></div>
<?php
do_action("hdf_after", $form_id, $form_data);
?>