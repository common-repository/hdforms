<?php
/* Replicate JavaScript URIComponent functions
------------------------------------------------------- */
function hdf_encodeURIComponent($str)
{
	$revert = array('%21' => '!', '%2A' => '*', '%27' => "'", '%28' => '(', '%29' => ')');
	return strtr(rawurlencode($str), $revert);
}

function hdf_decodeURIComponent($str)
{
	$revert = array('%21' => '!', '%2A' => '*', '%27' => "'", '%28' => '(', '%29' => ')');
	return strtr(rawurldecode($str), $revert);
}

/* Save a form
------------------------------------------------------- */
function hdf_save_form()
{

	if (!current_user_can('edit_others_pages')) {
		echo '{"status": "error", "message":"User access denied"}';
		die();
	}

	if (!isset($_POST["hdfnonce"])) {
		echo '{"status": "error", "message":"Nonce did not validate"}';
		die();
	} else {
		$nonce = sanitize_text_field($_POST["hdfnonce"]);
		if (!wp_verify_nonce($nonce, 'hdforms_nonce') != false) {
			echo '{"status": "error", "message":"Nonce did not validate"}';
			die();
		}
	}

	if (!isset($_POST["hdform"])) {
		echo '{"status": "error", "message":"No form data submitted"}';
		die();
	}

	$data = stripslashes($_POST["hdform"]);
	$data = json_decode($data);

	if ($data == "" || $data == null) {
		echo '{"status": "error", "message":"There is an issue with the submitted data"}';
		die();
	}


	$form = hdf_sanitize_form($data->data);

	$fields = hdf_sanitize_fields($data->blocks);
	$form_id = 0;

	if (isset($form->id) && $form->id != "") {
		$form_id = intval($form->id);
	} else {
		// this is a new form

		$post_information = array(
			'post_title' => $form->title,
			'post_content' => '', // post_content is required, so we leave blank
			'post_type' => 'hdf_form',
			'post_status' => 'publish'
		);
		$form_id = wp_insert_post($post_information);
	}

	// set meta
	update_post_meta($form_id, "form_data", $form);
	update_post_meta($form_id, "form_blocks", $fields);

	// update post title in case it changed
	$post_main = array(
		'ID'           => $form_id,
		'post_title'   => $form->title
	);
	wp_update_post($post_main);
	echo '{"success": true, "id": "' . $form_id . '"}';
	die();
}
add_action('wp_ajax_hdf_save_form', 'hdf_save_form');

/* Clean and sanitize data
------------------------------------------------------- */
function hdf_sanitize_form($data)
{
	foreach ($data as $k => $v) {
		$data->$k = sanitize_text_field($v);
	}
	return $data;
}

function hdf_sanitize_items($items)
{
	for ($i = 0; $i < count($items); $i++) {
		foreach ($items[$i] as $k => $v) {
			if ($k == "content") {
				$items[$i]->$k = wp_kses_post($v);
			} elseif ($k == "children") {
				$items[$i]->$k = hdf_sanitize_items($v);
			} elseif ($k == "meta") {
				foreach ($v as $kk => $vv) {
					$items[$i]->$k->$kk = sanitize_text_field($vv);
				}
			} elseif ($k == "options") {
				for ($x = 0; $x < count($v); $x++) {
					$items[$i]->$k[$x]->label = sanitize_text_field($items[$i]->$k[$x]->label);
					$items[$i]->$k[$x]->value = sanitize_text_field($items[$i]->$k[$x]->value);
				}
			} else {
				$items[$i]->$k = sanitize_text_field($v);
			}
		}
	}
	return $items;
}

function hdf_sanitize_fields($data)
{
	return hdf_sanitize_items($data);
}



/* Get a submitted form
------------------------------------------------------- */
function hdf_submit_form()
{
	if (!isset($_POST["hdf"]) || !isset($_POST["data"])) {
		echo '{"status": "error", "message":"No form data sent"}';
		die();
	}

	$hdf_id = $_POST["hdf"];
	$hdf_id = str_replace("hdf-", "", $hdf_id);
	$hdf_id = intVal($hdf_id);

	$data = $_POST["data"];

	$hdf_form = get_post_meta($hdf_id, "form_data", true);
	if (!isset($hdf_form) || $hdf_form == null) {
		echo '{"status": "error", "message":"This form no longer exists"}';
		die();
	}

	if (!hdf_flood_protection()) {
		echo '{"status": "error", "message":"Anti spam measure: You have recently sent a message. Please wait before trying to send again"}';
		die();
	}

	$hdf_blocks = get_post_meta($hdf_id, "form_blocks", true);
	$hdf_blocks = hdf_get_form_blocks($hdf_blocks);
	$data = hdf_get_form_values($data, "value");
	$data = hdf_sanitize_by_type($data, $hdf_blocks);

	do_action("hdf_after_server", $data, $hdf_form);
	$action_data = apply_filters("hdf_after_server", $data, $hdf_form);

	if (!$action_data["hdf_form"]) {
		$action_data = array();
		$action_data["data"] = $data;
		$action_data["hdf_form"] = $hdf_form;
	}

	$data = $action_data["data"];

	$hdf_form = $action_data["hdf_form"];
	hdf_create_result($data, $hdf_form);

	die();
}
add_action('wp_ajax_hdf_submit_form', 'hdf_submit_form');
add_action('wp_ajax_nopriv_hdf_submit_form', 'hdf_submit_form');


