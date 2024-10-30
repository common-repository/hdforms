<?php

if (!current_user_can('edit_others_pages')) {
	die("Your user account does not have access to these settings");
}

wp_enqueue_style(
	'hdf_admin_style',
	plugin_dir_url(__FILE__) . 'css/admin_style.css?v=' . HDF_PLUGIN_VERSION
);

$formStyle = sanitize_text_field(get_option("hdf_form_style"));
if ($formStyle == null || $formStyle == "") {
	$formStyle = "hybrid";
}

// See if the user has posted us some information
if (isset($_POST['hdf_about_options_nonce'])) {
	$hdf_nonce = sanitize_text_field($_POST['hdf_about_options_nonce']);
	if (wp_verify_nonce($hdf_nonce, 'hdf_about_options_nonce') != false) {
		$formStyle = sanitize_text_field($_POST["hdf_radio_forms_style"]);
		update_option("hdf_form_style", $formStyle);
		echo '<p style = "text-align:center">Settings have been updated</p>';
	}
}
?>

<div id="main" style="max-width: 800px; background: #f3f3f3; border: 1px solid #ddd; margin-top: 2rem">
	<div id="header">
		<h1 id="heading_title" style="margin-top:0">
			HDForms - About / Options
		</h1>
	</div>
	<br />
	<p>HDForms was designed and developed to be one of the easiest and most hassle free form builders for WordPress. If
		you have any questions, or need support, please contact me at the <a href="https://wordpress.org/support/plugin/hdforms/" target="_blank">official WordPress HDForms support forum</a>.</p>

	<p>
		As I continue to develop HDForms for my own needs, more features, options, customizations, and settings will be introduced. If you have enjoyed HDForms (it sure makes <em>my</em> life easier!), then I would appreciate it if you could <a href="https://wordpress.org/support/plugin/hdforms/reviews/#new-post" target="_blank">leave an honest review</a>. It's the little things that make building systems like this worthwhile ❤.
	</p>

	<form id="hdf_settings" method="post">
		<input type="hidden" name="hdf_submit_hidden" value="Y">
		<?php wp_nonce_field('hdf_about_options_nonce', 'hdf_about_options_nonce'); ?>
		<div style="display: grid; grid-template-columns: 1fr max-content; align-items: center;">
			<h2>
				Settings
			</h2>
			<div>
				<input type="submit" title="save settings" class="hdf_button" id="hdf_save_settings" value="SAVE">
			</div>
		</div>


		<div class="hdf-item hdf-item-radio">
			<label class="hdf-label" for="hdf_radio_forms_style">HDForms Style</label>
			<br /><br />
			<p class="hdf-hint">
				Select how you want your forms to look. Hybrid will only load the styles needed for HDForms and will inherit
				your theme's style for all elements. Full will force the forms to be fully styled by HDForms
			</p>
			<input type="hidden" style="display:none" id="hdf_radio_forms_style" name="hdf_radio_forms_style" value="<?php echo $formStyle; ?>" />
			<div class="hdf-check-row" data-value="" id="hdf-item-wrapper_hdf_radio_forms_style">
				<div class="hdf-options-check">
					<input type="checkbox" id="hdf_radio_forms_style_0" class="hdf-radio-input" data-id="hdf_radio_forms_style" value="hybrid" name="hdf_radio_forms_style_0" onchange="HDF.validate.radio(this)" <?php if ($formStyle == "hybrid") {
																																																						echo "checked";
																																																					} ?> />
					<label for="hdf_radio_forms_style_0"></label>
				</div>
				<label class="non-block" for="hdf_radio_forms_style_0">Hybrid</label>
				<div class="hdf-options-check">
					<input type="checkbox" id="hdf_radio_forms_style_1" class="hdf-radio-input" data-id="hdf_radio_forms_style" value="full" name="hdf_radio_forms_style_1" onchange="HDF.validate.radio(this)" <?php if ($formStyle == "full") {
																																																					echo "checked";
																																																				} ?> />
					<label for="hdf_radio_forms_style_1"></label>
				</div>
				<label class="non-block" for="hdf_radio_forms_style_1">Full</label>
			</div>
		</div>

	</form>


	<div class="hdf_highlight" id="hd_patreon">
		<div id="hd_patreon_icon">
			<img src="https://dev.harmonicdesign.ca/wp-content/plugins/hd-quiz/includes/settings/../images/hd_patreon.png" alt="Donate">
		</div>
		<p>
			HDForms is a 100% free plugin developed in my spare time, and as such, I get paid in nothing but good will
			and positive reviews. If you are enjoying HDForms and would like to show your support, please consider
			contributing to my <a href="https://www.patreon.com/harmonic_design" target="_blank">patreon page</a> to
			help continued development. Every little bit helps, and I am fuelled by ☕.
		</p>
	</div>

	<hr style="margin-top:2rem" />

	<h2>Upcoming Features</h2>
	<p>
		I am developing HDForms in my spare time, but still plan to add the following features at some point
	</p>
	<ul class="hdf_list">
		<li>Server side custom actions</li>
		<li>Save form as block (<small>so you can reuse forms as block: ie import a form into a new form</small>)</li>
		<li>Translation ready (<small>currently, backend is english only</small>)</li>
		<li>New field / block types (<small>URL, File Upload</small>)</li>
		<li>Better localization options (<small>currency, date, phone number</small>)</li>
	</ul>
</div>

<script>
	// mini HDForms :)
	const HDF = {
		validate: {
			radio: function(el) {
				// make sure only one can be selected at a time
				let id = el.getAttribute("data-id");
				let radio = document.getElementById("hdf-item-wrapper_" + id);
				let radios = radio.getElementsByClassName("hdf-radio-input");
				for (let i = 0; i < radios.length; i++) {
					if (radios[i] != el) {
						if (el.checked) {
							radios[i].checked = false;
						} else {
							if (radios.length === 2) {
								radios[i].checked = true;
								document.getElementById(id).value = radios[i].value;
								radio.setAttribute("data-value", radios[i].value);
							}
						}
					}
				}

				if (el.checked) {
					document.getElementById(id).value = el.value;
					radio.setAttribute("data-value", el.value);
				}
			}
		}
	}
</script>