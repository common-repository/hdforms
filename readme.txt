=== HDForms | Contact Form Builder ===
Contributors: HarmonicDesign, Harmonic_Design
Tags: hdforms, form, form builder, contact, contact form, hdf, hd form, hdform, contact builder, contact form builder, send contact form
Requires at least: 5.2.0
Tested up to: 6.5
Stable tag: 1.5
Requires PHP: 7.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

HDForms. The easiest way to create contact forms.

== Description ==

HDForms. The easiest way to create contact forms
======

HDForms was designed and built to be a super easy system to create contact forms of any size. The forms are automatically validated for user input, sanitized for security, and, of course, sent without fuss! HDForms comes with an easy to use visual form builder, and can be used for small contact forms, intake forms, request for quotes, or large applications.

With HDForms, you can even intelligently show or hide certain fields with ease - no coding required!

= Video =
A video is currently being made that will highlight just how easy HDForms is to use. Check back soon!

= Features include 👍 =

* **Super easy to use** (I really can't express enough how easy HDForms is to use)
* Will work with just about any well-coded theme right out of the box
* Mobile-friendly (responsive design)
* Form builder (block based)
* Column support
* Custom toggles and triggers to show/hide elements
* Emails are automatically built and validated
* Automatic spam protection
* Run your own function before and after form submit (for you devs out there!)
* Pretty :)

Pretty much all of the standard features required for a form builder, with more options coming soon.

= Upcoming Features ⏳ =

The following features are not yet included in HDForms, but are on the road map for future updates. Some of these features will be finalized in the next couple of weeks, others may be months down the line. This list is not in order of importance.

* File uploader element
* Better localization (for things like the phone number, date, and currency fields)
* Translation ready. Sorry! English only for now 🇨🇦

## ❓ HOW TO USE | TUTORIAL ❓


Full tutorial and documentation is still being written. This section, along with a link to the full documentation will be updated ASAP.

Once a form has been created and saved, you can use the build-in Gutenberg block, or you can just copy and paste the shortcode anywhere on the site to render the form. You can also use WordPress's do_shortcode() function to render the form:
`
<?php echo do_shortcode("[hdf form = "formId"]"); ?>
`


### Triggers

You can view the HDForms **About / Options page** to see an example of how triggers and toggles work.

Setting up triggers is by far the most complicated thing to do, but I hope that this quick tutorial will help.

You'll need to know two things in order to create triggers. The trigger element, and the toggle element. The trigger element is the element that we check if its input has changed, and the toggle element is the element we either show or hide. In the above example, the trigger element is the checkboxes (specifically the one for "other"), and the toggle element is the text input.

In HDForms, each element you create gets a special and unique ID. You can find this ID by selecting the element to edit it. You'll need to get the ID of the trigger element and paste it into the toggle element's "Trigger Element" field. That's it! By default, the toggle element will remain hidden unless the trigger element gets some data.

But what about, for example, like above, where I only want the toggle to happen if a certain checkbox is selected? In this case, we also want to pass along what "option" we want the trigger to work on (note: this is only for radio or checkboxes). This can be easily done by adding `[x]` to the end of the ID, where `x` is the number of the option. So in the above example, "other" is the fourth (4) listed option, so I would append `[4]` to the end of the ID. A full example trigger element id might look something like this `hdf_3481_checkbox_oxpkhp[4]`

== Installation ==

The plugin can be installed like any other.

1. Log into WordPress
1. Select Plugins, then Add New
1. Select Upload Plugin
1. Choose the zip file, then Install and activate

Once installed, you will need to select HDForms from the left sidebar to create a new form. Once a form has been saved, a shortcode will be visible on the content tab. You can copy/paste this shortcode onto any post or page to show the form.

== Frequently Asked Questions ==


= I am not receiving emails =

HDForms uses WordPress' built-in wp_mail() function to send emails. This means that if your site or server is not properly configured, then not only will HDForms not be able to send email, but WordPress itself won't be able to either.

The first thing to do is install the [Check Email plugin](https://wordpress.org/plugins/check-email/) to test your site settings. The error message you get will help you find out where the issue lies.

The most likely culprit is SMTP. The [WP Mail SMTP ](https://wordpress.org/plugins/wp-mail-smtp/) may help you set up your SMTP settings.

= I have a feature request! =

Please submit your feature request here by using the **support** tab to the right.

= Keywords =
hdforms, form, form builder, contact, contact form, hdf, hd form, hdform, contact builder, contact form builder, send contact form

== Changelog ==
= 1.5 =
* Feb 18 2024 
* Better sanitization abstraction

= 1.3 =
* Nov 24 2023 
* Numerous bug fixes and Improvements
* Multiple sendto address

= 1 =
* Jan 25th 2020
* Better performance
* Numerous bug fixes and Improvements


= 0.9 =
* Nov 16th 2020
* Massive overhaul of the entire plugin
* Far better and more intuitive builder
* Better field creation and validation

= 0.5 =
* May 10th 2019
* Minor updates and fixes
* Added form styling options
* code cleanup

= 0.4 =
* Minor update

= 0.3 =
* April 8th 2019
* Minor updates and fixes
* Form Settings: Add a replyTo: field
* Better caching compatibility
* Upgraded date input to allow setting a min an max year range

= 0.2 =
* October 19th 2018
* Improvements to HTML email
* Improvements to form actions
* Updated readme for help and tutorial

= 0.1 =
* October 18th 2018
* initial release

== Upgrade Notice ==
*  Critical Bug Fix