/* Flood protection */
function hdf_flood_protection()
{
	$ip = $_SERVER['REMOTE_ADDR'];
	$hdf_flood = get_option("hdf_flood");
	if ($hdf_flood == null || $hdf_flood == "") {
		$hdf_flood = array();
	}
	$hdf_flood = array_map("sanitize_text_field", $hdf_flood);
	// chck to see if current IP is listed
	if (in_array($ip, $hdf_flood)) {
		return false;
	} else {
		// update option
		array_push($hdf_flood, $ip);
		update_option("hdf_flood", $hdf_flood);
		// set WP CRON To clear it out in 60 seconds
		wp_schedule_single_event(time() + 60, "hdf_flood_cron", array($ip));
		return true;
	}
}

update_option("hdf_flood", "");

/* Flood Cron */
function hdf_flood_cron($ip)
{
	$ip = sanitize_text_field($ip);

	$hdf_flood = get_option("hdf_flood");
	if ($hdf_flood == null || $hdf_flood == "") {
		$hdf_flood = array();
	}
	$hdf_flood = array_map("sanitize_text_field", $hdf_flood);
	if (in_array($ip, $hdf_flood)) {
		$hdf_new = array();
		for ($i = 0; $i < count($hdf_flood); $i++) {
			if ($hdf_flood[$i] != $ip) {
				array_push($hdf_new, $ip);
			}
		}
		update_option("hdf_flood", $hdf_new);
	}
}
add_action('hdf_flood_cron', 'hdf_flood_cron', 10, 1);


/* Get list of all blocks in the for, and flatten the array
------------------------------------------------------- */

function hdf_get_blocks($data)
{
	$blocks = array();
	for ($i = 0; $i < count($data); $i++) {
		$block = array();
		if (isset($data[$i]->label)) {
			$block["label"] = sanitize_text_field($data[$i]->label);
		}
		if (isset($data[$i]->name)) {
			$block["name"] = sanitize_text_field($data[$i]->name);
		}
		if (isset($data[$i]->type)) {
			$block["type"] = sanitize_text_field($data[$i]->type);
		}

		if (
			count($block) > 0 &&
			isset($data[$i]->type) &&
			(isset($block["label"]) || $data[$i]->type == "heading") &&
			!isset($data[$i]->content)
		) {
			if ($data[$i]->type == "heading") {
				$heading_type = $data[$i]->heading_type;
				$block["label"] = '<' . $heading_type . '>' . $data[$i]->label . '</' . $heading_type . '>';
			}
			$blocks[$block["name"]] = $block;
		}

		if (isset($data[$i]->children) && count($data[$i]->children) > 0) {
			$block = array();
			$child = hdf_get_blocks($data[$i]->children);

			if (count($child) > 0) {
				$blocks = array_merge($blocks, $child);
			}
		}
	}
	return $blocks;
}

function hdf_get_form_blocks($data)
{
	$blocks = hdf_get_blocks($data);
	return $blocks;
}

function hdf_sanitize_by_type($data, $blocks = null)
{
	function hdf_sanitize_type_text($v, $k)
	{
		return sanitize_text_field($v);
	}

	function hdf_sanitize_type_editor($v)
	{
		$v = '<div class = "hdf_content_block" style = "padding: 12px; border: 1px dashed #bfbfbf">' . wp_kses_post($v) . "</div>";
		return $v;
	}

	function hdf_sanitize_type_textarea($v)
	{
		$v = sanitize_textarea_field($v);
		$v = apply_filters('the_content', $v, $k);
		return $v;
	}

	function hdf_sanitize_type_integer($v, $k)
	{
		return intval($v);
	}

	function hdf_sanitize_type_float($v, $k)
	{
		return floatval($v);
	}

	function hdf_sanitize_type_email($v, $k)
	{
		return sanitize_email($v);
	}

	function hdf_sanitize_type_select($v, $k)
	{
		return sanitize_text_field($v, $k);
	}

	function hdf_sanitize_type_radio($v, $k)
	{
		return sanitize_text_field($v);
	}

	function hdf_sanitize_type_checkbox($v, $k)
	{
		return sanitize_text_field($v);
	}

	function hdf_sanitize_type_date($v, $k)
	{
		return sanitize_text_field($v);
	}

	function hdf_sanitize_type_heading($v, $k)
	{
		return "";
	}

	function hdf_sanitize_type_phone($v, $k)
	{
		return sanitize_text_field($v);
	}

	function hdf_sanitize_type_currency($v, $k)
	{
		return floatval($v);
	}

	function hdf_sanitize_type_website($v, $k)
	{
		$v = esc_url_raw($v);
		return '<a href = "' . $v . '">' . $v . '</a>';
	}

	function hdf_sanitize_type_upload($v, $k)
	{

		$v = json_decode(stripslashes($v));
		$upload_dir = wp_get_upload_dir();
		$formId = array_map("sanitize_text_field", $v->id);
		$filename = sanitize_text_field($v->location);
		if ($filename == null || $filename == "") {
			return "";
		}

		$upload_url = esc_url_raw($upload_dir['baseurl'] . '/hdforms/hdf-' . $formId[0] . '/' . $v->date . '/hdf-' . $formId[1] . "/" . $filename);
		$upload_dir_old = sanitize_text_field($upload_dir['basedir'] . '/hdforms/hdf-' . $formId[0] . '/' . $v->date . '/' . $formId[1] . '/');
		$upload_dir_new = sanitize_text_field($upload_dir['basedir'] . '/hdforms/hdf-' . $formId[0] . '/' . $v->date . '/hdf-' . $formId[1] . '/');

		wp_mkdir_p($upload_dir_new);

		$upload_dir_old = $upload_dir_old . $filename;
		$upload_dir_new = $upload_dir_new . $filename;

		if (!rename($upload_dir_old, $upload_dir_new)) {
			chmod($upload_dir_new, 0644);
			echo "There was an error sending an uploaded file";
		}
		return '<a href = "' . $upload_url . '" target = "_blank">' . $filename . '</a>';
	}

	if ($blocks !== null) {
		foreach ($data as $k => $v) {
			if (isset($blocks[$k])) {
				$type = $blocks[$k]["type"];
				$data[$k] = array();
				$sanitize_function = "hdf_sanitize_type_$type";
				if (!function_exists($sanitize_function)) {
					$sanitize_function = "hdf_sanitize_type_text";
				}
				$data[$k]["value"] = $sanitize_function($v, $k);
				$data[$k]["label"] = $blocks[$k]["label"];
			}
		}
	} else {
		foreach ($data as $k => $v) {
			$type = $v["type"];
			$data[$k] = array();
			$sanitize_function = "hdf_sanitize_type_$type";
			if (!function_exists($sanitize_function)) {
				$sanitize_function = "hdf_sanitize_type_text";
			}
			$data[$k]["value"] = $sanitize_function($v["value"], $k);
			$data[$k]["id"] = $v["id"];
			$data[$k]["type"] = $v["type"];
		}
	}
	return $data;
}

function hdf_get_form_values($data)
{
	foreach ($data as $k => $v) {
		$data[$k] = $v["value"];
	}
	return $data;
}


/* Create the email
------------------------------------------------------- */
function hdf_create_result($fields, $hdf_form)
{
	$data = hdf_create_message($fields);
	if (!isset($hdf_form->send_to_email)) {
		echo '{"status": "error", "message":"No email to send to"}';
		die();
	}

	$subject = 'HDForms Message';
	if (isset($hdf_form->title) && $hdf_form->title != null) {
		$subject = $hdf_form->title;
	}


	add_filter('wp_mail_from_name', 'hdf_sender_name');
	$to = $hdf_form->send_to_email;
	$body = $data;
	$headers = array('Content-Type: text/html; charset=UTF-8');

	// if there is replyTo set
	if (isset($hdf_form->reply_to_email) && $hdf_form->reply_to_email != "") {
		$replyName = "";
		$replyEmail = $hdf_form->reply_to_email;

		if (isset($fields[$replyEmail]["value"])) {
			$replyEmail = $fields[$replyEmail]["value"];
			if (is_email(sanitize_email($replyEmail))) {
				// great, we have a valid replyTo email
				if (isset($hdf_form->reply_to_name) && $hdf_form->reply_to_name != "") {
					$replyName = $fields[$hdf_form->reply_to_name]["value"];
				}
				$replyHeader = "";
				if ($replyName == "") {
					$replyHeader = $replyEmail;
				} else {
					$replyHeader = $replyName . ' <' . $replyEmail . '>';
				}
				$replyHeader = 'Reply-to: ' . $replyHeader;
				array_push($headers, $replyHeader);
			}
		}
	}

	$status = wp_mail($to, $subject, $body, $headers);
	$success_message = "Message successfully sent";
	if (isset($hdf_form->success_message) && $hdf_form->success_message != null) {
		$success_message = $hdf_form->success_message;
	}

	if ($status == true) {
		$success_message = hdf_encodeURIComponent($success_message);
		echo '{"status": "success", "message":"' . $success_message . '"}';
	} else {
		echo '{"status": "error", "message":"Server issue; unable to send email"}';
	}
}

function hdf_create_message($data)
{
	$html = '<div style = "padding: 18px; border: 1px solid #bbb;">';
	foreach ($data as $k => $v) {
		if (!is_array($v)) {
			continue;
		}
		$label = '<strong>' . $data[$k]["label"] . '</strong>';
		$value = $data[$k]["value"];
		if ($label != null || $value != null) {
			if ($value != null) {
				$value = '<br/>' . $value;
			}
			$html .= '<div class = "hdf_item" style = "margin-bottom: 12px">' . $label . $value . '</div>';
		}
	}
	$html .= "</div>";
	return $html;
}

/* Set HDF sent from name
 * filter runs from functions_form_submit.php
------------------------------------------------------- */
function hdf_sender_name($original_email_from)
{
	return 'HDForms';
}

/* Enqueue HDF scripts and vars
------------------------------------------------------- */
function hdf_print_form_scripts($form_id, $form_blocks)
{

	// check if an editor block is needed
	if (hdf_has_editor($form_blocks)) {

		/*
		wp_enqueue_style(
			'hdf_sun_style',
			plugin_dir_url(__FILE__) . 'sun/suneditor.min.css',
			null,
			HDF_PLUGIN_VERSION
		);

		wp_enqueue_script(
			'hdf_sun_editor',
			plugins_url('sun/suneditor.min.js', __FILE__),
			array(),
			HDF_PLUGIN_VERSION,
			true
		);
		*/
	}

	$formStyle = get_option("hdf_form_style");
	if ($formStyle !== "hybrid") {
		wp_enqueue_style(
			'hdf_style_full',
			plugin_dir_url(__FILE__) . 'css/style-full.css',
			null,
			HDF_PLUGIN_VERSION
		);
	} else {
		wp_enqueue_style(
			'hdf_style_min',
			plugin_dir_url(__FILE__) . 'css/style-min.css',
			null,
			HDF_PLUGIN_VERSION
		);
	}

	wp_enqueue_script(
		'hdf_script',
		plugins_url('js/script.js', __FILE__),
		array('jquery'),
		HDF_PLUGIN_VERSION,
		true
	);

	global $hdf_id;
	if (!isset($hdf_id)) {
		$hdf_id = array();
	}
	array_push($hdf_id, intval($form_id)); // add form ID to master array	

	$form_data = get_post_meta($form_id, "form_data", true);
	$submit_text = "submit";
	if (isset($form_data->submit_text)) {
		$submit_text = $form_data->submit_text;
	}

	add_filter('hdf_actions', 'hdf_add_form_action', 10, 2);

	$hdf_actions = array();
	$hdf_actions = apply_filters("hdf_actions", $hdf_actions, $form_data);

	$hdf_inline_data = '
var hdf_form_id = ' . json_encode($hdf_id) . ';
var hdf_submit_text_' . $form_id . ' = "' . $submit_text . '";
var hdf_actions_' . $form_id . ' = ' . json_encode($hdf_actions) . ';
';
	wp_add_inline_script('hdf_script', $hdf_inline_data, "before");
}

// see if an editor block has been added
function hdf_has_editor($blocks)
{
	return true;
}

/* Actions */
// add init action to forms
function hdf_add_form_action($actions, $form_data = null)
{
	if ($form_data != null) {
		$action_init = array();
		$action_before_submit = array();
		$action_after_submit = array();

		if (isset($form_data->hdf_action_init) && $form_data->hdf_action_init != null) {
			$action_init = explode(",", $form_data->hdf_action_init);
		}

		if (isset($form_data->hdf_action_before_submit) && $form_data->hdf_action_before_submit != null) {
			$action_before_submit = explode(",", $form_data->hdf_action_before_submit);
		}

		if (isset($form_data->hdf_action_after_submit) && $form_data->hdf_action_after_submit != null) {
			$action_after_submit = explode(",", $form_data->hdf_action_after_submit);
		}

		for ($i = 0; $i < count($action_init); $i++) {
			array_push($actions, array("action" => $action_init[$i], "priority" => "init"));
		}

		for ($i = 0; $i < count($action_before_submit); $i++) {
			array_push($actions, array("action" => $action_before_submit[$i], "priority" => "before_submit"));
		}

		for ($i = 0; $i < count($action_after_submit); $i++) {
			array_push($actions, array("action" => $action_after_submit[$i], "priority" => "after_submit"));
		}
	}

	return $actions;
}

/* Accept File Upload
------------------------------------------------------- */
function hdf_file_upload()
{
	if (!isset($_FILES) || !isset($_FILES["file"])) {
		echo '{"status": "fail", "message": "no upload was found"}';
		die(); // no file uploaded
	}

	if (!isset($_POST["formId"])) {
		echo '{"status": "fail", "message": "no formId was provided"}';
		die(); // no file uploaded
	}

	$file = $_FILES["file"];
	$formId = sanitize_text_field($_POST["formId"]);
	$uid = sanitize_text_field($_POST["uid"]);

	// make sure no scary files were uploaded
	$extention = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

	// stop the low hanging fruit
	$disallowed_files = array(
		"php",
		"php3",
		"py",
		"cgi",
		"pl",
		"html",
		"js",
		"jar",
		"exe",
		"bat",
		"bin",
		"vbs"
	);
	if (in_array($extention, $disallowed_files)) {
		echo '{"status": "fail", "message": "Please do not upload scary files"}';
		die(); // scary filetypes
	}

	// check to see if WP thinks it's OK
	$fileInfo = wp_check_filetype(basename($file['name']));
	if (empty($fileInfo['ext'])) {
		echo '{"status": "fail", "message": "WP: Please do not upload scary files"}';
		die(); // scary filetypes
	}

	// masterlist of allowed files
	$allowed_files = array(
		"jpg",
		"jpeg",
		"png",
		"gif",
		"txt",
		"csv",
		"xml",
		"doc",
		"docx",
		"pages",
		"pdf",
		"ppt",
		"pptx",
		"pps",
		"ppsx",
		"odt",
		"xls",
		"xlsx",
		"rtf",
		"zip" // zips are scary, but I see too many people wanting to allow them
	);
	if (!in_array($extention, $allowed_files)) {
		echo '{"status": "fail", "message": "Please select a file with an approved extention"}';
		die(); // scary filetypes
	}

	// OK. fairly confident to continue

	$filename = sanitize_file_name(date("his") . "-" . $file['name']); // create unique filenames to prevent overwriting

	// ./uploads/hdforms/formId/date/UID/
	$upload_dir = wp_upload_dir();
	$upload_dir = $upload_dir['basedir'] . '/hdforms/' . $formId . '/' . date("Y-m-d") . "/" . $uid . '/';
	wp_mkdir_p($upload_dir);

	if (!move_uploaded_file($file['tmp_name'], $upload_dir . $filename)) {
		chmod($upload_dir . $filename, 0644);
		echo '{"status": "fail", "message": "File was not uploaded. Is the destination folder accessible?"}';
		die();
	}

	// create WPCron that will delete the entire folder after an hour
	// to remove any uploaded files that were not sent with a form
	wp_schedule_single_event(time() + 3600, "hdf_uploads_cron", array($upload_dir));

	echo '{"status": "success", "file": "' . $filename . '", "date": "' . date("Y-m-d") . '"}';
	die();
}
add_action('wp_ajax_hdf_file_upload', 'hdf_file_upload');
add_action('wp_ajax_nopriv_hdf_file_upload', 'hdf_file_upload');

function hdf_uploads_cron($dir)
{
	function hdf_check_dir_safe($dir)
	{
		$upload_dir = wp_upload_dir();
		$upload_dir = $upload_dir['basedir'] . '/hdforms/';
		// make sure the start of the dir is the hdf upload dir
		if (substr($dir, 0, strlen($upload_dir)) == $upload_dir) {
			return true;
		} else {
			return false;
		}
	}

	$dir = sanitize_text_field($dir);

	// to stop anyone from abusing this function
	if (!hdf_check_dir_safe($dir)) {
		die("please don't access this function directly");
	}

	// delete the folder
	array_map('unlink', glob("$dir/*.*")); // delete all files in folder
	rmdir($dir);
}
add_action('hdf_uploads_cron', 'hdf_uploads_cron', 10, 1);
